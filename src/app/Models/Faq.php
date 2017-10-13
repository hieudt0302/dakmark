<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
      /**
     * Get the translations for the faq.
     */
    public function translations()
    {
        return $this->hasMany('App\Models\FaqTranslation');
    }
}
