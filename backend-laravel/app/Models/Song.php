<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Song extends Model
{
    use HasFactory, HasUlids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'artist',
        'slug',
        'cover',
        'status',
        'youtube_url',
        'released_year',
        'publisher',
        'bpm',
        'title_lower',
        'views',
    ];

    protected static function boot()
    {
        parent::boot();
    }

    public function setTitleAttribute($value)
    {
        $this->attributes['title'] = $value;
        $this->attributes['title_lower'] = strtolower(str_replace(' ', '', trim($value)));
    }

    protected function casts()
    {
        return [
            'released_year' => 'integer',
            'bpm' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sections(): HasMany
    {
        return $this->hasMany(Section::class);
    }

    public function keys()
    {
        return $this->belongsToMany(Key::class, 'songs_keys')->using(SongKey::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'song_genres')->using(SongGenre::class);
    }
}
