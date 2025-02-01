<?php

namespace App\Http\Controllers\Studio;

use App\Http\Controllers\Controller;
use App\Http\Resources\Studio\KeyOptionsResource;
use App\Models\Key;
use App\Traits\ApiResponseHelper;

class KeyController extends Controller
{
    use ApiResponseHelper;

    public function getOptions()
    {
        $keys = Key::without('songs')->get();
        return $this->successResponse(KeyOptionsResource::collection($keys));
    }

    public function index()
    {
        // // Ambil Semua Key dari Lagu
        // $song = Song::with('keys')->find(1);
        // foreach ($song->keys as $key) {
        //     echo $key->name;
        // }

        // // Ambil Semua Lagu yang Memiliki Key Tertentu
        // $songs = Song::whereHas('keys', function ($query) {
        //     $query->where('name', 'C');
        // })->get();
    }
}
