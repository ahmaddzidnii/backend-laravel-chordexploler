<?php

namespace App\Http\Controllers\Core;

use App\Http\Controllers\Controller;
use App\Http\Resources\Studio\KeyOptionsResource;
use App\Models\Key;
use App\Traits\ApiResponseHelper;

class KeyController extends Controller
{
    use ApiResponseHelper;

    public function getOptions()
    {
        $keys = Key::without('songs')->get();

        return $this->successResponse(KeyOptionsResource::collection($keys));
    }
}
