<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Artisan;
use Throwable;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // 1. Ensure active database connection works; fallback to SQLite if connection fails
        try {
            DB::connection()->getPdo();
        } catch (Throwable $e) {
            Config::set('database.default', 'sqlite');
            $sqlitePath = database_path('database.sqlite');
            if (!file_exists($sqlitePath)) {
                @touch($sqlitePath);
            }
            Config::set('database.connections.sqlite.database', $sqlitePath);
            DB::purge();
        }

        // 2. Ensure SQLite database file exists if sqlite is used
        if (Config::get('database.default') === 'sqlite') {
            $sqlitePath = Config::get('database.connections.sqlite.database', database_path('database.sqlite'));
            if (!file_exists($sqlitePath)) {
                @touch($sqlitePath);
            }
        }

        // 3. Auto-migrate tables if missing, and cleanup old AI dummy data
        try {
            if (!Schema::hasTable('structures')) {
                Artisan::call('migrate', ['--force' => true]);
                Artisan::call('db:seed', ['--force' => true]);
            } else {
                // Hapus data dummy lama buatan AI
                \App\Models\Structure::whereIn('name', [
                    'Muhammad Rifqi',
                    'Fathur Rahman',
                    'Aditya Pratama',
                    'Bagas Maulana',
                    'Dwi Cahyo',
                    'Reza Pahlevi'
                ])->delete();
            }
        } catch (Throwable $e) {
            // Prevent crashing if migrations cannot run in this lifecycle
        }
    }
}

