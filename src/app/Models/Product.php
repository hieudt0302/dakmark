<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    /**
     * Get the reviews for the product.
     */
    // public function reviews()
    // {
    //     return $this->hasMany('App\Models\Review');
    // }

    /**
     * Get the category that owns the product.
     */
     public function category()
     {
         return $this->belongsTo('App\Models\Category');
     }


     /**
     * Get all of the tags for the product.
     */
    public function tags()
    {
        return $this->morphToMany('App\Models\Tag', 'taggable');
    }

    /**
     * Get all of the product's likes.
     */
     public function comments()
     {
         return $this->morphMany('App\Models\Comment', 'commentable');
     }

     /**
     * Get the category that owns the product.
     */
     public function author()
     {
         return $this->belongsTo('App\Models\User');
     }
}