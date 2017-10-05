<?php

namespace App\Http\Controllers\Front;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Validator;
use \Cart as Cart;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::find($id);
        $reviews = Review::where('product_id',$id)->get();
        return View('front.products.show', compact('product','reviews'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
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

    public function addToCart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|unique:products',
            'name' => 'required',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|numeric|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'INPUT-ERROR: Parameter not pass validation.',
                'status' => 'error'
            ]);
        }
       
        
        Cart::add($request->id, $request->name, $request->quantity, $request->price);
        return response()->json([
            'message' => 'Đã thêm '. $request->quantity .' sản phẩm vào giỏ hàng!',
            'status' => 'success'
        ]);
    }
}
