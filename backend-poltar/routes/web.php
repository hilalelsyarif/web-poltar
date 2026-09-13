<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (file_exists(public_path('index.html'))) {
        return response()->file(public_path('index.html'));
    }
    return view('welcome');
});

Route::get('/login', function () {
    if (file_exists(public_path('login.html'))) {
        return response()->file(public_path('login.html'));
    }
    if (file_exists(public_path('login/index.html'))) {
        return response()->file(public_path('login/index.html'));
    }
    return abort(404);
});

Route::get('/login.html', function () {
    return response()->file(public_path('login.html'));
});

Route::get('/admin', function () {
    if (file_exists(public_path('admin.html'))) {
        return response()->file(public_path('admin.html'));
    }
    if (file_exists(public_path('admin/index.html'))) {
        return response()->file(public_path('admin/index.html'));
    }
    return abort(404);
});

Route::get('/admin.html', function () {
    return response()->file(public_path('admin.html'));
});
