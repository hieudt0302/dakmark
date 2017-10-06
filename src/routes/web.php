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
Route::get('/about', 'Front\HomeController@about');

/* SHOPPING CART */
Route::get('/cart', 'Front\ShoppingCartController@cart');


/* PRODUCT */
Route::get('/products', 'Front\ProductsController@index');
Route::get('/products/{id}', 'Front\ProductsController@show');
Route::post('/add-to-cart', 'Front\ProductsController@addToCart');

/* REVIEW */
Route::post('/products/{id}/review', 'Front\ReviewsController@store');

/* MENU */
Route::get('/menu/{parent}/{url}', 'Front\ProductsController@menu');