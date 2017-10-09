@extends('layouts.master')
@section('title','Cà Phê Đăk Hà - Giỏ Hàng')
@section('content')
<!-- Head Section -->
<section class="small-section bg-gray-lighter">
    <div class="relative container align-left">
        
        <div class="row">
            
            <div class="col-md-8">
                <h1 class="hs-line-11 font-alt mb-0">Shopping Cart</h1>
            </div>
            
            <div class="col-md-4 mt-30">
                <div class="mod-breadcrumbs font-alt align-right">
                    <a href="#">Home</a>&nbsp;/&nbsp;<a href="#">Shop</a>&nbsp;/&nbsp;<span>Cart</span>
                </div>
                
            </div>
        </div>
        
    </div>
</section>
<!-- End Head Section -->


<!-- Section -->
<section class="page-section">
    <div class="container">
        
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                
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
                    <div class="col-sm-8">
                        <form action="#" class="form">
                            <input placeholder="Coupon code" class="input-sm mb-xs-10" style="width: 250px;" type="text" pattern=".{3,100}" required />
                            &nbsp;<button type="submit" class="btn btn-mod btn-round btn-gray btn-small mb-xs-10">Apply Coupon</button>
                        </form>
                    </div>
                    <div class="col-sm-4 text align-right">
                        
                        <div>
                            <a href="" class="btn btn-mod btn-gray btn-round btn-small">Update Cart</a>
                        </div>
                        
                    </div>
                </div>
                
                <hr class="mb-60" />
                
                <div class="row">
                    <div class="col-sm-6">
                        
                        <h3 class="small-title font-alt">Calculate Shipping</h3>
                        
                        <form action="#" class="form">
                            
                            <div class="mb-10">
                                <select class="input-md form-control">
                                    <option>Select Country</option>
                                    <option>Vietnam</option>
                                    <option>China</option>
                                    <option>Laos</option>
                                </select>
                            </div>
                            
                            <div class="mb-10">
                                <input placeholder="State" class="input-md form-control" type="text" pattern=".{3,100}" />
                            </div>
                            
                            <div class="mb-10">
                                <input placeholder="Postcode / Zip" class="input-md form-control" type="text" pattern=".{3,100}" />
                            </div>
                            
                        </form>
                        
                    </div>
                    <div class="col-sm-6 text align-right pt-10">
                        
                        
                        <div>
                            Cart subtotal: <strong>{{Cart::subtotal()}}</strong>
                        </div>
                        
                        <div class="mb-10">
                            Shipping: <strong>$0.00</strong>
                        </div>
                        
                        <div class="lead mt-0 mb-30">
                            Order Total: <strong>{{Cart::total()}}</strong>
                        </div>
                        
                        <div>
                            <a href="{{url('/Checkout/BillingAddress/dev')}}" class="btn btn-mod btn-round btn-large">Proceed to Checkout</a>
                        </div>
                        
                    </div>
                </div>
                
                
                
            </div>
        </div>
    
    </div>
</section>
<!-- End Section -->

@endsection