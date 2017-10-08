<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use App\Models\Product;
use Validator;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        return View('admin.products.index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $shopCategory = Category::where('name', 'shop')->firstOrFail();
        $categories = Category::where('parent_id', $shopCategory->id)->get();

        return View('admin.products.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'slug' => 'required|string|min:5',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
            ->with('message', 'ERROR-INPUT: Code EI1002')
            ->with('status', 'danger')
            ->withInput();
        }

        $product = new Product();

        $product->name = $request->name;
        $product->slug = $request->slug;
    
        if (!empty($request->sku)) {
            $product->sku = $request->sku;
        }
    
        if (!empty($request->summary)) {
            $product->summary = $request->summary;
        }
    
        if (!empty($request->description)) {
            $product->description = $request->description;
        }
    
        if (!empty($request->specs)) {
            $product->specs = $request->specs;
        }
    
        if (!empty($request->old_price)) {
            $product->old_price = $request->old_price;
        }
    
        if (!empty($request->price)) {
            $product->price = $request->price;
        }
    
        if (!empty($request->special_price)) {
            $product->special_price = $request->special_price;
        }
    
        if (!empty($request->special_price_start_date)) {
            $product->special_price_start_date = $request->special_price_start_date;
        }
    
        if (!empty($request->special_price_end_date)) {
            $product->special_price_end_date = $request->special_price_end_date;
        }
    
        if (!empty($request->minimum_amount)) {
            $product->minimum_amount = $request->minimum_amount;
        }
                
        if (!empty($request->maximum_amount)) {
            $product->maximum_amount = $request->maximum_amount;
        }
                
    
        if (!empty($request->category_id)) {
            $product->category_id = $request->category_id;
        }
    
        $product->author_id = Auth::user()->id;

        $product->disable_buy_button = $request->disable_buy_button??0;
        $product->disable_wishlist_button = $request->disable_wishlist_button??0;
        $product->call_for_price = $request->call_for_price??0;
        $product->sold_off = $request->sold_off??0;

        $product->published = $request->published??0;

        $product->save();
    
       
        
        return redirect()->back()
        ->with('message', 'Sản phẩm mới đã được tạo')
        ->with('status', 'success');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $shopCategory = Category::where('name', 'shop')->firstOrFail();
        $categories = Category::where('parent_id', $shopCategory->id)->get();
        $product = Product::where('id', $id)->firstOrFail();
        return View('admin.products.edit', compact('product', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'slug' => 'required|string|min:5',
            
        ]);

        if ($validator->fails()) {
            return redirect()->back()
            ->with('message', 'ERROR-INPUT: Code EI1002')
            ->with('status', 'danger')
            ->withInput();
        }

        $product = Product::find($id);
        
        $product->name = $request->name;
        $product->slug = $request->slug;

        if (!empty($request->sku)) {
            $product->sku = $request->sku;
        }

        if (!empty($request->summary)) {
            $product->summary = $request->summary;
        }

        if (!empty($request->description)) {
            $product->description = $request->description;
        }

        if (!empty($request->specs)) {
            $product->specs = $request->specs;
        }

        if (!empty($request->old_price)) {
            $product->old_price = $request->old_price;
        }

        if (!empty($request->price)) {
            $product->price = $request->price;
        }

        if (!empty($request->special_price)) {
            $product->special_price = $request->special_price;
        }

        if (!empty($request->special_price_start_date)) {
            $product->special_price_start_date = $request->special_price_start_date . ' 00:00:00' ;
        }

        if (!empty($request->special_price_end_date)) {
            $product->special_price_end_date = $request->special_price_end_date. ' 23:59:59' ;
        }

            //
        if (!empty($request->minimum_amount)) {
            $product->minimum_amount = $request->minimum_amount;
        }
            
                //
        if (!empty($request->special_price)) {
            $product->maximum_amount = $request->maximum_amount;
        }
            

        if (!empty($request->category_id)) {
            $product->category_id = $request->category_id;
        }

        $product->author_id = Auth::user()->id;

        $product->disable_buy_button = $request->disable_buy_button??0;
        $product->disable_wishlist_button = $request->disable_wishlist_button??0;
        $product->call_for_price = $request->call_for_price??0;
        $product->sold_off = $request->sold_off??0;

        $product->published = $request->published??0;

        $product->save();
        
        return redirect()->back()
        ->with('message', 'Sản phẩm đã được cập nhật.')
        ->with('status', 'success');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
