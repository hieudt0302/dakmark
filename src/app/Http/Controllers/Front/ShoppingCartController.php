<?php

namespace App\Http\Controllers\Front;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Cart\Cart;

class ShoppingCartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function cart()
     {
        //  $new_products = DB::table('products')->where('created_at', '>=', Carbon::now()->subWeeks(1))->get();
         return View("front/shoppingcart/cart");
     }
}
