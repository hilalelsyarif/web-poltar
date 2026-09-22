<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // SQLite tidak support ALTER COLUMN, jadi kita buat tabel baru
        if (DB::getDriverName() === 'sqlite') {
            // Buat tabel sementara dengan schema baru
            Schema::create('structures_new', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('position');
                $table->integer('generation');
                $table->longText('image_path')->nullable()->default('');
                $table->timestamps();
            });

            // Salin data dari tabel lama
            DB::statement('INSERT INTO structures_new SELECT * FROM structures');

            // Hapus tabel lama dan rename
            Schema::drop('structures');
            Schema::rename('structures_new', 'structures');
        } else {
            Schema::table('structures', function (Blueprint $table) {
                $table->longText('image_path')->nullable()->default('')->change();
            });
        }
    }

    public function down(): void
    {
        // Revert tidak perlu - data base64 akan dipotong jika di-revert
    }
};
