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
/* Added by Thang LD */
Route::get('/', 'Front\PagesController@home');
Route::get('/about-us', 'Front\PagesController@about');
Route::get('/faqs', 'Front\FaqController@index');


Route::get('/danh-sach-don-hang',  ['uses'=>'Front\PagesController@order_list','middleware' => 'auth']);
/*  --- */
Route::get('/', ['as' => 'front.home',   'uses' => 'Front\PagesController@home']);
Route::group(['namespace' => 'Admin', 'prefix' => 'admin', 'middleware' => 'auth'], function() {
    //admin area
    Route::get('/', ['as' => 'admin.dashboard', 'uses' => 'PagesController@getDashboard']);
    Route::get('/blank', ['as' => 'admin.blank', 'uses' => 'PagesController@getBlank']);
    //role area
    Route::get('roles',['as'=>'admin.roles.index','uses'=>'RolesController@index','middleware' => ['permission:role-list']]);
    Route::get('roles/create',['as'=>'admin.roles.create','uses'=>'RolesController@create','middleware' => ['permission:role-create']]);
    Route::post('roles/create',['as'=>'admin.roles.store','uses'=>'RolesController@store','middleware' => ['permission:role-create']]);
    Route::get('roles/{id}',['as'=>'admin.roles.show','uses'=>'RolesController@show', 'middleware'=> ['permission:role-show']]);
    Route::get('roles/{id}/edit',['as'=>'admin.roles.edit','uses'=>'RolesController@edit','middleware' => ['permission:role-edit']]);
    Route::patch('roles/{id}',['as'=>'admin.roles.update','uses'=>'RolesController@update','middleware' => ['permission:role-edit']]);
    Route::delete('roles/{id}',['as'=>'admin.roles.destroy','uses'=>'RolesController@destroy','middleware' => ['permission:role-delete']]);
    //user area
    Route::get('users',['as'=>'admin.users.index','uses'=>'UsersController@index','middleware' => ['permission:user-list']]);
    Route::get('users/create',['as'=>'admin.users.create','uses'=>'UsersController@create','middleware' => ['permission:user-create']]);
    Route::post('users/create',['as'=>'admin.users.store','uses'=>'UsersController@store','middleware' => ['permission:user-create']]);
    Route::get('users/{id}',['as'=>'admin.users.show','uses'=>'UsersController@show', 'middleware'=> ['permission:user-show']]);
    Route::get('users/{id}/edit',['as'=>'admin.users.edit','uses'=>'UsersController@edit','middleware' => ['permission:user-edit']]);
    Route::patch('users/{id}',['as'=>'admin.users.update','uses'=>'UsersController@update','middleware' => ['permission:user-edit']]);
    Route::delete('users/{id}',['as'=>'admin.users.destroy','uses'=>'UsersController@destroy','middleware' => ['permission:user-delete']]);
     //rate area
    Route::get('rates',['as'=>'admin.rates.index','uses'=>'RatesController@index','middleware' => ['permission:rate-list']]);
    Route::get('rates/create',['as'=>'admin.rates.create','uses'=>'RatesController@create','middleware' => ['permission:rate-create']]);
    Route::post('rates/create',['as'=>'admin.rates.store','uses'=>'RatesController@store','middleware' => ['permission:rate-create']]);
    Route::get('rates/{id}',['as'=>'admin.rates.show','uses'=>'RatesController@show', 'middleware'=> ['permission:rate-show']]);
    Route::get('rates/{id}/edit',['as'=>'admin.rates.edit','uses'=>'RatesController@edit','middleware' => ['permission:rate-edit']]);
    Route::patch('rates/{id}',['as'=>'admin.rates.update','uses'=>'RatesController@update','middleware' => ['permission:rate-edit']]);
    Route::delete('rates/{id}',['as'=>'admin.rates.destroy','uses'=>'RatesController@destroy','middleware' => ['permission:rate-delete']]);
    //Orders
    Route::get('orders',['as'=>'admin.orders.index','uses'=>'OrdersController@index','middleware' => ['permission:order-list']]);
    Route::get('orders/create',['as'=>'admin.orders.create','uses'=>'OrdersController@create','middleware' => ['permission:order-create']]);
    Route::post('orders/create',['as'=>'admin.orders.store','uses'=>'OrdersController@store','middleware' => ['permission:order-create']]);
    Route::get('orders/{id}',['as'=>'admin.orders.show','uses'=>'OrdersController@show', 'middleware' => ['permission:order-show']]);
    Route::get('orders/{id}/edit',['as'=>'admin.orders.edit','uses'=>'OrdersController@edit','middleware' => ['permission:order-edit']]);
    Route::patch('orders/{id}',['as'=>'admin.orders.update','uses'=>'OrdersController@update','middleware' => ['permission:order-edit']]);
    Route::post('orders/{id}',['as'=>'admin.orders.destroy','uses'=>'OrdersController@destroy','middleware' => ['permission:order-delete']]);
    Route::post('orders',['as'=>'admin.orders.find','uses'=>'OrdersController@find','middleware' => ['permission:order-list']]);
    //Order-Sub
    Route::patch('orders/ajust/quantity/item/{id}',['as'=>'admin.orders.ajustquantity','uses'=>'OrdersController@ajustquantity','middleware' => ['permission:order-edit']]);
    Route::patch('orders/send/ordershop/{id}',['as'=>'admin.orders.sendshop','uses'=>'OrdersController@sendshop','middleware' => ['permission:order-edit']]);
    
    //Products - added by Thang LD
    Route::get('product-cat',['as'=>'admin.product-cat','uses'=>'ProductController@productCatList']);
    Route::get('product-cat/add',['as'=>'admin.product-cat.add','uses'=>'ProductController@addProductCat']);
    Route::post('product-cat/add',['as'=>'admin.product-cat.insert','uses'=>'ProductController@insertProductCat']);
    Route::get('product-cat/edit/{id}',['as'  =>'admin.product-cat.edit','uses' => 'ProductController@editProductCat']);
    Route::post('product-cat/edit/{id}',['as' =>'admin.product-cat.update','uses' => 'ProductController@updateProductCat']);
    Route::get('product-cat/delete/{id}',['as'  =>'admin.product-cat.delete','uses' => 'ProductController@deleteProductCat']);
    Route::get('product',['as'=>'admin.product','uses'=>'ProductController@productList']);
    Route::get('product/add',['as'=>'admin.product.add','uses'=>'ProductController@addProduct']);
    Route::post('product/add',['as'=>'admin.product.insert','uses'=>'ProductController@insertProduct']);
    Route::get('product/edit/{id}',['as'  =>'admin.product.edit','uses' => 'ProductController@editProduct']);
    Route::post('product/edit/{id}',['as' =>'admin.product.update','uses' => 'ProductController@updateProduct']);
    Route::get('product/delete/{id}',['as'  =>'admin.product.delete','uses' => 'ProductController@deleteProduct']);
    Route::post('product',['as'=>'admin.product.search','uses'=>'ProductController@searchProduct']);

    // Navigators
    Route::get('navigator',['as'=>'admin.navigator','uses'=>'NavigatorController@navigatorList']);
    Route::get('navigator/add',['as'=>'admin.navigator.add','uses'=>'NavigatorController@addNavigator']);
    Route::post('navigator/add',['as'=>'admin.navigator.insert','uses'=>'NavigatorController@insertNavigator']);
    Route::get('navigator/edit/{id}',['as'  =>'admin.navigator.edit','uses' => 'NavigatorController@editNavigator']);
    Route::post('navigator/edit/{id}',['as' =>'admin.navigator.update','uses' => 'NavigatorController@updateNavigator']);
    Route::get('navigator/delete/{id}',['as'  =>'admin.navigator.delete','uses' => 'NavigatorController@deleteNavigator']);
    
     // Sliders
    Route::get('slider',['as'=>'admin.slider','uses'=>'SliderController@sliderList']);
    Route::get('slider/add',['as'=>'admin.slider.add','uses'=>'SliderController@addSlider']);
    Route::post('slider/add',['as'=>'admin.slider.insert','uses'=>'SliderController@insertSlider']);
    Route::get('slider/edit/{id}',['as'  =>'admin.slider.edit','uses' => 'SliderController@editSlider']);
    Route::post('slider/edit/{id}',['as' =>'admin.slider.update','uses' => 'SliderController@updateSlider']);
    Route::get('slider/delete/{id}',['as'  =>'admin.slider.delete','uses' => 'SliderController@deleteSlider']);

    // Blogs
	
    Route::get('blog-cat',['as'=>'admin.blog-cat','uses'=>'BlogController@blogCatList']);
    Route::get('blog-cat/add',['as'=>'admin.blog-cat.add','uses'=>'BlogController@addBlogCat']);
    Route::post('blog-cat/add',['as'=>'admin.blog-cat.insert','uses'=>'BlogController@insertBlogCat']);
    Route::get('blog-cat/edit/{id}',['as'  =>'admin.blog-cat.edit','uses' => 'BlogController@editBlogCat']);
    Route::post('blog-cat/edit/{id}',['as' =>'admin.blog-cat.update','uses' => 'BlogController@updateBlogCat']);
    Route::get('blog-cat/delete/{id}',['as'  =>'admin.blog-cat.delete','uses' => 'BlogController@deleteBlogCat']);
    Route::get('blog',['as'=>'admin.blog','uses'=>'BlogController@blogList']);
    Route::get('blog/add',['as'=>'admin.blog.add','uses'=>'BlogController@addBlog']);
    Route::post('blog/add',['as'=>'admin.blog.insert','uses'=>'BlogController@insertBlog']);
    Route::get('blog/edit/{id}',['as'  =>'admin.blog.edit','uses' => 'BlogController@editBlog']);
    Route::post('blog/edit/{id}',['as' =>'admin.blog.update','uses' => 'BlogController@updateBlog']);
    Route::get('blog/delete/{id}',['as'  =>'admin.blog.delete','uses' => 'BlogController@deleteBlog']);
    Route::post('blog',['as'=>'admin.blog.search','uses'=>'BlogController@searchBlog']);

    Route::post('generate-slug',['as'=>'admin.generate-slug','uses'=>'ProductController@generate_slug']);
    Route::post('get-system-cat/{system_id}',['as'=>'admin.get-system-cat','uses'=>'NavigatorController@get_system_cat']);

    //FAQs
    Route::get('faqs',['as'=>'admin.faqs.index','uses'=>'FaqController@index']);
    Route::get('faqs/create',['as'=>'admin.faqs.create','uses'=>'FaqController@create']);
    Route::post('faqs/create',['as'=>'admin.faqs.store','uses'=>'FaqController@store']);
    Route::get('faqs/{id}',['as'  =>'admin.faqs.show','uses' => 'FaqController@show']);
    Route::get('faqs/{id}/edit',['as'  =>'admin.faqs.edit','uses' => 'FaqController@edit']);
    Route::patch('faqs/{id}',['as'  =>'admin.faqs.update','uses' => 'FaqController@update']);    
    Route::delete('faqs/{id}',['as'  =>'admin.faqs.destroy','uses' => 'FaqController@destroy']); 
});
Auth::routes();
 
// registration activation routes
Route::get('activation/key/{activation_key}', ['as' => 'activation_key', 'uses' => 'Auth\ActivationKeyController@activateKey']);
Route::get('activation/resend', ['as' =>  'activation_key_resend', 'uses' => 'Auth\ActivationKeyController@showKeyResendForm']);
Route::post('activation/resend', ['as' =>  'activation_key_resend.post', 'uses' => 'Auth\ActivationKeyController@resendKey']);
// forgot_username
Route::get('username/reminder', ['as' =>  'username_reminder', 'uses' => 'Auth\ForgotUsernameController@showForgotUsernameForm']);
Route::post('username/reminder', ['as' =>  'username_reminder.post', 'uses' => 'Auth\ForgotUsernameController@sendUserameReminder']);
// Products - old
// Route::resource('products', 'Front\ProductController', ['only' => ['index', 'show']]);
// Shoppings - old
// Route::resource('cart', 'Front\CartController');
// Route::delete('emptyCart', 'Front\CartController@emptyCart');
// Route::post('switchToWishlist/{id}', 'Front\CartController@switchToWishlist');
// Route::resource('wishlist', 'Front\WishlistController');
// Route::delete('emptyWishlist', 'Front\WishlistController@emptyWishlist');
// Route::post('switchToCart/{id}', 'Front\WishlistController@switchToCart');
//Profiles
Route::get('profile', ['as'=>'front.profiles.index','uses'=>'Front\ProfileController@index','middleware' => 'auth']);
Route::patch('profile', ['as'=>'front.profiles.update','uses'=>'Front\ProfileController@update','middleware' => 'auth']);
//Address
Route::get('profile/address',['as'=>'front.profiles.address','uses'=>'Front\ProfileController@address','middleware' => 'auth']);
Route::get('profile/address/create',['as'=>'front.profiles.createaddress','uses'=>'Front\ProfileController@createaddress','middleware' => 'auth']);
Route::post('profile/address/create',['as'=>'front.profiles.storeaddress','uses'=>'Front\ProfileController@storeaddress','middleware' => 'auth']);
Route::get('profile/address/{id}',['as'=>'front.profiles.showaddress','uses'=>'Front\ProfileController@showaddress', 'middleware'=> 'auth']);
Route::get('profile/address/{id}/edit',['as'=>'front.profiles.editaddress','uses'=>'Front\ProfileController@editaddress','middleware' => 'auth']);
Route::patch('profile/address/{id}',['as'=>'front.profiles.updateaddress','uses'=>'Front\ProfileController@updateaddress','middleware' => 'auth']);
Route::delete('profile/address/{id}',['as'=>'front.profiles.destroyaddress','uses'=>'Front\ProfileController@destroyaddress','middleware' => 'auth']);
//Orders
Route::get('order',['as'=>'front.orders.index','uses'=>'Front\OrdersController@index','middleware' => 'auth']);
Route::get('order/create',['as'=>'front.orders.create','uses'=>'Front\OrdersController@create','middleware' => 'auth']);
Route::post('order/create',['as'=>'front.orders.store','uses'=>'Front\OrdersController@store','middleware' => 'auth']);
Route::get('order/{id}',['as'=>'front.orders.show','uses'=>'Front\OrdersController@show', 'middleware'=> 'auth']);
Route::get('order/{id}/edit',['as'=>'front.orders.edit','uses'=>'Front\OrdersController@edit','middleware' => 'auth']);
Route::patch('order/{id}',['as'=>'front.orders.update','uses'=>'Front\OrdersController@update','middleware' => 'auth']);
Route::delete('order/{id}',['as'=>'front.orders.destroy','uses'=>'Front\OrdersController@destroy','middleware' => 'auth']);
Route::post('order',['as'=>'front.orders.find','uses'=>'Front\OrdersController@find','middleware' => 'auth']);
//Order-Sub
Route::delete('order/itemdestroy/{id}', ['as'=>'front.orders.itemdestroy','uses'=>'Front\OrdersController@itemdestroy','middleware' => 'auth']);
//Cart
Route::get('cart',['as'=>'front.carts.index','uses'=>'Front\CartsController@index']);
Route::post('/them-vao-gio-hang',['as'=>'front.carts.create','uses'=>'Front\CartsController@store']);
Route::post('cart/create',['as'=>'front.carts.store','uses'=>'Front\CartsController@store']);
Route::get('cart/{id}',['as'=>'front.carts.show','uses'=>'Front\CartsController@show']);
Route::get('cart/{id}/edit',['as'=>'front.carts.edit','uses'=>'Front\CartsController@edit']);
Route::patch('cart/{id}',['as'=>'front.carts.update','uses'=>'Front\CartsController@update']);
Route::delete('cart/{id}',['as'=>'front.carts.destroy','uses'=>'Front\CartsController@destroy']);
//Cart-Sub
Route::delete('emptyCart', 'Front\CartsController@emptyCart');
/*
//Blogs
Route::get('blogs',['as'=>'front.blogs.index','uses'=>'Front\BlogsController@index']);
Route::get('blogs/{id}',['as'=>'front.blogs.show','uses'=>'Front\BlogsController@show']);
Route::post('blogs/search',['as'=>'fron.blogs.search','uses'=>'Front\BlogsController@search']);
*/

//Multi-language
Route::get('language/{locale}', function ($locale) {
        Session::put('locale', $locale);
        App::setLocale($locale);
        return redirect()->back();
});

// Pages 
Route::get('/products',['as'=>'front.products','uses'=>'Front\PagesController@all_product']);
Route::get('/{slug}.html',['as'=>'front.item.show','uses'=>'Front\PagesController@show']);
Route::any('/search',['as'=>'front.item.search','uses'=>'Front\PagesController@search']);
Route::get('/purchase-flow',['as'=>'front.purchase-flow','uses'=>'Front\PagesController@purchase_flow']);
Route::get('/returns',['as'=>'front.returns','uses'=>'Front\PagesController@returns']);
Route::get('/about-us',['as'=>'front.about-us','uses'=>'Front\PagesController@about_us']);
Route::get('/contact',['as'=>'front.contact','uses'=>'Front\PagesController@contact']);
Route::post('/contact',['as'=>'front.send-contact','uses'=>'Front\PagesController@send_contact']);