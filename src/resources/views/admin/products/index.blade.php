@extends('layouts.admin') 
@section('title','Sản Phẩm - Admin') 
@section('content')

<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
    Sản Phẩm
        <small>Danh Sách</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="#">Menu</a></li>
        <li class="active">Danh Sách</li>
    </ol>
</section>
<!-- Main content -->
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title"></h3>Danh Sách Sản Phẩm
                </div>
                <div class="box-body">
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Ảnh</th>
                                <th>Tên</th>
                                <th>SKU</th>
                                <th>Xuất Bản</th>
                                <th>Ngày Tạo</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($products as $product)
                            <tr>
                                <td>
                                   <img src="{{asset('/images/shop/previews/shop-prev-1.jpg')}}" alt="" title="">
                                </td>
                                <td><a href="{{url('/admin/products/')}}/{{$product->id}}/edit">{{$product->name}}</a></td>
                                <td>{{$product->sku}}</td>
                                <td>
                                    @if($product->published==1) 
                                    <i class="fa fa-check true-icon"></i>
                                    @else 
                                    <i class="fa fa-check false-icon"></i>
                                    @endif
                                </td>
                                <td>{{$product->created_at}}</td>
                                <td>
                                  <div class="tools">
                                   <a class="btn btn-primary btn-sm" href="{{url('/')}}/admin/products/{{$product->id}}/edit"> <i class="fa fa-edit"></i></a>
                                  </div>
                                </td>
                                <td>
                                  <div class="tools">
                                    {!! Form::open(['method' => 'DELETE','route' => ['admin.products.destroy', $product->id],'style'=>'display:inline']) !!}
                                    {{ Form::button('<i class="fa fa-trash-o"></i>', ['type' => 'submit','class' => 'btn btn-warning btn-sm'] )  }}
                                    {!! Form::close() !!}  
                                  </div>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Ảnh</th>
                                <th>Tên</th>
                                <th>SKU</th>
                                <th>Xuất Bản(s)</th>
                                <th>Ngày Tạo</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection 

@section('scripts') @endsection