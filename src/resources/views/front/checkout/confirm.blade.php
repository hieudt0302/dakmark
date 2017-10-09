@extends('layouts.master')
@section('title','Xác Nhận Đơn Hàng - Cà Phê Đăk Hà')
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
                    <a href="#">Cart</a>&nbsp;/&nbsp;<a href="#">Address</a>&nbsp;/&nbsp;<a href="#">Shipping</a>&nbsp;/&nbsp;<span>Payment</span>&nbsp;/&nbsp; <a href="#">Confirm</a>&nbsp;/&nbsp;<span>Complete</span>
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
            <h2 class="section-title font-alt mb-70 mb-sm-40">Xác Nhận Đơn Hàng</h2>
            <h5 class="uppercase mb-30">Vui Lòng Xác Nhận Đơn Hàng</h5>
            <hr>
        </div>
        <div class="row multi-columns-row">
            @if(!empty($billingaddress))
            <div class="col-sm-6 col-md-4 col-lg-4" style="border-radius:.25rem; border: 1px solid rgba(0,0,0,0.125);">
                <div class=" align-center">
                    <div class="alt-features-icon">
                        <!-- <form method="POST" action="{{url('/Checkout/BillingAddress/dev')}}"> -->
                            <!-- {{ csrf_field() }} -->
                            <!-- <input type="hidden" id="billingaddress_id" name="billingaddress_id" value="{{$billingaddress->id}}"> -->
                            <a href="{{url('/Checkout/BillingAddress/dev')}}" class="btn btn-mod btn-large btn-round">Thay Đổi</a>
                        <!-- </form> -->
                    </div>
                    <h3 class="alt-features-title font-alt">Địa Chỉ Thanh Toán</h3>
                    <div class="alt-features-descr align-left">
                        <p>Contact: {{$billingaddress->contact}}</p>
                        <p>Phone: {{$billingaddress->phone}}</p>
                        <p>Address: {{$billingaddress->address}}</p>
                    </div>
                </div>
            </div>
            @endif
            
            @if(!empty($shippingaddress))
            <div class="col-sm-6 col-md-4 col-lg-4" style="border-radius:.25rem; border: 1px solid rgba(0,0,0,0.125);">
                <div class=" align-center">
                    <div class="alt-features-icon">
                        <!-- <form method="POST" action="{{url('/Checkout/ShippingAddress/dev')}}"> -->
                            <!-- {{ csrf_field() }} -->
                            <!-- <input type="hidden" id="shippingaddress_id" name="shippingaddress_id" value="{{$shippingaddress->id}}"> -->
                            <a href="{{url('/Checkout/ShippingAddress/dev')}}" class="btn btn-mod btn-large btn-round">Thay Đổi</a>
                        <!-- </form> -->
                    </div>
                    <h3 class="alt-features-title font-alt">Địa Chỉ Nhận Hàng</h3>
                    <div class="alt-features-descr align-left">
                        <p>Contact: {{$shippingaddress->contact}}</p>
                        <p>Phone: {{$shippingaddress->phone}}</p>
                        <p>Address: {{$shippingaddress->address}}</p>
                    </div>
                </div>
            </div>
            @endif

            <div class="col-sm-6 col-md-4 col-lg-4" style="border-radius:.25rem; border: 1px solid rgba(0,0,0,0.125);">
                <div class=" align-center">
                    <div class="alt-features-icon">
                        <a href="{{url('/Checkout/ShippingMethod/dev')}}" class="btn btn-mod btn-small btn-round">Thay Đổi</a>
                    </div>
                    <h3 class="alt-features-title font-alt">Phương Thức Vận Chuyển</h3>
                    <div class="alt-features-icon">
                        <a href="{{url('/Checkout/PaymentMethod/dev')}}" class="btn btn-mod btn-small btn-round">Thay Đổi</a>
                    </div>
                    <h3 class="alt-features-title font-alt">Phương Thức Thanh Toán</h3>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- End Section -->
@endsection