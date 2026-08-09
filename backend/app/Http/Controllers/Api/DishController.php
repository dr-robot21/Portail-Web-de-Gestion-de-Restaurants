<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dish;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DishController extends Controller
{
    /**
     * GET /api/dishes
     */
    public function index(Request $request)
    {
        $user = auth('api')->user();

        $restaurantId = $user->isSuperAdmin()
            ? $request->get('restaurant_id')
            : $user->restaurant_id;

        // Super admin may perform a global dish search without restaurant_id
        $isGlobalSearch = $user->isSuperAdmin() && !$restaurantId && $request->has('search') && $request->search;

        if (!$restaurantId && !$isGlobalSearch) {
            return response()->json(['message' => 'Restaurant ID is required.'], 400);
        }

        $query = Dish::with('category');

        if (!$isGlobalSearch) {
            $query->where('restaurant_id', $restaurantId);
        }

        if ($request->has('category_id') && $request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $perPage = $request->get('per_page', 12);
        $dishes = $query->latest()->paginate($perPage);

        return response()->json($dishes);
    }

    /**
     * POST /api/dishes
     */
    public function store(Request $request)
    {
        $user = auth('api')->user();

        $validator = Validator::make($request->all(), [
            'name'          => 'required|string|max:255',
            'description'   => 'nullable|string',
            'price'         => 'required|numeric|min:0',
            'category_id'   => 'nullable|exists:categories,id',
            'is_active'     => 'nullable|boolean',
            'allergens'     => 'nullable|array',
            'image'         => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'restaurant_id' => 'nullable|exists:restaurants,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $restaurantId = $user->isSuperAdmin()
            ? ($request->restaurant_id ?? null)
            : $user->restaurant_id;

        if (!$restaurantId) {
            return response()->json(['message' => 'Restaurant not assigned.'], 400);
        }

        $data = [
            'restaurant_id' => $restaurantId,
            'category_id'   => $request->category_id,
            'name'          => $request->name,
            'description'   => $request->description,
            'price'         => $request->price,
            'is_active'     => $request->get('is_active', true),
            'allergens'     => $request->allergens ?? [],
        ];

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('dishes', 'public');
        }

        $dish = Dish::create($data);

        NotificationService::notifyRestaurantAndAdmins(
            $restaurantId,
            'Nouveau plat',
            "Le plat « {$dish->name} » a été ajouté au menu.",
            'success'
        );

        return response()->json($dish->load('category'), 201);
    }

    /**
     * GET /api/dishes/{id}
     */
    public function show(int $id)
    {
        $user = auth('api')->user();
        $dish = Dish::with('category')->findOrFail($id);

        if ($user->isRestaurantAdmin() && $user->restaurant_id !== $dish->restaurant_id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        return response()->json($dish);
    }

    /**
     * PUT /api/dishes/{id}
     */
    public function update(Request $request, int $id)
    {
        $user = auth('api')->user();
        $dish = Dish::findOrFail($id);

        if ($user->isRestaurantAdmin() && $user->restaurant_id !== $dish->restaurant_id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name'        => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'sometimes|required|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'is_active'   => 'nullable|boolean',
            'allergens'   => 'nullable|array',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'remove_image' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->except(['image']);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($dish->image && !str_starts_with($dish->image, 'http')) {
                Storage::disk('public')->delete($dish->image);
            }
            $data['image'] = $request->file('image')->store('dishes', 'public');
        } elseif ($request->boolean('remove_image') && $dish->image) {
            if (!str_starts_with($dish->image, 'http')) {
                Storage::disk('public')->delete($dish->image);
            }
            $data['image'] = null;
        }

        $dish->update($data);

        NotificationService::notifyRestaurantAndAdmins(
            $dish->restaurant_id,
            'Plat modifié',
            "Le plat « {$dish->name} » a été mis à jour.",
            'info'
        );

        return response()->json($dish->fresh('category'));
    }

    /**
     * DELETE /api/dishes/{id}
     */
    public function destroy(int $id)
    {
        $user = auth('api')->user();
        $dish = Dish::findOrFail($id);

        if ($user->isRestaurantAdmin() && $user->restaurant_id !== $dish->restaurant_id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $name = $dish->name;
        $restaurantId = $dish->restaurant_id;

        if ($dish->image && !str_starts_with($dish->image, 'http')) {
            Storage::disk('public')->delete($dish->image);
        }

        $dish->delete();

        NotificationService::notifyRestaurantAndAdmins(
            $restaurantId,
            'Plat supprimé',
            "Le plat « {$name} » a été retiré du menu.",
            'warning'
        );

        return response()->json(['message' => 'Dish deleted successfully.']);
    }
}
