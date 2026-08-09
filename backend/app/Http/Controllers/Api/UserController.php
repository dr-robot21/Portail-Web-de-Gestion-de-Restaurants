<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * GET /api/users — Super Admin only
     */
    public function index(Request $request)
    {
        $query = User::with('restaurant');

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('role') && $request->role) {
            $query->where('role', $request->role);
        }

        if ($request->filled('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->has('restaurant_id') && $request->restaurant_id) {
            $query->where('restaurant_id', $request->restaurant_id);
        }

        $perPage = $request->get('per_page', 10);
        $users = $query->latest()->paginate($perPage);

        return response()->json($users);
    }

    /**
     * POST /api/users — Super Admin only
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required|string|max:255',
            'email'         => 'required|email|unique:users,email',
            'password'      => 'required|string|min:8|confirmed',
            'role'          => 'required|in:super_admin,restaurant_admin',
            'phone'         => 'nullable|string|max:20',
            'is_active'     => 'nullable|boolean',
            'restaurant_id' => 'nullable|exists:restaurants,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name'          => $request->name,
            'email'         => $request->email,
            'password'      => Hash::make($request->password),
            'role'          => $request->role,
            'phone'         => $request->phone,
            'is_active'     => $request->get('is_active', true),
            'restaurant_id' => $request->restaurant_id,
        ]);

        NotificationService::notifySuperAdmins(
            'Nouvel utilisateur',
            "Le compte « {$user->name} » ({$user->email}) a été créé.",
            'success'
        );

        NotificationService::create(
            $user->id,
            'Bienvenue',
            "Votre compte a été créé avec succès. Bienvenue sur la plateforme !",
            'success'
        );

        return response()->json($user->load('restaurant'), 201);
    }

    /**
     * GET /api/users/{id} — Super Admin only
     */
    public function show(int $id)
    {
        $user = User::with('restaurant')->findOrFail($id);
        return response()->json($user);
    }

    /**
     * PUT /api/users/{id} — Super Admin only
     */
    public function update(Request $request, int $id)
    {
        $user = User::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name'          => 'sometimes|required|string|max:255',
            'email'         => 'sometimes|required|email|unique:users,email,' . $id,
            'password'      => 'nullable|string|min:8|confirmed',
            'role'          => 'nullable|in:super_admin,restaurant_admin',
            'phone'         => 'nullable|string|max:20',
            'is_active'     => 'nullable|boolean',
            'restaurant_id' => 'nullable|exists:restaurants,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except(['password', 'password_confirmation']);

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        NotificationService::notifySuperAdmins(
            'Utilisateur modifié',
            "Le compte « {$user->name} » ({$user->email}) a été mis à jour.",
            'info'
        );

        if (auth('api')->id() !== $user->id) {
            NotificationService::create(
                $user->id,
                'Compte mis à jour',
                'Votre compte a été mis à jour par un administrateur.',
                'info'
            );
        }

        return response()->json($user->fresh('restaurant'));
    }

    /**
     * DELETE /api/users/{id} — Super Admin only
     */
    public function destroy(int $id)
    {
        $user = User::findOrFail($id);

        // Prevent deleting yourself
        if (auth('api')->id() === $user->id) {
            return response()->json(['message' => 'You cannot delete your own account.'], 403);
        }

        $name = $user->name;
        $email = $user->email;
        $user->delete();

        NotificationService::notifySuperAdmins(
            'Utilisateur supprimé',
            "Le compte « {$name} » ({$email}) a été supprimé.",
            'warning'
        );

        return response()->json(['message' => 'User deleted successfully.']);
    }
}
