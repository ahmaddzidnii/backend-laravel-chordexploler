<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasUlids;

    protected $fillable = ['name'];
}
