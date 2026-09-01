<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name'     => 'Admin Utama Poltar',
            'email'    => 'admin@poltar.com',
            'password' => Hash::make('admin123'),
            'role'     => 'admin'
        ]);
    }
}