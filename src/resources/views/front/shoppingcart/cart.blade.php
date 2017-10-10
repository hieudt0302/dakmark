@extends('layouts.master')
@section('title','Cà Phê Đăk Hà - Giỏ Hàng')
@section('header')
@parent
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="{{ asset('css/theme.css') }}">
    <link rel="stylesheet" href="{{ asset('css/animate.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/fontastic.css') }}" />   
@stop
@section('content')
<div id="content-wrapper">
    <section id="content" class="container mt-3">
        <div class="costeps row no-gutters">
            <div class="col-2 costep active" data-step="cart">
                <a class="costep-link" href="/frontend/en/cart">
                    <i class="costep-icon"></i>
                    <span class="costep-label">Cart</span>
                </a>
            </div>
            <div class="col-2 costep inactive" data-step="address">
                <a class="costep-link" href="javascript:void(0)">
                    <i class="costep-icon"></i>
                    <span class="costep-label">Address</span>
                </a>
            </div>
            <div class="col-2 costep inactive" data-step="shipping">
                <a class="costep-link" href="javascript:void(0)">
                    <i class="costep-icon"></i>
                    <span class="costep-label">Shipping</span>
                </a>
            </div>
            <div class="col-2 costep inactive" data-step="payment">
                <a class="costep-link" href="javascript:void(0)">
                    <i class="costep-icon"></i>
                    <span class="costep-label">Payment</span>
                </a>
            </div>
            <div class="col-2 costep inactive" data-step="confirm">
                <a class="costep-link" href="javascript:void(0)">
                    <i class="costep-icon"></i>
                    <span class="costep-label">Confirm</span>
                </a>
            </div>
            <div class="col-2 costep inactive" data-step="complete">
                <a class="costep-link" href="javascript:void(0)">
                    <i class="costep-icon"></i>
                    <span class="costep-label">Complete</span>
                </a>
            </div>
        </div>

        <div id="content-body" class="row mt-4">
            <div id="content-center" class="col-lg-12">
                <div class="page shopping-cart-page">
                    <div class="page-title">
                        <h1 class="h3">Shopping cart</h1>
                    </div>
                    <div class="page-body">
                        <div class="order-summary-content">
                            <form action="/frontend/en/cart" enctype="multipart/form-data" method="post" novalidate="novalidate">
                                <div class="card">
                                    <div id="cart-items" class="cart mb-0 cart-editable">
                                        <div class="cart-head">
                                            <div class="cart-row">
                                                <div class="cart-col cart-col-main">
                                                    Product(s)
                                                </div>
                                                <div class="cart-col cart-col-price">
                                                    Price
                                                </div>
                                                <div class="cart-col cart-col-qty">
                                                    Qty.
                                                </div>
                                                <div class="cart-col cart-col-price cart-col-subtotal">
                                                    Total
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cart-body">



                                            <div class="cart-row">
                                                <div class="cart-col cart-col-main">
                                                    <div class="row sm-gutters">
                                                        <div class="col cart-item-img">
                                                            <img class="img-fluid" alt="Picture of Herren T-Shirt" src="/frontend/Media/Default/Thumbs/0000/0000400-herren-t-shirt-250.jpg" title="Show details for Herren T-Shirt">
                                                        </div>

                                                        <div class="col">
                                                            <a class="cart-item-link" href="/frontend/en/t-shirt-3?size-221-0-180=3546&amp;color-221-0-181=3550" title="Description">Herren T-Shirt</a>

                                                            <div class="cart-item-desc fs-sm">
                                                                klassisch geschnittenes Shirt
                                                            </div>


                                                            <div class="cart-item-attrs fs-sm my-2">


                                                            </div>

                                                            <div class="attributes text-muted fs-sm mb-2">
                                                                Größe: M<br>Color: kirsch
                                                            </div>
                                                        </div>

                                                        <div class="col col-auto">
                                                            <div class="cart-row-actions btn-group-vertical card-shadow">
                                                                <a class="btn btn-gray btn-to-danger btn-sm btn-icon ajax-action-link" title="Remove" href="#" rel="nofollow" data-href="/frontend/en/ShoppingCart/DeleteCartItem?cartItemId=43368" data-name="Herren T-Shirt" data-type="cart" data-action="remove">
                                                                    <i class="fa fa-2x">×</i>
                                                                </a>
                                                                <a class="btn btn-secondary btn-sm btn-icon ajax-action-link" title="Move to wishlist" href="#" rel="nofollow" data-href="/frontend/en/ShoppingCart/MoveItemBetweenCartAndWishlist?cartItemId=43368&amp;cartType=ShoppingCart&amp;isCartPage=True" data-name="Herren T-Shirt"
                                                                    data-type="wishlist" data-action="addfromcart">
                                                                    <i class="fa fa-heart-o"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="cart-col cart-col-price" data-caption="Price">
                                                    <span class="price">$14.79</span>
                                                </div>

                                                <div class="cart-col cart-col-qty" data-caption="Quantity">



                                                    <div class="qty-input">
                                                        <div class="input-group bootstrap-touchspin"><span class="input-group-btn"><button class="btn btn-secondary bootstrap-touchspin-down" type="button"><i class="fa fa-minus"></i></button></span><span class="input-group-addon bootstrap-touchspin-prefix"
                                                                style="display: none;"></span><input name="itemquantity43368" class="form-control" data-href="/frontend/en/ShoppingCart/UpdateCartItem?sciItemId=43368&amp;isCartPage=True" data-max="100" data-min="1"
                                                                data-postfix="" data-sci-item="43368" data-step="1" data-val="true" data-val-number="The field 'EnteredQuantity' must be a number." id="itemquantity43368" type="text" value="5" style="display: block;">
                                                            <span class="input-group-addon bootstrap-touchspin-postfix" style="display: none;"></span><span class="input-group-btn"><button class="btn btn-secondary bootstrap-touchspin-up" type="button"><i class="fa fa-plus"></i></button></span></div>
                                                    </div>
                                                </div>

                                                <div class="cart-col cart-col-price cart-col-subtotal" data-caption="Total">
                                                    <span class="price">$73.95</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="cart-footer rounded-bottom">
                                        <div class="row">
                                            <div class="col-md-6">



                                                <div class="cart-action cart-action-coupon">
                                                    <h5 class="cart-action-title collapsed" data-toggle="collapse" data-target="#cart-action-coupon-body" aria-controls="cart-action-coupon-body">
                                                        I have a discount code
                                                    </h5>

                                                    <div class="cart-action-body collapse" id="cart-action-coupon-body">

                                                        <div class="coupon-code form-group">
                                                            <div class="input-group">
                                                                <input name="discountcouponcode" type="text" class="form-control form-control-success discount-coupon-code" placeholder="Enter your coupon here">
                                                                <span class="input-group-btn">
                         <button type="submit" class="btn btn-primary apply-discount-coupon-code-button" title="Apply coupon" name="applydiscountcouponcode" value="applydiscountcouponcode">
                             <i class="fa fa-check"></i>
                             <span>Apply coupon</span>
                                                                </button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div class="cart-action cart-action-giftcard">
                                                    <h5 class="cart-action-title collapsed" data-toggle="collapse" data-target="#cart-action-giftcard-body" aria-controls="cart-action-giftcard-body">
                                                        I have a gift card
                                                    </h5>

                                                    <div class="cart-action-body collapse" id="cart-action-giftcard-body">

                                                        <div class="coupon-code form-group">
                                                            <div class="input-group">
                                                                <input name="giftcardcouponcode" type="text" class="form-control gift-card-coupon-code" placeholder="Enter gift card code">
                                                                <span class="input-group-btn">
                     <button type="submit" class="btn btn-primary apply-gift-card-coupon-code-button" name="applygiftcardcouponcode" value="applygiftcardcouponcode">
                         <i class="fa fa-check"></i>
                         <span>Add gift card</span>
                                                                </button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="col-md-6">

                                                <div id="order-totals">



                                                    <table class="cart-summary">
                                                        <tbody>
                                                            <tr class="cart-summary-subtotal">
                                                                <td class="cart-summary-label">Subtotal:</td>
                                                                <td class="cart-summary-value">$73.95</td>
                                                            </tr>
                                                            <tr class="cart-summary-shipping">
                                                                <td class="cart-summary-label">
                                                                    <span class="text-nowrap">Shipping:</span>
                                                                </td>
                                                                <td class="cart-summary-value">
                                                                    <span class="text-muted text-wrap">Calculated during checkout</span>
                                                                </td>
                                                            </tr>

                                                            <tr class="cart-summary-tax">
                                                                <td class="cart-summary-label">Tax:</td>
                                                                <td class="cart-summary-value">$12.33</td>
                                                            </tr>
                                                            <tr class="cart-summary-total">
                                                                <td class="cart-summary-label">Total:</td>
                                                                <td class="cart-summary-value">
                                                                    <span class="text-muted fs-h6 font-weight-normal text-wrap">Calculated during checkout</span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="cart-buttons my-4 row">
                                    <div class="col-sm-6 col-lg-4 order-last order-sm-first mt-3 mt-sm-0">
                                        <button class="btn btn-secondary btn-block btn-lg btn-continue-shopping" type="submit" name="continueshopping" value="continueshopping">
                             <i class="fa fa-angle-left mr-3"></i>
                             <span>Continue shopping</span>
                         </button>
                                    </div>
                                    <div class="col-sm-6 col-lg-4 ml-lg-auto">
                                        <div id="start-checkout-buttons" class="">
                                            <div class="checkout-buttons">
                                                <input type="submit" name="startcheckout" value="startcheckout" id="startcheckout" class="d-none">
                                                <button type="button" id="checkout" name="checkout" class="btn btn-danger btn-lg btn-block btn-checkout" onclick="$('#startcheckout').trigger('click'); return false;">
                                     <span>Checkout</span>
                                     <i class="fa fa-angle-right ml-3"></i>
                                 </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
@stop