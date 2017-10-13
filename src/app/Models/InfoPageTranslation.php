<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InfoPageTranslation extends Model
{
      /**
     * Get the infopage that owns the infopage translation.
     */
    public function infopage()
    {
        return $this->belongsTo('App\Models\InfoPage');
    }
}
