<?php

use App\Helpers\AuthContext;

if (!function_exists('authContext')) {
    /**
     * Helper function to access the AuthContext instance
     * 
     * @return \App\Helpers\AuthContext
     */
    function authContext(): AuthContext
    {
        return app('auth.context');
    }
}
