<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasUlids;

    protected $fillable = ['name'];

    public function songs()
    {
        return $this->belongsToMany(Genre::class, 'song_genres')->using(SongGenre::class);
    }
}
