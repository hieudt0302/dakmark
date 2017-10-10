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
                        <!-- <form method="POST" action="{{url('/Checkout/BillingAddress')}}"> -->
                            <!-- {{ csrf_field() }} -->
                            <!-- <input type="hidden" id="billingaddress_id" name="billingaddress_id" value="{{$billingaddress->id}}"> -->
                            <a href="{{url('/Checkout/BillingAddress')}}" class="btn btn-mod btn-large btn-round">Thay Đổi</a>
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
                        <!-- <form method="POST" action="{{url('/Checkout/ShippingAddress')}}"> -->
                            <!-- {{ csrf_field() }} -->
                            <!-- <input type="hidden" id="shippingaddress_id" name="shippingaddress_id" value="{{$shippingaddress->id}}"> -->
                            <a href="{{url('/Checkout/ShippingAddress')}}" class="btn btn-mod btn-large btn-round">Thay Đổi</a>
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
                        <a href="{{url('/Checkout/ShippingMethod')}}" class="btn btn-mod btn-small btn-round">Thay Đổi</a>
                    </div>
                    <h3 class="alt-features-title font-alt">Phương Thức Vận Chuyển</h3>
                    <div class="alt-features-icon">
                        <a href="{{url('/Checkout/PaymentMethod')}}" class="btn btn-mod btn-small btn-round">Thay Đổi</a>
                    </div>
                    <h3 class="alt-features-title font-alt">Phương Thức Thanh Toán</h3>
                </div>
            </div>
            <hr>
        </div>
        <div class="row">
            <h5 class="uppercase mb-30">Sản Phẩm</h5>
            <hr>
        </div>

        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped shopping-cart-table">
                    <tr>
                        <th class="hidden-xs">
                            Photo
                        </th>
                        <th>
                            Product
                        </th>
                        <th>
                            Q-ty
                        </th>
                        <th>
                            Total
                        </th>
                        <th>
                            
                        </th>
                    </tr>
                    @foreach(Cart::content() as $row)
                    <tr>
                        <td class="hidden-xs">
                            <a href=""><img src="images/shop/previews/shop-prev-5.jpg" alt=""/></a>
                        </td>
                        <td>
                            <a href="#" title="">{{$row->name}}</a>
                        </td>
                        <td>
                            <form class="form">
                               <input type="number" class="input-sm" style="width: 60px;" min="1" max="100" value="{{$row->qty}}" />
                            </form>
                        </td>
                        <td>
                            {{$row->price}}
                        </td>
                        <td>
                            <a href=""><i class="fa fa-times"></i> <span class="hidden-xs">Remove</span></a>
                        </td>
                    </tr>
                    @endforeach
                </table>
                <hr />
                <div class="row">
                    <div class="col-sm-4 col-sm-offset-8 text align-right">
                        <div>
                            <a href="" class="btn btn-mod btn-gray btn-round btn-small">Update Cart</a>
                        </div>
                    </div>
                </div>
                <hr class="mb-60" />
                <div class="row">
                    <div class="col-sm-6 col-sm-offset-6 text align-right pt-10">
                        <div>
                            Cart subtotal: <strong>{{Cart::subtotal()}}</strong>
                        </div>
                        <div class="mb-10">
                            Shipping: <strong>$0.00</strong>
                        </div>
                        <div class="lead mt-0 mb-30">
                            Order Total: <strong>{{Cart::total()}}</strong>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
        </div>

        <div class="row">
            <div class="col-sm-8 mb-80">
                <form method="post" action="{{url('/Checkout/Confirm/Next')}}" id="form-3" role="form" class="form">
                    {{ csrf_field() }}
                    <div class="mb-20 mb-md-10">
                        <!-- Note -->
                        <input type="text" name="note" id="note" class="form-control input-sm" placeholder="Note" maxlength="100">
                    </div>
                    <div class="mb-20 mb-md-10">
                        <!-- NEXT -->
                        <button type="submit" class="btn btn-mod btn-large btn-round">CONFIRM</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<!-- End Section -->
@endsection