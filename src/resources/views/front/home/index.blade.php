@extends('layout.master')
@section('title','Cà phê Đak Hà - Trang chủ')
@section('content')

<!-- Fullwidth Slider -->
<div class="home-section fullwidth-slider bg-dark">

    <!-- Slide Item -->
    <section class="page-section bg-scroll bg-dark bg-dark-alfa-50" style="background-image:url('{{ asset('public/assets/rhythm/images/foods/trungthu.jpg') }}');">
        <div class="relative container">

            <!-- Hero Content -->
            <div class="home-content">
                <div class="home-text">

                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">
                            <h1 class="hs-line-6 no-transp font-alt">Quăng đi gánh lo mâm cỗ trung thu <a href="shop-columns-2col.html" class="btn btn-mod btn-w btn-round" style="margin-top:-3px;">Shop Now</a></h1>
                        </div>
                    </div>

                </div>
            </div>
            <!-- End Hero Content -->

        </div>
    </section>
    <!-- End Slide Item -->

    <!-- Slide Item -->
    <section class="page-section bg-scroll bg-dark bg-dark-alfa-50" style="background-image:url('{{ asset('public/assets/rhythm/images/foods/caphe.jpg') }}');">
        <div class="relative container">

            <!-- Hero Content -->
            <div class="home-content">
                <div class="home-text">

                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">

                            <h1 class="hs-line-6 no-transp font-alt">Cà phê "thuần cà phê"" <a href="shop-columns-2col.html" class="btn btn-mod btn-w btn-round" style="margin-top:-3px;">Shop Now</a></h1>

                        </div>
                    </div>

                </div>
            </div>
            <!-- End Hero Content -->

        </div>
    </section>
    <!-- End Slide Item -->

    <!-- Slide Item -->
    <section class="page-section bg-scroll bg-dark bg-dark-alfa-50" style="background-image:url('{{ asset('public/assets/rhythm/images/foods/keomut.jpg') }}');">
        <div class="relative container">

            <!-- Hero Content -->
            <div class="home-content">
                <div class="home-text">

                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">

                            <h1 class="hs-line-6 no-transp font-alt">Đặc sản 3 miền <a href="shop-columns-2col.html" class="btn btn-mod btn-w btn-round" style="margin-top:-3px;">Shop Now</a></h1>

                        </div>
                    </div>

                </div>
            </div>
            <!-- End Hero Content -->

        </div>
    </section>
    <!-- End Slide Item -->

</div>
<!-- End Fullwidth Slider -->

<!-- New Product Section -->
<section class="page-section">
    <div class="container relative">

        <h2 class="section-title font-alt mb-70 mb-sm-40">
            @lang('home.new-products')
        </h2>

        <div class="row multi-columns-row">
            @foreach($new_products as $product)
            <!-- Shop Item -->
            <div class="col-md-3 col-lg-3 mb-40">

                <div class="post-prev-img">

                    <a href="shop-single.html"><img src="/" alt="" /></a> 
                    @if($product->special_price_start_date  >= $product->special_price_end_date )
                    <div class="intro-label">
                        <span class="label label-danger bg-red">@lang('product.sale')</span>
                    </div>
                    @endif

                </div>

                <div class="post-prev-title font-alt align-center">
                    <a href="shop-single.html">{{ $product->name }}</a>
                </div>

                <div class="post-prev-text align-center mb-0">
                    <!-- @if($product->is_promote == 1)
                    <del>{!! price_format($product->default_price,'VNĐ') !!}</del> &nbsp;
                    <strong>{!! price_format($product->promote_price,'VNĐ') !!}</strong> @else
                    <strong>{!! price_format($product->default_price,'VNĐ') !!}</strong> @endif -->
                </div>

            </div>
            <!-- End Shop Item -->
            @endforeach

        </div>

        <div class="mt-20 align-center">
            <a href="" class="btn btn-mod btn-round btn-medium">@lang('common.see-more')</a>
        </div>

    </div>
</section>
<!-- New Product  End Section -->
@endsection