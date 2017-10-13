<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FaqTranslation extends Model
{
     /**
     * Get the infopage that owns the faq translation.
     */
    public function faq()
    {
        return $this->belongsTo('App\Models\Faq');
    }
}
