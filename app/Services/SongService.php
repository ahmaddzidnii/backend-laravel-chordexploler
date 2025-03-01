<?php

namespace App\Services;

use App\Http\Requests\SongCreateRequest;
use App\Http\Requests\SongUpdateRequest;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class SongService
{
    public function generateSlug($artist, $title)
    {
        $formattedArtist = str_replace(',', '-', $artist);
        $formattedArtist = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $formattedArtist), '-'));
        $formattedTitle = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $title), '-'));
        $randomString = uniqid('chxp');
        return "{$formattedArtist}-{$formattedTitle}-{$randomString}";
    }

    public function getSongsByUserId($userId, $limit)
    {
        return Song::without('sections')->with(['keys', 'genres'])->where('user_id', $userId)->orderBy('created_at', 'desc')->paginate($limit);
    }

    public function createSong(SongCreateRequest $request, $userId)
    {
        $validated = $request->validated();
        $slug = $this->generateSlug($validated['artist'], $validated['title']);

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

            $keys = isset($validated['key']) && !empty($validated['key']) ? json_decode($validated['key'], true) : [];
            if (!is_array($keys)) {
                $keys = [];
            }
            $existingKeys = DB::table('keys')->whereIn('id', $keys)->pluck('id')->toArray();
            if (count($existingKeys) !== count($keys)) {
                DB::rollBack();
                throw ValidationException::withMessages(['key' => 'One or more key IDs are invalid.']);
            }
            $song->keys()->attach($keys);

            $genres = isset($validated['genre']) && !empty($validated['genre']) ? json_decode($validated['genre'], true) : [];
            if (!is_array($genres)) {
                $genres = [];
            }
            $existingGenres = DB::table('genres')->whereIn('id', $genres)->pluck('id')->toArray();
            if (count($existingGenres) !== count($genres)) {
                DB::rollBack();
                throw ValidationException::withMessages(['genre' => 'One or more genre IDs are invalid.']);
            }
            $song->genres()->attach($genres);

            $file = $validated['cover'];
            $fileName = uniqid('chxp') . '-' . $userId . '.' . $file->getClientOriginalExtension();
            $path = Storage::disk('s3')->putFileAs('images/songs/cover', $file, $fileName, ['visibility' => 'public']);
            if (!$path) {
                DB::rollBack();
                return ['error' => 'Failed to upload image.', 'status' => Response::HTTP_INTERNAL_SERVER_ERROR];
            }
            $url = Storage::url($path);
            $song->cover = $url;
            $song->save();

            DB::commit();
            return ['message' => 'Song created successfully.', 'status' => Response::HTTP_CREATED];
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function getSongByIdAndUserId($id, $userId)
    {
        $song = Song::where('id', $id)->where('id', $id)->with(['sections', 'keys', 'genres'])->first();
        if (!$song) {
            return ['error' => 'Song not found.', 'status' => 404];
        }
        if ($song->user_id !== $userId) {
            return ['error' => 'You are not authorized to access this song.', 'status' => 403];
        }
        return $song;
    }

    public function updateSong(SongUpdateRequest $request, $userId)
    {
        $validated = $request->validated();
        try {
            DB::beginTransaction();
            $song = Song::where(['id' => $validated['id'], 'user_id' => $userId])->first();
            if (!$song) {
                return ['error' => 'Song not found.', 'status' => Response::HTTP_NOT_FOUND];
            }
            $oldCover = $song->cover;
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
            if (isset($validated['title']) || isset($validated['artist'])) {
                $slug = $this->generateSlug($validated['artist'] ?? $song->title, $validated['title'] ?? $song->artist);
                $song->slug = $slug;
                $song->save();
            }
            if (isset($validated['key'])) {
                $keys = is_string($validated['key']) ? json_decode($validated['key'], true) : $validated['key'];
                if (is_array($keys)) {
                    $existingKeys = DB::table('keys')->whereIn('id', $keys)->pluck('id')->toArray();
                    if (count($existingKeys) !== count($keys)) {
                        DB::rollBack();
                        throw ValidationException::withMessages(['key' => 'One or more key IDs are invalid.']);
                    }
                    $pivotData = [];
                    foreach ($existingKeys as $keyId) {
                        $pivotData[$keyId] = ['id' => Str::uuid()];
                    }
                    $song->keys()->sync($pivotData);
                }
            }
            if (isset($validated['genre'])) {
                $genres = is_string($validated['genre']) ? json_decode($validated['genre'], true) : $validated['genre'];
                if (is_array($genres)) {
                    $existingGenres = DB::table('genres')->whereIn('id', $genres)->pluck('id')->toArray();
                    if (count($existingGenres) !== count($genres)) {
                        DB::rollBack();
                        throw ValidationException::withMessages(['genre' => 'One or more genre IDs are invalid.']);
                    }
                    $pivotData = [];
                    foreach ($existingGenres as $genreId) {
                        $pivotData[$genreId] = ['id' => Str::uuid()];
                    }
                    $song->genres()->sync($pivotData);
                }
            }
            if (isset($validated['cover'])) {
                $file = $validated['cover'];
                $fileName = uniqid('chxp') . '-' . $userId . '.' . $file->getClientOriginalExtension();
                $path = Storage::disk('s3')->putFileAs('images/songs/cover', $file, $fileName, ['visibility' => 'public']);
                if (!$path) {
                    DB::rollBack();
                    return ['error' => 'Failed to upload image.', 'status' => Response::HTTP_INTERNAL_SERVER_ERROR];
                }
                if ($oldCover) {
                    $oldCoverPath = 'images/songs/cover/' . basename($oldCover);
                    Storage::disk('s3')->delete($oldCoverPath);
                }
                $song->cover = Storage::url($path);
                $song->save();
            }
            DB::commit();
            return ['message' => 'Song updated successfully.', 'status' => 200];
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function deleteSongs(Request $request, $userId)
    {
        $validated = $request->validate(['ids' => ['required', 'array']]);
        $songs = Song::where('user_id', $userId)->whereIn('id', $validated['ids'])->get();
        if (count($songs) !== count($validated['ids'])) {
            throw ValidationException::withMessages(['ids' => 'One or more song IDs are invalid.']);
        }
        try {
            DB::beginTransaction();
            foreach ($songs as $song) {
                if ($song->cover) {
                    $coverPath = 'images/songs/cover/' . basename($song->cover);
                    Storage::disk('s3')->delete($coverPath);
                }
                $song->keys()->detach();
                $song->genres()->detach();
                $song->delete();
            }
            DB::commit();
            return ['message' => 'Songs deleted successfully.', 'status' => 200];
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
