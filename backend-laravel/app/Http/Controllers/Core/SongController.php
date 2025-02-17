<?php

namespace App\Http\Controllers\Core;

use App\Http\Controllers\Controller;
use App\Models\Song;
use App\Traits\ApiResponseHelper;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class SongController extends Controller
{
    use ApiResponseHelper;
    public function getOne()
    {
        // TODO: Implement getOne() method.
    }

    public function incrementViewCount(Request $request)
    {

        $validated = $request->validate([
            'song_id' => ['required', 'exists:songs,id'],
        ]);
        // Gunakan transaksi untuk mencegah race condition
        DB::beginTransaction();

        try {
            // Ambil data lagu yang ingin diupdate
            $song = Song::findOrFail($validated['song_id']);

            // Tambahkan jumlah tampilan
            $song->views = $song->views + 1;

            // Simpan pembaruan
            $song->save();

            DB::commit();  // Komit transaksi jika berhasil
        } catch (\Exception $e) {
            DB::rollBack();  // Rollback jika terjadi kesalahan
            throw $e;
        }

        return $this->successResponse([], 204);
    }
}
