@extends('layouts.admin')
 
@section('content')
	<div class="row">
	    <div class="col-lg-12 margin-tb">
	        <div class="pull-left">
	            <h2>Danh sách slider</h2>
	        </div>
	    </div>
	</div>
	@if ($message = Session::get('success'))
		<div class="alert alert-success">
			<p>{{ $message }}</p>
		</div>
	@endif
	<table class="table table-bordered">
		<tr>
			<th>#</th>
			<th>Id</th>
			<th>Tiêu đề</th>
			<th>Url</th>
			<th>Hiển thị</th>
			<th>Thứ tự</th>			
			<th width="280px">Thao Tác</th>
		</tr>
	@foreach ($sliders as $slider)
	<tr>
		<td>{{ ++$i }}</td>
		<td>{{ $slider->id }}</td>
		<td>{{ $slider->title }}</td>
		<td>{{ $slider->url }}</td>
        <td>
            <i class="fa {!! ($slider->is_show==1) ? 'fa-check' : 'fa-times' !!}"></i>
        </td>
		<td>{{ $slider->order }}</td>
		<td>
			<a class="btn btn-primary" href="{{ route('admin.sliders.edit',$slider->id) }}">Sửa</a>
			{!! Form::open(['method' => 'DELETE','route' => ['admin.sliders.destroy', $slider->id],'style'=>'display:inline']) !!}
			{!! Form::submit('Xóa', ['class' => 'btn btn-danger']) !!}
    		{!! Form::close() !!}
		</td>

	</tr>
	@endforeach
	</table>
	{!! $sliders->render() !!}
@endsection