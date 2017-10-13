<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SliderTranslation extends Model
{
     /**
     * Get the product that owns the slider translation.
     */
    public function slider()
    {
        return $this->belongsTo('App\Models\Slider');
    }
}
