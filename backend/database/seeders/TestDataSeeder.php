<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Restaurant;
use App\Models\Category;
use App\Models\Dish;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TestDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create a few Restaurants
        $restaurantsData = [
            [
                'name' => 'L\'Osteria Roma',
                'email' => 'contact@osteria.com',
                'phone' => '+33 1 23 45 67 89',
                'address' => '15 Rue de Rome',
                'city' => 'Paris',
                'postal_code' => '75008',
                'website' => 'www.osteria-roma.fr',
                'is_active' => true,
            ],
            [
                'name' => 'Le Petit Bistrot',
                'email' => 'hello@petitbistrot.com',
                'phone' => '+33 4 56 78 90 12',
                'address' => '22 Avenue Jean Médecin',
                'city' => 'Nice',
                'postal_code' => '06000',
                'website' => 'www.petitbistrot.fr',
                'is_active' => true,
            ],
            [
                'name' => 'Sushi Master',
                'email' => 'info@sushimaster.com',
                'phone' => '+33 5 56 12 34 56',
                'address' => '5 Place de la Bourse',
                'city' => 'Bordeaux',
                'postal_code' => '33000',
                'website' => 'www.sushimaster.fr',
                'is_active' => true,
            ]
        ];

        $restaurants = [];
        foreach ($restaurantsData as $data) {
            $restaurants[] = Restaurant::create($data);
        }

        // 2. Create Restaurant Admins for each
        foreach ($restaurants as $index => $restaurant) {
            User::create([
                'name' => 'Admin ' . $restaurant->name,
                'email' => 'admin' . ($index + 1) . '@example.com',
                'password' => Hash::make('password123'),
                'role' => User::ROLE_RESTAURANT_ADMIN,
                'restaurant_id' => $restaurant->id,
                'is_active' => true,
            ]);
        }

        // 3. Categories and Dishes for L'Osteria Roma
        $osteria = $restaurants[0];
        
        $catStarters = Category::create([
            'restaurant_id' => $osteria->id,
            'name' => 'Entrées',
            'icon' => '🥗',
            'sort_order' => 1
        ]);
        
        $catMains = Category::create([
            'restaurant_id' => $osteria->id,
            'name' => 'Plats Principaux',
            'icon' => '🍝',
            'sort_order' => 2
        ]);
        
        $catDesserts = Category::create([
            'restaurant_id' => $osteria->id,
            'name' => 'Desserts',
            'icon' => '🍰',
            'sort_order' => 3
        ]);

        // Osteria Dishes
        Dish::create([
            'restaurant_id' => $osteria->id,
            'category_id' => $catStarters->id,
            'name' => 'Bruschetta al Pomodoro',
            'description' => 'Pain grillé, tomates fraîches, basilic et huile d\'olive.',
            'price' => 8.50,
            'is_active' => true,
            'allergens' => ['Gluten'],
        ]);
        
        Dish::create([
            'restaurant_id' => $osteria->id,
            'category_id' => $catStarters->id,
            'name' => 'Carpaccio de Boeuf',
            'description' => 'Fines tranches de boeuf, parmesan, roquette et huile de truffe.',
            'price' => 14.00,
            'is_active' => true,
            'allergens' => ['Lait'],
        ]);

        Dish::create([
            'restaurant_id' => $osteria->id,
            'category_id' => $catMains->id,
            'name' => 'Spaghetti Carbonara',
            'description' => 'Spaghetti, guanciale, pecorino romano, oeuf et poivre noir.',
            'price' => 16.50,
            'is_active' => true,
            'allergens' => ['Gluten', 'Oeufs', 'Lait'],
        ]);

        Dish::create([
            'restaurant_id' => $osteria->id,
            'category_id' => $catMains->id,
            'name' => 'Lasagne al Forno',
            'description' => 'Pâtes fraîches, sauce bolognaise, béchamel et parmesan.',
            'price' => 18.00,
            'is_active' => true,
            'allergens' => ['Gluten', 'Lait', 'Céleri'],
        ]);

        Dish::create([
            'restaurant_id' => $osteria->id,
            'category_id' => $catDesserts->id,
            'name' => 'Tiramisu Classique',
            'description' => 'Mascarpone, café, boudoirs et cacao.',
            'price' => 7.50,
            'is_active' => true,
            'allergens' => ['Gluten', 'Oeufs', 'Lait'],
        ]);

        // 4. Categories and Dishes for Le Petit Bistrot
        $bistrot = $restaurants[1];
        
        $catBistrotMains = Category::create([
            'restaurant_id' => $bistrot->id,
            'name' => 'Les Classiques',
            'icon' => '🥩',
            'sort_order' => 1
        ]);

        Dish::create([
            'restaurant_id' => $bistrot->id,
            'category_id' => $catBistrotMains->id,
            'name' => 'Steak Frites',
            'description' => 'Entrecôte grillée avec frites maison et sauce béarnaise.',
            'price' => 22.00,
            'is_active' => true,
            'allergens' => ['Lait', 'Oeufs'],
        ]);

        Dish::create([
            'restaurant_id' => $bistrot->id,
            'category_id' => $catBistrotMains->id,
            'name' => 'Confit de Canard',
            'description' => 'Cuisse de canard confite, pommes sarladaises.',
            'price' => 19.50,
            'is_active' => true,
            'allergens' => [],
        ]);

        // 5. Sushi Master
        $sushi = $restaurants[2];
        
        $catSushi = Category::create([
            'restaurant_id' => $sushi->id,
            'name' => 'Makis & Rolls',
            'icon' => '🍣',
            'sort_order' => 1
        ]);

        Dish::create([
            'restaurant_id' => $sushi->id,
            'category_id' => $catSushi->id,
            'name' => 'California Roll',
            'description' => 'Surimi, avocat, concombre, sésame.',
            'price' => 6.50,
            'is_active' => true,
            'allergens' => ['Poisson', 'Sésame', 'Soja'],
        ]);
        
        Dish::create([
            'restaurant_id' => $sushi->id,
            'category_id' => $catSushi->id,
            'name' => 'Spicy Tuna',
            'description' => 'Thon rouge, mayonnaise épicée, oignons frits.',
            'price' => 8.00,
            'is_active' => true,
            'allergens' => ['Poisson', 'Oeufs', 'Gluten', 'Soja'],
        ]);
        
        echo "Test data generated successfully!\n";
    }
}
