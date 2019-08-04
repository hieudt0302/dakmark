@extends('layouts.master')
@section('title','Pô Kô Farms')

@section('content')

<!-- Head Section -->
<div class="about aboutv2 floweraboutv1">
    <div class="container">
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="heading-sec">
                    <h1>{{$info_page_translation->title}}</h1><br>
                    <h4 class="green">{!! $info_page_translation->description !!}</h4>
                </div>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="ab-decorate">
                    <img class="lazyload" data-src="frontend/images/logo2.png" alt="About">
                </div>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="ab-intro">
                    <p>{!! $info_page_translation->content !!} </p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="ab-item">
                    <img class="lazyload" data-src="frontend/images/uploads/abflower1.png" alt="About">
                    <h2>@lang('about.our-vision')</h2>
                    <p>{!!__('about.vision-details')!!}</p>
                </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="ab-item">
                    <img class="lazyload" data-src="frontend/images/uploads/abflower2.png" alt="About">
                    <h2>@lang('about.our-mission')</h2>
                    <p>{!!__('about.mission-details')!!}</p>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="farm-img">
            <img class="lazyload" data-src="frontend/images/uploads/aboutv1-bg-footer.jpg" alt="farm">
        </div>
    </div>
</div>

<!-- Info Page Section -->
<!-- <section class="page-section" id="about">
    <div class="container relative">
        <div class="section-text mb-50 mb-sm-20">
            <div class="row">
                {!! $info_page_translation->content !!}
            </div>
        </div>
    </div>
</section> -->

<!-- End Info Page Section -->

@endsection