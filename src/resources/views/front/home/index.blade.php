@extends('layouts.master')
@section('title','Pô Kô Farms')
@section('content')

<!-- Slider -->
@include('front.home.slider')
<!-- End Slider -->
<!-- <section id="decorate">
    <div class="row">
        <div class="container">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <img src={{ asset('images/trust-nature.png') }} alt="decorate">
            </div>
        </div>
    </div>
</section> -->
<div class="about">
    <div class="container">

        <div class="row">

            <!-- Video -->
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="ab-intro">
                        <h1>- {{$video_message->translation->title??""}} -</h1>
                        <p>"{{$video_message->translation->description??""}}"</p>

                    </div>
                </div>
            </div>

            <div class="video-section">
                <div class="video-wrapper">
                    <div class="youtube" data-embed="Ln6C1mUrUdY">
                        <div class="play-button"></div>
                    </div>
                    <!-- <div class="ratio-16-9 lazyload" data-youtube="Ln6C1mUrUdY" data-ytparams="autoplay=1">
                        <button class="play-btn">play</button>
                    </div> -->
                    <!-- <iframe title="Intro" class="lazyload" width="560" height="315" data-src="{{ __('home.home-video-url')}}?autoplay=1&amp;rel=0&amp;mute=1" frameborder="0" allowfullscreen></iframe> -->
                </div>
            </div>
            <!-- End Video -->
        </div>

        <div class="row is-same-height">
            <div class="col-md-3 col-sm-3 col-xs-12 ab-items">
                <div class="ab-item">
                    <img class="lazyload" data-sizes="auto" data-src="{{ asset('images/logo/poko.png') }}" alt="Logo">
                    <h2>@lang('home.about-us')</h2>
                    <p>{{ str_pad($pokofarms_message->translation->description??"",200) }}</p>
                    <a class="learnmore" href="{{url('/about')}}">@lang('common.more-details')</a>
                </div>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-12 ab-items">
                <div class="ab-item">
                    <img class="lazyload" data-sizes="auto" data-src="{{ asset('images/logo/origin.png') }}" alt="Logo">
                    <h2>@lang('home.product-origin')</h2>
                    <p>{{ str_pad($product_origin->translation->description??"",200) }}</p>
                    <a class="learnmore" href="{{url('/product-origin')}}">@lang('common.more-details')</a>
                </div>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-12 ab-items">
                <div class="ab-item">
                    <img class="lazyload" data-sizes="auto" data-src="{{ asset('images/logo/fairtrade.png') }}" alt="Quality Control Approved">
                    <h2>@lang('home.product-quality')</h2>
                    <p>{{ str_pad($product_quality->translation->description??"",200) }}</p>
                    <a class="learnmore" href="{{url('/product-quality')}}">@lang('common.more-details')</a>
                </div>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-12 ab-items">
                <div class="ab-item">
                    <img class="lazyload" data-sizes="auto" data-src="{{ asset('images/logo/community-icon.png') }}" alt="Community">
                    <h2>@lang('home.community')</h2>
                    <p>{{ str_pad($community_category->translation->description??"",200)}}</p>
                    <a class="learnmore" href="{{url('subject/posts/'.$community_category->slug)}}">@lang('common.more-details')</a>
                </div>
            </div>
        </div>

    </div>
</div>
<!-- Quotes -->
@include('front.home.quotes')
<!-- End Quotes -->

<!-- Promo -->
@include('front.home.promo')
<!-- End Promo -->

<!-- Products -->
@include('front.home.products')
<!-- End Products -->


<!-- Subscribe 
@ include('front.home.subscribe')
-->
<!-- End Subscribe -->

<!-- Blogs 
@ include('front.home.blogs')
-->
<!-- End Blogs -->

<!-- Social -->

<!-- End Social -->
@endsection