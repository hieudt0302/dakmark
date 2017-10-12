@extends('layouts.admin')
@section('title','FAQ - Admin')
@section('content')
<!-- Content Header (Page header) -->
<section class="content-header">
      <h1>
        Menu
        <small>Chỉnh Sửa</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
        <li><a href="#">FAQ</a></li>
        <li class="active">Chỉnh Sửa</li>
      </ol>
</section>
<!-- Main content -->
<section class="content">
    <div class="row">
        <div class="col-md-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">Chỉnh Sửa FAQ</h3>
                </div>
                @if (count($errors) > 0)
                    <div class="alert alert-danger">
                        <strong>Lỗi!</strong> Kiểm tra lại thông tin đã nhập.<br><br>
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
                @if ($message = Session::get('success_message'))
                    <div class="alert alert-success">
                        <p>{{ $message }}</p>
                    </div>
                @endif
                @if ($message = Session::get('danger_message'))
                    <div class="alert alert-danger">
                        <p>{{ $message }}</p>
                    </div>
                @endif   


                {!! Form::open(array('method' => 'PATCH','route' => ['admin.faqs.update', $faq->id])) !!}
                    <ul class="nav nav-tabs" role="tablist" style="padding-left: 10px">
                        @foreach ($language_list as $language)
                        @if ($language->id == 1) 
                        <li class="active">
                        @else
                        <li>
                        @endif
                            <a href="#{{$language->id}}-content" data-toggle="tab">Nội dung - {{$language->name}}</a>
                        </li>
                        @endforeach
                    </ul>
                    <div class="tab-content">
                        @foreach ($faq_translations as $faqtran)
                        @if ($faqtran->language_id == 1)   
                        <div class="tab-pane active" id="{{$faqtran->language_id}}-content">
                        @else
                        <div class="tab-pane fade" id="{{$faqtran->language_id}}-content">
                        @endif
                            <input type="hidden" id="faq-translation-id" name="{{$faqtran->language_id}}-id" value="{{ $faqtran->id }}" />
                            <table class="table table-responsive">
                                <tr>
                                    <td>
                                        Câu hỏi
                                        <span class="text-danger">*</span>
                                    </td>
                                    <td>
                                        <input type="text" id="title" class="form-control" name="{{$faqtran->language_id}}-question" value="{{ $faqtran->question }}" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Trả lời
                                    <span class="text-danger">*</span>
                                    </td>                    
                                    <td>
                                        <textarea class="form-control" name="{{$faqtran->language_id}}-answer">{{ $faqtran->answer }}</textarea>
                                    </td>
                                </tr> 
                            </table>
                        </div>
                        @endforeach
                    </div>
                    <div class="box-footer">
                        <button type="submit" class="btn btn-primary pull-right">Cập Nhật</button>
                    </div>
                </form>    

            </div>
        </div>
    </div>
</section>        
@endsection
