<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Models\User;
use App\Models\Dish;
use App\Models\Category;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * GET /api/dashboard/super — Super Admin stats
     */
    public function superAdmin()
    {
        $totalRestaurants = Restaurant::count();
        $activeRestaurants = Restaurant::where('is_active', true)->count();
        $newRestaurantsThisMonth = Restaurant::where('created_at', '>=', now()->startOfMonth())->count();
        $totalUsers = User::count();
        $activeUsers = User::where('is_active', true)->count();
        $restaurantAdmins = User::where('role', User::ROLE_RESTAURANT_ADMIN)->count();
        $totalDishes = Dish::count();
        $activeDishes = Dish::where('is_active', true)->count();

        $recentRestaurants = Restaurant::with('admin')
            ->withCount('dishes')
            ->latest()
            ->take(5)
            ->get();

        $recentUsers = User::with('restaurant')
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'stats' => [
                'total_restaurants' => $totalRestaurants,
                'active_restaurants' => $activeRestaurants,
                'new_restaurants_this_month' => $newRestaurantsThisMonth,
                'total_users' => $totalUsers,
                'active_users' => $activeUsers,
                'restaurant_admins' => $restaurantAdmins,
                'total_dishes' => $totalDishes,
                'active_dishes' => $activeDishes,
            ],
            'recent_restaurants' => $recentRestaurants,
            'recent_users' => $recentUsers,
        ]);
    }

    /**
     * GET /api/dashboard/restaurant — Restaurant Admin stats
     */
    public function restaurantAdmin()
    {
        $user = auth('api')->user();
        $restaurant = Restaurant::with(['openingHours', 'categories'])->find($user->restaurant_id);

        if (!$restaurant) {
            return response()->json(['message' => 'No restaurant assigned.'], 404);
        }

        $totalDishes = Dish::where('restaurant_id', $restaurant->id)->count();
        $activeDishes = Dish::where('restaurant_id', $restaurant->id)->where('is_active', true)->count();
        $totalCategories = Category::where('restaurant_id', $restaurant->id)->count();

        $topDishes = Dish::where('restaurant_id', $restaurant->id)
            ->where('is_active', true)
            ->with('category')
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'restaurant' => $restaurant,
            'stats' => [
                'total_dishes' => $totalDishes,
                'active_dishes' => $activeDishes,
                'inactive_dishes' => $totalDishes - $activeDishes,
                'total_categories' => $totalCategories,
            ],
            'top_dishes' => $topDishes,
        ]);
    }
}
