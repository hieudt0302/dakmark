<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductTranslation extends Model
{
    /**
     * Get the product that owns the producttranslation.
     */
    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }
}
