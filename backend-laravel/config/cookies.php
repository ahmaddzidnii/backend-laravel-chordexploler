<?php

return [
    'COOKIE_NAME_ACCESS_TOKEN' => env('APP_ENV') == "local" ? env('COOKIE_ACCESS_TOKEN_DEV', "access_token") : env('COOKIE_ACCESS_TOKEN_PROD', "access_token"),
    'COOKIE_NAME_REFRESH_TOKEN' =>  env('APP_ENV') == "local" ? env('COOKIE_REFRESH_TOKEN_DEV', "refresh_token") : env('COOKIE_REFRESH_TOKEN_PROD', "refresh_token")
];
