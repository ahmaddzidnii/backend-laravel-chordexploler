<?php

use App\Exceptions\AuthException;
use App\Traits\ApiResponseHelper;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->append([
            \App\Http\Middleware\SecureHeaders::class,
        ]);

        $middleware->alias([
            'jwt.middleware' => \App\Http\Middleware\AuthMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {

        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            if ($request->is('api/*')) {
                return (new class
                {
                    use ApiResponseHelper;
                })->errorResponse('Route not found.', Response::HTTP_NOT_FOUND);
            }
        });

        $exceptions->render(function (MethodNotAllowedHttpException $e, Request $request) {
            if ($request->is('api/*')) {
                return (new class
                {
                    use ApiResponseHelper;
                })->errorResponse('Method not allowed.', Response::HTTP_METHOD_NOT_ALLOWED);
            }
        });

        $exceptions->render(function (TooManyRequestsHttpException $e, Request $request) {
            if ($request->is('api/*')) {
                return (new class
                {
                    use ApiResponseHelper;
                })->errorResponse('Too many request, please slow down', Response::HTTP_TOO_MANY_REQUESTS);
            }
        });

        $exceptions->render(function (AuthException $e, Request $request) {
            if ($request->is('api/*')) {
                return (new class
                {
                    use ApiResponseHelper;
                })->errorResponse($e->getMessage(), Response::HTTP_UNAUTHORIZED);
            }
        });

        $exceptions->render(function (ValidationException $e, Request $request) {
            if ($request->is('api/*')) {
                return (new class
                {
                    use ApiResponseHelper;
                })->errorResponse([
                    'message' => 'The given data was invalid.',
                    'errors' => $e->validator->errors()->toArray()
                ], 400);
            }
        });
    })->create();
