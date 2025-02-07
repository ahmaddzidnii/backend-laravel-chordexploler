<?php

namespace App\Http\Resources\Studio;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SectionResource extends JsonResource
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
            'song_id' => $this->song_id,
            'name' => $this->name,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'position' => $this->position,
            'content' => $this->content,
        ];
    }
}
