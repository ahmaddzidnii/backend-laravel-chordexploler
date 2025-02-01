<?php

namespace App\Http\Controllers\Studio;

use App\Helpers\UniqueIdGenerator;
use App\Http\Controllers\Controller;
use App\Http\Requests\SongRequest;
use App\Http\Resources\Studio\SongResource;
use App\Models\Song;
use App\Traits\ApiResponseHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class SongController extends Controller
{
    use ApiResponseHelper;

    public function __construct(protected UniqueIdGenerator $uniqueIdGenerator) {}

    private function generateSlug($artist, $title)
    {
        // Ubah koma menjadi "-"
        $formattedArtist = str_replace(',', '-', $artist);

        // Hapus karakter spesial, ubah spasi menjadi "-"
        // Tambahkan A-Z pada pattern untuk mempertahankan huruf besar
        $formattedArtist = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $formattedArtist), '-'));
        $formattedTitle = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $title), '-'));

        // Tambahkan huruf unik
        $uniqueString = $this->uniqueIdGenerator->generateVideoId();

        // Gabungkan menjadi slug
        return "{$formattedArtist}-{$formattedTitle}-{$uniqueString}";
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $limit = request()->query('limit', 50);
        $limit = $limit > 50 ? 50 : $limit;
        $limit = $limit < 10 ? 10 : $limit;

        $userId = authContext()->getAuthUser()->sub;

        $songs = Song::without('sections')->where('user_id', $userId)->paginate($limit);
        // $songs = Song::without('sections')->with('keys')->paginate($limit);

        return $this->successResponse(SongResource::collection($songs->items()), pagination: $this->getPaginationData($songs));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SongRequest $request)
    {

        $validated = $request->validated();

        // return response()->json(json_decode($validated['key']));

        $userId = authContext()->getAuthUser()->sub;

        // generate slug

        $this->generateSlug($validated['artist'], $validated['title']);

        // upload image to s3
        // Dapatkan file dari request
        $file = $validated['cover'];

        // Generate nama unik untuk file
        $fileName = uniqid("chxp") . '-' . $this->uniqueIdGenerator->generateVideoId() . '.' . $file->getClientOriginalExtension();

        // Unggah file ke S3
        $path = Storage::disk('s3')->putFileAs('images/songs/cover', $file, $fileName, ['visibility' => 'public']);

        if (!$path) {
            return response()->json([
                'error' => 'Failed to upload image.'
            ], 500);
        }

        // create link to s3
        $url = Storage::url($path);

        // save to database and connect to user

        try {
            DB::beginTransaction();
            $song = Song::create([
                'title' => $validated['title'],
                'artist' => $validated['artist'],
                'status' => $validated['status'],
                'cover' => $url,
                'genre' => $validated['genre'],
                'youtube_url' => $validated['youtube_url'],
                'released_year' => $validated['released_year'],
                'publisher' => $validated['publisher'],
                'bpm' => $validated['bpm'],
                'key' => $validated['key'],
                'slug' => $this->generateSlug($validated['artist'], $validated['title']),
                'user_id' => $userId
            ]);


            // Connect key to song

            $keys = json_decode($validated['key']);

            $pivotData = [];

            foreach ($keys as $keyId) {
                $pivotData[$keyId] = ['id' => Str::uuid()]; // Pakai UUID di pivot
            }

            $song->keys()->attach($pivotData);

            DB::commit();

            return $this->successResponse(new SongResource($song), 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $userId = authContext()->getAuthUser()->sub;

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
