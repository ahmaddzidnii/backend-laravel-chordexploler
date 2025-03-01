<?php

namespace App\Http\Controllers\Studio;

use App\Helpers\JsonResponseBuilder;
use App\Http\Controllers\Controller;
use App\Http\Requests\SongCreateRequest;
use App\Http\Requests\SongUpdateRequest;
use App\Http\Resources\Studio\SongResource;
use App\Services\SongService;
use App\Traits\ApiResponseHelper;
use Illuminate\Http\Request;

class SongController extends Controller
{
    use ApiResponseHelper;

    protected $songService;

    public function __construct(SongService $songService)
    {
        $this->songService = $songService;
    }

    public function index()
    {
        $limit = request()->query('limit', 50);
        $limit = $limit > 50 ? 50 : $limit;
        $limit = $limit < 10 ? 10 : $limit;
        $userId = authContext()->getAuthUser()->sub;
        $songs = $this->songService->getSongsByUserId($userId, $limit);
        $response = JsonResponseBuilder::jsonResponseCollectionSuccess(
            SongResource::collection($songs->items()),
            'songListResponse',
            $songs->count(),
            $songs->perPage(),
            $songs->currentPage(),
            $songs->total(),
            $songs->lastPage(),
            $songs->hasMorePages(),
            $songs->onFirstPage() ? false : true,
            'songs'
        );
        return $this->successResponse($response);
    }

    public function store(SongCreateRequest $request)
    {
        $userId = authContext()->getAuthUser()->sub;
        $result = $this->songService->createSong($request, $userId);

        if (isset($result['error'])) {
            return $this->errorResponse($result['error'], $result['status']);
        }

        $response = JsonResponseBuilder::jsonResponseMessageOnly(
            $result['message'],
            'songCreateResponse',
        );
        return $this->successResponse($response, $result['status']);
    }

    public function show(string $id)
    {
        $userId = authContext()->getAuthUser()->sub;
        $result = $this->songService->getSongByIdAndUserId($id, $userId);
        if (isset($result['error'])) {
            return $this->errorResponse($result['error'], $result['status']);
        }
        $response = JsonResponseBuilder::jsonResponseSingleSuccess(
            new SongResource($result),
            'songDetailResponse',
        );
        return $this->successResponse($response);
    }

    public function update(SongUpdateRequest $request)
    {
        $userId = authContext()->getAuthUser()->sub;
        $result = $this->songService->updateSong($request, $userId);
        if (isset($result['error'])) {
            return $this->errorResponse($result['error'], $result['status']);
        }

        $response = JsonResponseBuilder::jsonResponseMessageOnly(
            $result['message'],
            'songUpdateResponse',
        );
        return $this->successResponse($response, $result['status']);
    }

    public function massDestroy(Request $request)
    {
        $userId = authContext()->getAuthUser()->sub;
        $result = $this->songService->deleteSongs($request, $userId);
        if (isset($result['error'])) {
            return $this->errorResponse($result['error'], $result['status']);
        }

        $response = JsonResponseBuilder::jsonResponseMessageOnly(
            $result['message'],
            'songDeleteResponse',
        );
        return $this->successResponse($response, $result['status']);
    }
}
