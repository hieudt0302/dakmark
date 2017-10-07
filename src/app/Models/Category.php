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
        return Category::where('parent_id', $this->id)
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

     /**
     * Get the products for the category.
     */
     public function posts()
     {
         return $this->hasMany('App\Models\Posts');
     }



     /**
     * Get the category that owns the product.
     */
     public function parent()
     {
         return $this->belongsTo('App\Models\Category');
     }
}
