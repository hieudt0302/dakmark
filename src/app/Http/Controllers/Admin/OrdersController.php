<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use App\Models\Order;
use Validator;
use DB;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->filter($request);
    }

    public function find(Request $request)
    {
        return $this->filter($request);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $order = Order::find($id);
        return view('admin/orders/show',compact('order'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function filter(Request $request)
    {
        $order_start_date = $request->order_start_date;
        $order_end_date = $request->order_end_date;
        $customer_name = $request->customer_name;
        $billing_email = $request->billing_email;
        $order_no = $request->order_no;

        $orders_status = $request->orders_status;
        $shippings_status = $request->shippings_status;
        $payments_status = $request->payments_status;


        $query = DB::table('orders')
            ->join('book_addresses', 'book_addresses.id', '=', 'orders.billing_address_id')
            ->select('orders.*', 'book_addresses.last_name', 'book_addresses.first_name', 'book_addresses.email', 'book_addresses.phone');
        
        if (strlen($order_start_date) > 0) {
            $start = date('Y-m-d'.' 00:00:00', strtotime($order_start_date));
            $query->where('orders.order_start_date', '>=', $start);
        }
        if (strlen($order_end_date) > 0) {
            $end = date('Y-m-d'.' 23:59:59', strtotime($order_end_date));
            $query->where('orders.order_end_date', '<=', $end);
        }

        if (strlen($customer_name) > 0) {
            $query->where(function ($subQuery) use ($customer_name) {
                $subQuery->where('book_addresses.first_name', 'LIKE', '%'.$customer_name.'%');
                $subQuery->orWhere('book_addresses.last_name', 'LIKE', '%'.$customer_name.'%');
            });
        }

        if (strlen($billing_email) > 0) {
            $query->where('book_addresses.email', '<=', $billing_email);
        }

        if (count($orders_status) > 0) {
            $query->whereIn('order_status', $orders_status);
        }

        if (count($payments_status) > 0) {
            $query->whereIn('payment_status', $payments_status);
        }

        if (count($shippings_status) > 0) {
            $query->whereIn('shipping_status', $shippings_status);
        }

        if (strlen($order_no) > 0) {
            $query->where('orders.order_no', $order_no);
        }


        $orders = $query->paginate(2);
        $request->flashOnly(['order_start_date', 'order_end_date', 'customer_name', 'billing_email', 'order_no','orders_status','shippings_status','payments_status']);

        return View('admin.orders.index', compact('orders'))
        ->with('i', ($request->input('page', 1) - 1) * 2);
    }

    public function CancelOrderStatus($id)
    {
        $order = Order::find($id);
        $order->order_status = 3; //refer Lang/method.php
        $order->save();
        
        return view('admin/orders/show',compact('order'));
    }

    public function ChangeOrderStatus(Request $request, $id)
    {
        $order = Order::find($id);
        $order->order_status =  $request->order_status; //refer Lang/method.php
        $order->save();
        
        return view('admin/orders/show',compact('order'));
    }
    public function ChangPaymentStatus(Request $request, $id)
    {
        $order = Order::find($id);
        $order->payment_status =  $request->payment_status; //refer Lang/method.php
        $order->save();
        
        return view('admin/orders/show',compact('order'));
    }
    public function ChangeShippingStatus(Request $request, $id)
    {
        $order = Order::find($id);
        $order->shipping_status =  $request->shipping_status; //refer Lang/method.php
        $order->save();
        
        return view('admin/orders/show',compact('order'));
    }
    public function UpdateOrderFee(Request $request, $id)
    {
        $order = Order::find($id);
        $order->order_tax =  $request->order_tax; 
        $order->order_shipping_price =  $request->order_shipping_price; 
        $order->order_total = $order->order_tax  + $order->order_shipping_price +  $order->orderdetails->sum('total');
        $order->save();
        
        return view('admin/orders/show',compact('order'));
    }
}
