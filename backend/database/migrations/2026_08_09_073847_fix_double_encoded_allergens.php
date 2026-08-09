<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Fix allergens that were double-encoded by the seeder.
     *
     * The old seeder passed `json_encode([...])` into a column that already
     * casts to `array`, so values ended up stored like `"[\"Gluten\"]"`.
     * This normalizes every row so the JSON column contains a plain array.
     */
    public function up(): void
    {
        $rows = DB::table('dishes')->select('id', 'allergens')->get();

        foreach ($rows as $row) {
            $raw = $row->allergens;
            if ($raw === null || $raw === '') {
                continue;
            }

            // If it's still a JSON string wrapped in quotes, decode it once more.
            $decoded = json_decode($raw, true);
            if (is_string($decoded)) {
                $again = json_decode($decoded, true);
                if (is_array($again)) {
                    $decoded = $again;
                }
            }

            if (is_array($decoded)) {
                DB::table('dishes')->where('id', $row->id)->update([
                    'allergens' => json_encode($decoded),
                ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
