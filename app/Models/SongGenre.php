<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Relations\Pivot;

class SongGenre extends Pivot
{
    use HasUlids;

    protected $table = 'songs_genres';

    protected $fillable = [
        'song_id',
        'genre_id',
    ];

    public $timestamps = false;

    protected static function boot()
    {
        parent::boot();
    }
}
