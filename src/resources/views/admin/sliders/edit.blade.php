@extends('layouts.admin')
 
@section('content')
	<div class="row">
	    <div class="col-lg-12 margin-tb">
	        <div class="pull-left">
	            <h2>Chỉnh sửa slider</h2>
	        </div>
	        <div class="pull-right">
	            <a class="btn btn-primary" href="{{ route('admin.sliders.index') }}"> Quay lại danh sách slider</a>
	        </div>
	    </div>
	</div>
	@if (count($errors) > 0)
		<div class="alert alert-danger">
			<strong>Lỗi!</strong> Kiểm tra lại thông tin đã nhập.<br><br>
			<ul>
				@foreach ($errors->all() as $error)
					<li>{{ $error }}</li>
				@endforeach
			</ul>
		</div>
	@endif

{!! Form::open(array('method' => 'PATCH','route' => ['admin.sliders.update', $slider->id])) !!}
    <ul class="nav nav-tabs" role="tablist" style="padding-left: 10px">
        <li class="active">
            <a href="#general" data-toggle="tab">Thông tin chung</a>
        </li>          
        @foreach ($language_list as $language)
        <li>
            <a href="#{{$language->id}}-description" data-toggle="tab">Nội dung - {{$language->name}}</a>
        </li>
        @endforeach
    </ul>
    <div class="tab-content">
        <div class="tab-pane active" id="general">
            <table class="table table-responsive">            
                <tr>
                    <td>
                        Tiêu đề
                        <span class="text-danger">*</span>
                    </td>
                    <td>
                        <input type="text" id="title" class="form-control" name="title" value="{{ $slider->title }}"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Url
                        <span class="text-danger">*</span>
                    </td>
                    <td>
                        <input type="text" id="url" class="form-control" name="url" value="{{ $slider->url }}"/>
                    </td>
                </tr>
               <tr>
                    <td>Sắp xếp</td>
                    <td>
                        <input type="text" class="form-control" name="sort_order" value="{{ $slider->order }}"/>
                    </td>
                </tr>
                <tr>
                    <td>Cho phép hiển thị</td>
                    <td>
                        <select name="is_show" class="form-control" value="{{ $slider->is_show }}">
                            <option value="0">Không</option>
                            <option value="1" selected >Có</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        Hình ảnh
                        <span class="text-danger">*</span>
                    </td>
                    <td>
                        <input type="file" name="image" vvalue="{{ $slider->image }}"/>
                        <span class="text-danger">{{ $errors->first('image') }}</span>
                    </td>
                </tr>                               
            </table>                
        </div>

        @foreach ($slider_translations as $slider_tran)
        <div class="tab-pane fade" id="{{$slider_tran->language_id}}-description">
            <input type="hidden" id="slider-translation-id" name="{{$slider_tran->language_id}}-id" value="{{ $slider_tran->id }}" />
            <table class="table table-responsive">
                <tr>
                    <td>Mô tả</td>
                    <span class="text-danger">*</span>                    
                    <td>
                        <textarea class="form-control" name="{{$slider_tran->language_id}}-description">{{ $slider_tran->description }}</textarea>                 
                    </td>
                </tr> 
            </table>
        </div>
        @endforeach
    </div>
    <div style=" text-align: center">
        <button type="submit" class="btn btn-info">Lưu thay đổi</button>
    </div>
</form>    
  
@endsection