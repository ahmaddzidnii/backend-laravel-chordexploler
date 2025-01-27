<?php

namespace App\Http\Controllers\Studio\Features;

use App\Http\Controllers\Controller;
use App\Http\Resources\Studio\SongResource;
use App\Models\Song;
use App\Traits\ApiResponseHelper;
use Illuminate\Http\Request;

class SongController extends Controller
{
    use ApiResponseHelper;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $limit = request()->query('limit', 50);
        $limit = $limit > 50 ? 50 : $limit;
        $limit = $limit < 10 ? 10 : $limit;

        $userId = request()->attributes->get('user')->sub;

        $songs = Song::without('sections')->where('user_id', $userId)->paginate($limit);

        return $this->successResponse(SongResource::collection($songs->items()), pagination: $this->getPaginationData($songs));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $userId = request()->attributes->get('user')->sub;

        $song = Song::where('id', $id)->where('id', $id)->with('sections')->first();

        if (!$song) {
            return $this->errorResponse('Song not found.', 404);
        }

        if ($song->user_id !== $userId) {
            return $this->errorResponse('You are not authorized to access this song.', 403);
        }

        return $this->successResponse(new SongResource($song));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
