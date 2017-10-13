@extends('layouts.master')
@section('title','Blog') 
@section('header')
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">
@endsection
@section('content')

<!-- Head Section -->
<section class="small-section bg-gray-lighter">
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
                    <a href="#">@lang('header.home')</a>&nbsp;/&nbsp;<a href="#">@lang('header.blog')</a>&nbsp;
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
                    <h2 class="blog-item-title font-alt"><a href="{{url('/')}}/posts/{{$post->slug}}">{{$post->title}}</a></h2>
                    <!-- Author, Categories, Comments -->
                    <div class="blog-item-data">
                        <a href="#"><i class="fa fa-clock-o"></i> {{$post->created_at}}</a>
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
                            {{$post->excerpt}}
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

                    <h5 class="widget-title font-alt">@lang('common.categories')</h5>

                    <div class="widget-body">
                        <ul class="clearlist widget-menu">
                            <li>
                                <a href="#" title="">Branding</a>
                                <small>
                                    - 7
                                </small>
                            </li>
                            <li>
                                <a href="#" title="">Design</a>
                                <small>
                                    - 15
                                </small>
                            </li>
                            <li>
                                <a href="#" title="">Development</a>
                                <small>
                                    - 3
                                </small>
                            </li>
                            <li>
                                <a href="#" title="">Photography</a>
                                <small>
                                    - 5
                                </small>
                            </li>
                            <li>
                                <a href="#" title="">Other</a>
                                <small>
                                    - 1
                                </small>
                            </li>
                        </ul>
                    </div>

                </div>
                <!-- End Widget -->

                <!-- Widget -->
                <div class="widget">

                    <h5 class="widget-title font-alt">Tags</h5>

                    <div class="widget-body">
                        <div class="tags">
                            <a href="">Design</a>
                            <a href="">Portfolio</a>
                            <a href="">Digital</a>
                            <a href="">Branding</a>
                            <a href="">Theme</a>
                            <a href="">Clean</a>
                            <a href="">UI & UX</a>
                            <a href="">Love</a>
                        </div>
                    </div>

                </div>
                <!-- End Widget -->

                <!-- Widget -->
                <div class="widget">

                    <h5 class="widget-title font-alt">@lang('blog.last-posts')</h5>

                    <div class="widget-body">
                        <ul class="clearlist widget-posts">
                            <li class="clearfix">
                                <a href=""><img src="images/blog/previews/post-prev-1.jpg" alt="" class="widget-posts-img" /></a>
                                <div class="widget-posts-descr">
                                    <a href="#" title="">Minimalistic Design Forever</a> Posted by John Doe 7 Mar
                                </div>
                            </li>
                            <li class="clearfix">
                                <a href=""><img src="images/blog/previews/post-prev-2.jpg" alt="" class="widget-posts-img" /></a>
                                <div class="widget-posts-descr">
                                    <a href="#" title="">Ipsum dolor sit amet, consectetur adipiscing elit</a> Posted by John Doe 7 Mar
                                </div>
                            </li>
                            <li class="clearfix">
                                <a href=""><img src="images/blog/previews/post-prev-3.jpg" alt="" class="widget-posts-img" /></a>
                                <div class="widget-posts-descr">
                                    <a href="#" title="">New Web Design Trends in 2015 year</a> Posted by John Doe 7 Mar
                                </div>
                            </li>
                            <li class="clearfix">
                                <a href=""><img src="images/blog/previews/post-prev-4.jpg" alt="" class="widget-posts-img" /></a>
                                <div class="widget-posts-descr">
                                    <a href="#" title="">Hipster’s Style in Web Design and Logo</a> Posted by John Doe 7 Mar
                                </div>
                            </li>
                            <li class="clearfix">
                                <a href=""><img src="images/blog/previews/post-prev-5.jpg" alt="" class="widget-posts-img" /></a>
                                <div class="widget-posts-descr">
                                    <a href="#" title="">Duis tristique condimentum nulla, bibendum consectetu</a> Posted by John Doe 7 Mar
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
                <!-- End Widget -->

                <!-- Widget -->
                <div class="widget">

                    <h5 class="widget-title font-alt">Comments</h5>

                    <div class="widget-body">
                        <ul class="clearlist widget-comments">
                            <li>
                                John Doe on <a href="#" title="">Lorem ipsum dolor sit amet</a>
                            </li>
                            <li>
                                Emma Johnson on <a href="#" title="">Suspendisse accumsan interdum tellus</a>
                            </li>
                            <li>
                                John Doe on <a href="#" title="">Praesent ultricies ut ipsum</a>
                            </li>
                            <li>
                                Mark Deen on <a href="#" title="">Vivamus malesuada vel nulla vulputate</a>
                            </li>
                            <li>
                                Sam Brin on <a href="#" title="">Aenean auctor egestas auctor</a>
                            </li>
                        </ul>
                    </div>

                </div>
                <!-- End Widget -->

                <!-- Widget -->
                <div class="widget">

                    <h5 class="widget-title font-alt">Text widget</h5>

                    <div class="widget-body">
                        <div class="widget-text clearfix">

                            <img src="images/user-avatar.png" alt="" width="70" class="img-circle left img-left"> Consectetur adipiscing elit. Quisque magna ante eleifend eleifend. Purus ut dignissim consectetur, nulla erat ultrices purus, ut consequat
                            sem elit non sem. Quisque magna ante eleifend eleifend.

                        </div>
                    </div>

                </div>
                <!-- End Widget -->

                <!-- Widget -->
                <div class="widget">

                    <h5 class="widget-title font-alt">Archive</h5>

                    <div class="widget-body">
                        <ul class="clearlist widget-menu">
                            <li>
                                <a href="#" title="">February 2014</a>
                            </li>
                            <li>
                                <a href="#" title="">January 2014</a>
                            </li>
                            <li>
                                <a href="#" title="">December 2013</a>
                            </li>
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