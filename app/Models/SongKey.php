<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Relations\Pivot;

class SongKey extends Pivot
{
    use HasUlids;

    protected $table = 'songs_keys';

    protected $fillable = [
        'song_id',
        'key_id',
    ];

    public $timestamps = false;

    protected static function boot()
    {
        parent::boot();
    }
}
