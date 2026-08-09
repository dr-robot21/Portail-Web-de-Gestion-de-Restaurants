<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RestaurantController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DishController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// ── Public Auth Routes ─────────────────────────────────────────────────
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
});

// ── Protected Routes (JWT required) ───────────────────────────────────
Route::middleware('auth:api')->group(function () {

    // Auth
    Route::prefix('auth')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::get('me', [AuthController::class, 'me']);
    });

    // Profile (all authenticated users)
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'show']);
        Route::put('/', [ProfileController::class, 'update']);
        Route::post('/', [ProfileController::class, 'update']); // supports _method=PUT from FormData
        Route::put('password', [ProfileController::class, 'updatePassword']);
    });

    // Dashboard
    Route::prefix('dashboard')->group(function () {
        Route::get('super', [DashboardController::class, 'superAdmin'])
            ->middleware('role:super_admin');
        Route::get('restaurant', [DashboardController::class, 'restaurantAdmin'])
            ->middleware('role:super_admin,restaurant_admin');
    });

    // Restaurants
    Route::prefix('restaurants')->group(function () {
        Route::get('/', [RestaurantController::class, 'index'])
            ->middleware('role:super_admin,restaurant_admin');
        Route::post('/', [RestaurantController::class, 'store'])
            ->middleware('role:super_admin');
        Route::get('/{id}', [RestaurantController::class, 'show'])
            ->middleware('role:super_admin,restaurant_admin');
        Route::put('/{id}', [RestaurantController::class, 'update'])
            ->middleware('role:super_admin,restaurant_admin');
        Route::delete('/{id}', [RestaurantController::class, 'destroy'])
            ->middleware('role:super_admin');
        Route::get('/{id}/menu', [RestaurantController::class, 'menu'])
            ->middleware('role:super_admin,restaurant_admin');
    });

    // Users (Super Admin only)
    Route::middleware('role:super_admin')->prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        Route::get('/{id}', [UserController::class, 'show']);
        Route::put('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
    });

    // Categories (Restaurant Admin + Super Admin)
    Route::middleware('role:super_admin,restaurant_admin')->prefix('categories')->group(function () {
        Route::get('/', [CategoryController::class, 'index']);
        Route::post('/', [CategoryController::class, 'store']);
        Route::get('/{id}', [CategoryController::class, 'show']);
        Route::put('/{id}', [CategoryController::class, 'update']);
        Route::delete('/{id}', [CategoryController::class, 'destroy']);
    });

    // Dishes (Restaurant Admin + Super Admin)
    Route::middleware('role:super_admin,restaurant_admin')->prefix('dishes')->group(function () {
        Route::get('/', [DishController::class, 'index']);
        Route::post('/', [DishController::class, 'store']);
        Route::get('/{id}', [DishController::class, 'show']);
        Route::put('/{id}', [DishController::class, 'update']);
        Route::delete('/{id}', [DishController::class, 'destroy']);
    });

    // Notifications (all authenticated users)
    Route::prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class, 'index']);
        Route::put('/mark-all-read', [NotificationController::class, 'markAllRead']);
        Route::put('/{id}/read', [NotificationController::class, 'markRead']);
        Route::delete('/{id}', [NotificationController::class, 'destroy']);
    });
});
