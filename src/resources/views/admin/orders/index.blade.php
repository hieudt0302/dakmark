@extends('layouts.admin') 
@section('title','Đơn Hàng - Admin') 
@section('content')

<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
    Sản Phẩm
        <small>Danh Sách</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="#">Đơn Hàng</a></li>
        <li class="active">Danh Sách</li>
    </ol>
</section>
<!-- Main content -->
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title"></h3>Danh Sách Đơn Hàng
                </div>
                <div class="box-body">
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Order No</th>
                                <th>Order Status</th>
                                <th>Payment Status</th>
                                <th>Shipping Status</th>
                                <th>Customer Name</th>
                                <th>Mail</th>
                                <th>Phone</th>
                                <th>Order Date</th>
                                <th>Order Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($orders as $order)
                            <tr>
                                <td>#{{$order->order_no}}</td>
                                <td>{{__('status.order.'.$order->order_status)}}</td>
                                <td>{{__('status.order.'.$order->payment_status)}}</td>
                                <td>{{__('status.order.'.$order->shipping_status)}}</td>
                                <td>{{$order->user->last_name}} {{$order->user->first_name}}</td>
                                <td>{{$order->user->email}}</td>
                                <td>{{$order->user->phone}}</td>
                                <td>{{$order->order_start_date}}</td>
                                <td>{{$order->order_total}}</td>
                                <td></td>
                            </tr>
                            @endforeach
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Order No</th>
                                <th>Order Status</th>
                                <th>Payment Status</th>
                                <th>Shipping Status</th>
                                <th>Customer Name</th>
                                <th>Mail</th>
                                <th>Phone</th>
                                <th>Order Date</th>
                                <th>Order Total</th>
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

@section('scripts') 

@endsection