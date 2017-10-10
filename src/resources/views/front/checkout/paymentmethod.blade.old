@extends('layouts.master')
@section('title','Phương Thức Thanh Toán - Cà Phê Đăk Hà')
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
                    <a href="#">Cart</a>&nbsp;/&nbsp;<a href="#">Address</a>&nbsp;/&nbsp;<a href="#">Shipping</a>&nbsp;/&nbsp;<a href="#">Payment</a>&nbsp;/&nbsp;<span>Confirm</span>&nbsp;/&nbsp;<span>Complete</span>
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
            <h2 class="section-title font-alt mb-70 mb-sm-40">Phương Thức Thanh Toán</h2>
            <h5 class="uppercase mb-30">Chọn Phương Thức</h5>
            <hr>
        </div>
        <div class="row">
            <form method="POST" action="{{url('/Checkout/PaymentMethod/Next')}}">
                {{ csrf_field() }}
                <div class="mb-20 mb-md-10">
                    <select name="paymentmethod_id" class="form-control input-lg">
                        <option value="1">VISA</option>
                        <option value="2">Paypal</option>
                        <option value="3">Chuyển Khoản</option>
                        <option value="4">Thanh Toán Tại Công Ty</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-mod btn-large btn-round">Next</button>
            </form>
        </div>
    </div>
</section>
<!-- End Section -->
@endsection