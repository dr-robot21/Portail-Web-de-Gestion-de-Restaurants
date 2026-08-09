<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $appends = ['logo_url'];

    protected $fillable = [
        'name',
        'cuisine_type',
        'logo',
        'email',
        'phone',
        'website',
        'address',
        'city',
        'postal_code',
        'country',
        'is_active',
        'opening_date',
        'description',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'opening_date' => 'date',
    ];

    // Relations
    public function admin()
    {
        return $this->hasOne(User::class)->where('role', User::ROLE_RESTAURANT_ADMIN);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function openingHours()
    {
        return $this->hasMany(OpeningHour::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class)->orderBy('sort_order');
    }

    public function dishes()
    {
        return $this->hasMany(Dish::class);
    }

    // Accessors
    public function getLogoUrlAttribute(): ?string
    {
        if (!$this->logo) return null;
        if (str_starts_with($this->logo, 'http')) return $this->logo;
        return asset('storage/' . $this->logo);
    }
}
