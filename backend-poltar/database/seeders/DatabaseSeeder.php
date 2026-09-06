<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Structure;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Akun Admin Utama
        User::firstOrCreate(
            ['email' => 'admin@poltar.com'],
            [
                'name'     => 'Admin Utama Poltar',
                'password' => Hash::make('admin123'),
                'role'     => 'admin'
            ]
        );

        // 2. Data Pengurus & Personel Angkatan 18
        if (Structure::count() === 0) {
            $members = [
                ['name' => 'Muhammad Rifqi', 'position' => 'Komandan Batalyon', 'generation' => 18, 'image_path' => ''],
                ['name' => 'Fathur Rahman', 'position' => 'Wakil Komandan', 'generation' => 18, 'image_path' => ''],
                ['name' => 'Aditya Pratama', 'position' => 'Sekretaris Umum', 'generation' => 18, 'image_path' => ''],
                ['name' => 'Bagas Maulana', 'position' => 'Bendahara Umum', 'generation' => 18, 'image_path' => ''],
                ['name' => 'Dwi Cahyo', 'position' => 'Danton Provost', 'generation' => 18, 'image_path' => ''],
                ['name' => 'Reza Pahlevi', 'position' => 'Danton Patroli', 'generation' => 18, 'image_path' => ''],
            ];

            foreach ($members as $m) {
                Structure::create($m);
            }
        }
    }
}
