<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\AuthException;
use App\Helpers\JsonResponseBuilder;
use App\Helpers\JwtHelpers;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use App\Traits\ApiResponseHelper;
use Illuminate\Http\Request;

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

        $response = JsonResponseBuilder::jsonResponseSingleSuccess(
            data: new UserResource($user),
            kind: 'register',
        );

        return $this->successResponse($response);
    }

    public function login(UserLoginRequest $request)
    {
        $data = $request->validated();
        $tokens = $this->authService->loginUser($data);

        $accessTokenCookie = cookie(
            name: config('cookies.COOKIE_NAME_ACCESS_TOKEN'),
            value: $tokens['access_token'],
            secure: env('APP_ENV') != 'local',
            httpOnly: false
        );
        $refreshTokenCookie = cookie(
            name: config('cookies.COOKIE_NAME_REFRESH_TOKEN'),
            value: $tokens['refresh_token'],
            secure: env('APP_ENV') != 'local',
            httpOnly: true
        );

        $response = JsonResponseBuilder::jsonResponseSingleSuccess(
            data: [
                'access_token' => $tokens['access_token'],
                'refresh_token' => $tokens['refresh_token'],
            ],
            kind: 'login',
        );

        return $this->successResponse($response)->withCookie($accessTokenCookie)->withCookie($refreshTokenCookie);
    }

    public function refresh(Request $request)
    {
        // Get refresh token from cookie, bearer token, or query string
        $refreshToken = $request->cookie(config('cookies.COOKIE_NAME_REFRESH_TOKEN')) ?? $request->bearerToken() ?? $request->query('refresh_token');

        if (!$refreshToken) {
            throw new AuthException('The refresh token is required');
        }

        $data = $this->authService->refreshAccessToken($refreshToken);
        $newAccessTokenCookie = cookie(
            name: config('cookies.COOKIE_NAME_ACCESS_TOKEN'),
            value: $data['access_token'],
            secure: env('APP_ENV') != 'local',
            minutes: config('jwt.COOKIE_EXPIRE_ACCESS_TOKEN'),
            httpOnly: false
        );

        $response = JsonResponseBuilder::jsonResponseSingleSuccess(
            data: $data,
            kind: 'refresh',
        );

        return $this->successResponse($response)->withCookie($newAccessTokenCookie);
    }

    public function logout(Request $request)
    {
        $refreshToken = $request->cookie(config('cookies.COOKIE_NAME_REFRESH_TOKEN')) ?? $request->bearerToken() ?? $request->query('refresh_token');
        $accessToken = $request->bearerToken() ?? $request->query('access_token') ?? $request->cookie(config('cookies.COOKIE_NAME_ACCESS_TOKEN'));

        if (!$refreshToken) {
            throw new AuthException('The refresh token is required');
        }

        try {
            $this->jwtHelpers->validateToken($refreshToken);
            $this->jwtHelpers->validateToken($accessToken);
        } catch (\Exception $e) {
            throw new AuthException($e->getMessage());
        }

        $this->authService->handleLogout($accessToken, $refreshToken);

        $response = JsonResponseBuilder::jsonResponseMessageOnly(
            message: 'Successfully logged out',
            kind: 'logout',
        );

        return $this->successResponse($response)->withoutCookie(config('cookies.COOKIE_NAME_REFRESH_TOKEN'))->withoutCookie(config('cookies.COOKIE_NAME_ACCESS_TOKEN'));
    }
}
