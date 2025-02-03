<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class BlacklistedToken extends Model
{
    use HasUlids;
    protected $table = 'blacklisted_tokens';

    protected static function boot()
    {
        parent::boot();
    }

    protected $fillable = [
        'jti',
        'expires_at',
    ];
}
