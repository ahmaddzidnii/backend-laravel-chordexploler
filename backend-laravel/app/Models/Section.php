<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Section extends Model
{
    use HasUlids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'song_id',
        'name',
        'start_time',
        'end_time',
        'position',
        'content',
    ];

    protected static function boot()
    {
        parent::boot();
    }

    protected function casts()
    {
        return [
            'start_time' => 'integer',
            'end_time' => 'integer',
            'order' => 'integer',
        ];
    }

    public function song(): BelongsTo
    {
        return $this->belongsTo(Song::class);
    }
}
