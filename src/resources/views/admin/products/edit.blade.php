@extends('layouts.admin')
@section('title','Sản Phẩm - Admin')
@section('content')
<!-- Content Header (Page header) -->
<section class="content-header">
      <h1>
      Sản Phẩm
        <small>Cập Nhật</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="#">Sản Phẩm</a></li>
        <li class="active">Cập Nhật</li>
      </ol>
</section>
<!-- Main content -->
<section class="content">
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Cập Nhật Sản Phẩm</h3>
                </div>
                <form class="form-horizontal" method="POST" action="{{url('/admin/products')}}/{{$product->id}}" id="form" role="form">
                  {{csrf_field()}}
                   <input name="_method" type="hidden" value="PATCH">
                    <div class="box-body">
                        <div class="form-group">
                            <label for="sku" class="col-sm-2 control-label">SKU</label>
                            <div class="col-sm-10">
                                <input type="text" name="sku" value="{{$product->sku}}" class="form-control" id="sku">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="name" class="col-sm-2 control-label">Tên</label>
                            <div class="col-sm-10">
                                <input type="text" name="name" value="{{$product->name}}" class="form-control" id="title" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="slug" class="col-sm-2 control-label">Slug</label>
                            <div class="col-sm-10">
                                <input type="text" name="slug" value="{{$product->slug}}" class="form-control" id="slug">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="description" class="col-sm-2 control-label">Mô Tả</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" name="summary" rows="3"  placeholder="SEO">{{$post->description}}</textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="old_price" class="col-sm-2 control-label">Giá Cũ</label>
                            <div class="col-sm-10">
                                <input type="text" name="old_price" value="{{$product->old_price}}" class="form-control" id="old_price" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="price" class="col-sm-2 control-label">Giá Hiện Tại</label>
                            <div class="col-sm-10">
                                <input type="text" name="price" value="{{$product->price}}" class="form-control" id="price" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="special_price" class="col-sm-2 control-label">Giá Khuyến Mãi</label>
                            <div class="col-sm-10">
                                <input type="text" name="special_price" value="{{$product->special_price}}" class="form-control" id="special_price" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="special_price_start_date" class="col-sm-2 control-label">Ngày Khuyến Mãi:</label>
                            <div class="col-sm-10">
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                                <input type="text" name="special_price_start_date" class="form-control" id="reservation-start">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="special_price_end_date" class="col-sm-2 control-label">Ngày Khuyến Mãi:</label>
                            <div class="col-sm-10">
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                                <input type="text" name="special_price_end_date" class="form-control" id="reservation-end">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="slug" class="col-sm-2 control-label">Xuất Bản</label>
                            <div class="col-sm-10">
                                <!-- <input name="published" type="checkbox" checked> -->
                                {{ Form::checkbox('published', 1 ,$post->published ? true : false, array('class' => 'published')) }}
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="slug" class="col-sm-2 control-label">Thể Loại</label>
                            <div class="col-sm-10">
                                <select name="category_id" class="form-control select2" style="width: 100%;">
                                    @foreach($categories as $category)
                                      @if(!empty($post->category_id) && $post->category_id == $category->id)
                                        <option value="{{$category->id}}" selected>{{$category->name}}</option>
                                      @else
                                        <option value="{{$category->id}}">{{$category->name}}</option>
                                      @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>
                       
                    </div>
                    <div class="box-footer">
                        <button type="submit" class="btn btn-primary">Cập Nhật</button>
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
    //Date range picker with time picker
    $('#reservation-start').datepicker({ autoclose: true, timePicker: true, timePickerIncrement: 30, format: 'DD/MM/YYYY h:mm A' })
    $('#reservation-end').datepicker({ autoclose: true, timePicker: true, timePickerIncrement: 30, format: 'DD/MM/YYYY h:mm A' })

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