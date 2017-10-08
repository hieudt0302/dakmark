@extends('layouts.admin') @section('title','Blog - Admin') @section('content')
<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
        Menu
        <small>Danh Sách</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="#">Menu</a></li>
        <li class="active">Danh Sách</li>
    </ol>
</section>
<!-- Main content -->
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title"></h3>Danh Sách Bài Viết
                </div>
                <div class="box-body">
                    <table id="example1" class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Tiêu Đề</th>
                                <th>Slug</th>
                                <th>Xuất Bản(s)</th>
                                <th>Ngày Tạo</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($posts as $post)
                            <tr>
                                <td>{{$post->title}}</td>
                                <td>{{$post->slug}}</td>
                                <td>
                                    @if($post->published==1) Đã xuất bản @else Chưa xuất bản @endif
                                </td>
                                <td>{{$post->created_at}}</td>
                            </tr>
                            @endforeach
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Tiêu Đề</th>
                                <th>Slug</th>
                                <th>Xuất Bản(s)</th>
                                <th>Ngày Tạo</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection @section('scripts') @endsection