<?php

namespace App\Http\Resources\Studio;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SongResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'title' => $this->title,
            'artist' => array_map('trim', explode(',', $this->artist)),
            'slug' => $this->slug,
            'status' => $this->status,
            'genre' => array_map('trim', explode(',', $this->genre)),
            'cover' => $this->cover,
            'youtube_url' => $this->youtube_url,
            'released_year' => $this->released_year,
            'publisher' => $this->publisher,
            'bpm' => $this->bpm,
            'sections' => $this->when(
                $this->relationLoaded('sections'),
                SectionResource::collection($this->sections)
            ),
            'keys' => $this->when(
                $this->relationLoaded('keys'),
                $this->keys->select('id', 'key', 'family_name', 'family')
            ),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
