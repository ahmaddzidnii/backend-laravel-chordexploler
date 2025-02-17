<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Repositories\UserRepository;
use App\Traits\ApiResponseHelper;

class UserController extends Controller
{
    use ApiResponseHelper;

    public function __construct(
        protected readonly UserRepository $userRepository
    ) {}

    public function users()
    {
        $userId = authContext()->getAuthUser()->sub;
        $user = $this->userRepository->findById($userId);

        return $this->successResponse(UserResource::make($user));
    }
}
