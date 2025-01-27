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
            'artist' => explode(', ', $this->artist),
            'slug' => $this->slug,
            'cover' => $this->cover,
            'youtube_url' => $this->youtube_url,
            'released_year' => $this->released_year,
            'publisher' => $this->publisher,
            'key' => explode(', ', $this->key),
            'bpm' => $this->bpm,
            'sections' => $this->when(
                $this->relationLoaded('sections'),
                SectionResource::collection($this->sections)
            ),
        ];
    }
}
