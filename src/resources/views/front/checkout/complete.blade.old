@extends('layouts.master')
@section('title','Hoàn Thành Đơn Hàng - Cà Phê Đăk Hà')
@section('content')
<!-- Head Section -->
<section class="small-section bg-gray-lighter">
    <div class="relative container align-left">
        <div class="row">
            <div class="col-md-6">
                <h1 class="hs-line-11 font-alt mb-0">Checkout</h1>
            </div>
            <div class="col-md-6 mt-30">
                <div class="mod-breadcrumbs font-alt align-right">
                    <a href="#">Cart</a>&nbsp;/&nbsp;<a href="#">Address</a>&nbsp;/&nbsp;<a href="#">Shipping</a>&nbsp;/&nbsp;<span>Payment</span>&nbsp;/&nbsp; <a href="#">Confirm</a>&nbsp;/&nbsp;<a href="#">Complete</a>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- End Head Section -->


<!-- Section -->
<section class="page-section">
    <div class="container relative">
        <div class="row">
            <h2 class="section-title font-alt mb-70 mb-sm-40">Hoàn Thành Đơn Hàng</h2>
            <h5 class="uppercase mb-30">Đơn Hàng Của Bạn Đã Được Tạo</h5>
            <hr>
        </div>
        
        <div class="row">
            <h5 class="uppercase mb-30">Mã Đơn Hàng: #xxx-xxx-xxx</h5>
            <hr>
        </div>
        <div class="row">
            <div class="col-sm-8 mb-80">
                <form method="post" action="{{url('/Checkout/Complete/Next')}}" id="form-3" role="form" class="form">
                    {{ csrf_field() }}
                    <div class="mb-20 mb-md-10">
                        <!-- Note -->
                        <input type="hidden" name="order_id" id="order_id" class="form-control input-sm" >
                    </div>
                    <div class="mb-20 mb-md-10">
                        <!-- NEXT -->
                        <button type="submit" class="btn btn-mod btn-large btn-round">ORDER DETAILS</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<!-- End Section -->
@endsection