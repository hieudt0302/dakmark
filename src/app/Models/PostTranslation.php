<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostTranslation extends Model
{
     /**
     * Get the post that owns the post translation.
     */
    public function post()
    {
        return $this->belongsTo('App\Models\Post');
    }
}
