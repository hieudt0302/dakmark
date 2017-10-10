@extends('layouts.master')
@section('title','Blog') 
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

                    <!-- Media Gallery -->
                    <div class="blog-media">
                        <ul class="clearlist content-slider">
                            <li>
                                <img src="{{asset('images/portfolio/full-project-1.jpg')}}" alt="" />
                            </li>
                            <li>
                                <img src="{{asset('images/portfolio/full-project-2.jpg')}}" alt="" />
                            </li>
                            <li>
                                <img src="{{asset('images/portfolio/full-project-3.jpg')}}" alt="" />
                            </li>
                        </ul>
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

                <!-- Post -->
                <div class="blog-item">
                    <!-- Post Title -->
                    <h2 class="blog-item-title font-alt"><a href="blog-single-sidebar-right.html">Video post only</a></h2>

                    <!-- Author, Categories, Comments -->
                    <div class="blog-item-data">
                        <a href="#"><i class="fa fa-clock-o"></i> 4 December</a>
                        <span class="separator">&nbsp;</span>
                        <a href="#"><i class="fa fa-user"></i> John Doe</a>
                        <span class="separator">&nbsp;</span>
                        <i class="fa fa-folder-open"></i>
                        <a href="">Design</a>, <a href="#">Branding</a>
                        <span class="separator">&nbsp;</span>
                        <a href="#"><i class="fa fa-comments"></i> 5 Comments</a>
                    </div>

                    <!-- Media Gallery -->
                    <div class="blog-media">
                        <iframe width="640" height="360" src="http://www.youtube.com/embed/w2JUhDd0CAA" frameborder="0" allowfullscreen></iframe>
                    </div>

                    <!-- Text Intro -->
                    <div class="blog-item-body">
                        <p>
                            Morbi lacus massa, euismod ut turpis molestie, tristique sodales est. Integer sit amet mi id sapien tempor molestie in nec massa.
                        </p>
                    </div>

                    <!-- Read More Link -->
                    <div class="blog-item-foot">
                        <a href="blog-single-sidebar-right.html" class="btn btn-mod btn-round  btn-small">Read More <i class="fa fa-angle-right"></i></a>
                    </div>

                </div>
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
                    <form class="form-inline form" role="form">
                        <div class="search-wrap">
                            <button class="search-button animate" type="submit" title="Start Search">
                                <i class="fa fa-search"></i>
                            </button>
                            <input type="text" class="form-control search-field" placeholder="{{ __('common.search') }}">
                        </div>
                    </form>
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