<?php

namespace App\Providers;

use App\Helpers\AuthContext;
use App\Services\AuthService;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Register AuthContext singleton
        $this->app->singleton('auth.context', function ($app) {
            return new AuthContext();
        });

        // Telescope
        if ($this->app->environment('local') && class_exists(\Laravel\Telescope\TelescopeServiceProvider::class)) {
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            $this->app->register(TelescopeServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Rate limit the number of requests to the API

        RateLimiter::for('api', function (Request $request) {
            return Limit::perSecond(5)->by($request->ip());
        });
    }
}
