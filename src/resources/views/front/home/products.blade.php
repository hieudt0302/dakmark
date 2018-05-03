<div class="products">
	<div class="container">
		<div class="row">
			<div class="col-md-12 col-sm-12 col-xs-12">
				<div class="heading-sec">
					<h1>@lang('product.products')</h1>
					<h4>-@lang('home.farm-activities-message')-</h4>					
				</div>				
			</div>
			<div class="col-md-12 col-sm-12 col-xs-12">
				<ul class="menu-filter">
					<li  data-filter=".new" class="active"><a href="#">@lang('home.specialty-coffee')</a></li>
					<li  data-filter=".best-sellers"><a href="#">@lang('home.commercial-coffee')</a></li>
					<li  data-filter=".sale"><a href="#">@lang('home.sale-products')</a></li>
				</ul>
			</div>
		</div>
        @php($curDate = Carbon\Carbon::now())
		<div class="row">
			<div class="products-it grid">
			@foreach($specialty_coffee as $product)
                @php($isSale = 0)
                @if($product->special_price != 0 && $product->special_price_start_date  <= $curDate && $curDate <= $product->special_price_end_date )
                    @php($isSale = 1)
                @endif			
				<div class="pro-it new col-md-3 col-sm-6 col-xs-12">
					<a href="{{url('/products')}}/{{$product->slug}}">
					<img class="pro-img" src="{{ asset('/storage') }}/{{$product->GetMediaByOrderAsc()->source??'images/no-image.png'}}" alt="">
					<div class="pro-infor">
						@if ($isSale == 1)
						<p><span class="hot">@lang('product.sale')</span></p>
						@endif							
						<h2><a href="{{url('/products')}}/{{$product->slug}}">{{$product->translation->name??$product->name}}</a></h2>
						<span class="pro-cost">
							@if ($isSale == 1)
                            <del class="section-text">{{FormatPrice::price($product->price)}}</del> &nbsp;
                            <strong>{{FormatPrice::price($product->special_price)}}</strong>
                        	@else
                            	<strong>{{FormatPrice::price($product->price)}}</strong>
                        	@endif
						</span>
					</div>
            	</div>
            @endforeach

			@foreach($commercial_coffee as $product)
                @php($isSale = 0)
                @if($product->special_price != 0 && $product->special_price_start_date  <= $curDate && $curDate <= $product->special_price_end_date )
                    @php($isSale = 1)
                @endif			
				<div class="pro-it best-sellers col-md-3 col-sm-6 col-xs-12">
					<a href="{{url('/products')}}/{{$product->slug}}">
					<img class="pro-img" src="{{ asset('/storage') }}/{{$product->GetMediaByOrderAsc()->source??'images/no-image.png'}}" alt="">
					<div class="pro-infor">
						@if ($isSale == 1)
						<p><span class="hot">@lang('product.sale')</span></p>
						@endif							
						<h2><a href="{{url('/products')}}/{{$product->slug}}">{{$product->translation->name??$product->name}}</a></h2>
						<span class="pro-cost">
							@if ($isSale == 1)
                            <del class="section-text">{{FormatPrice::price($product->price)}}</del> &nbsp;
                            <strong>{{$product->special_price}}</strong>
                        	@else
                            	<strong>{{FormatPrice::price($product->price)}}</strong>
                        	@endif
						</span>
					</div>
            	</div>
            @endforeach
			
			@foreach($sale_products as $product)
                @php($isSale = 0)
                @if($product->special_price != 0 && $product->special_price_start_date  <= $curDate && $curDate <= $product->special_price_end_date )
                    @php($isSale = 1)
                @endif			
				<div class="pro-it sale col-md-3 col-sm-6 col-xs-12">
					<a href="{{url('/products')}}/{{$product->slug}}">
					<img class="pro-img" src="{{ asset('/storage') }}/{{$product->GetMediaByOrderAsc()->source??'images/no-image.png'}}" alt="">
					<div class="pro-infor">
						@if ($isSale == 1)
						<p><span class="hot">@lang('product.sale')</span></p>
						@endif						
						<h2><a href="{{url('/products')}}/{{$product->slug}}">{{$product->translation->name??$product->name}}</a></h2>
						<span class="pro-cost">
							@if ($isSale == 1)
                            <del class="section-text">{{FormatPrice::price($product->price)}}</del> &nbsp;
                            <strong>{{$product->special_price}}</strong>
                        	@else
                            	<strong>{{FormatPrice::price($product->price)}}</strong>
                        	@endif
						</span>
					</div>
            	</div>
            @endforeach                                    						
			</div>	
		</div>
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function(){
    	$('.grid').isotope({ filter: '.new' });
	});
</script>