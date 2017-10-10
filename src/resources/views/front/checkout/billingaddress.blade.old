@extends('layouts.master')
@section('title','Địa Chỉ Thanh Toán Hóa Đơn - Cà Phê Đăk Hà')
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
                    <a href="#">Cart</a>&nbsp;/&nbsp;<a href="#">Address</a>&nbsp;/&nbsp;<span>Shipping</span>&nbsp;/&nbsp;<span>Payment</span>&nbsp;/&nbsp;<span>Confirm</span>&nbsp;/&nbsp;<span>Complete</span>
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
            <h2 class="section-title font-alt mb-70 mb-sm-40">Địa Chỉ Thanh Toán</h2>
            <h5 class="uppercase mb-30">Chọn Địa Chỉ</h5>
            <hr>
        </div>
        <div class="row multi-columns-row">
            @foreach($book_addresses as $bookaddress)
            <div class="col-sm-6 col-md-4 col-lg-4" style="border-radius:.25rem; border: 1px solid rgba(0,0,0,0.125);">
                <div class=" align-center">
                    <div class="alt-features-icon">
                        <form method="POST" action="{{url('/Checkout/BillingAddress/Next')}}">
                            {{ csrf_field() }}
                            <input type="hidden" id="bookaddress_id" name="bookaddress_id" value="{{$bookaddress->id}}">
                            <button type="submit" class="btn btn-mod btn-large btn-round">Bill to this address</button>
                        </form>
                    </div>
                    <h3 class="alt-features-title font-alt">{{$bookaddress->contact}}</h3>
                    <div class="alt-features-descr align-left">
                        <p>Phone: {{$bookaddress->phone}}</p>
                        <p>Address: {{$bookaddress->address}}</p>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
        <div class="row">
            <h5 class="uppercase mb-30">Hoặc Thêm Địa Chỉ Khác</h5>
            <hr>
        </div>
        <div class="row">
            <div class="col-sm-8 mb-80">
                <form method="post" action="{{url('/Checkout/BillingAddress/Next')}}" id="form-3" role="form" class="form">
                    {{ csrf_field() }}
                    <!-- SET NULL -->
                    <input type="hidden" id="bookaddress_id" name="bookaddress_id">

                    <div class="mb-20 mb-md-10">
                        <!-- Contact -->
                        <input type="text" name="contact" id="contact" class="form-control input-sm" placeholder="Contact (*)" maxlength="100">
                    </div>
                    <div class="mb-20 mb-md-10">
                        <!-- Phone -->
                        <input type="text" name="phone" id="phone" class="form-control input-sm" placeholder="Phone (*)" maxlength="100">
                    </div>
                    <div class="mb-20 mb-md-10">
                        <!-- Address -->
                        <input type="text" name="address" id="address" class="form-control input-sm" placeholder="Address (*)" maxlength="100">
                    </div>
                    <div class="mb-20 mb-md-10">
                        <!-- District -->
                        <input type="text" name="district" id="district" class="form-control input-sm" placeholder="District" maxlength="100">
                    </div>
                    <div class="mb-20 mb-md-10">
                        <!-- City -->
                        <input type="text" name="city" id="city" class="form-control input-sm" placeholder="City" maxlength="100">
                    </div>
                    <div class="mb-20 mb-md-10">
                        <!-- Country -->
                        <input type="text" name="country" id="country" class="form-control input-sm" placeholder="Country" maxlength="100">
                    </div>
                    <div class="mb-20 mb-md-10">
                        <!-- ZipCode -->
                        <input type="text" name="zipcode" id="zipcode" class="form-control input-sm" placeholder="ZipCode" maxlength="100">
                    </div>
                    <div class="mb-20 mb-md-10">
                        <!-- Fax -->
                        <input type="text" name="fax" id="fax" class="form-control input-sm" placeholder="Fax" maxlength="100">
                    </div>
                    <div class="mb-20 mb-md-10">
                        <!-- Email -->
                        <input type="text" name="email" id="email" class="form-control input-sm" placeholder="Email" maxlength="100">
                    </div>
                    <div class="mb-20 mb-md-10">
                        <!-- NEXT -->
                        <button type="submit" class="btn btn-mod btn-large btn-round">NEXT</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<!-- End Section -->
@endsection