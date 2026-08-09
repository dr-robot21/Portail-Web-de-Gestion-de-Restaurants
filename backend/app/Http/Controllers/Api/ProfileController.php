<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    /**
     * GET /api/profile
     */
    public function show()
    {
        $user = auth('api')->user()->load('restaurant');
        return response()->json($user);
    }

    /**
     * PUT /api/profile
     */
    public function update(Request $request)
    {
        $user = auth('api')->user();

        $validator = Validator::make($request->all(), [
            'name'   => 'sometimes|required|string|max:255',
            'email'  => 'sometimes|required|email|unique:users,email,' . $user->id,
            'phone'  => 'nullable|string|max:20',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'remove_avatar' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except(['avatar']);

        if ($request->hasFile('avatar')) {
            // Delete old avatar
            if ($user->avatar && !str_starts_with($user->avatar, 'http')) {
                Storage::disk('public')->delete($user->avatar);
            }
            $data['avatar'] = $request->file('avatar')->store('avatars', 'public');
        } elseif ($request->boolean('remove_avatar') && $user->avatar) {
            if (!str_starts_with($user->avatar, 'http')) {
                Storage::disk('public')->delete($user->avatar);
            }
            $data['avatar'] = null;
        }

        $user->update($data);

        NotificationService::create(
            $user->id,
            'Profil mis à jour',
            'Vos informations de profil ont été mises à jour.',
            'info'
        );

        return response()->json($user->fresh('restaurant'));
    }

    /**
     * PUT /api/profile/password
     */
    public function updatePassword(Request $request)
    {
        $user = auth('api')->user();

        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'password'         => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['errors' => ['current_password' => ['Current password is incorrect.']]], 422);
        }

        $user->update(['password' => Hash::make($request->password)]);

        NotificationService::create(
            $user->id,
            'Mot de passe modifié',
            'Votre mot de passe a été modifié avec succès.',
            'success'
        );

        return response()->json(['message' => 'Password updated successfully.']);
    }
}
