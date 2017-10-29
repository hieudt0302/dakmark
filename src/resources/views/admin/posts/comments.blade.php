@extends('layouts.admin') 
@section('title','Bình Luận Bài Viết - Admin')
@section('content')
<!-- Content Header (Page header) -->
<section class="content-header">
    <h1>
    Bình Luận Bài Viết
        <small>Danh Sách</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="#">Bình Luận Bài Viết</a></li>
        <li class="active">Danh Sách</li>
    </ol>
</section>
<!-- Main content -->
<section class="content">
    <div class="form-horizontal">
        <div class="panel-group">
            <div class="panel panel-default panel-search">
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-6">
                            <form action="{{url('/admin/posts/comments')}}" method="POST">
                            {{ csrf_field()}}
                                <div class="form-group">
                                    <label for="created_from" class="col-md-4 control-label">Từ Ngày</label>
                                    <div class="col-sm-8 input-group date">
                                        <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
                                        <input type="text" name="created_from" class="form-control pull-right" id="created_from" data-date-end-date="0d">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label">Đến Ngày</label>
                                    <div class="col-sm-8 input-group date">
                                        <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
                                        <input type="text" name="created_to" class="form-control pull-right" id="created_to" data-date-end-date="0d">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label" for="SearchText" title="">Comment</label>
                                    <div class="col-md-8">
                                        <input class="form-control text-box single-line" name="comment" type="text">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-4 control-label" >Approved</label>
                                    <div class="col-md-8">
                                        <select class="form-control" name="approved_type">
                                            <option selected="selected" value="2">All</option>
                                            <option value="1">Approved only</option>
                                            <option value="0">Disapproved only</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-8 col-md-offset-4">
                                        <button type="submit"  class="btn btn-primary btn-search">
                                        <i class="fa fa-search"></i>
                                        Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-body">
                    <div id="productreviews-grid">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Post Name</th>
                                    <th>Customer</th>
                                    <th>Comment</th>
                                    <th style="text-align:center">Website</th>
                                    <th style="text-align:center">Approved</th>
                                    <th>Created on</th>
                                    <th style="text-align:center">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($comments as $comment)
                                <tr>
                                    <td><a href="{{url('/admin/products/')}}/1/Edit">Product Name...</a></td>
                                    <td>Customer Name</td>
                                    <td>{{$comment->comment}}</td>
                                    <td style="text-align:center">{{$comment->website}}</td>
                                    <td style="text-align:center">
                                        @if($comment->approved===1)
                                        <i class="fa fa-check true-icon"></i>
                                        @else 
                                        <i class="fa fa-check false-icon"></i>
                                        @endif
                                    </td>
                                    <td>{{$comment->created_at}}</td>
                                    <td style="text-align:center"><a class="btn btn-default" href="#"><i class="fa fa-pencil"></i>Edit</a></td>
                                </tr>
                                @endforeach
                            </tbody>
                            <tfoot>
                                {{$comments->links()}}
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection 

@section('scripts')
<script>
    $(function(){
        $('#created_from, #created_to').datepicker({
            format : 'yyyy-mm-dd',
            autoclose : true,
            clearBtn : true
        })
    })
</script>
@endsection