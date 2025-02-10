<?php

use App\Helpers\AuthContext;

if (! function_exists('authContext')) {
    /**
     * Helper function to access the AuthContext instance
     */
    function authContext(): AuthContext
    {
        return app('auth.context');
    }
}
