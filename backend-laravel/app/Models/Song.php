<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

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
        'genre',
        'youtube_url',
        'released_year',
        'publisher',
        'bpm',
        'title_lower',
    ];

    protected static function boot()
    {
        parent::boot();

        // static::creating(function ($model) {
        //     if (empty($model->id)) {
        //         $model->id = (string) Str::uuid();
        //     }
        // });
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
}
