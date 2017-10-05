<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Multi-language
Route::get('language/{locale}', function ($locale) {
    Session::put('locale', $locale);
    App::setLocale($locale);
    return redirect()->back();
});

/* AUTH */
Auth::routes();

/* HOME */
Route::get('/', 'Front\HomeController@index');

/* SHOPPING CART */
Route::get('/cart', 'Front\ShoppingCartController@cart');


/* PRODUCT */

Route::get('/product/{id}', 'Front\ProductsController@show');
Route::post('/add-to-cart', 'Front\ProductsController@addToCart');