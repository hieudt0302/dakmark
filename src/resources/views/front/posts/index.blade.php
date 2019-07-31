@extends('layouts.master')
@section('title','Pô Kô Farms')
@section('header')
<!-- Share Nav -->
@include('layouts.share')
@endsection
@section('content')

<div class="hero">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                @if(!empty($search_key))
                <h1>@lang('common.search-results')</h1>
                @else
                <h1>{{$category->translation->name??$category->name??$post_category->translation->name??$post_category->name}}</h1>
                <ul class="breadcumb">
                    <li><a href="{{ Setting::config('website')}}">@lang('common.home')</a></li>
                    <li><span>/</span>@lang('common.posts')</li>
                    <li><span>/</span>{{$category->translation->name??$category->name??$post_category->translation->name??$post_category->name}}</li>
                </ul>
                @endif
            </div>
        </div>
    </div>
</div>
<section class="bloglistpost-v1 bloglistpost-v2">
    <div class="container">
        <div class="row">
            <div class="col-md-9 col-sm-8 col-xs-12">

                <div class="left">
                    @if(!empty($search_key) && count($posts)==0)
                    @lang('common.zero-search-message')&nbsp;{{$search_key}}
                    @endif
                </div>

                @if(!empty($search_key) && count($posts)!=0)
                <!-- Post -->
                @foreach($posts as $post_tran)
                @if($post_tran->post->published)
                <div class="blogpost-v2">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="video2">
                                <img class="lazyload" data-src="{{asset('/storage/images/blog/')}}/{{$post_tran->post->img}}" alt="{{$post_tran->title}}">
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="blog-it-content2">
                                <div class="date">
                                    <span>{{$post_tran->post->author->first_name}} {{$post_tran->post->author->last_name}} | {{ date('d-m-Y', strtotime($post_tran->post->created_at)) }}</span>
                                </div>
                                <h2><a href="{{url('/')}}/posts/{{$post_tran->post->slug}}">{{$post_tran->title}}</a></h2>
                                <p>{{str_limit($post_tran->excerpt, $limit = 180, $end = '...')}} </p>
                                <a class="readmore2" href="{{url('/')}}/posts/{{$post_tran->post->slug}}">/ &nbsp; @lang('common.read-more')</a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                @endif
                @endforeach
                <!-- End Post -->
                @else
                <!-- Post -->
                @foreach($posts as $post)
                @if(!empty($post->translation->title))
                <div class="blogpost-v2">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="video2">
                                <img class="lazyload" data-src="{{asset('/storage/images/blog/')}}/{{$post->img}}" alt="{{$post->translation->title}}">
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="blog-it-content2">
                                <div class="date">
                                    <span>{{$post->author->first_name}} {{$post->author->last_name}} | {{ date('d-m-Y', strtotime($post->created_at)) }}</span>
                                </div>
                                <h2><a href="{{url('/')}}/posts/{{$post->slug}}">{{$post->translation->title}}</a></h2>
                                <p>{{str_limit($post->translation->excerpt??"", $limit = 150, $end = '...')}} </p>
                                <a class="readmore2" href="{{url('/')}}/posts/{{$post->slug}}">/ &nbsp; @lang('common.read-more')</a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                @endif
                @endforeach
                <!-- End Post -->
                @endif

            </div>
            <div class="col-md-3 col-sm-4 col-xs-12">
                <div class="bg-sidebar">
                    <div class="search">
                        {!! Form::open(array('method'=>'post','url' => '/search','class'=>'form-inline form','role'=>'form')) !!}
                        <div class="search-wrap">
                            <button class="search-button hidden" type="submit" title="Start Search">
                                <i class="fa fa-search"></i>
                            </button>
                            @if(!empty($search_key))
                            <input type="text" class="search-input" name="key" placeholder="{{$search_key}}">
                            <i class="fa fa-search" aria-hidden="true"></i>
                            @else
                            <input type="text" class="search-input" name="key" placeholder="{{ __('common.search') }}">
                            <i class="fa fa-search" aria-hidden="true"></i>
                            @endif
                        </div>
                        {!! Form::close() !!}
                    </div>
                    <br><br>

                    <div class="categories">
                        <h1 class="cate-heading">@lang('common.categories')</h1>
                        <hr>
                        <ul>
                            @foreach($categories as $category)
                            <li>
                                <a href="{{url('/subject')}}/{{$post_category->slug}}/{{$category->slug}}" title="">{{$category->translation->name}}</a>
                                <small>
                                    - {{$category->postsCount}}
                                </small>
                            </li>
                            @endforeach
                        </ul>
                    </div>
                    <div class="pp-posts">
                        <h1 class="cate-heading">@lang('blog.last-posts')</h1>
                        <hr>
                        @foreach($lastPosts as $post)
                        @if(!empty($post->translation->title))
                        <div class="pp-post-it">
                            <img class="lazyload" data-src="{{asset('/storage/images/blog/preview/')}}/{{$post->img}}" alt="{{$post->translation->title}}">
                            <div class="pp-infor">
                                <div class="date">
                                    <span>{{$post->author->first_name}} {{$post->author->last_name}} | {{ date('d-m-Y', strtotime($post->created_at)) }}</span>
                                </div>
                                <h5><a href="{{url('/posts')}}/{{$post->slug}}">{{$post->translation->title}}</a></h5>
                            </div>
                        </div>
                        @endif
                        @endforeach
                    </div>
                    <br><br>
                    @if (Setting::config('banner-blog-active')=='1')
                    <div class="sale">
                        <a href="{{ Setting::config('banner-blog-url') }}"><img class="lazyload" data-src="{{asset('frontend/images/uploads/sale.jpg')}}" alt="post1"></a>
                    </div>
                    @endif
                    <div class="searchbytag">
                        <h1 class="cate-heading">@lang('blog.search-tags')</h1>
                        <hr>
                        <ul class="tags">
                            @foreach($tags as $tag)
                            <li><a href="{{url('/subject/posts/tags')}}/{{$tag->slug}}">{{$tag->name}}</a></li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<div class="blogpanigation">
    <div class="container">
        <div class="col-md-9">
            {{ $posts->links() }}
        </div>
    </div>
</div>
<!-- End Section -->
@endsection