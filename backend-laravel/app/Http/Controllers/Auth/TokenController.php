<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\AuthException;
use App\Helpers\JwtHelpers;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Traits\ApiResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\UserResource;
use Exception;

class TokenController extends Controller
{
    use ApiResponseHelper;

    public function __construct(
        protected readonly AuthService $authService,
        protected readonly JwtHelpers $jwtHelpers
    ) {}

    public function register(UserRegisterRequest $request)
    {
        $data = $request->validated();
        $user = $this->authService->registerUser($data);
        $user->password = bcrypt($data['password']);
        $user->save();
        return $this->successResponse(new UserResource($user));
    }

    public function login(UserLoginRequest $request)
    {
        $data = $request->validated();
        $tokens = $this->authService->loginUser($data);

        $accessTokenCookie = cookie(
            name: config('cookies.COOKIE_NAME_ACCESS_TOKEN'),
            value: $tokens['access_token'],
            secure: env("APP_ENV") != "local",
            httpOnly: false
        );
        $refreshTokenCookie = cookie(
            name: config('cookies.COOKIE_NAME_REFRESH_TOKEN'),
            value: $tokens['refresh_token'],
            secure: env("APP_ENV") != "local",
            httpOnly: true
        );

        return $this->successResponse([
            'access_token' => $tokens['access_token'],
            'refresh_token' => $tokens['refresh_token'],
        ])->withCookie($accessTokenCookie)->withCookie($refreshTokenCookie);
    }

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
            throw new AuthException("Token is not provided", 401);
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
