@extends('layouts.master') 
@section('title','Dakmark Foods') 
@section('content')

<!-- Head Section -->
<section class="page-section bg-dark-alfa-50 parallax-3" style="background-image:url('{{ asset('public/assets/rhythm/images/foods/caphe.jpg') }}');">
    <div class="relative container align-left">

        <div class="row">

            <div class="col-md-8">
                <h1 class="hs-line-11 font-alt mb-20 mb-xs-0">{{$info_page_translation->title}}</h1>
                <div class="hs-line-4 font-alt">
                </div>
            </div>

            <div class="col-md-4 mt-30">
                <div class="mod-breadcrumbs font-alt align-right">
                    <a href="#">@lang('header.home')</a>&nbsp;/&nbsp;<span>InfoPage</span>
                </div>

            </div>
        </div>

    </div>
</section>
<!-- End Head Section -->


<!-- About Section -->
<section class="page-section" id="about">
    <div class="container relative">
        <div class="section-text mb-50 mb-sm-20">
            <div class="row">
                {!! $info_page_translation->content !!}
            </div>
        </div>
    </div>
</section>

<!-- End Aboud Section -->

@endsection