<?php

namespace App\Http\Controllers\Core;

use App\Http\Controllers\Controller;
use App\Http\Requests\Core\Recommendation\GetManyRecommendationRequest;
use App\Models\Song;
use App\Traits\ApiResponseHelper;

class RecommendationController extends Controller
{
    use ApiResponseHelper;
    public function index(GetManyRecommendationRequest $request)
    {
        $request->validated();
        $recommendation = Song::orderBy('id')->where('status', 'published')->cursorPaginate(10);
        $paginationCursorObject = [
            'has_next_page' => $recommendation->hasMorePages(),
            'has_previous_page' => $recommendation->previousCursor() !== null,
            'next_cursor' => $recommendation->nextCursor()?->encode(),
            'previous_cursor' => $recommendation->previousCursor()?->encode(),
            'count' => $recommendation->count(),
        ];
        return $this->successResponse($recommendation->items(), pagination: $paginationCursorObject);
    }
}
