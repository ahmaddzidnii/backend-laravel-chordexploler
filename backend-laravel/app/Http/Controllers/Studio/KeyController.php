<?php

namespace App\Http\Controllers\Studio;

use App\Http\Controllers\Controller;
use App\Models\Key;
use App\Models\Song;
use App\Traits\ApiResponseHelper;
use Illuminate\Http\Request;

class KeyController extends Controller
{
    use ApiResponseHelper;
    public function __invoke()
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

        $keys = Key::all();

        return $this->successResponse($keys);
    }
}
