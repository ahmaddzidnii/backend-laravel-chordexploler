<?php

namespace App\Traits;


trait ApiResponseHelper
{
    public function successResponse($data, $code = 200, $pagination = null)
    {
        $response = [
            'code' => $code,
        ];

        if ($pagination) {
            $response['pagination'] = $pagination;
        }

        $response['data'] = $data;

        return response()->json($response, $code);
    }

    public function errorResponse($error, $code = 400)
    {
        $response = [
            'code' => $code,
            'errors' => $error,
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
