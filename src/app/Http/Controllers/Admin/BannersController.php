<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

use DB;
use Validator;
use Intervention\Image\Facades\Image;

class BannersController extends Controller
{
   	public function index(Request $request){
    }

    public function create(){

    }

    public function store(Request $request){

    }

    public function edit()
    {
        return View('admin.banners.edit');
    }

    public function update(Request $request)
    {   
        //Banner
        if (request()->hasFile('banner-left')) {
            $banner = $request->file('banner-left');            
            $img = Image::make($banner->getRealPath());
            $img->fit(960, 400)
               //->save('frontend/images/uploads/ads-bg1.jpg');                      
               ->save(storage_path('images/uploads/'. $banner->getClientOriginalName()));
        } 
        if (request()->hasFile('banner-right')) {
            $banner = $request->file('banner-right');            
            $img = Image::make($banner->getRealPath());
            $img->fit(960, 400)
               //->save('frontend/images/uploads/ads-bg2.jpg');                      
              ->save(storage_path('images/uploads/'. $banner->getClientOriginalName()));
        } 
        if (request()->hasFile('banner-full')) {
            $banner = $request->file('banner-full');            
            $img = Image::make($banner->getRealPath());
            $img->fit(1920, 400)
               //->save('frontend/images/uploads/ads-bg3.jpg');                      
               ->save(storage_path('images/uploads/'. $banner->getClientOriginalName()));
        }
        if (request()->hasFile('banner-blog')) {
            $banner = $request->file('banner-blog');            
            $img = Image::make($banner->getRealPath());
            $img->fit(270, 370)
               //->save('frontend/images/uploads/sale.jpg');                      
               ->save(storage_path('images/uploads/'. $banner->getClientOriginalName()));
        }          

        //Icon
        if (request()->hasFile('icon-1')) {
            $icon = $request->file('icon-1');            
            $img = Image::make($icon->getRealPath());
            $img->resize(null, 120, function ($constraint) {
                $constraint->aspectRatio();
            //})->save('images/logo/poko.png');    
               })->save(storage_path('images/logo/'. $icon->getClientOriginalName()));
        }
        if (request()->hasFile('icon-2')) {
            $icon = $request->file('icon-2');            
            $img = Image::make($icon->getRealPath());
            $img->resize(null, 120, function ($constraint) {
                $constraint->aspectRatio();
            //})->save('images/logo/origin.png'); 
               })->save(storage_path('images/logo/'. $icon->getClientOriginalName()));
        }
        if (request()->hasFile('icon-3')) {
            $icon = $request->file('icon-3');            
            $img = Image::make($icon->getRealPath());
            $img->resize(null, 120, function ($constraint) {
                $constraint->aspectRatio();
            //})->save('images/logo/fairtrade.png');                      
            })->save(storage_path('app/public/images/logo/'. $icon->getClientOriginalName()));
        }    
        if (request()->hasFile('icon-4')) {
            $icon = $request->file('icon-4');            
            $img = Image::make($icon->getRealPath());
            $img->resize(null, 120, function ($constraint) {
                $constraint->aspectRatio();
            //})->save('images/logo/community-icon.png');      
               })->save(storage_path('app/public/images/logo/'. $icon->getClientOriginalName()));
        }                                                 
      
        return redirect()->back()
        ->with('message', 'Banner/icon đã được cập nhật')
        ->with('status', 'success');
    }

   

    public function destroy($id){

    }

}
