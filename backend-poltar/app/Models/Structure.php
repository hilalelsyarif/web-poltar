<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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
        if ($this->image_path) {
            return asset('storage/' . $this->image_path);
        }
        return null;
    }
}