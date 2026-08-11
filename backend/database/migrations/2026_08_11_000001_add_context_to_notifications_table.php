<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->foreignId('restaurant_id')->nullable()->after('user_id')
                ->constrained('restaurants')->nullOnDelete();
            $table->string('entity_type')->nullable()->after('restaurant_id');
            $table->unsignedBigInteger('entity_id')->nullable()->after('entity_type');
            $table->string('entity_action')->nullable()->after('entity_id');
        });
    }

    public function down(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->dropForeign(['restaurant_id']);
            $table->dropColumn(['restaurant_id', 'entity_type', 'entity_id', 'entity_action']);
        });
    }
};
