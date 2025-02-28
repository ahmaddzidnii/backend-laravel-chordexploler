<?php

namespace App\Traits;

use Illuminate\Support\Str;


trait ApiResponseHelper
{
    public function successResponse($data, $code = 200, $pagination = null)
    {
        // $response = [
        //     'code' => $code,
        // ];

        // if ($pagination) {
        //     $response['pagination'] = $pagination;
        // }

        // $response['data'] = $data;

        // return response()->json($response, $code);
        return response()->json($data, $code);
    }

    public function errorResponse(mixed $error, $code = 400)
    {
        $response = [
            "api_version" => config("app.version"),
            "request_id" => Str::uuid7(),
            'error' => array_merge(
                ['code' => $code],
                is_array($error) ? $error : ['message' => $error]
            )
        ];

        return response()->json($response, $code);
    }

    protected function getPaginationData($paginator)
    {

        return [
            'last_visible_page' => $paginator->lastPage(),
            'has_next_page' => $paginator->hasMorePages(),
            'has_prev_page' => $paginator->previousPageUrl() ? true : false,
            'current_page' => $paginator->currentPage(),
            'items' => [
                'per_page' => $paginator->perPage(),
                'count' => $paginator->count(),
                'total' => $paginator->total(),
            ],
        ];
    }
}
