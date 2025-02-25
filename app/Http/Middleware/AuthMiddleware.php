<?php

namespace App\Http\Middleware;

use App\Exceptions\AuthException;
use App\Helpers\JwtHelpers;
use App\Repositories\TokenRepository;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthMiddleware
{
    public function __construct(
        protected readonly JwtHelpers $jwtHelpers,
        protected readonly TokenRepository $tokenRepository
    ) {}

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        // Get refresh token from cookie, bearer token, or query string
        $token = $request->cookie(config('cookies.COOKIE_NAME_ACCESS_TOKEN')) ?? $request->bearerToken() ?? $request->query('access_token');

        if (! $token) {
            throw new AuthException;
        }

        try {
            $validatedToken = $this->jwtHelpers->validateToken($token);
        } catch (\Exception $e) {
            throw new AuthException($e->getMessage());
        }

        // Check if token is blacklisted
        if ($this->tokenRepository->isTokenBlacklisted($token)) {
            throw new AuthException;
        }

        authContext()->setUser($validatedToken['decoded']);

        return $next($request);
    }
}
