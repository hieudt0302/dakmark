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
    <!-- SEARCH -->
    <div class="row">
        <div class="col-xs-12">
            <!-- Horizontal Form -->
            <div class="box box-info">
                <div class="box-header with-border">
                <h3 class="box-title">Quick Search</h3>
                </div>
                <!-- /.box-header -->
                <!-- form start -->
                <form class="form-horizontal">
                    <div class="box-body">
                        <div class="form-group">
                            <label for="order_start_date" class="col-sm-2 control-label">Start Date</label>
                            <div class="col-sm-4 input-group date">
                                <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
                                <input type="text" name="order_start_date" class="form-control pull-right" id="start_datepicker">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="order_end_date" class="col-sm-2 control-label">End Date</label>
                            <div class="col-sm-4 input-group date">
                                <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
                                <input type="text" name="order_end_date" class="form-control pull-right" id="end_datepicker">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="customer_name" class="col-sm-2 control-label">Customer Name</label>
                            <div class="col-sm-8">
                                <input type="text" name="customer_name" class="form-control" id="customer_name" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="billing_email" class="col-sm-2 control-label">Billing email</label>
                            <div class="col-sm-8">
                                <input type="email" name="billing_email" class="form-control" id="billing_email" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="order_status" class="col-sm-2 control-label">OrderStatus</label>
                            <div class="col-sm-8">
                                <select id="order_status" multiple name="order_status" class="form-control select2" style="width: 100%;">
                                    @foreach(\Lang::get('status.order') as $key =>$value)
                                    <option value="{{$key}}">{{$value}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="payment_status" class="col-sm-2 control-label">Payment Status</label>
                            <div class="col-sm-8">
                                <select id="payment_status" multiple name="payment_status" class="form-control select2" style="width: 100%;">
                                    @foreach(\Lang::get('status.shipping') as $key =>$value)
                                    <option value="{{$key}}">{{$value}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="shipping_status" class="col-sm-2 control-label">Shipping Status</label>
                            <div class="col-sm-8">
                                <select id="shipping_status" multiple name="shipping_status" class="form-control select2" style="width: 100%;">
                                    @foreach(\Lang::get('status.shipping') as $key =>$value)
                                    <option value="{{$key}}">{{$value}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="order_no" class="col-sm-2 control-label">#Order No</label>
                            <div class="col-sm-8">
                                <input type="text" name="order_no" class="form-control" id="order_no" >
                            </div>
                        </div>
                    </div>
                    <!-- /.box-body -->
                    <div class="box-footer">
                        <button type="submit" class="btn btn-default">Cancel</button>
                        <button type="submit" class="btn btn-info pull-right">Sign in</button>
                    </div>
                    <!-- /.box-footer -->
                </form>
            </div>
            <!-- /.box -->
        </div>
    </div>
    <!-- TABLE -->
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
<script>
    $(function(){
         //Date picker
        $('#start_datepicker').datepicker({
            autoclose: true
        })
        $('#end_datepicker').datepicker({
            autoclose: true
        })

        //Select2
        $('#order_status').select2();
        $('#order_status').on('select2:opening select2:closing', function( event ) {
            var $searchfield = $(this).parent().find('.select2-search__field');
            $searchfield.prop('disabled', true);
        });

        $('#payment_status').select2();
        $('#payment_status').on('select2:opening select2:closing', function( event ) {
            var $searchfield = $(this).parent().find('.select2-search__field');
            $searchfield.prop('disabled', true);
        });

        $('#shipping_status').select2();
        $('#shipping_status').on('select2:opening select2:closing', function( event ) {
            var $searchfield = $(this).parent().find('.select2-search__field');
            $searchfield.prop('disabled', true);
        });
    });
</script>
@endsection