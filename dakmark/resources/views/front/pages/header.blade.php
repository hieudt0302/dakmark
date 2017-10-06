    <!--header-->
<!-- Navigation panel -->
            <nav class="main-nav js-stick">
                <div class="full-wrapper relative clearfix">
                    
                    <!-- Logo ( * your text or image into link tag *) -->
                    <div class="nav-logo-wrap local-scroll">
                        <a href="{{ url('/') }}" class="logo">
                            <img src="{{url('public/assets/img/logo-dark-mark-200.png')}}" alt="" />
                        </a>
                    </div>
                    
                    <div class="mobile-nav">
                        <i class="fa fa-bars"></i>
                    </div>
                    
                    <!-- Main Menu -->
                    <div class="inner-nav desktop-nav">
                        <ul class="clearlist">
                            
                            <!-- Item With Sub -->
                            <li>
                                <a href="{{ url('/') }}" class="mn-has-sub">@lang('header.home')</a>
                            </li>
                            <!-- End Item With Sub -->
                            
                            <!-- Item With Sub -->
                            <li>
                                <a href="{{ url('/about-us') }}" class="mn-has-sub">@lang('header.about-us')</a>
                            </li>
                            <!-- End Item With Sub -->
                            
                            <!-- Item With Sub -->
                            <li>
                                <a href="#" class="mn-has-sub">@lang('header.blog') <i class="fa fa-angle-down"></i></a>

                               <?php 
                                    $blogCats = \DB::table('blog_cat')->where('parent_id', 0)->where('is_show',1)->orderBy('sort_order', 'asc')->get();
                                ?>
                                @if(!empty($blogCats))                                
                                <!-- Sub -->
                                <ul class="mn-sub">
                                    
                                    @foreach ($blogCats as $bCat)
                                    <?php $bCatSeo = \DB::table('seo')->where('system_id', $bCat->system_id)->first(); ?>                                    
                                    <li>
                                        <a href="{{ route('front.item.show',$bCatSeo->slug) }}" title="{{ $bCat->name }}">
                                            {{ $bCat->name }}
                                        </a> 
                                    </li>
                                    @endforeach
                                    
                                </ul>
                                <!-- End Sub -->
                                @endif

                            </li>
                            <!-- End Item With Sub -->
                            
                            <!-- Item With Sub -->
                            <li>
                                <a href="{{ route('front.products') }}" class="mn-has-sub">@lang('header.shop')<i class="fa fa-angle-down"></i></a>
                                <?php 
                                    $productCats = \DB::table('product_cat')->where('parent_id', 0)->orderBy('sort_order', 'asc')->get();
                                ?>
                                @if(!empty($productCats))                                
                                <!-- Sub -->
                                <ul class="mn-sub to-left">

                                    @foreach ($productCats as $pCat)
                                    <?php $pCatSeo = \DB::table('seo')->where('system_id', $pCat->system_id)->first(); ?>                                    
                                    <li>
                                        <a href="{{ route('front.item.show',$pCatSeo->slug) }}" title="{{ $pCat->name }}">
                                            {{ $pCat->name }}
                                        </a>
                                    </li>
                                    @endforeach  

                                </ul>                                
                                <!-- End Sub -->
                                @endif

                            </li>
                            <!-- End Item With Sub -->

                            <!-- Item With Sub -->
                            <li>
                                <a href="{{ url('/contact') }}" class="mn-has-sub">@lang('header.contact')</a>
                            </li>
                            <!-- End Item With Sub -->
                            
                            <!-- Divider -->
                            <li><a>&nbsp;</a></li>
                            <!-- End Divider -->
                            
                            <!-- Search -->
                            <li>
                                <a href="#" class="mn-has-sub"><i class="fa fa-search"></i> @lang('header.search')</a>
                                
                                <ul class="mn-sub">
                                    
                                    <li>
                                        <div class="mn-wrap">
                                            {!! Form::open(array('route' => 'front.item.search')) !!}
                                                <div class="search-wrap">
                                                    <button class="search-button animate" type="submit" title="Start Search">
                                                        <i class="fa fa-search"></i>
                                                    </button>
                                                    <input type="text" class="form-control search-field" name="keyword" placeholder="Search...">
                                                </div>
                                            {!! Form::close() !!}
                                        </div>
                                    </li>
                                    
                                </ul>
                                
                            </li>
                            <!-- End Search -->
                            
                            <!-- Cart -->
                            <li>
                                <a href="{{ url('/cart') }}"><i class="fa fa-shopping-cart"></i> @lang('header.cart') ({{ Cart::instance('default')->count(false) }})</a>
                            </li>
                            <!-- End Cart -->
                            
                          <!-- Item With Sub -->
                            <li>
                                @if (Auth::guest())
                                <a href="#" class="mn-has-sub"><i class="fa fa-user"></i>@lang('header.account') <i class="fa fa-angle-down"></i></a>
                                <!-- Sub -->
                                <ul class="mn-sub">                                 
                                    <li>
                                        <a href="{{ url('/login') }}">@lang('auth.login')</a> 
                                    </li>                                    
                                    <li>
                                        <a href="{{ url('/register') }}">@lang('auth.register')</a> 
                                    </li>
                                </ul>
                                <!-- End Sub -->
                                @else
                                <a href="#" class="mn-has-sub"><i class="fa fa-user"></i>{{ Auth::user()->first_name }}<i class="fa fa-angle-down"></i></a>
                                <!-- Sub -->
                                <ul class="mn-sub">                                 
                                    <li>
                                        <a href="{{ url('/order') }}">@lang('shoppings.order-history')</a> 
                                    </li>                                    
                                    <li>
                                        <a href="{{ url('/profile') }}">@lang('common.profile')</a> 
                                    </li>
                                    <li>
                                        <a href="{{ url('/logout') }}" onclick="event.preventDefault();
                                                 document.getElementById('logout-form').submit();">
                                            @lang('auth.logout')
                                        </a>
                                        <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>                                    
                                </ul>
                                <!-- End Sub -->
                                @endif

                            </li>
                            <!-- End Item With Sub -->

                            <!-- Languages -->
                            <li>
                                <a href="#" class="mn-has-sub"><i class="fa fa-globe"></i> {{ app()->getLocale() }} <i class="fa fa-angle-down"></i></a>
                                
                                <ul class="mn-sub">
                                    
                                    <li><a href="{{URL::asset('')}}language/vi">Tiếng Việt</a></li>
                                    <li><a href="{{URL::asset('')}}language/en">English</a></li>
                                    <li><a href="">中文</a></li>
                                    
                                </ul>
                                
                            </li>
                            <!-- End Languages -->
                            
                        </ul>
                    </div>
                    <!-- End Main Menu -->
                    
                </div>
            </nav>
            <!-- End Navigation panel -->
        <!--header-->