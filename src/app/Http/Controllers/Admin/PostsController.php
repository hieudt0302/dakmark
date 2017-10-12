<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use App\Models\Post;
use App\Models\PostTranslation;
use App\Models\Language;
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
        $posts = Post::all();
        return View('admin.posts.index',compact('posts'));
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
        $language_list = Language::all();    

        return View('admin.posts.create',compact('categories','language_list'));
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

            $post = new Post();
            $post->title = $request->title;
            $post->slug = $request->slug;
            if(!empty($request->category_id))
                $post->category_id = $request->category_id;
            $post->author_id = Auth::user()->id;
            $post->published = $request->published??0;

            $img_name = '' ;
            $img_file = $request->file('img');
            if($img_file != NULL){
                $path = './public/assets/img/blog';
                $img = Image::make($img_file->getRealPath());
                $img->fit(370, 200)->save($path.'/'.$img_file->getClientOriginalName());            
                $img_name = $img_file->getClientOriginalName();
            }
            $post->img = $img_name;

            $post->save();            

            $language_list = Language::all();
            foreach ($language_list as $language){ 
                $post_translation = new PostTranslation;
                $post_translation->post_id = $post->id;
                $post_translation->language_id = $language->id;
                $post_translation->title = $request->input($language->id.'-title');            
                $post_translation->content = $request->input($language->id.'-content');
                $post_translation->excerpt = $request->input($language->id.'-excerpt');
                $post_translation->description = $request->input($language->id.'-description');                                   
                $post_translation->save();
            }    
        
        return redirect()->back()
        ->with('success_message', 'Bài viết mới đã được tạo');
        
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
        $blogCategory = Category::where('name','blog')->firstOrFail();
        $categories = Category::where('parent_id',$blogCategory->id)->get();
        $post = Post::where('id',$id)->firstOrFail();
        $language_list = Language::all();
        $post_translations = PostTranslation::where('post_id',$id)->orderBy('language_id','asc')->get();        
        return View('admin.posts.edit',compact('post','post_translations','language_list','categories'));
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
            'title' => 'required',
            'slug' => 'required|string|min:5',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
            ->with('message', 'ERROR-INPUT: Code EI1002')
            ->with('status', 'danger')
            ->withInput();
        }

        $post = Post::find($id);
        
        $post->title = $request->title;
        $post->slug = $request->slug;
        if(!empty($request->category_id))
            $post->category_id = $request->category_id;

        $post->author_id = Auth::user()->id;
        $post->published = $request->published??0;
        
        $img_name = '' ;
        $img_file = $request->file('img');
        if($img_file != NULL){
            $path = './public/assets/img/blog';
            $img = Image::make($img_file->getRealPath());
            $img->fit(370, 200)->save($path.'/'.$img_file->getClientOriginalName());            
            $img_name = $img_file->getClientOriginalName();
        }
        $post->img = $img_name;

        $post->save();


        $language_list = Language::all();
        foreach ($language_list as $language){
            $post_tran_id=$request->input($language->id.'-id');
            $post_translation = PostTranslation::find($post_tran_id);
            if ($post_translation == null) {
                $post_translation = new PostTranslation;
                $post_translation->post_id = $post->id;                
                $post_translation->language_id = $language->id;                
            }
            $post_translation->title = $request->input($language->id.'-title');            
            $post_translation->content = $request->input($language->id.'-content');
            $post_translation->excerpt = $request->input($language->id.'-excerpt');
            $post_translation->description = $request->input($language->id.'-description');                                   
            $post_translation->save();
        }

        return redirect()->back()
        ->with('success_message', 'Bài viết đã được cập nhật');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        $post->delete();
        session()->flash('success_message', "Xóa thành công!");        
        return redirect()->route('admin.posts.index'); 
    }
}
