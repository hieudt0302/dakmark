<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoryTranslation extends Model
{
     /**
     * Get the category that owns the category translation.
     */
    public function category()
    {
        return $this->belongsTo('App\Models\Category');
    }
}
