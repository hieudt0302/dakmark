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
}
