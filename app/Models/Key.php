<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Key extends Model
{
    use HasUlids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'key',
        'family_name',
        'family',
        'created_at',
        'updated_at',
    ];

    protected static function boot()
    {
        parent::boot();
    }

    public function songs()
    {
        return $this->belongsToMany(Song::class, 'songs_keys');
    }
}
