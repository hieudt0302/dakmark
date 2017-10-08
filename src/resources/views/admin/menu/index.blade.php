@extends('layouts.admin')
@section('title','Menu - Admin')
@section('content')
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
        <div class="col-md-12">
            <!-- TO DO List -->
          <div class="box box-primary">
            <div class="box-header">
              <i class="ion ion-clipboard"></i>

              <h3 class="box-title">Menu Chính</h3>
              <div class="box-tools pull-right">
                <!-- <ul class="pagination pagination-sm inline">
                  <li><a href="#">&laquo;</a></li>
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">&raquo;</a></li>
                </ul> -->
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <!-- See dist/js/pages/dashboard.js to activate the todoList plugin -->
              <ul class="todo-list">
                @foreach($menus as $menu)
                <li>
                  <!-- drag handle -->
                  <span class="handle">
                        <i class="fa fa-ellipsis-v"></i>
                        <i class="fa fa-ellipsis-v"></i>
                  </span>
                  
                  <!-- todo text -->
                  <span class="text">{{$menu->name}}</span>
                  <!-- checkbox -->
                  <input type="checkbox" value="">Enabled
                  <!-- checkbox -->
                  <input type="checkbox" value="">Visible
                  <!-- checkbox -->
                  <input type="checkbox" value="">Set Menu
                  <!-- Emphasis label -->
                  <!-- <small class="label label-danger"><i class="fa fa-clock-o"></i> 2 mins</small> -->
                  <!-- General tools such as edit or delete-->
                  <div class="tools">
                    <i class="fa fa-edit"></i>
                    <i class="fa fa-trash-o"></i>
                  </div>
                </li>
                @endforeach
                
              </ul>
            </div>
            <!-- /.box-body -->
            <div class="box-footer clearfix no-border">
              <button type="button" class="btn btn-default pull-right"><i class="fa fa-plus"></i> Add item</button>
            </div>
          </div>
          <!-- /.box -->
        </div>
    </div>
</section>
@endsection
@section('scripts')
<script>
    $(function() {
        'use strict';
        // jQuery UI sortable for the todo list
        $('.todo-list').sortable({
          placeholder         : 'sort-highlight',
          handle              : '.handle',
          forcePlaceholderSize: true,
          zIndex              : 999999
        });
        /* jQueryKnob */
        $('.knob').knob();
        /* The todo list plugin */
        $('.todo-list').todoList({
                onCheck  : function () {
                window.console.log($(this), 'The element has been checked');
            },
                onUnCheck: function () {
                window.console.log($(this), 'The element has been unchecked');
            }
        });
    });
</script>
@endsection