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

/* FAQ */
Route::get('/faqs', 'Front\FaqController@index');

/* PRODUCT */
Route::get('/products', 'Front\ProductsController@index');
Route::get('/products/{id}', 'Front\ProductsController@show');
Route::post('/add-to-cart', 'Front\ProductsController@addToCart');

/* POST */
Route::get('/posts', 'Front\PostsController@index');
Route::get('/posts/{slug}', 'Front\PostsController@show');

/* REVIEW - PRODUCT */
Route::post('/products/{id}/review', 'Front\ReviewsController@store');
/* COMMENT - PRODUCT */
Route::post('/posts/{slug}/comment', 'Front\CommentsController@store');

/* MENU */
 Route::get('/{parent}/{slug}', 'Front\MenuController@menu');

/* ADMIN */
Route::group(['namespace' => 'Admin', 'prefix' => 'admin', 'middleware' => 'auth'], function() {

    //Dashboard
    Route::get('/', ['as' => 'admin.dashboard.index', 'uses' => 'DashboardController@index']);

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
    //Orders
    Route::get('orders',['as'=>'admin.orders.index','uses'=>'OrdersController@index','middleware' => ['permission:order-list']]);
    Route::get('orders/create',['as'=>'admin.orders.create','uses'=>'OrdersController@create','middleware' => ['permission:order-create']]);
    Route::post('orders/create',['as'=>'admin.orders.store','uses'=>'OrdersController@store','middleware' => ['permission:order-create']]);
    Route::get('orders/{id}',['as'=>'admin.orders.show','uses'=>'OrdersController@show', 'middleware' => ['permission:order-show']]);
    Route::get('orders/{id}/edit',['as'=>'admin.orders.edit','uses'=>'OrdersController@edit','middleware' => ['permission:order-edit']]);
    Route::patch('orders/{id}',['as'=>'admin.orders.update','uses'=>'OrdersController@update','middleware' => ['permission:order-edit']]);
    Route::post('orders/{id}',['as'=>'admin.orders.destroy','uses'=>'OrdersController@destroy','middleware' => ['permission:order-delete']]);
    Route::post('orders',['as'=>'admin.orders.find','uses'=>'OrdersController@find','middleware' => ['permission:order-list']]);
    
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
	
    // Route::get('blog-cat',['as'=>'admin.blog-cat','uses'=>'BlogController@blogCatList']);
    // Route::get('blog-cat/add',['as'=>'admin.blog-cat.add','uses'=>'BlogController@addBlogCat']);
    // Route::post('blog-cat/add',['as'=>'admin.blog-cat.insert','uses'=>'BlogController@insertBlogCat']);
    // Route::get('blog-cat/edit/{id}',['as'  =>'admin.blog-cat.edit','uses' => 'BlogController@editBlogCat']);
    // Route::post('blog-cat/edit/{id}',['as' =>'admin.blog-cat.update','uses' => 'BlogController@updateBlogCat']);
    // Route::get('blog-cat/delete/{id}',['as'  =>'admin.blog-cat.delete','uses' => 'BlogController@deleteBlogCat']);
    // Route::get('blog',['as'=>'admin.blog','uses'=>'BlogController@blogList']);
    // Route::get('blog/add',['as'=>'admin.blog.add','uses'=>'BlogController@addBlog']);
    // Route::post('blog/add',['as'=>'admin.blog.insert','uses'=>'BlogController@insertBlog']);
    // Route::get('blog/edit/{id}',['as'  =>'admin.blog.edit','uses' => 'BlogController@editBlog']);
    // Route::post('blog/edit/{id}',['as' =>'admin.blog.update','uses' => 'BlogController@updateBlog']);
    // Route::get('blog/delete/{id}',['as'  =>'admin.blog.delete','uses' => 'BlogController@deleteBlog']);
    // Route::post('blog',['as'=>'admin.blog.search','uses'=>'BlogController@searchBlog']);

    // Route::post('generate-slug',['as'=>'admin.generate-slug','uses'=>'ProductController@generate_slug']);
    // Route::post('get-system-cat/{system_id}',['as'=>'admin.get-system-cat','uses'=>'NavigatorController@get_system_cat']);

    //FAQs
    Route::get('faqs',['as'=>'admin.faqs.index','uses'=>'FaqController@index']);
    Route::get('faqs/create',['as'=>'admin.faqs.create','uses'=>'FaqController@create']);
    Route::post('faqs/create',['as'=>'admin.faqs.store','uses'=>'FaqController@store']);
    Route::get('faqs/{id}',['as'  =>'admin.faqs.show','uses' => 'FaqController@show']);
    Route::get('faqs/{id}/edit',['as'  =>'admin.faqs.edit','uses' => 'FaqController@edit']);
    Route::patch('faqs/{id}',['as'  =>'admin.faqs.update','uses' => 'FaqController@update']);    
    Route::delete('faqs/{id}',['as'  =>'admin.faqs.destroy','uses' => 'FaqController@destroy']); 

    //Menu
    Route::get('menu/{dev}',['as'=>'admin.menu.index','uses'=>'MenuController@index', 'middleware'=> ['role:admin|manager']]);

    //Blog
    Route::get('posts/dev',['as'=>'admin.posts.index','uses'=>'PostsController@index','middleware' => ['role:admin|manager']]);
    Route::get('posts/create',['as'=>'admin.posts.create','uses'=>'PostsController@create','middleware' => ['role:admin|manager']]);
    Route::post('posts/create',['as'=>'admin.posts.store','uses'=>'PostsController@store','middleware' => ['role:admin|manager']]);
    Route::get('posts/{id}/edit',['as'=>'admin.posts.edit','uses'=>'PostsController@edit','middleware' => ['role:admin|manager']]);
    Route::patch('posts/{id}',['as'=>'admin.posts.update','uses'=>'PostsController@update','middleware' => ['role:admin|manager']]);
    Route::delete('posts/{id}',['as'=>'admin.posts.destroy','uses'=>'PostsController@destroy','middleware' => ['role:admin|manager']]);

});

