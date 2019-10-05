<?php

namespace App\Http\Controllers\Front;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostTranslation;
use App\Models\Product;
use App\Models\ProductTranslation;
use App\Models\Slider;
use App\Models\InfoPage;
use App\Models\InfoPageTranslation;
use App\Models\Language;
use App\Models\Subscribe;
use App\Models\Category;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
use App\Models\Tag;
use App\Models\Comment;
use Validator;
use \Cart as Cart;
use DB;
use DateTime;

class ManageOneSlugController extends Controller
{
  public function routeTraffic($slug, Request $request)
  {

    $product = Product::where('slug', $slug)->first();
    $post = Post::where('slug', $slug)->first();

    // Tìm theo params
    if (!empty($post) && $request->t == "tt") {
      return $this->showPost($post);
    } else if (!empty($product) && $request->t == "sp") {
      return $this->showProduct($product);
    } else {
      // Ưu tiên tìm sản phẩm
      if (!empty($product)) {
        return $this->showProduct($product);
      } else if (!empty($post)) {
        return $this->showPost($post);
      } else {
        return \abort(404);
      }
    }
  }


  function showProduct($product)
  {
    $starAvg = $product->comments->avg('rate');
    $product_category = Category::where('slug', 'products')->firstOrFail();
    $categories = Category::where('parent_id', $product_category->id)->get();
    $tags = Tag::has('products')->get();

    $is_sales = false;
    if (!empty($product->special_price_start_date) && !empty($product->special_price_end_date)) {
      if ($product->special_price_start_date <= date('Y-m-d H:i:s') && $product->special_price_end_date >= date('Y-m-d H:i:s')) {
        $is_sales = true;
      }
    }

    return View('front.products.show', compact('product', 'starAvg', 'is_sales', 'tags', 'categories', 'product_category'));
  }

  function showPost($post)
  {
    $post_category = Category::where('slug', 'posts')->firstOrFail();
    $categories = Category::where('parent_id', $post_category->id)->get();
    $last_posts = Post::take(10)->get();
    return View('front/posts/show', compact('post', 'categories', 'last_posts', 'post_category'));
  }
}
