@extends('layouts.master')
@section('title','Chi Tiết Đơn Hàng - Pô Kô Farms')
@section('header')
@parent
<!-- OVERRIDER MASTER CSS -->
<link rel="stylesheet" href="{{ asset('css/custom-order.css') }}">
@stop
@section('content')
<div id="content-wrapper">
    <section id="content" class="container mt-3">
        <div id="content-body" class="row row-hardcode mt-4">
            <div id="content-center" class="col-lg-12">
                <div class="page page-order-details">
                    <div class="clearfix mb-3">
                        <div class="page-title mb-3 float-sm-left">
                            <h1 class="h2 mb-0">
                                @lang('account.order-details')
                                <small class="text-muted">
                                    <small>#{{$order->order_no}}</small>
                                </small>
                            </h1>
                        </div>
                        <div class="print-buttons float-sm-right">
                            <!-- <a href="/Order/print/11346?pdf=False" target="print" class="btn btn-secondary btn-sm print-order-button" rel="nofollow">
                                <i class="fa fa-print"></i>
                                <span>Print</span>
                            </a>
                            <a href="/Order/print/11346?pdf=True" class="btn btn-secondary btn-sm pdf-order-button" rel="nofollow">
                                <i class="fa fa-file-pdf-o"></i>
                                <span>Order as PDF</span>
                            </a> -->
                        </div>
                    </div>
                    <div class="page-body">
                        <div class="row row-hardcode mb-3">
                            <div class="col-6 col-sm-auto pb-3">
                                <h5 class="text-muted">@lang('account.order-date')</h5>
                                <div>{{date("Y-m-d", strtotime($order->order_start_date))}}</div>
                            </div>
                            <div class="col-6 col-sm-auto pb-3">
                                <h5 class="text-muted">@lang('account.order')</h5>
                                <div>#{{$order->order_no}}</div>
                            </div>
                            <div class="col-6 col-sm-auto pb-3">
                                <h5 class="text-muted">@lang('account.order-status')</h5>
                                <div>{{__('status.order.'. $order->order_status)}}</div>
                            </div>
                            <div class="col-6 col-sm-auto pb-3">
                                <h5 class="text-muted">@lang('account.order-total')</h5>
                                <div class="text-success">{{FormatPrice::price($order->order_total)}}</div>
                            </div>
                        </div>
                        <div class="card card-block order-details-box">
                            <div class="row row-hardcode">
                                <div class="col-md-8">
                                    <div class="row row-hardcode">
                                        <div class="col mb-4 mb-lg-0 billinginfo">
                                            <h5>@lang('checkout.billing-address')</h5>
                                            <div class="mb-2">
                                                <div class="company">
                                                    {{$order->billingaddress->company??''}}
                                                </div>
                                                <div class="name">
                                                {{$order->billingaddress->last_name??''}} {{$order->billingaddress->first_name??''}}
                                                </div>
                                                <div class="address1">
                                                {{$order->billingaddress->address1??''}}
                                                </div>
                                                <div class="address2">
                                                {{$order->billingaddress->address2??''}}
                                                </div>
                                                <div class="city-state-zip">
                                                {{$order->billingaddress->city??''}}, {{$order->billingaddress->zipcode??''}}
                                                </div>
                                                <div class="country">
                                                {{$order->billingaddress->country??''}}
                                                </div>
                                            </div>
                                            <div class="email">
                                                @lang('profile.email'): {{$order->billingaddress->email??''}}
                                            </div>
                                            <div class="phone">
                                                @lang('profile.phone'): {{$order->billingaddress->phone??''}}
                                            </div>

                                        </div>

                                        <div class="col mb-4 mb-lg-0 shippinginfo">
                                            <h5>@lang('checkout.shipping-address')</h5>
                                            <div class="mb-2">
                                                <div class="company">
                                                    {{$order->shippingaddress->company??''}}
                                                </div>
                                                <div class="name">
                                                {{$order->shippingaddress->last_name??''}} {{$order->shippingaddress->first_name??''}}
                                                </div>
                                                <div class="address1">
                                                {{$order->shippingaddress->address1??''}}
                                                </div>
                                                <div class="address2">
                                                {{$order->shippingaddress->address2??''}}
                                                </div>
                                                <div class="city-state-zip">
                                                {{$order->shippingaddress->city??''}}, {{$order->shippingaddress->zipcode??''}}
                                                </div>
                                                <div class="country">
                                                {{$order->shippingaddress->country??''}}
                                                </div>
                                            </div>
                                            <div class="email">
                                                @lang('profile.email'): {{$order->shippingaddress->email??''}}
                                            </div>
                                            <div class="phone">
                                                @lang('profile.phone'): {{$order->shippingaddress->phone??''}}
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="row row-hardcode">
                                        <div class="col">
                                            <h5>@lang('checkout.shipping-method')</h5>
                                            <p>{{__('method.shipping.'. $order->shipping_method . '.name')}}</p>
                                            <h5>@lang('checkout.payment-method')</h5>
                                            <p>{{__('method.payment.'. $order->payment_method . '.name')}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>



                        <div class="card my-5">
                            <div id="order-items" class="cart mb-0">
                                <div class="cart-head">
                                    <div class="cart-row">
                                        <div class="cart-col cart-col-main">
                                            @lang('shoppings.items')
                                        </div>
                                        <div class="cart-col cart-col-price">
                                            @lang('shoppings.price')
                                        </div>
                                        <div class="cart-col cart-col-qty">
                                            @lang('shoppings.qty')
                                        </div>
                                        <div class="cart-col cart-col-price cart-col-subtotal">
                                            @lang('shoppings.total')
                                        </div>
                                    </div>
                                </div>
                                <div class="cart-body">
                                    @foreach($order->orderdetails as $orderdetail)
                                    <div class="cart-row">
                                        <div class="cart-col cart-col-main">
                                            <div class="row row-hardcode sm-gutters">
                                                <div class="col cart-item-img">
                                                    @if(strlen($orderdetail->product->GetMediaByOrderAsc()->source??'') > 0)
                                                    <img class="img-fluid" alt="{{$orderdetail->product->name}}" src="{{asset('/storage')}}/{{$orderdetail->product->GetMediaByOrderAsc()->source??'images/default-image.png'}}" title="{{$orderdetail->product->name}}">
                                                    @else
                                                    <img class="img-fluid" alt="{{$orderdetail->product->name}}" src="{{asset('/images/no-image.png')}}">
                                                    @endif
                                                </div>
                                                <div class="col">
                                                    <a class="cart-item-link" href="{{url('/products/')}}/{{$orderdetail->product->id}}" title="Description">{{$orderdetail->product->name}}</a>
                                                    <div class="cart-item-desc fs-sm">
                                                    {{$orderdetail->product->translation->summary??''}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cart-col cart-col-price" data-caption="Price">
                                            <span class="price">{{FormatPrice::price($orderdetail->price)}}</span>
                                        </div>
                                        <div class="cart-col cart-col-qty" data-caption="Quantity">
                                            {{$orderdetail->quantity}} 
                                        </div>
                                        <div class="cart-col cart-col-price cart-col-subtotal" data-caption="Total">
                                            <span class="price">{{FormatPrice::price($orderdetail->total)}}</span>
                                        </div>
                                    </div>
                                    @endforeach
                                </div>
                            </div>

                            <div class="cart-footer rounded-bottom">
                                <div class="row row-hardcode">
                                    <div class="col-md-6">
                                    </div>
                                    <div class="col-md-6">
                                        <table class="cart-summary">
                                            <tbody>
                                                <tr class="cart-summary-subtotal">
                                                    <td class="cart-summary-label">@lang('shoppings.subtotal'):</td>
                                                    <td class="cart-summary-value">{{FormatPrice::price($order->orderdetails->sum('total'))}}</td>
                                                </tr>
                                                <tr class="cart-summary-shipping cart-summary-neg">
                                                    <td class="cart-summary-label">@lang('shoppings.shipping'):</td>
                                                    <td class="cart-summary-value">{{FormatPrice::price($order->order_shipping_price)}}</td>
                                                </tr>
                                                <tr class="cart-summary-tax">
                                                    <td class="cart-summary-label">@lang('shoppings.tax'):</td>
                                                    <td class="cart-summary-value">{{FormatPrice::price($order->order_tax)}}</td>
                                                </tr>
                                                <tr class="cart-summary-total">
                                                    <td class="cart-summary-label">@lang('shoppings.order-total-price'):</td>
                                                    <td class="cart-summary-value">{{FormatPrice::price($order->order_total)}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <!-- <div class="cart-actions row row-hardcode sm-gutters mb-2 justify-content-lg-end">
                            <div class="col-12 mt-2 col-sm-6 mt-sm-0 col-lg-3">
                                <a class="btn btn-primary btn-block" href="{{url('/Order/ReOrder')}}/{{$order->id}}" rel="nofollow">
                                    <i class="fa fa-shopping-cart"></i>
                                    <span>Re-order</span>
                                </a>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection

@section('scripts')
    <!-- <script type="text/javascript" src="{{ asset('js/jquery-3.2.1.js') }}"></script>  -->
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/0.10.0/lodash.min.js"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>  -->
<script type="text/javascript" src="{{ asset('js/viewport.js') }}"></script> 
<script type="text/javascript" src="{{ asset('js/eventbroker.js') }}"></script> 
<script type="text/javascript" src="{{ asset('js/underscore.js') }}"></script> 
<script type="text/javascript" src="{{ asset('js/underscore.mixins.js') }}"></script> 
<script type="text/javascript" src="{{ asset('js/underscore.string.js') }}"></script> 
<script type="text/javascript" src="{{ asset('js/system.js') }}"></script> 
<script type="text/javascript" src="{{ asset('js/system.common.js') }}"></script> 
<script type="text/javascript" src="{{ asset('js/public.common.js') }}"></script> 
<script type="text/javascript" src="{{ asset('js/throbber.js') }}"></script>     
<script type="text/javascript" src="{{ asset('js/doAjax.js') }}"></script> 
<script type="text/javascript" src="{{ asset('js/jquery.bootstrap-touchspin.js') }}"></script> 
<script type="text/javascript" src="{{ asset('js/offcanvas.js') }}"></script> 
<script type="text/javascript" src="{{ asset('js/offcanvas-cart.js') }}"></script> 
<script type="text/javascript" src="{{ asset('dist/pnotify/pnotify.js') }}"></script> 
<script type="text/javascript" src="{{ asset('dist/pnotify/pnotify.animate.js') }}"></script> 

  
<script>
    $(function () {
        
    });
</script>
@endsection
