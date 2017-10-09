@extends('layouts.admin')
 
@section('content')
	<div class="row">
	    <div class="col-lg-12 margin-tb">
	        <div class="pull-left">
	            <h2>Danh sách trang thông tin</h2>
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
			<th width="280px">Thao Tác</th>
		</tr>
	@foreach ($info_pages as $info_page)
	<tr>
		<td>{{ ++$i }}</td>
		<td>{{ $info_page->id }}</td>
		<td>{{ $info_page->title }}</td>
		<td>
			<a class="btn btn-info" href="{{ route('admin.info-pages.show',$info_page->id) }}">Xem</a>
			<a class="btn btn-primary" href="{{ route('admin.info-pages.edit',$info_page->id) }}">Sửa</a>
			{!! Form::open(['method' => 'DELETE','route' => ['admin.info-pages.destroy', $info_page->id],'style'=>'display:inline']) !!}
			{!! Form::submit('Xóa', ['class' => 'btn btn-danger']) !!}
    		{!! Form::close() !!}
		</td>

	</tr>
	@endforeach
	</table>
	{!! $info_pages->render() !!}
@endsection