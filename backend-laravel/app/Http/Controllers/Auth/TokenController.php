<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\AuthException;
use App\Helpers\JwtHelpers;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Traits\ApiResponseHelper;
use App\Http\Controllers\Controller;
use Exception;

class TokenController extends Controller
{
    use ApiResponseHelper;

    public function __construct(
        protected readonly AuthService $authService,
        protected readonly JwtHelpers $jwtHelpers
    ) {}

    public function refresh(Request $request)
    {
        // Get refresh token from cookie, bearer token, or query string
        $refreshToken = $request->cookie(config('cookies.COOKIE_NAME_REFRESH_TOKEN')) ?? $request->bearerToken() ?? $request->query('refresh_token');

        if (!$refreshToken) {
            throw new AuthException("Token is not given", 401);
        }

        $data = $this->authService->refreshAccessToken($refreshToken);
        $newAccessTokenCookie = cookie(
            name: config('cookies.COOKIE_NAME_ACCESS_TOKEN'),
            value: $data['access_token'],
            secure: env("APP_ENV") != "local",
            httpOnly: false
        );
        return $this->successResponse($data)->withCookie($newAccessTokenCookie);
    }

    public function logout(Request $request)
    {
        $refreshToken = $request->cookie(config('cookies.COOKIE_NAME_REFRESH_TOKEN')) ?? $request->bearerToken() ?? $request->query('refresh_token');
        $accessToken = $request->bearerToken() ?? $request->query('access_token') ?? $request->cookie(config('cookies.COOKIE_NAME_ACCESS_TOKEN'));

        if (!$refreshToken || !$accessToken) {
            throw new Exception("Token is not provided", 401);
        }

        try {
            $this->jwtHelpers->validateToken($refreshToken);
            $this->jwtHelpers->validateToken($accessToken);
        } catch (\Exception $e) {
            throw new AuthException($e->getMessage());
        }

        $this->authService->handleLogout($accessToken, $refreshToken);
        return $this->successResponse("OK")->withoutCookie(config('cookies.COOKIE_NAME_REFRESH_TOKEN'))->withoutCookie(config('cookies.COOKIE_NAME_ACCESS_TOKEN'));
    }
}
