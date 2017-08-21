 @extends('layouts.master') @section('title','Danh sách đơn hàng') @section('content')
<br>
<div class="container">
    <div class="row">
        <h1>Chi Tiết Đơn Hàng</h1>
        @include('notifications.status_message') 
		@include('notifications.errors_message')
    </div>
    <hr>
    <div class="row">
        <div class="col-xs-2">
            <p class="text-right">Tên Khách Hàng:</p>
        </div>
        <div class="col-xs-5">
            <p class="text-left">{{ $order->user->last_name }} {{ $order->user->first_name }}</p>
        </div>
        <div class="col-xs-2">
            <p class="text-right">Điện Thoại:</p>
        </div>
        <div class="col-xs-3">
            <p class="text-left">{{ $order->shipphone }}</p>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-2">
            <p class="text-right">Ngày Đặt Hàng:</p>
        </div>
        <div class="col-xs-5">
            <p class="text-left">{{ $order->created_at }}</p>
        </div>
        <div class="col-xs-2">
            <p class="text-right">Trạng Thái:</p>
        </div>
        <div class="col-xs-3">
            <p class="text-left">@if($order->status===1)
                                <span>Chờ xử lý</span> @elseif($order->status===2)
                                <span>Đang xử lý</span> @elseif($order->status===3)
                                <span>Hoàn thành</span> @elseif($order->status===4)
                                <span>Hủy</span> @else
                                <span>Không xác định!</span> @endif
            </p>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-2">
            <p class="text-right">Địa Chỉ Nhận Hàng:</p>
        </div>
        <div class="col-xs-5">
            <p class="text-left">{{ $order->shipaddress }}, {{ $order->shipdistrict }}, {{ $order->shipcity }}</p>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-xs-8">
            @foreach ($orderdetails as $key => $item)
            <div class="row">
                <div class="col-xs-2">
                    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzE0MHgxNDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNWRlNTI1Y2Y5NiB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1ZGU1MjVjZjk2Ij48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjQ0LjA1NDY4NzUiIHk9Ijc0LjUiPjE0MHgxNDA8L3RleHQ+PC9nPjwvZz48L3N2Zz4="
                        alt="default" class="img-rounded img-inside">
                </div>
                <div class="col-xs-8">
                   <div class="row">
                        <div class="col-xs-12 text-left">
                            <p>{{ $item->productname }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-3 text-left">
                            <p>Đơn Giá:</p>
                        </div>
                        <div class="col-xs-4 text-left">
                            <p>{{ $item->unitprice }}</p>
                        </div>
                        <div class="col-xs-3">
                            <p>Kích Cỡ:</p>
                        </div>
                        <div class="col-xs-1">
                            <p>{{ $item->size }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-3 text-left">
                            <p>Số Lượng:</p>
                        </div>
                        <div class="col-xs-4 text-left">
                            <p>{{ $item->quantity }}</p>
                        </div>
                        <div class="col-xs-3">
                            <p>Màu Sắc:</p>
                        </div>
                        <div class="col-xs-1">
                            <p>{{ $item->color }}</p>
                        </div>
                    </div>
                </div>
                @if($order->status===1)
                <div class="col-xs-2 text-left">
                    <form action="{{ url('order/itemdestroy', [$item->id]) }}" method="POST" >
                            {!! csrf_field() !!}
                            <input type="hidden" name="_method" value="DELETE">
                            <input type="submit" class="btn btn-danger btn-sm" value="Xóa">
                    </form>
                </div>
                @endif
            </div>
            <hr>
            @endforeach
        </div>
        <div class="col-xs-4">
            <div class="row">
                <div class="col-xs-6">
                    <p>Tổng giá hàng:</p>
                </div>
                <div class="col-xs-6 text-left">
                    <p>{{ $order->totalamount }} Tệ</p>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <p>Phí vận chuyển 1:</p>
                </div>
                <div class="col-xs-6 text-left">
                    <p>Đang cập nhật</p>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <p>Phí vận chuyển 2:</p>
                </div>
                <div class="col-xs-6 text-left">
                    <p>Đang cập nhật</p>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <p>Phí dịch vụ:</p>
                </div>
                <div class="col-xs-6 text-left">
                    <p>50,000 vnđ</p>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-xs-6">
                    <p>Tổng đơn hàng:</p>
                </div>
                <div class="col-xs-6 text-left">
                    <p>{{ $order->getTotalOrderPrice() }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                    <p>Đặt cọc:</p>
                </div>
                <div class="col-xs-6 text-left">
                    <p>5,000,000.00 vnđ</p>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-xs-6">
                    <p>Còn lại:</p>
                </div>
                <div class="col-xs-6 text-left">
                    <p>10,000,000 vnđ</p>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="bs-example bs-order-detail">
            <form class="form-horizontal">
                <div class="form-group">
                    <label for="inputEmail3" class="col-sm-2 control-label">Ghi Chú:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="request" value="{{ $order->note }}" placeholder="Nhập nội dung yêu cầu...">
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10 text-right">
                        <button type="submit" class="btn btn-primary">Lưu Ghi Chú</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<br> @endsection