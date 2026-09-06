<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (file_exists(public_path('index.html'))) {
        return response()->file(public_path('index.html'));
    }
    return view('welcome');
});

Route::get('/login.html', function () {
    return response()->file(public_path('login.html'));
});

Route::get('/admin.html', function () {
    return response()->file(public_path('admin.html'));
});
