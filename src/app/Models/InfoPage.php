<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InfoPage extends Model
{
     /**
     * Get the translations for the infopage.
     */
    public function translations()
    {
        return $this->hasMany('App\Models\InfoPageTranslation');
    }
}
