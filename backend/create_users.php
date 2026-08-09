<?php
use App\Models\User;
use App\Models\Restaurant;
use Illuminate\Support\Facades\Hash;

// Create or update Super Admin
$superAdmin = User::updateOrCreate(
    ['email' => 'superadmin@example.com'],
    [
        'name' => 'Super Admin',
        'password' => Hash::make('password123'),
        'role' => User::ROLE_SUPER_ADMIN,
        'is_active' => true,
    ]
);
echo "Super Admin Created: " . $superAdmin->email . "\n";

// Create a test restaurant
$restaurant = Restaurant::firstOrCreate(
    ['email' => 'contact@testresto.com'],
    [
        'name' => 'Le Test Resto',
        'address' => '123 Test Street',
        'city' => 'Paris',
        'postal_code' => '75001',
        'is_active' => true,
    ]
);

// Create or update Restaurant Admin
$restoAdmin = User::updateOrCreate(
    ['email' => 'restoadmin@example.com'],
    [
        'name' => 'Resto Admin',
        'password' => Hash::make('password123'),
        'role' => User::ROLE_RESTAURANT_ADMIN,
        'is_active' => true,
        'restaurant_id' => $restaurant->id,
    ]
);
echo "Restaurant Admin Created: " . $restoAdmin->email . "\n";
