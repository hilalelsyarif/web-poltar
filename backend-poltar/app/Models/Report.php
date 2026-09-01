<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    // Tambahin 'user_id' biar bisa nampung relasi pemilik akun!
    protected $fillable = [
        'user_id',
        'ticket_code',
        'reporter_name',
        'class_name',
        'description',
        'evidence_img',
        'status',
    ];
}