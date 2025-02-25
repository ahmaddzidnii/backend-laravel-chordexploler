<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Studio\SectionController;
use App\Http\Controllers\Studio\SongController;

use App\Http\Controllers\Auth\Oauth\GoogleController;
use App\Http\Controllers\Auth\TokenController;

use App\Http\Controllers\UserController;

use App\Http\Controllers\Core\GenreController;
use App\Http\Controllers\Core\KeyController;
use App\Http\Controllers\Core\RecommendationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::group(['middleware' => 'throttle:api'], function () {
    /*
    |--------------------------------------------------------------------------
    | Public Routes
    |--------------------------------------------------------------------------
    */
    Route::group([
        'prefix' => 'public',
        'as' => 'public.',
    ], function () {
        // Key options
        Route::get('/get-key-options', [KeyController::class, 'getOptions']);

        // Genre options
        Route::get('/get-genre-options', [GenreController::class, 'index']);

        // Recommendations
        Route::get('/recommendations', [RecommendationController::class, 'index']);
    });



    /*
    |--------------------------------------------------------------------------
    | Authentication Routes
    |--------------------------------------------------------------------------
    */
    Route::group([
        'prefix' => 'auth',
        'as' => 'auth.',
    ], function () {
        // OAuth Routes
        Route::group([
            'prefix' => 'oauth',
            'as' => 'oauth.',
        ], function () {
            Route::get('google/callback', [GoogleController::class, 'callback'])->name('google.callback');
            // Mudah menambahkan provider OAuth lain
        });

        // Credentials Login
        Route::post('register', [TokenController::class, 'register'])->name('register');
        Route::post('login', [TokenController::class, 'login'])->name('login');

        // Token Management
        Route::get('refresh', [TokenController::class, 'refresh'])->name('refresh');
        Route::get('logout', [TokenController::class, 'logout'])->name('logout');
    });

    /*
    |--------------------------------------------------------------------------
    | Protected Routes
    |--------------------------------------------------------------------------
    */
    Route::group([
        'middleware' => 'jwt.middleware',
    ], function () {
        // Users
        Route::group([
            'prefix' => 'users',
            'as' => 'users.',
        ], function () {
            Route::get('/', [UserController::class, 'users']);
        });

        // Studio Features
        Route::group(['prefix' => 'studio'], function () {
            // Songs
            Route::group(['prefix' => 'songs'], function () {
                Route::get('/', [SongController::class, 'index']);
                Route::get('/{id}', [SongController::class, 'show']);
                Route::post('/', [SongController::class, 'store']);
                Route::patch('/', [SongController::class, 'update']);
                Route::delete('/', [SongController::class, 'massDestroy']);
            });

            // Sections
            Route::group(['prefix' => 'sections'], function () {
                Route::get('/', [SectionController::class, 'index']);
                Route::get('/{id}', [SectionController::class, 'show']);
                Route::post('/', [SectionController::class, 'store']);
                Route::patch('/', [SectionController::class, 'update']);
                Route::delete('/', [SectionController::class, 'massDestroy']);
                Route::post('/reorder', [SectionController::class, 'reorder']);
            });
        });
    });
});
