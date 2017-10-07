@extends('layouts.master')
@section('title', $post->title) 
@section('content')
<!-- Head Section -->
<section class="small-section bg-gray-lighter">
    <div class="relative container align-left">

        <div class="row">

            <div class="col-md-8">
                <h1 class="hs-line-11 font-alt mb-20 mb-xs-0">Blog single</h1>
                <div class="hs-line-4 font-alt black">
                    We share our best ideas in our blog
                </div>
            </div>

            <div class="col-md-4 mt-30">
                <div class="mod-breadcrumbs font-alt align-right">
                    <a href="#">Home</a>&nbsp;/&nbsp;<a href="#">Blog</a>&nbsp;/&nbsp;<span>Single</span>
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
                <div class="blog-item mb-80 mb-xs-40">

                    <!-- Text -->
                    <div class="blog-item-body">

                        <h1 class="mt-0 font-alt">{{$post->title}}</h1>

                        <div class="lead">
                            <p>
                                {{$post->excerpt}}
                            </p>
                        </div>
                        <!-- End Text -->

                        <!-- Media Gallery -->
                        <div class="blog-media mt-40 mb-40 mb-xs-30">
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
                          
                        <!-- This is contnet of the post -->
                        <!-- TODO: Render html -->
                        {{$post->content}}
                    </div>
                    <!-- End Text -->
                </div>
                <!-- End Post -->

                <!-- Comments -->
                <div class="mb-80 mb-xs-40">
                    <h4 class="blog-page-title font-alt">Comments<small class="number">({{count($post->comments)}})</small></h4>

                    <ul class="media-list text comment-list clearlist">
                        <!-- Comment Item -->
                        @foreach($post->comments as  $comment)
                        <li class="media comment-item">
                            <a class="pull-left" href="#"><img class="media-object comment-avatar" src="{{asset('images/user-avatar.png')}}" alt="" width="50" height="50"></a>
                            <div class="media-body">
                                <div class="comment-item-data">
                                    <div class="comment-author">
                                        <a href="#">{{$review->name}}</a>
                                    </div>
                                    {{$review->created_at}}<span class="separator">&mdash;</span>
                                    <a href="#"><i class="fa fa-comment"></i>&nbsp;Reply</a>
                                </div>

                                <p>
                                    {{$comment->comment}}
                                </p>

                                <!-- Comment of second level -->
                                <!-- TODO: Make second level -->
                                <!-- <div class="media comment-item">

                                    <a class="pull-left" href="#"><img class="media-object comment-avatar" src="images/user-avatar.png" alt=""></a>

                                    <div class="media-body">

                                        <div class="comment-item-data">
                                            <div class="comment-author">
                                                <a href="#">Sam Brin</a>
                                            </div>
                                            Feb 9, 2014, at 10:27<span class="separator">&mdash;</span>
                                            <a href="#"><i class="fa fa-comment"></i>&nbsp;Reply</a>
                                        </div>

                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at magna ut ante eleifend eleifend.
                                        </p>


                                    </div>

                                </div> -->
                                <!-- End Comment of second level -->
                            </div>
                        </li>
                        @endforeach
                        <!-- End Comment Item -->
                    </ul>

                </div>
                <!-- End Comments -->


                <!-- Add Comment -->
                <div class="mb-80 mb-xs-40">

                    <h4 class="blog-page-title font-alt">Leave a comment</h4>

                    <!-- Form -->
                    <form method="post" action="{{url('/posts')}}/{{$post->slug}}/comment" id="form" role="form" class="form">
                        {{ csrf_field() }}
                        <input type="hidden" id="post_slug" name="post_slug" value="{{$post->slug}}">
                        @guest
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
                        @else
                            <input type="hidden" id="reader_id" name="reader_id" value="{{Auth::user()->id}}">
                            <input type="hidden" id="name" name="name" value="{{Auth::user()->last_name}} {{Auth::user()->first_name}}">
                            <input type="hidden" id="email" name="email" value="{{Auth::user()->email}}">
                        @endguest
                        <div class="mb-20 mb-md-10">
                            <!-- Website -->
                            <input type="text" name="website" id="website" class="input-md form-control" placeholder="Website" maxlength="100" >
                        </div>

                        <!-- Comment -->
                        <div class="mb-30 mb-md-10">
                            <textarea name="text" id="text" class="input-md form-control" rows="6" placeholder="Comment" maxlength="400"></textarea>
                        </div>

                        <!-- Send Button -->
                        <button type="submit" class="btn btn-mod btn-medium btn-round btn-round">
                            Send comment
                        </button>

                    </form>
                    <!-- End Form -->

                </div>
                <!-- End Add Comment -->

                <!-- Prev/Next Post -->
                <div class="clearfix mt-40">
                    <a href="#" class="blog-item-more left"><i class="fa fa-angle-left"></i>&nbsp;Prev post</a>
                    <a href="#" class="blog-item-more right">Next post&nbsp;<i class="fa fa-angle-right"></i></a>
                </div>
                <!-- End Prev/Next Post -->

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
                            <input type="text" class="form-control search-field" placeholder="Search...">
                        </div>
                    </form>
                </div>
                <!-- End Search Widget -->

                <!-- Widget -->
                <div class="widget">

                    <h5 class="widget-title font-alt">Categories</h5>

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

                    <h5 class="widget-title font-alt">Last posts</h5>

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