@extends('layouts.master')
@section('title','Tìm kiếm')
@section('content')

<div class="container search">
    <div class="row search-title">@lang('common.search-message') "<span class="keyword">{{ $keyword }}</span>"</div>
    <div class="row product-box">
        <div class="col-md-12 search-subject">@lang('product.product')</div>
        @if(!empty($products))
        <div class="row multi-columns-row">
    
            @foreach($products as $product)
            <!-- Shop Item -->
            <div class="col-md-4 col-lg-4 mb-60 mb-xs-40">
                
                <div class="post-prev-img">
                    
                    <a href="">
                        <img src="{{ asset('public/assets/img/product/' . $product->thumb) }}" alt="" />
                    </a>
                    
                    @if($product->old_price != 0)
                    <div class="intro-label">
                        <span class="label label-danger bg-red">Sale</span>
                    </div>
                    @endif 

                </div>
                
                <div class="post-prev-title font-alt align-center">
                    <a href="">{{ $product->name }}</a>
                </div>

                <div class="post-prev-text align-center">
                    @if($product->old_price != 0)
                    <del>{!! price_format($product->old_price,'VNĐ') !!}</del>
                    @endif
                    <strong>{!! price_format($product->price,'VNĐ') !!}</strong>
                </div>
                
                <div class="post-prev-more align-center">
                    <a href="#" class="btn btn-mod btn-gray btn-round"><i class="fa fa-shopping-cart"></i> @lang('shoppings.add-cart')</a>
                </div>
                
            </div>
            <!-- End Shop Item -->
            @endforeach
        </div>
        <div class="pagination">{!! $products->appends(request()->input())->render() !!}</div>
        @else
        <div class="col-md-12 null">@lang('common.no-result')</div>
        @endif
    </div>
    <div class="row blog-box">
        <div class="col-md-12 search-subject">@lang('header.blog')</div>
        @if(!empty($blogs))
        <div class="row multi-columns-row">
    
            @foreach($blogs as $blog)            
            <!-- Post Item -->
            <div class="col-md-6 col-lg-6 mb-60 mb-xs-40">
                
                <div class="post-prev-img">
                    <a href=""><img src="{{ asset('public/assets/img/blog/' . $blog->thumb) }}" alt="" /></a>
                </div>
                
                <div class="post-prev-title font-alt">
                    <a href="">{{ $blog->title }}</a>
                </div>
                
                <div class="post-prev-info font-alt">
                    <a href="">John Doe</a> | {!! date("d-m-Y",strtotime($blog->create_time)) !!} | <i class="fa fa-eye"></i>{{ $blog->views }}
                </div>
                
                <div class="post-prev-text">
                    @if($blog->excerpt != '')
                        {{ truncate($blog->excerpt,300) }}
                    @endif
                </div>
                
                <div class="post-prev-more">
                    <a href="" class="btn btn-mod btn-gray btn-round">@lang('blog.read-more') <i class="fa fa-angle-right"></i></a>
                </div>
                
            </div>
            <!-- End Post Item -->
            @endforeach
            
        </div>
        <div class="pagination">{!! $blogs->appends(request()->input())->render() !!}</div>
        @else
        <div class="col-md-12 null">@lang('common.no-result')</div>
        @endif
    </div>
</div>

@endsection
