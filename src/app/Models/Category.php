<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;

class Category extends Model
{
    use SoftDeletes;

   /**
     * The table associated with the model.
     *
     * @var string
     */

    public function GetMenuSubLevel1()
    {
        return  DB::table('categories')
        ->where('parent_id', $this->id)
        ->where('is_menu_avaiable', 1)
        ->orderBy('order','asc')
        ->get();
    }


     /**
     * Get the products for the category.
     */
     public function products()
     {
         return $this->hasMany('App\Models\Product');
     }
}
