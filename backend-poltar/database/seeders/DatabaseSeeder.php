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
                'password' => Hash::make('adminlalih'),
                'role'     => 'admin'
            ]
        );

        // 2. Data Struktur Organisasi Akt 22 (Permanen)
        $akt22Items = [
            ['name' => 'Rasya Walisyani', 'position' => 'Wadanki 1'],
            ['name' => 'M. Bagas Alghifari', 'position' => 'Danki'],
            ['name' => 'Nurul Hafidz', 'position' => 'Wadanki 2'],
            ['name' => 'Arifianto Ilham', 'position' => 'Ketua PKT'],
            ['name' => 'Hilal El Syarif', 'position' => 'PKT'],
            ['name' => 'Ramadhan Jothi', 'position' => 'PKT'],
            ['name' => 'Keysha Adinda N', 'position' => 'Sekretaris'],
            ['name' => 'Masayu Queensha', 'position' => 'Sekretaris'],
            ['name' => 'Aryabima Suyatna', 'position' => 'Bendahara'],
            ['name' => 'Djessica Putri', 'position' => 'Bendahara'],
            ['name' => 'Rendy Arifianto', 'position' => 'TIK'],
            ['name' => 'Jasmine Malika', 'position' => 'TIK'],
            ['name' => 'Syafa Annafi', 'position' => 'TIK'],
            ['name' => 'Abqary Muhammad', 'position' => 'Jasmani'],
            ['name' => 'Jonathyan Febrian', 'position' => 'Jasmani'],
            ['name' => 'Dimas Akbar', 'position' => 'Jasmani'],
            ['name' => 'Babyna Syasyabila', 'position' => 'Humas'],
            ['name' => 'Kayla Satira', 'position' => 'Humas'],
        ];

        foreach ($akt22Items as $item) {
            \App\Models\Structure::firstOrCreate(
                ['name' => $item['name'], 'generation' => '22'],
                ['position' => $item['position'], 'image_path' => '']
            );
        }
    }
}
