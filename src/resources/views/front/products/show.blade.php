@extends('layout.master')
@section('title','Cà phê Đak Hà - Sản Phẩm')

@section('content')

<!-- Head Section -->
<section class="small-section bg-gray-lighter">
    <div class="relative container align-left">
        <div class="row">
            
            <div class="col-md-8">
                <h1 class="hs-line-11 font-alt mb-20 mb-xs-0">Product</h1>
                <div class="hs-line-4 font-alt black">
                    Choose the best products in our shop
                </div>
            </div>
            
            <div class="col-md-4 mt-30">
                <div class="mod-breadcrumbs font-alt align-right">
                    <a href="#">Home</a>&nbsp;/&nbsp;<a href="#">Product</a>&nbsp;/&nbsp;<span>Item</span>
                </div>
                
            </div>
        </div>
        
    </div>
</section>
<!-- End Head Section -->


<!-- Section -->
<section class="page-section">
    <div class="container relative">
        <!-- Product Content -->
        <div class="row mb-60 mb-xs-30">
            
            <!-- Product Images -->
            <div class="col-md-4 mb-md-30">
                
                <div class="post-prev-img">
                    <a href="{{asset('images/caphe.jpg')}}" class="lightbox-gallery-3 mfp-image"><img class="product-main-img" src="{{asset('images/caphe.jpg')}}" alt="" /></a>
                    @if(!empty($product->special_price_start_date) && $product->special_price_start_date  <= $product->special_price_end_date )
                    <div class="intro-label">
                        <span class="label label-danger bg-red">Sale</span>
                    </div>
                    @endif
                </div>
                
                <div class="row">
                    
                    <div class="col-xs-3 post-prev-img">
                        <a href="images/shop/shop-prev-2.jpg" class="lightbox-gallery-3 mfp-image"><img src="images/shop/shop-prev-2.jpg" alt="" /></a>
                    </div>
                    
                    <div class="col-xs-3 post-prev-img">
                        <a href="images/shop/shop-prev-3.jpg" class="lightbox-gallery-3 mfp-image"><img src="images/shop/shop-prev-3.jpg" alt="" /></a>
                    </div>
                    
                    <div class="col-xs-3 post-prev-img">
                        <a href="images/shop/shop-prev-4.jpg" class="lightbox-gallery-3 mfp-image"><img src="images/shop/shop-prev-4.jpg" alt="" /></a>
                    </div>
                    
                </div>
                
            </div>
            <!-- End Product Images -->
            
            <!-- Product Description -->
            <div class="col-sm-8 col-md-5 mb-xs-40">
                
                <h3 class="mt-0">{{$product->name??'Name not found'}}</h3>
                
                <hr class="mt-0 mb-30"/>
                
                <div class="row">
                    <div class="col-xs-6 lead mt-0 mb-20">
                       
                        @if(!empty($product->special_price_start_date) && $product->special_price_start_date  <= $product->special_price_end_date )
                            <del class="section-text">{{$product->price}}</del> &nbsp;
                            <strong>{{$product->special_price}}</strong>
                        @else
                        @if($product->old_price > 0)
                            <del class="section-text">{{$product->old_price}}</del> &nbsp;
                            @endif
                            <strong>{{$product->price}}</strong>
                        @endif
                    </div>
                    <div class="col-xs-6 align-right section-text">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-o"></i>
                        &nbsp;(3 reviews)
                    </div>
                </div>
                
                <hr class="mt-0 mb-30"/> 
                
                <div class="section-text mb-30">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et dui id dui suscipit pharetra vitae quis urna. Ut scelerisque quam quis erat tincidunt, vel vehicula turpis bibendum.
                </div>
                
                <hr class="mt-0 mb-30"/> 
                
                <div class="mb-30">
                    <form method="post" action="#" class="form">
                        <input type="number" class="input-lg round" min="1" max="100" value="1" />
                        <a href="" class="btn btn-mod btn-large btn-round add-shoopingcart">Add to Cart</a> 
                    </form>
                </div>
                
                <hr class="mt-0 mb-30"/> 
                
                <div class="section-text small">
                    <div>SKU: {{$product->sku??'-----'}}</div>
                    <div>Category: <a href=""> Polo shirts</a></div>
                    <div>Tags: <a href="">polo shirt</a>, <a href="">men</a></div>
                </div>
                
            </div>
            <!-- End Product Description -->
            
            <!-- Features -->
            <div class="col-sm-4 col-md-3 mb-xs-40">
                
                <!-- Features Item -->
                <div class="alt-service-wrap">
                    <div class="alt-service-item">
                        <div class="alt-service-icon">
                            <i class="fa fa-paper-plane-o"></i>
                        </div>
                        <h3 class="alt-services-title font-alt">Free Shipping</h3>
                        Vivamus neque orci, ultricies blandit ultricies vel, semper..
                    </div>
                </div>
                <!-- End Features Item -->
                
                <!-- Features Item -->
                <div class="alt-service-wrap">
                    <div class="alt-service-item">
                        <div class="alt-service-icon">
                            <i class="fa fa-clock-o"></i>
                        </div>
                        <h3 class="alt-services-title font-alt">14 days moneyback</h3>
                        Vivamus neque orci, ultricies blandit ultricies vel, semper..
                    </div>
                </div>
                <!-- End Features Item -->
                
                <!-- Features Item -->
                <div class="alt-service-wrap">
                    <div class="alt-service-item">
                        <div class="alt-service-icon">
                            <i class="fa fa-gift"></i>
                        </div>
                        <h3 class="alt-services-title font-alt">100% Original</h3>
                        Vivamus neque orci, ultricies blandit ultricies vel, semper..
                    </div>
                </div>
                <!-- End Features Item -->
                    
                    
                
            </div>
            <!-- End Features -->
            
        </div>
        <!-- End Product Content -->
        
        
        <!-- Nav tabs -->
        <ul class="nav nav-tabs tpl-tabs animate">
            <li class="active">
                <a href="#one" data-toggle="tab">Description</a>
            </li>
            <li>
                <a href="#two" data-toggle="tab">Parameters</a>
            </li>
            <li>
                <a href="#three" data-toggle="tab">Reviews (3)</a>
            </li>
        </ul>
        <!-- End Nav tabs -->
        
        <!-- Tab panes -->
        <div class="tab-content tpl-tabs-cont">
            <div class="tab-pane fade in active" id="one">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis lacus augue, a hendrerit leo tristique vitae. Mauris non ipsum molestie, sagittis elit ac, vulputate odio. Fusce quam augue, gravida tincidunt dui nec, tempor iaculis justo.
                    Aliquam tortor leo, pharetra non congue sit amet, bibendum sit amet enim. Nullam sit amet malesuada justo.
                </p>
                <p>
                    Nunc vulputate semper erat, non iaculis sapien congue sit amet. Duis non nulla volutpat, dignissim leo sit amet, porta nunc. Donec placerat fermentum metus ac scelerisque. In id sollicitudin nulla. Suspendisse potenti. Integer aliquam orci 
                    aliquam eros posuere ornare. Fusce augue felis, maximus non lacus vitae, ullamcorper dignissim leo. Ut congue feugiat turpis at aliquam. Donec eros neque, accumsan sed venenatis volutpat, tempor at metus.
                </p>
            </div>
            <div class="tab-pane fade" id="two">
                
                <table class="table table-bordered table-striped">
                    <tr>
                        <th>
                            Parameter
                        </th>
                        <th>
                            Value
                        </th>
                    </tr>
                    <tr>
                        <td>
                            Size
                        </td>
                        <td>
                            Small, Medium & Large
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Color
                        </td>
                        <td>
                            Black & White
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Waist
                        </td>
                        <td>
                            25cm
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Length
                        </td>
                        <td>
                            50cm
                        </td>
                    </tr>
                </table>
                
            </div>
            <div class="tab-pane fade" id="three">
                
                    <div class="mb-60 mb-xs-30">
                        <ul class="media-list text comment-list clearlist">
                            
                            <!-- Comment Item -->
                            <li class="media comment-item">
                                <a class="pull-left" href="#"><img class="media-object comment-avatar" src="images/user-avatar.png" alt=""></a>
                                <div class="media-body">
                                    <div class="comment-item-data">
                                        <div class="comment-author">
                                            <a href="#">Emma Johnson</a>
                                        </div>
                                        Feb 9, 2014, at 10:37<span class="separator">&mdash;</span>
                                        
                                        <span>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-o"></i>
                                        </span>
                                        
                                    </div>
                                    <p>
                                       Donec fermentum turpis et finibus commodo. Sed dictum laoreet mi, vitae dignissim purus interdum at. Sed a est at purus cursus elementum ut sed lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at magna ut ante eleifend eleifend.
                                    </p>
                                </div>
                            </li>
                            <!-- End Comment Item -->
                            
                            <!-- Comment Item -->
                            <li class="media comment-item">
                                <a class="pull-left" href="#"><img class="media-object comment-avatar" src="images/user-avatar.png" alt=""></a>
                                <div class="media-body">
                                    <div class="comment-item-data">
                                        <div class="comment-author">
                                            <a href="#">John Doe</a>
                                        </div>
                                        Feb 9, 2014, at 10:3<span class="separator">&mdash;</span>
                                        <span>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-o"></i>
                                        </span>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at magna ut ante eleifend eleifend.
                                    </p>
                                </div>
                            </li>
                            <!-- End Comment Item -->
                            
                        </ul>
                    </div>
                    
                    <!-- Add Review -->
                    <div>
                        
                        <h4 class="blog-page-title font-alt">Add Review</h4>
                        
                        <!-- Form -->
                        <form method="post" action="#" id="form" role="form" class="form">
                            
                            <div class="row mb-20 mb-md-10">
                                
                                <div class="col-md-6 mb-md-10">
                                    <!-- Name -->
                                    <input type="text" name="name" id="name" class="input-md form-control" placeholder="Name *" maxlength="100" required>
                                </div>
                                
                                <div class="col-md-6">
                                    <!-- Email -->
                                    <input type="email" name="email" id="email" class="input-md form-control" placeholder="Email *" maxlength="100" required>
                                </div>
                                
                            </div>
                            
                            <div class="mb-20 mb-md-10">
                                <!-- Rating -->
                                <select class="input-md round form-control">
                                    <option>-- Select one --</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            
                            <!-- Comment -->
                            <div class="mb-30 mb-md-10">
                                <textarea name="text" id="text" class="input-md form-control" rows="6" placeholder="Comment" maxlength="400"></textarea>
                            </div>
                            
                            <!-- Send Button -->
                            <button type="submit" class="btn btn-mod btn-medium btn-round">
                                Send Review
                            </button>
                            
                        </form>
                        <!-- End Form -->
                        
                    </div>
                    <!-- End Add Review -->
                    
            </div>
        </div>
        <!-- End Tab panes -->
    
    </div>
</section>
<!-- End Section -->


<!-- Divider -->
<hr class="mt-0 mb-0 "/>
<!-- End Divider -->


<!-- Related Products -->
<section class="page-section">
    <div class="container relative">
        
        <h2 class="section-title font-alt mb-70 mb-sm-40">
            Related Products
        </h2>
        
        <!-- Products Grid -->
                <div class="row multi-columns-row">
            
                    <!-- Shop Item -->
                    <div class="col-md-3 col-lg-3 mb-60 mb-xs-40">
                        
                        <div class="post-prev-img">
                            
                            <a href="shop-single.html"><img src="images/shop/shop-prev-1.jpg" alt="" /></a>
                            
                            <div class="intro-label">
                                <span class="label label-danger bg-red">Sale</span>
                            </div>
                            
                        </div>
                        
                        <div class="post-prev-title font-alt align-center">
                            <a href="shop-single.html">G-Star Polo Applique Jersey</a>
                        </div>

                        <div class="post-prev-text align-center">
                            <del>$150.00</del>
                            &nbsp;
                            <strong>$94.75</strong>
                        </div>
                        
                        <div class="post-prev-more align-center">
                            <a href="#" class="btn btn-mod btn-gray btn-round"><i class="fa fa-shopping-cart"></i> Add to cart</a>
                        </div>
                        
                    </div>
                    <!-- End Shop Item -->
                    
                    <!-- Shop Item -->
                    <div class="col-md-3 col-lg-3 mb-60 mb-xs-40">
                        
                        <div class="post-prev-img">
                            <a href="shop-single.html"><img src="images/shop/shop-prev-2.jpg" alt="" /></a>
                        </div>
                        
                        <div class="post-prev-title font-alt align-center">
                            <a href="shop-single.html">Only & Sons Pique Polo Shirt</a>
                        </div>

                        <div class="post-prev-text align-center">
                            <strong>$28.99</strong>
                        </div>
                        
                        <div class="post-prev-more align-center">
                            <a href="#" class="btn btn-mod btn-gray btn-round"><i class="fa fa-shopping-cart"></i> Add to cart</a>
                        </div>
                        
                    </div>
                    <!-- End Shop Item -->
                    
                    <!-- Shop Item -->
                    <div class="col-md-3 col-lg-3 mb-60 mb-xs-40">
                        
                        <div class="post-prev-img">
                            <a href="shop-single.html"><img src="images/shop/shop-prev-3.jpg" alt="" /></a>
                        </div>
                        
                        <div class="post-prev-title font-alt align-center">
                            <a href="shop-single.html">Longline Long Sleeve</a>
                        </div>

                        <div class="post-prev-text align-center">
                            <strong>$39.99</strong>
                        </div>
                        
                        <div class="post-prev-more align-center">
                            <a href="#" class="btn btn-mod btn-gray btn-round"><i class="fa fa-shopping-cart"></i> Add to cart</a>
                        </div>
                        
                    </div>
                    <!-- End Shop Item -->
                    
                    <!-- Shop Item -->
                    <div class="col-md-3 col-lg-3 mb-60 mb-xs-40">
                        
                        <div class="post-prev-img">
                            <a href="shop-single.html"><img src="images/shop/shop-prev-4.jpg" alt="" /></a>
                        </div>
                        
                        <div class="post-prev-title font-alt align-center">
                            <a href="shop-single.html">Polo Shirt With Floral Sleeves</a>
                        </div>

                        <div class="post-prev-text align-center">
                            <strong>$85.99</strong>
                        </div>
                        
                        <div class="post-prev-more align-center">
                            <a href="#" class="btn btn-mod btn-gray btn-round"><i class="fa fa-shopping-cart"></i> Add to cart</a>
                        </div>
                        
                    </div>
                    <!-- End Shop Item -->
        </div>
        <!-- End Products Grid -->
        
    </div>
</section>
<!-- End Related Products -->

@endsection