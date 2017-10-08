<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use App\Models\Post;
use Validator;
class PostsController extends Controller
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
        $blogCategory = Category::where('name','blog')->firstOrFail();
        $categories = Category::where('parent_id',$blogCategory->id)->get();

        return View('admin.posts.create',compact('categories'));
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
            'title' => 'required',
            'slug' => 'required|string|min:5',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
            ->with('message', 'ERROR-INPUT: Code EI1002')
            ->with('status', 'danger')
            ->withInput();
        }

        try{
            $post = new Post();
            $post->title = $request->title;
            $post->slug = $request->slug;
    
            if(!empty($request->excerpt))
                $post->excerpt = $request->excerpt;
    
            if(!empty($request->content))
                $post->content = $request->content;
    
            if(!empty($request->description))
                $post->description = $request->description;
    
            if(!empty($request->category_id))
                $post->category_id = $request->category_id;
    
            $post->author_id = Auth::user()->id;
    

            $post->published = $request->published??0;
    
            $post->save();
    
        }
        catch(\Exception $e)
        {
            var_dump($e->getMessage());die();
        }
        
        return redirect()->back()
        ->with('message', 'Bài viết mới đã được tạo')
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
