<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{

    /*
     * Get the translations for the slider.
     */
    public function translations()
    { 
        /* It return list but just contain one or none. Because condition of scope has override. */       
        return $this->hasMany('App\Models\SliderTranslation');
    }

    public function translation()
    {
        /* It hack a bit of translations above */
        return $this->hasOne('App\Models\SliderTranslation'); //hack relationship
    }
}
