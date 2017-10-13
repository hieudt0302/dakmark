<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
      /**
     * Get the translations for the slider.
     */
    public function translations()
    {
        return $this->hasMany('App\Models\SliderTranslation');
    }
}
