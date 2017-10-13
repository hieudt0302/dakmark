<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
      
     /*
     * Get the translations for the faq.
     */
    public function translations()
    { 
        /* It return list but just contain one or none. Because condition of scope has override. */       
        return $this->hasMany('App\Models\FaqTranslation');
    }

    public function translation()
    {
        /* It hack a bit of translations above */
        return $this->hasOne('App\Models\FaqTranslation'); //hack relationship
    }
}
