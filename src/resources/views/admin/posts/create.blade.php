@extends('layouts.admin')
@section('title','Bài Viết - Admin')
@section('content')
<!-- Content Header (Page header) -->
<section class="content-header">
      <h1>
        Menu
        <small>Danh Sách</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="#">Bài Viết</a></li>
        <li class="active">Tạo Mới</li>
      </ol>
</section>
<!-- Main content -->
<section class="content">
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Tạo Mới Bài Viết</h3>
                </div>
                <form class="form-horizontal" method="post" action="{{url('/admin/posts/create')}}" id="form" role="form">
                    {{ csrf_field() }}

                    <!-- nagigation tab -->
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

                    <!-- tab details -->
                    <!-- general tab -->
                    <div class="tab-content">
                        <div class="tab-pane active" id="general">
                            <div class="box-body">
                                <div class="form-group">
                                    <label for="title" class="col-sm-2 control-label">Tiêu Đề</label>
                                    <div class="col-sm-10">
                                        <input type="title" name="title" class="form-control" id="title" placeholder="Tiêu đề bài viết">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="slug" class="col-sm-2 control-label">Slug</label>
                                    <div class="col-sm-10">
                                        <input type="slug" name="slug" class="form-control" id="slug" placeholder="Tiêu đề bài viết">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="slug" class="col-sm-2 control-label">Xuất Bản</label>
                                    <div class="col-sm-10">
                                        <!-- <input name="published" type="checkbox" checked> -->
                                        {{ Form::checkbox('published', 1 ,true, array('class' => 'published')) }}
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="slug" class="col-sm-2 control-label">Thể Loại</label>
                                    <div class="col-sm-10">
                                        <select name="category_id" class="form-control select2" style="width: 100%;">
                                            @foreach($categories as $category)
                                            <option value="{{$category->id}}">{{$category->name}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>        
                            </div>
                        </div>

                        <!-- each language tab -->
                        @foreach ($language_list as $language)
                        <div class="tab-pane fade" id="{{$language->id}}-content">                        
                            <div class="box-body">
                                <div class="form-group">
                                    <label for="title" class="col-sm-2 control-label">Tiêu Đề Hiển Thị</label>
                                    <div class="col-sm-10">
                                        <input type="title" name="{{$language->id}}-title" class="form-control" id="title" placeholder="Nhập tiêu đề">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="slug" class="col-sm-12">Đoạn Trích</label>
                                    <div class="col-sm-12">
                                        <textarea name="{{$language->id}}-excerpt" rows="10" cols="80" placeholder="Nhập đoạn trích">
                                                    
                                        </textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="slug" class="col-sm-12">Nội Dung</label>
                                    <div class="col-sm-12">
                                        <textarea id="content-editor" name="{{$language->id}}-content" rows="10" cols="80">
                                                    This is my textarea to be replaced with CKEditor.
                                        </textarea>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="description" class="col-sm-2 control-label">Giới Thiệu</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" name="description" rows="3"  placeholder="SEO"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach                          
                    </div>                        
                    <div class="box-footer">
                        <button type="submit" class="btn btn-primary">Tạo Mới</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>        
@endsection


@section('scripts')
<script>
  $(function () {
    $('.select2').select2();
    // Replace the <textarea id="editor1"> with a CKEditor
    // instance, using default configuration.
    CKEDITOR.replace('excerpt-editor');
    CKEDITOR.replace('content-editor');
    //bootstrap WYSIHTML5 - text editor
    // $('.textarea').wysihtml5()
  })
</script>
@endsection