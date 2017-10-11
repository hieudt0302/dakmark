    <!--header-->
<!-- Navigation panel -->
<nav class="main-nav js-stick">
<div class="full-wrapper relative clearfix">
    
    <!-- Logo ( * your text or image into link tag *) -->
    <div class="nav-logo-wrap local-scroll">
        <a href="/" class="logo">
            <img src="/images/logo.png" alt="" />
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
                <a href="{{ url('/about') }}" class="mn-has-sub">@lang('header.about-us')</a>
            </li>
            <!-- End Item With Sub -->
            
            <!-- Item With Sub - Level 1 -->
            @foreach($menus as $key => $menu)
            <li>
                <a href="#" class="mn-has-sub">{{ $menu->name }}<i class="fa fa-angle-down"></i></a>
                <!-- Sub - Level 2 -->
                <ul class="mn-sub">
                    @foreach($menu->GetMenuSubLevel1() as $sub)
                    <li>                        
                        <a href="{{url('/menu')}}/{{$sub->parent->slug}}/{{$sub->slug}}" title="{{ $sub->name }}">
                            {{ $sub->name }}
                        </a> 
                    </li>
                    @endforeach
                </ul>
                <!-- End Sub - Level 2-->
            </li>
            @endforeach
            <!-- End Item With Sub - Level 1 -->
            
         
            
            <!-- Divider -->
            <li><a>&nbsp;</a></li>
            <!-- End Divider -->
            
            <!-- Search -->
            <li>
                <a href="#" class="mn-has-sub"><i class="fa fa-search"></i> @lang('header.search')</a>                
                <ul class="mn-sub">                    
                    <li>
                        <div class="mn-wrap">
                            <form method="post" class="form">
                                <div class="search-wrap">
                                    <button class="search-button animate" type="submit" title="Start Search">
                                        <i class="fa fa-search"></i>
                                    </button>
                                    <input type="text" class="form-control search-field" placeholder="Search...">
                                </div>
                            </form>
                        </div>
                    </li>
                    
                </ul>
                
            </li>
            <!-- End Search -->
            
            <!-- Cart -->
            <li>
                <a href="{{ url('/cart') }}" ><i class="fa fa-shopping-cart shopping-cart-icon"></i> @lang('header.cart') ( {{ Cart::instance('default')->count(false) }} )</a>
            </li>
            <!-- End Cart -->
            
          <!-- Item With Sub -->
            <li>
                @guest
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
                <a href="#" class="mn-has-sub"><i class="fa fa-user"></i> {{ Auth::user()->last_name }} {{ Auth::user()->firs_name }}<i class="fa fa-angle-down"></i></a>
                <!-- Sub -->
                <ul class="mn-sub">                                 
                    <li>
                        <a href="{{ url('/order') }}">@lang('shoppings.order-history')</a> 
                    </li>                                    
                    <li>
                        <a href="{{ url('/profile') }}">@lang('common.profile')</a> 
                    </li>
                   
                    <li>
                        <a href="{{ route('logout') }}"
                            onclick="event.preventDefault();
                                        document.getElementById('logout-form').submit();">
                            Logout
                        </a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                    </li>
                </ul>
                <!-- End Sub -->
                @endguest

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