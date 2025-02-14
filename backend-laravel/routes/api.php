<?php

use App\Http\Controllers\Auth\Oauth\GoogleController;
use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Common\UserController;
use App\Http\Controllers\Studio\KeyController;
use App\Http\Controllers\Studio\SectionController;
use App\Http\Controllers\Studio\SongController;
use App\Models\Genre;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;

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
        Route::get('/get-genre-options', function () {
            $genres = Genre::all();
            return response()->json([
                'code' => Response::HTTP_OK,
                'data' => $genres
            ]);
        });

        Route::get('/recommendations', [SongController::class, 'getRecommendationSongs']);

        // Categories
        Route::group([
            'prefix' => 'categories',
            'as' => 'categories.',
        ], function () {
            // Route::get('/', [CategoryController::class, 'index'])->name('index');
            // Route::get('/{category}', [CategoryController::class, 'show'])->name('show');
        });
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
            // Route::get('facebook/callback', [FacebookAuthController::class, 'callback'])->name('facebook.callback');
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
