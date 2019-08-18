<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Product;
class SitemapController extends Controller
{
    public function index()
    {
      $posts = Post::all()->first();
      $products = Product::all()->first();

      return response()->view('sitemap.index', [
          'posts' => $posts,
          'products' => $products,
      ])->header('Content-Type', 'text/xml');
    }

    public function posts()
    {
        $posts = Post::latest()->get();
        return response()->view('sitemap.posts', [
            'posts' => $posts,
        ])->header('Content-Type', 'text/xml');
    }

    public function products()
    {
        $products = Product::latest()->get();
        return response()->view('sitemap.products', [
            'products' => $products,
        ])->header('Content-Type', 'text/xml');
    }
}
