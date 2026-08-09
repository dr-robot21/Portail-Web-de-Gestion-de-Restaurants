<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * GET /api/categories
     */
    public function index(Request $request)
    {
        $user = auth('api')->user();

        $restaurantId = $user->isSuperAdmin()
            ? $request->get('restaurant_id')
            : $user->restaurant_id;

        if (!$restaurantId) {
            return response()->json(['message' => 'Restaurant ID is required.'], 400);
        }

        $categories = Category::where('restaurant_id', $restaurantId)
            ->withCount('dishes')
            ->orderBy('sort_order')
            ->get();

        return response()->json($categories);
    }

    /**
     * POST /api/categories
     */
    public function store(Request $request)
    {
        $user = auth('api')->user();

        $validator = Validator::make($request->all(), [
            'name'        => 'required|string|max:100',
            'icon'        => 'nullable|string|max:10',
            'sort_order'  => 'nullable|integer',
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

        $category = Category::create([
            'restaurant_id' => $restaurantId,
            'name'          => $request->name,
            'icon'          => $request->icon,
            'sort_order'    => $request->get('sort_order', 0),
        ]);

        NotificationService::notifyRestaurantAndAdmins(
            $restaurantId,
            'Nouvelle catégorie',
            "La catégorie « {$category->name} » a été ajoutée au menu.",
            'success'
        );

        return response()->json($category->loadCount('dishes'), 201);
    }

    /**
     * GET /api/categories/{id}
     */
    public function show(int $id)
    {
        $user = auth('api')->user();
        $category = Category::withCount('dishes')->findOrFail($id);

        if ($user->isRestaurantAdmin() && $user->restaurant_id !== $category->restaurant_id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        return response()->json($category);
    }

    /**
     * PUT /api/categories/{id}
     */
    public function update(Request $request, int $id)
    {
        $user = auth('api')->user();
        $category = Category::findOrFail($id);

        if ($user->isRestaurantAdmin() && $user->restaurant_id !== $category->restaurant_id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name'       => 'sometimes|required|string|max:100',
            'icon'       => 'nullable|string|max:10',
            'sort_order' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category->update($request->only(['name', 'icon', 'sort_order']));

        NotificationService::notifyRestaurantAndAdmins(
            $category->restaurant_id,
            'Catégorie modifiée',
            "La catégorie « {$category->name} » a été mise à jour.",
            'info'
        );

        return response()->json($category->loadCount('dishes'));
    }

    /**
     * DELETE /api/categories/{id}
     */
    public function destroy(int $id)
    {
        $user = auth('api')->user();
        $category = Category::findOrFail($id);

        if ($user->isRestaurantAdmin() && $user->restaurant_id !== $category->restaurant_id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $name = $category->name;
        $restaurantId = $category->restaurant_id;
        $category->delete();

        NotificationService::notifyRestaurantAndAdmins(
            $restaurantId,
            'Catégorie supprimée',
            "La catégorie « {$name} » a été supprimée du menu.",
            'warning'
        );

        return response()->json(['message' => 'Category deleted successfully.']);
    }
}
