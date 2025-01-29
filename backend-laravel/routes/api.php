<?php

use App\Http\Controllers\Auth\Oauth\GoogleController;
use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Common\UserController;
use App\Http\Controllers\Studio\SongController;
use App\Http\Controllers\Studio\KeyController;
use App\Models\Key;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

// Route::post('/upload', function (Request $request) {
//     $request->validate([
//         'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
//     ]);

//     // Dapatkan file dari request
//     $file = $request->file('file');

//     // Generate nama unik untuk file
//     $fileName = uniqid("chxp") . '.' . $file->getClientOriginalExtension();


//     // Unggah file ke S3
//     $path = Storage::disk('s3')->putFileAs('images', $file, $fileName, ['visibility' => 'public']);

//     if (!$path) {
//         return response()->json([
//             'error' => 'Failed to upload image.'
//         ], 500);
//     }

//     // Dapatkan URL file yang diunggah
//     $url = Storage::url($path);

//     return response()->json([
//         'success' => 'You have successfully upload image.',
//         'url' => $url
//     ]);
// });

// Route::get('/keys', function () {
//     // $song = Song::with('keys')->get();

//     $keys = Key::with('songs')->get();

//     return response()->json([
//         'data' => $keys
//     ]);
// });

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
        // Home/Landing Page Data
        // Route::get('home', [HomeController::class, 'index'])->name('home');

        // Product Catalog
        Route::group([
            'prefix' => 'products',
            'as' => 'products.'
        ], function () {
            // Route::get('/', [ProductController::class, 'index'])->name('index');
            // Route::get('/{product}', [ProductController::class, 'show'])->name('show');
            // Route::get('/featured', [ProductController::class, 'featured'])->name('featured');
            // Route::get('/categories/{category}', [ProductController::class, 'byCategory'])->name('by-category');
        });

        // Categories
        Route::group([
            'prefix' => 'categories',
            'as' => 'categories.'
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
            'as' => 'oauth.'
        ], function () {
            Route::get('google/callback', [GoogleController::class, 'callback'])->name('google.callback');
            // Mudah menambahkan provider OAuth lain
            // Route::get('facebook/callback', [FacebookAuthController::class, 'callback'])->name('facebook.callback');
        });

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
        'middleware' => 'jwt.middleware'
    ], function () {
        // Users
        Route::group([
            'prefix' => 'users',
            'as' => 'users.'
        ], function () {
            Route::get('/', [UserController::class, 'users']);
        });

        // Studio Features
        Route::group(['prefix' => 'studio', 'as' => 'studio.'], function () {
            // Songs
            Route::apiResource('/songs', SongController::class);

            // Keys
            Route::get('/keys', KeyController::class);
        });


        // Example Resource Routes Structure
        /*
        // Posts Routes
        Route::group([
            'prefix' => 'posts',
            'as' => 'posts.'
        ], function () {
            Route::apiResource('/', PostController::class);
            
            // Nested Resources
            Route::apiResource('comments', CommentController::class);
        });
        */
    });
});
