<div class="row">
	<div id="homeslider" class="owl-carousel">
		@foreach($sliders as $slider)
		<div>
			<img data-src="{{asset('/storage/'.$slider->image) }}" alt="slider" class="lazyload" data-no-retina>
			<div class="slider-meta">
				<div class="slider-caption">{{$slider->translation->description??""}}</div>
				<a href="/{{$slider->url}}" class="btn-detail">@lang('common.more-details')</a>
			</div>
		</div>
		@endforeach
	</div>
</div>