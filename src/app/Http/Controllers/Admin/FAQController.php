<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Faq;
use App\Models\FaqTranslation;
use App\Models\Language;
use DB;

class FaqController extends Controller
{

       /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $faqs = FaqTranslation::where('language_id',1)->orderBy('faq_id', 'desc')->paginate(10);
        return view('admin.faqs.index',compact('faqs'))
        ->with('i', ($request->input('page', 1) - 1) * 10);        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $language_list = Language::all();        
        return view('admin.faqs.create',compact('language_list'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $faq = new Faq;
        $faq->save();
        $this->validate($request,['1-question' => 'required',
                                  '1-answer' => 'required'
                                ]);

        // Update data bảng faq
        $language_list = Language::all();
        foreach ($language_list as $language){ 
            $faq_translation = new FaqTranslation;
            $faq_translation->faq_id = $faq->id;
            $faq_translation->language_id = $language->id;
            $faq_translation->question = $request->input($language->id.'-question');
            $faq_translation->answer = $request->input($language->id.'-answer');
            $faq_translation->save();
        }
        session()->flash('success_message', "Thêm mới thành công !");
        return redirect()->route('admin.faqs.index'); 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $language_list = Language::all();
        $faq_translations = FaqTranslation::where('faq_id',$id)->orderBy('language_id','asc')->get();
        return view('admin.faqs.show',compact('language_list','faq_translations'));        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $faq = Faq::find($id);
        $language_list = Language::all();
        $faq_translations = FaqTranslation::where('faq_id',$id)->orderBy('language_id','asc')->get();
        return view('admin.faqs.edit',compact('faq','language_list','faq_translations'));                  
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
        $faq = Faq::find($id);
        $this->validate($request,['1-question' => 'required',
                                  '1-answer' => 'required'
                                ]);

        // Update data bảng faq
        $language_list = Language::all();
        foreach ($language_list as $language){
            $faq_tran_id=$request->input($language->id.'-id');
            $faq_translation = FaqTranslation::find($faq_tran_id);
            if ($faq_translation == null) {
                $faq_translation = new FaqTranslation;
            }
            $faq_translation->question = $request->input($language->id.'-question');
            $faq_translation->answer = $request->input($language->id.'-answer');
            $faq_translation->save();
        }
        session()->flash('success_message', "Cập nhật thành công !");
        return redirect()->route('admin.faqs.index'); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $faq = Faq::find($id);
        $faq->delete();
        session()->flash('success_message', "Xóa thành công!");        
        return redirect()->route('admin.faqs.index'); 
    }
}
