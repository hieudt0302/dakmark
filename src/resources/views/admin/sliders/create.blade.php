@extends('layouts.admin')
 
@section('content') 
    <div class="row">
        <div class="col-lg-12 margin-tb">
            <div class="pull-left">
                <h2>Thêm mới slider</h2>
            </div>
        </div>
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

{!! Form::open(array('method' => 'POST','route' => ['admin.sliders.store'])) !!}
    <ul class="nav nav-tabs" role="tablist" style="padding-left: 10px">
        <li class="active">
            <a href="#general" data-toggle="tab">Thông tin chung</a>
        </li>        
        @foreach ($language_list as $language)
        <li>
            <a href="#{{$language->id}}-description" data-toggle="tab">Nội dung - {{$language->name}}</a>
        </li>
        @endforeach
    </ul>
    <div class="tab-content">
        <div class="tab-pane active" id="general">
            <table class="table table-responsive">            
                <tr>
                    <td>
                        Tiêu đề
                        <span class="text-danger">*</span>
                    </td>
                    <td>
                        <input type="text" id="title" class="form-control" name="title" placeholder="Nhập nội dung" />
                    </td>
                </tr>
                <tr>
                    <td>
                        Url
                        <span class="text-danger">*</span>
                    </td>
                    <td>
                        <input type="text" id="url" class="form-control" name="url" placeholder="Nhập nội dung"/>
                    </td>
                </tr>
               <tr>
                    <td>Sắp xếp</td>
                    <td>
                        <input type="text" class="form-control" name="sort_order" />
                    </td>
                </tr>
                <tr>
                    <td>Cho phép hiển thị</td>
                    <td>
                        <select name="is_show" class="form-control">
                            <option value="0">Không</option>
                            <option value="1" selected >Có</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        Hình ảnh
                        <span class="text-danger">*</span>
                    </td>
                    <td>
                        <input type="file" name="image"/>
                        <span class="text-danger">{{ $errors->first('image') }}</span>
                    </td>
                </tr>                                              
            </table>                
        </div>

        @foreach ($language_list as $language)
        <div class="tab-pane fade" id="{{$language->id}}-description">
            <table class="table table-responsive">
                <tr>
                    <td>Mô tả</td>                  
                    <td>
                        <textarea class="form-control" name="{{$language->id}}-description" id="{{$language->name}}-description" placeholder="Nhập nội dung"></textarea>                        
                    </td>
                </tr> 
            </table>
        </div>
        @endforeach
    </div>
    <div style=" text-align: center">
        <button type="submit" class="btn btn-info">Thêm mới</button>
    </div>
</form>        
@endsection