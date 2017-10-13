<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;

    /**
     * Get all of the tags for the post.
     */
     public function tags()
     {
         return $this->morphToMany('App\Models\Tag', 'taggable');
     }

      /**
     * Get all of the post's likes.
     */
     public function comments()
     {
         return $this->morphMany('App\Models\Comment', 'commentable');
     }

      /**
     * Get the category that owns the product.
     */
     public function category()
     {
         return $this->belongsTo('App\Models\Category');
     }

      /**
     * Get the category that owns the product.
     */
     public function author()
     {
         return $this->belongsTo('App\Models\User');
     }

      /**
     * Get the translations for the post.
     */
    public function translations()
    {
        return $this->hasMany('App\Models\PostTranslation');
    }
}
