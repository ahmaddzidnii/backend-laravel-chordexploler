<?php

namespace App\Http\Controllers\Studio;

use App\Helpers\UniqueIdGenerator;
use App\Http\Controllers\Controller;
use App\Http\Requests\SongCreateRequest;
use App\Http\Requests\SongUpdateRequest;
use App\Http\Resources\Studio\SongResource;
use App\Models\Song;
use App\Traits\ApiResponseHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class SongController extends Controller
{
    use ApiResponseHelper;

    public function __construct() {}

    private function generateSlug($artist, $title)
    {
        // Ubah koma menjadi "-"
        $formattedArtist = str_replace(',', '-', $artist);

        // Hapus karakter spesial, ubah spasi menjadi "-"
        // Tambahkan A-Z pada pattern untuk mempertahankan huruf besar
        $formattedArtist = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $formattedArtist), '-'));
        $formattedTitle = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $title), '-'));

        $randomString = uniqid('chxp');
        // Gabungkan menjadi slug
        return "{$formattedArtist}-{$formattedTitle}-{$randomString}";
    }

    public function index()
    {

        $limit = request()->query('limit', 50);
        $limit = $limit > 50 ? 50 : $limit;
        $limit = $limit < 10 ? 10 : $limit;

        $userId = authContext()->getAuthUser()->sub;

        $songs = Song::without('sections')->with(['keys', 'genres'])->where('user_id', $userId)->orderBy('created_at', 'desc')->paginate($limit);
        return $this->successResponse(SongResource::collection($songs->items()), pagination: $this->getPaginationData($songs));
    }

    public function store(SongCreateRequest $request)
    {

        $validated = $request->validated();
        $userId = authContext()->getAuthUser()->sub;

        // generate slug
        $slug = $this->generateSlug($validated['artist'], $validated['title']);

        // save to database and connect to user
        try {
            DB::beginTransaction();
            $song = Song::create([
                'title' => $validated['title'],
                'artist' => $validated['artist'],
                'status' => $validated['status'],
                'cover' => null,
                'youtube_url' => $validated['youtube_url'],
                'released_year' => $validated['released_year'],
                'publisher' => $validated['publisher'],
                'bpm' => $validated['bpm'],
                'slug' => $slug,
                'user_id' => $userId,
            ]);

            // Pastikan 'key' ada dan tidak kosong sebelum json_decode()
            $keys = isset($validated['key']) && ! empty($validated['key'])
                ? json_decode($validated['key'], true)
                : [];

            // Pastikan hasil json_decode adalah array
            if (! is_array($keys)) {
                $keys = [];
            }

            // Verify that all key_ids exist in the keys table first
            $existingKeys = DB::table('keys')
                ->whereIn('id', $keys)
                ->pluck('id')
                ->toArray();

            if (count($existingKeys) !== count($keys)) {
                DB::rollBack();
                throw ValidationException::withMessages(['key' => 'One or more key IDs are invalid.']);
            }

            // Prepare pivot data with verified keys only
            $song->keys()->attach($keys);

            // Verify that all genre_ids exist in the genres table first
            $genres = isset($validated['genre']) && ! empty($validated['genre'])
                ? json_decode($validated['genre'], true)
                : [];

            // Pastikan hasil json_decode adalah array
            if (! is_array($genres)) {
                $genres = [];
            }

            // Verify that all genre_ids exist in the genres table first
            $existingGenres = DB::table('genres')
                ->whereIn('id', $genres)
                ->pluck('id')
                ->toArray();

            if (count($existingGenres) !== count($genres)) {
                DB::rollBack();
                throw ValidationException::withMessages(['genre' => 'One or more genre IDs are invalid.']);
            }

            // Prepare pivot data with verified genres only
            $song->genres()->attach($genres);

            // Handle image upload
            $file = $validated['cover'];
            $fileName = uniqid('chxp') . '-' . $userId . '.' . $file->getClientOriginalExtension();

            // Upload file
            $path = Storage::disk('s3')->putFileAs('images/songs/cover', $file, $fileName, ['visibility' => 'public']);

            if (! $path) {
                DB::rollBack();

                return response()->json([
                    'error' => 'Failed to upload image.',
                ], 500);
            }

            // create link to s3
            $url = Storage::url($path);
            $song->cover = $url;
            $song->save();

            DB::commit();

            return $this->successResponse(new SongResource($song), 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function show(string $id)
    {

        $userId = authContext()->getAuthUser()->sub;

        $song = Song::where('id', $id)->where('id', $id)->with(['sections', 'keys', 'genres'])->first();

        if (! $song) {
            return $this->errorResponse('Song not found.', 404);
        }

        if ($song->user_id !== $userId) {
            return $this->errorResponse('You are not authorized to access this song.', 403);
        }

        return $this->successResponse(new SongResource($song));
    }

    public function update(SongUpdateRequest $request, string $id)
    {
        $validated = $request->validated();
        $userId = authContext()->getAuthUser()->sub;

        try {
            DB::beginTransaction();

            // Ambil data lagu lama
            $song = Song::where([
                'id' => $id,
                'user_id' => $userId,
            ])->first();

            if (! $song) {
                return response()->json(['error' => 'Song not found'], 404);
            }

            // Simpan URL gambar lama
            $oldCover = $song->cover;

            // Update data lagu kecuali gambar cover
            $song->update([
                'title' => $validated['title'] ?? $song->title,
                'artist' => $validated['artist'] ?? $song->artist,
                'status' => $validated['status'] ?? $song->status,
                'genre' => $validated['genre'] ?? $song->genre,
                'youtube_url' => $validated['youtube_url'] ?? $song->youtube_url,
                'released_year' => $validated['released_year'] ?? $song->released_year,
                'publisher' => $validated['publisher'] ?? $song->publisher,
                'bpm' => $validated['bpm'] ?? $song->bpm,
            ]);

            // Update slug jika title atau artist berubah
            if (isset($validated['title']) || isset($validated['artist'])) {
                $slug = $this->generateSlug($validated['artist'] ?? $song->title, $validated['title'] ?? $song->artist);
                $song->slug = $slug;
                $song->save();
            }

            // Update relasi key jika ada
            if (isset($validated['key'])) {
                $keys = is_string($validated['key'])
                    ? json_decode($validated['key'], true)
                    : $validated['key'];

                if (is_array($keys)) {
                    // Verify that all key_ids exist in the keys table first
                    $existingKeys = DB::table('keys')
                        ->whereIn('id', $keys)
                        ->pluck('id')
                        ->toArray();

                    if (count($existingKeys) !== count($keys)) {
                        DB::rollBack();
                        throw ValidationException::withMessages(['key' => 'One or more key IDs are invalid.']);
                    }

                    // Prepare pivot data with verified keys only
                    $pivotData = [];
                    foreach ($existingKeys as $keyId) {
                        $pivotData[$keyId] = ['id' => Str::uuid()];
                    }

                    $song->keys()->sync($pivotData);
                }
            }

            // Update relasi genre jika ada
            if (isset($validated['genre'])) {
                $genres = is_string($validated['genre'])
                    ? json_decode($validated['genre'], true)
                    : $validated['genre'];

                if (is_array($genres)) {
                    // Verify that all genre_ids exist in the genres table first
                    $existingGenres = DB::table('genres')
                        ->whereIn('id', $genres)
                        ->pluck('id')
                        ->toArray();

                    if (count($existingGenres) !== count($genres)) {
                        DB::rollBack();
                        throw ValidationException::withMessages(['genre' => 'One or more genre IDs are invalid.']);
                    }

                    // Prepare pivot data with verified genres only
                    $pivotData = [];
                    foreach ($existingGenres as $genreId) {
                        $pivotData[$genreId] = ['id' => Str::uuid()];
                    }

                    $song->genres()->sync($pivotData);
                }
            }

            // Handle image upload jika ada gambar baru
            if (isset($validated['cover'])) {
                $file = $validated['cover'];
                $fileName = uniqid('chxp') . '-' . $userId . '.' . $file->getClientOriginalExtension();

                // Upload file baru ke S3
                $path = Storage::disk('s3')->putFileAs('images/songs/cover', $file, $fileName, ['visibility' => 'public']);

                if (! $path) {
                    DB::rollBack();

                    return response()->json(['error' => 'Failed to upload image.'], 500);
                }

                // Hapus gambar lama jika ada
                if ($oldCover) {
                    $oldCoverPath = 'images/songs/cover/' . basename($oldCover);
                    Storage::disk('s3')->delete($oldCoverPath);
                }

                // Simpan URL gambar baru
                $song->cover = Storage::url($path);
                $song->save();
            }

            DB::commit();

            return $this->successResponse(new SongResource($song), 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function massDestroy(Request $request)
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
        ]);

        $userId = authContext()->getAuthUser()->sub;

        $songs = Song::where('user_id', $userId)->whereIn('id', $validated['ids'])->get();

        if (count($songs) !== count($validated['ids'])) {
            throw ValidationException::withMessages(['ids' => 'One or more song IDs are invalid.']);
        }

        try {
            DB::beginTransaction();
            foreach ($songs as $song) {
                // Hapus gambar cover jika ada
                if ($song->cover) {
                    $coverPath = 'images/songs/cover/' . basename($song->cover);
                    Storage::disk('s3')->delete($coverPath);
                }

                // Hapus key
                $song->keys()->detach();

                // Hapus genre
                $song->genres()->detach();

                // Hapus lagu
                $song->delete();
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return $this->successResponse('OK', 200);
    }
}
