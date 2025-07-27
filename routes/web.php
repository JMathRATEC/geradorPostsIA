<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::get('create-post', function () {
        return Inertia::render('create-post');
    })->name('create-post');
    
    Route::get('posts', function () {
        return Inertia::render('posts');
    })->name('posts');
});

Route::middleware('guest')->group(function () {
    Route::get('forgot-password', [ForgotPasswordController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [ForgotPasswordController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [ResetPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [ResetPasswordController::class, 'store'])
        ->name('password.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
