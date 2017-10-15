@extends('layouts.master')
@section('title','Dakmark Foods - Post') 
@section('header')
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">
@endsection
@section('content')

<!-- Head Section -->
<section class="small-section bg-gray-lighter pt-30 pb-30">    
    <div class="relative container align-left">

        <div class="row">

            <div class="col-md-8">
                <h1 class="hs-line-11 font-alt mb-20 mb-xs-0">@lang('header.blog')</h1>
                <div class="hs-line-4 font-alt black">
                    We share our best ideas in our blog
                </div>
            </div>

            <div class="col-md-4 mt-30">
                <div class="mod-breadcrumbs font-alt align-right">
                    <a href="#">@lang('header.home')</a>&nbsp;/&nbsp;@lang('header.blog')&nbsp;
                </div>

            </div>
        </div>

    </div>
</section>
<!-- End Head Section -->


<!-- Section -->
<section class="page-section">
    <div class="container relative">

        <div class="row">

            <!-- Content -->
            <div class="col-sm-8">
                <!-- Blog options -->
                <div class="clearfix mb-40">
                    
                    <div class="left section-text mt-10">
                        @if(!empty($search_key) && count($posts)==0)
                            @lang('common.zero-search-message')&nbsp;{{$search_key}}
                        @endif 
                    </div>
                    
                </div>
                <!-- End Blog options -->              
                <!-- Post -->
                @foreach($posts as $post)
                <div class="blog-item">
                    <!-- Post Title -->
                    <h2 class="blog-item-title font-alt"><a href="{{url('/')}}/posts/{{$post->slug}}">{{$post->translation->title}}</a></h2>
                    <!-- Author, Categories, Comments -->
                    <div class="blog-item-data">
                        <a href="#"><i class="fa fa-clock-o"></i> {{ date('d-m-Y', strtotime($post->created_at)) }}</a>
                        <span class="separator">&nbsp;</span>
                        <a href="#"><i class="fa fa-user"></i> {{$post->author->first_name}}</a>
                        <span class="separator">&nbsp;</span>
                        <i class="fa fa-folder-open"></i>
                        @foreach ($post->tags as $tag)
                            <a href="">{{$tag->name}}</a>,
                        @endforeach
                        <span class="separator">&nbsp;</span>
                        <a href="#"><i class="fa fa-comments"></i> {{count($post->comments)}} Comments</a>
                    </div>

                    <!-- Image -->
                    <div class="blog-media">
                        <a href="{{url('/')}}/posts/{{$post->slug}}"><img src="{{ asset('images/blog/' . $post->img) }}" alt="" /></a>
                    </div>

                    <!-- Text Intro -->
                    <div class="blog-item-body">
                        <p>
                            {{$post->translation->excerpt}}
                        </p>
                    </div>

                    <!-- Read More Link -->
                    <div class="blog-item-foot">
                        <a href="{{url('/')}}/posts/{{$post->slug}}" class="btn btn-mod btn-round  btn-small">Read More <i class="fa fa-angle-right"></i></a>
                    </div>

                </div>
                @endforeach
                <!-- End Post -->


                <!-- Pagination -->
                {{ $posts->links() }}
                <!-- <div class="pagination">
                    <a href=""><i class="fa fa-angle-left"></i></a>
                    <a href="" class="active">1</a>
                    <a href="">2</a>
                    <a href="">3</a>
                    <a class="no-active">...</a>
                    <a href="">9</a>
                    <a href=""><i class="fa fa-angle-right"></i></a>
                </div> -->
                <!-- End Pagination -->

            </div>
            <!-- End Content -->

            <!-- Sidebar -->
            <div class="col-sm-4 col-md-3 col-md-offset-1 sidebar">

                <!-- Search Widget -->
                <div class="widget">
                    {!! Form::open(array('method'=>'post','url' => '/posts','class'=>'form-inline form','role'=>'form')) !!}
                        <div class="search-wrap">
                            <button class="search-button animate" type="submit" title="Start Search">
                                <i class="fa fa-search"></i>
                            </button>
                            @if(!empty($search_key))
                                <input type="text" class="form-control search-field" name="key" placeholder="{{$search_key}}">                            
                            @else
                                <input type="text" class="form-control search-field" name="key" placeholder="{{ __('common.search') }}">                        
                            @endif  
                        </div>
                    {!! Form::close() !!}
                </div>
                <!-- End Search Widget -->

                <!-- Widget -->
                <div class="widget">

                    <h5 class="widget-title font-alt">@lang('common.categories')a</h5>

                    <div class="widget-body">
                        <ul class="clearlist widget-menu">
                            @foreach($categories as $category)
                            <li>
                                <a href="{{url('/menu')}}/{{$post_category->slug}}/{{$category->slug}}" title="">{{$category->translation->name}}</a>
                                <small>
                                    - {{$category->postsCount}}
                                </small>
                            </li>
                            @endforeach
                        </ul>
                    </div>

                </div>
                <!-- End Widget -->

                <!-- Widget -->
                <div class="widget">
                    <h5 class="widget-title font-alt">Tags</h5>
                    <div class="widget-body">
                        <div class="tags">
                            @foreach($tags as $tag)
                            <a href="">{{$tag->name}}</a>
                            @endforeach
                        </div>
                    </div>
                </div>
                <!-- End Widget -->

                <!-- Widget -->
                <div class="widget">

                    <h5 class="widget-title font-alt">@lang('blog.last-posts')</h5>

                    <div class="widget-body">
                        <ul class="clearlist widget-posts">
                            @foreach($lastPosts as $post)
                            <li class="clearfix">
                                <a href="{{url('/posts')}}/{{$post->slug}}"><img src="{{ asset('images/blog/preview/' . $post->img) }}" alt="" class="widget-posts-img" /></a>
                                <div class="widget-posts-descr">
                                    <a href="{{url('/posts')}}/{{$post->slug}}" title="">{{$post->translation->title}}</a> @lang('blog.posted-by') {{$post->author->last_name}} {{$post->author->first_name}} {{ date('d-m-Y', strtotime($post->created_at)) }}
                                </div>
                            </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
                <!-- End Widget -->


            </div>
            <!-- End Sidebar -->
        </div>

    </div>
</section>
<!-- End Section -->
@endsection