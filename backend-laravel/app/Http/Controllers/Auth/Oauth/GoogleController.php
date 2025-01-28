<?php

namespace App\Http\Controllers\Auth\Oauth;

use App\Services\AuthService;
use App\Traits\ApiResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\GoogleCallbackRequest;

class GoogleController extends Controller
{
    use ApiResponseHelper;


    public function __construct(protected readonly AuthService $authService) {}

    public function callback(GoogleCallbackRequest $request)
    {
        $code = $request->validated()['code'];
        $userAgent = $request->userAgent();

        $credentials = $this->authService->handleGoogleLogin($code, $userAgent);
        $accessToken = $credentials['access_token'];
        $refreshToken = $credentials['refresh_token'];

        $accessTokenCookie = cookie(
            name: config('cookies.COOKIE_NAME_ACCESS_TOKEN'),
            value: $accessToken,
            secure: env("APP_ENV") != "local",
            httpOnly: false
        );
        $cookieRefreshToken = cookie(
            name: config('cookies.COOKIE_NAME_REFRESH_TOKEN'),
            value: $refreshToken,
            secure: env("APP_ENV") != "local",
            httpOnly: true
        );

        return $this->successResponse([
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
        ])->withCookie($cookieRefreshToken)->withCookie($accessTokenCookie);
    }
}
