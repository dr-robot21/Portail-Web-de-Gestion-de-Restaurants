<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Models\Dish;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class RestaurantController extends Controller
{
    /**
     * GET /api/restaurants
     * Super Admin: all restaurants | Restaurant Admin: own restaurant only
     */
    public function index(Request $request)
    {
        $user = auth('api')->user();
        $query = Restaurant::with(['admin', 'openingHours']);

        if ($user->isRestaurantAdmin()) {
            $query->where('id', $user->restaurant_id);
        }

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('city', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        $perPage = $request->get('per_page', 10);
        $restaurants = $query->latest()->paginate($perPage);

        return response()->json($restaurants);
    }

    /**
     * POST /api/restaurants — Super Admin only
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required|string|max:255',
            'cuisine_type'  => 'nullable|string|max:100',
            'email'         => 'nullable|email',
            'phone'         => 'nullable|string|max:20',
            'website'       => 'nullable|string|max:255',
            'address'       => 'nullable|string|max:255',
            'city'          => 'nullable|string|max:100',
            'postal_code'   => 'nullable|string|max:20',
            'country'       => 'nullable|string|max:100',
            'opening_date'  => 'nullable|date',
            'description'   => 'nullable|string',
            'logo'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
            'manager_id'    => 'nullable|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except(['logo', 'manager_id']);

        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('logos', 'public');
        }

        $restaurant = Restaurant::create($data);

        // Assign manager
        if ($request->filled('manager_id')) {
            User::where('id', $request->manager_id)->update([
                'restaurant_id' => $restaurant->id,
                'role' => User::ROLE_RESTAURANT_ADMIN,
            ]);
        }

        // Create default opening hours
        $days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        foreach ($days as $day) {
            $restaurant->openingHours()->create([
                'day_of_week' => $day,
                'is_open' => !in_array($day, ['sunday']),
                'morning_open' => '12:00:00',
                'morning_close' => '14:30:00',
                'evening_open' => '19:00:00',
                'evening_close' => '22:30:00',
            ]);
        }

        NotificationService::notifySuperAdmins(
            'Nouveau restaurant',
            "Le restaurant « {$restaurant->name} » a été ajouté par " . (auth('api')->user()->name ?? 'le super administrateur') . '.',
            'success',
            $restaurant->id,
            'restaurant',
            $restaurant->id,
            'created'
        );

        if ($request->filled('manager_id')) {
            NotificationService::create(
                (int) $request->manager_id,
                'Restaurant assigné',
                "Vous avez été désigné gérant du restaurant « {$restaurant->name} ».",
                'success',
                $restaurant->id,
                'restaurant',
                $restaurant->id,
                'updated'
            );
        }

        return response()->json($restaurant->load(['admin', 'openingHours']), 201);
    }

    /**
     * GET /api/restaurants/{id}
     */
    public function show(int $id)
    {
        $user = auth('api')->user();
        $restaurant = Restaurant::with(['admin', 'openingHours', 'categories.dishes'])->findOrFail($id);

        if ($user->isRestaurantAdmin() && $user->restaurant_id !== $restaurant->id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        return response()->json($restaurant);
    }

    /**
     * PUT /api/restaurants/{id}
     */
    public function update(Request $request, int $id)
    {
        $user = auth('api')->user();
        $restaurant = Restaurant::findOrFail($id);

        if ($user->isRestaurantAdmin() && $user->restaurant_id !== $restaurant->id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name'          => 'sometimes|required|string|max:255',
            'cuisine_type'  => 'nullable|string|max:100',
            'email'         => 'nullable|email',
            'phone'         => 'nullable|string|max:20',
            'website'       => 'nullable|string|max:255',
            'address'       => 'nullable|string|max:255',
            'city'          => 'nullable|string|max:100',
            'postal_code'   => 'nullable|string|max:20',
            'country'       => 'nullable|string|max:100',
            'opening_date'  => 'nullable|date',
            'description'   => 'nullable|string',
            'is_active'     => 'nullable|boolean',
            'logo'          => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
            'manager_id'    => 'nullable|exists:users,id',
            'opening_hours' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except(['logo', 'manager_id', 'opening_hours']);

        if ($request->hasFile('logo')) {
            // Delete old logo
            if ($restaurant->logo && !str_starts_with($restaurant->logo, 'http')) {
                Storage::disk('public')->delete($restaurant->logo);
            }
            $data['logo'] = $request->file('logo')->store('logos', 'public');
        }

        $wasActive = $restaurant->is_active;
        $restaurant->update($data);
        $isActiveChanged = $wasActive != $restaurant->is_active;

        // Update opening hours if provided
        if ($request->has('opening_hours') && is_array($request->opening_hours)) {
            foreach ($request->opening_hours as $hour) {
                $restaurant->openingHours()->updateOrCreate(
                    ['day_of_week' => $hour['day_of_week']],
                    $hour
                );
            }
        }

        // Reassign manager if provided (super admin only)
        if ($user->isSuperAdmin() && $request->filled('manager_id') && (int) $request->manager_id !== (int) $restaurant->admin?->id) {
            // Notify the previous manager that they are no longer in charge
            $previousManager = User::where('restaurant_id', $restaurant->id)
                ->where('role', User::ROLE_RESTAURANT_ADMIN)
                ->where('id', '!=', $request->manager_id)
                ->first();

            if ($previousManager) {
                NotificationService::create(
                    $previousManager->id,
                    'Restaurant retiré',
                    "Vous n'êtes plus gérant du restaurant « {$restaurant->name} ».",
                    'warning',
                    $restaurant->id,
                    'restaurant',
                    $restaurant->id,
                    'updated'
                );
            }

            // Remove from previous manager
            User::where('restaurant_id', $restaurant->id)
                ->where('role', User::ROLE_RESTAURANT_ADMIN)
                ->where('id', '!=', $request->manager_id)
                ->update(['restaurant_id' => null]);

            User::where('id', $request->manager_id)->update([
                'restaurant_id' => $restaurant->id,
                'role' => User::ROLE_RESTAURANT_ADMIN,
            ]);

            NotificationService::create(
                (int) $request->manager_id,
                'Restaurant assigné',
                "Vous avez été désigné gérant du restaurant « {$restaurant->name} ».",
                'success',
                $restaurant->id,
                'restaurant',
                $restaurant->id,
                'updated'
            );
        }

        // Status change (activate/deactivate) — inform the affected restaurant admin
        if ($isActiveChanged) {
            $statusLabel = $restaurant->is_active ? 'activé' : 'désactivé';
            NotificationService::notifyRestaurantAdmins(
                $restaurant->id,
                $restaurant->is_active ? 'Restaurant activé' : 'Restaurant désactivé',
                "Le restaurant « {$restaurant->name} » a été {$statusLabel}.",
                $restaurant->is_active ? 'success' : 'warning',
                'restaurant',
                $restaurant->id,
                'updated'
            );
        }

        // Bidirectional notifications:
        // - Super admin edits → restaurant admin of that restaurant is informed
        // - Restaurant admin edits → all super admins are informed
        // A status change already notifies the restaurant admins above, so skip the generic one.
        if ($user->isSuperAdmin()) {
            if (!$isActiveChanged) {
                NotificationService::notifyRestaurantAdmins(
                    $restaurant->id,
                    'Restaurant modifié',
                    "Le restaurant « {$restaurant->name} » a été mis à jour par le super administrateur.",
                    'info',
                    'restaurant',
                    $restaurant->id,
                    'updated'
                );
            }
        } else {
            NotificationService::notifySuperAdmins(
                'Restaurant modifié',
                "Le restaurant « {$restaurant->name} » a été mis à jour par {$user->name}.",
                'info',
                $restaurant->id,
                'restaurant',
                $restaurant->id,
                'updated'
            );
        }

        return response()->json($restaurant->fresh(['admin', 'openingHours']));
    }

    /**
     * DELETE /api/restaurants/{id} — Super Admin only
     */
    public function destroy(int $id)
    {
        $restaurant = Restaurant::findOrFail($id);
        $name = $restaurant->name;

        // Inform the restaurant admins before their restaurant is removed
        NotificationService::notifyRestaurantAdmins(
            $restaurant->id,
            'Restaurant supprimé',
            "Le restaurant « {$name} » a été supprimé. Votre compte reste actif mais vous n'avez plus de restaurant assigné.",
            'warning',
            'restaurant',
            $id,
            'deleted'
        );

        NotificationService::notifySuperAdmins(
            'Restaurant supprimé',
            "Le restaurant « {$name} » a été supprimé.",
            'warning',
            $id,
            'restaurant',
            $id,
            'deleted'
        );

        $restaurant->delete();

        return response()->json(['message' => 'Restaurant deleted successfully.']);
    }

    /**
     * GET /api/restaurants/{id}/menu
     */
    public function menu(int $id)
    {
        $user = auth('api')->user();
        $restaurant = Restaurant::findOrFail($id);

        if ($user->isRestaurantAdmin() && $user->restaurant_id !== $restaurant->id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $categories = $restaurant->categories()->with('dishes')->get();

        return response()->json([
            'restaurant' => $restaurant,
            'categories' => $categories,
        ]);
    }
}
