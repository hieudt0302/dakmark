<?php

namespace App\Http\Controllers\Front;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Post;
use App\Models\Category;

class MenuController extends Controller
{
    public function menu($parent, $slug)
    {
        if ($parent == "shop") {
            $category = Category::where('slug', $slug)->firstOrFail();
            
            $products = $category->products()->paginate(10);

            return View('front/products/index', compact('products'));

        } elseif ($parent == "blog") {
            $category = Category::where('slug', $slug)->firstOrFail();

            $posts = $category->posts()->paginate(10);

            return View('front/posts/index', compact('posts'));
        }
    }
}
