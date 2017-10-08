<?php

namespace App\Http\Controllers\Front;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Carbon\Carbon;
use App\Models\Product;
use App\Models\Post;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $new_products = DB::table('products')->where('created_at', '>=', Carbon::now()->subWeeks(1))->get();
        return View("front/home/index",compact('new_products'));
    }

    public function about()
    {
        return View("front.home.about");
    }
	
	// Tìm kiếm sản phẩm / blogs
    public function search(Request $request){
        $this->validate($request,['keyword' => 'required']);
        $keyword = $request->input('keyword'); 
        
        $products = Product::where("name", "LIKE", "%$keyword%")->paginate(12);   
        $blogs = Post::where("title", "LIKE", "%$keyword%")->paginate(12);   

        return view('front.home.search',compact('keyword','products','blogs'))
                ->with('i', ($request->input('page', 1) - 1) * 12);
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
}
