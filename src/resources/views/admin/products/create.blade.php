@extends('layouts.admin')
@section('title','Sản Phẩm - Admin')
@section('content')
<!-- Content Header (Page header) -->
<section class="content-header">
      <h1>
      Sản Phẩm
        <small>Tạo Mới</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="#">Sản Phẩm</a></li>
        <li class="active">Tạo Mới</li>
      </ol>
</section>
<!-- Main content -->
<section class="content">
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Tạo Mới Sản Phẩm</h3>
                </div>
                <form class="form-horizontal" method="POST" action="{{url('/admin/products/create')}}" id="form" role="form">
                  {{csrf_field()}}
                    <div class="box-body">
                        <div class="form-group">
                            <label for="sku" class="col-sm-2 control-label">SKU</label>
                            <div class="col-sm-10">
                                <input type="text" name="sku" class="form-control" id="sku">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="name" class="col-sm-2 control-label">Tên</label>
                            <div class="col-sm-10">
                                <input type="text" name="name" class="form-control" id="name" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="slug" class="col-sm-2 control-label">Slug</label>
                            <div class="col-sm-10">
                                <input type="text" name="slug" class="form-control" id="slug">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="summary" class="col-sm-2 control-label">Mô Tả</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" name="summary" rows="3"  placeholder="summary"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="old_price" class="col-sm-2 control-label">Giá Cũ</label>
                            <div class="col-sm-10">
                                <input type="text" name="old_price" class="form-control" id="old_price" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="price" class="col-sm-2 control-label">Giá Hiện Tại</label>
                            <div class="col-sm-10">
                                <input type="text" name="price" class="form-control" id="price" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="special_price" class="col-sm-2 control-label">Giá Khuyến Mãi</label>
                            <div class="col-sm-10">
                                <input type="text" name="special_price"  class="form-control" id="special_price" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="special_price_start_date" class="col-sm-2 control-label">Ngày Khuyến Mãi:</label>
                            <div class="col-sm-10 input-group">
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                                <input type="text" name="special_price_start_date" class="form-control" id="reservation-start">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="special_price_end_date" class="col-sm-2 control-label">Ngày Khuyến Mãi:</label>
                            <div class="col-sm-10 input-group">
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                                <input type="text" name="special_price_end_date" class="form-control" id="reservation-end">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="minimum_amount" class="col-sm-2 control-label">Đặt Hàng Tối Thiểu</label>
                            <div class="col-sm-10">
                                <input type="text" name="minimum_amount" class="form-control" id="minimum_amount" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="maximum_amount" class="col-sm-2 control-label">Đặt Hàng Tối Đa</label>
                            <div class="col-sm-10">
                                <input type="text" name="maximum_amount" class="form-control" id="maximum_amount" >
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-10 col-sm-offset-2 checkbox">
                                <label>{{ Form::checkbox('disable_buy_button', 1 , false, array('class' => 'disable_buy_button')) }}Ẩn Nút Mua</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-10 col-sm-offset-2 checkbox">
                                <label>{{ Form::checkbox('disable_wishlist_button', 1 ,false, array('class' => 'disable_wishlist_button')) }}Ẩn Nút Mong Ước</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-10 col-sm-offset-2 checkbox">
                                <label>{{ Form::checkbox('call_for_price', 1 ,false, array('class' => 'call_for_price')) }}Gọi Điện Báo Giá</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-10 col-sm-offset-2 checkbox">
                                <label>{{ Form::checkbox('sold_off', 1 , false, array('class' => 'sold_off')) }}Hết Hàng</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-10 col-sm-offset-2 checkbox">
                                <label>{{ Form::checkbox('published', 1 , true, array('class' => 'published')) }}Xuất Bản</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="description" class="col-sm-2 control-label">Giới Thiệu</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" name="description" rows="3"  placeholder="description"></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="specs" class="col-sm-2 control-label">Đặc Tả</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" name="specs" rows="3"  placeholder="specs"></textarea>
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
    //Date range picker with time picker
    $('#reservation-start').datepicker({ autoclose: true, format: 'yyyy-mm-dd' })
    $('#reservation-end').datepicker({ autoclose: true,  format: 'yyyy-mm-dd' })

    $('.select2').select2();
    // Replace the <textarea id="editor1"> with a CKEditor
    // instance, using default configuration.
    // CKEDITOR.replace('excerpt-editor');
    // CKEDITOR.replace('content-editor');
    //bootstrap WYSIHTML5 - text editor
    // $('.textarea').wysihtml5()
  })
</script>
@endsection