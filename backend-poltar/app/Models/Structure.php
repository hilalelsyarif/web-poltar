<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Structure extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'generation',
        'image_path'
    ];

    // Otomatis bikin attribute 'image_url' pas di-json
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!empty($this->image_path)) {
            // Base64 data URL — langsung return
            if (str_starts_with($this->image_path, 'data:')) {
                return $this->image_path;
            }
            if (str_starts_with($this->image_path, 'http') || str_starts_with($this->image_path, '/images/')) {
                return $this->image_path;
            }
            return asset('storage/' . $this->image_path);
        }
        return '/images/placeholder.jpg';
    }
}