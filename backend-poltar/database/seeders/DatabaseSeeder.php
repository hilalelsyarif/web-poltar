<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Akun Admin Utama (Bersih tanpa dummy structures)
        User::firstOrCreate(
            ['email' => 'admin@poltar.com'],
            [
                'name'     => 'Admin Utama Poltar',
                'password' => Hash::make('admin123'),
                'role'     => 'admin'
            ]
        );
    }
}
