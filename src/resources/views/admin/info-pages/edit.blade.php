@extends('layouts.admin')
 
@section('content')
	<div class="row">
	    <div class="col-lg-12 margin-tb">
	        <div class="pull-left">
	            <h2>Chỉnh sửa trang thông tin</h2>
	        </div>
	        <div class="pull-right">
	            <a class="btn btn-primary" href="{{ route('admin.info-pages.index') }}"> Quay lại danh sách trang thông tin</a>
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

{!! Form::open(array('method' => 'PATCH','route' => ['admin.info-pages.update', $info_page->id])) !!}
    <ul class="nav nav-tabs" role="tablist" style="padding-left: 10px">
        <li class="active">
            <a href="#general" data-toggle="tab">Thông tin chung</a>
        </li>          
        @foreach ($language_list as $language)
        <li>
            <a href="#{{$language->id}}-content" data-toggle="tab">Nội dung - {{$language->name}}</a>
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
                        <input type="text" id="title" class="form-control" name="title" value="{{ $info_page->title }}"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Slug
                        <span class="text-danger">*</span>
                    </td>
                    <td>
                        <input type="text" id="slug" class="form-control" name="slug" value="{{ $info_page->slug }}"/>
                        <span class="text-danger">{{ $errors->first('slug') }}</span>
                    </td>
                    <td style="padding-left:10px">
                        <button type="button" id="generate-slug" class="btn btn-warning">Tạo slug</button>
                    </td>
                </tr>              
            </table>                
        </div>

        @foreach ($info_page_translations as $info_page_tran)
        <div class="tab-pane fade" id="{{$info_page_tran->language_id}}-content">
            <input type="hidden" id="info_page-translation-id" name="{{$info_page_tran->language_id}}-id" value="{{ $info_page_tran->id }}" />
            <table class="table table-responsive">
                <tr>
                    <td>
                        Tiêu đề hiển thị
                        <span class="text-danger">*</span>
                    </td>
                    <td>
                        <input type="text" id="title" class="form-control" name="{{$info_page_tran->language_id}}-title" value="{{ $info_page_tran->title }}" />
                    </td>
                </tr>                
                <tr>
                    <td>Nội dung</td>
                    <span class="text-danger">*</span>                    
                    <td>
                        <textarea class="form-control ckeditor" name="{{$info_page_tran->language_id}}-content">{{ $info_page_tran->content }}</textarea>
                        <script type="text/javascript">
                          CKEDITOR.replace( '{{$info_page_tran->language_id}}-content' );
                          CKEDITOR.add            
                        </script>                    
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
  
<script src="{{asset('/ckeditor/ckeditor.js')}}"></script>   
<script type="text/javascript">
    $(document).ready(function(){
        $.ajaxSetup({
            headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $("#generate-slug").click(function(){
            var title = $("#title").val();
            $.ajax({
                type: "POST",
                url: "{{url('/admin/generate-slug')}}" ,
                data: {
                    name: title,
                },
                success: function(res){
                    $('#slug').val(res);
                },
                error: function (data) {
                    console.log(data);
                }
            });
        });
    });

</script>  
@endsection