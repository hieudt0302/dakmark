<?php

namespace App\Http\Controllers\Front;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\BookAddress;
use Validator;
use \Cart as Cart;
use Carbon\Carbon;
use DB;

class CheckoutController extends Controller
{
    /**
     * Create a new controller instance. Require auth
     *
     * @return void
     */
     public function __construct()
     {
         $this->middleware('auth');
     }

    public function BillingAddress()
    {
        $book_addresses = BookAddress::where('user_id', Auth::user()->id)->get();

        return View('front.checkout.billingaddress',compact('book_addresses'));
    }

    public function BillingAddressNext(Request $request)
    {
        if(!empty($request->bookaddress_id))
        {
            session(['BillingAddressId' => $request->bookaddress_id]);
        }else{
            $validator = Validator::make($request->all(), [
                'contact' => 'required',
                'phone' => 'required',
                'address' => 'required',
            ]);
    
            if ($validator->fails()) {
                return redirect()->back()
                ->with('message', 'ERROR-INPUT: Code EI1003')
                ->with('status', 'danger')
                ->withInput();
            }

            $address_id = DB::table('book_addresses')->insertGetId([
                'contact'=>  $request->contact??'',
                'address' =>$request->address??'',
                'district' => $request->district??'',
                'city' => $request->city??'',
                'country' =>$request->country??'',
                'zipcode' => $request->zipcode??'',
                'phone' => $request->phone??'',
                'fax' => $request->fax??'',
                'email' => $request->email??'',
                'user_id' => Auth::user()->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);

            session(['BillingAddressId' => $address_id]);
        }

        return redirect()->action('Front\CheckoutController@ShippingAddress');
    }

    public function ShippingAddress()
    {
        $book_addresses = BookAddress::where('user_id', Auth::user()->id)->get();

        return View('front.checkout.shippingaddress', compact('book_addresses'));
    }

    public function ShippingAddressNext(Request $request)
    {
        if(!empty($request->bookaddress_id))
        {
            session(['ShippingAddressId' => $request->bookaddress_id]);
        }else{
            $validator = Validator::make($request->all(), [
                'contact' => 'required',
                'phone' => 'required',
                'address' => 'required',
            ]);
    
            if ($validator->fails()) {
                return redirect()->back()
                ->with('message', 'ERROR-INPUT: Code EI1003')
                ->with('status', 'danger')
                ->withInput();
            }

            $address_id = DB::table('book_addresses')->insertGetId([
                'contact'=>  $request->contact??'',
                'address' =>$request->address??'',
                'district' => $request->district??'',
                'city' => $request->city??'',
                'country' =>$request->country??'',
                'zipcode' => $request->zipcode??'',
                'phone' => $request->phone??'',
                'fax' => $request->fax??'',
                'email' => $request->email??'',
                'user_id' => Auth::user()->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);

            session(['ShippingAddressId' => $address_id]);
        }

        return redirect()->action('Front\CheckoutController@ShippingMethod');
    }

    public function ShippingMethod()
    {
        return View('front.checkout.shippingmethod');
    }

    public function ShippingMethodNext(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'shippingmethod_id' => 'required'
        ]);

        if ($validator->fails()) {
            return redirect()->back()
            ->with('message', 'ERROR-INPUT: Code EI1001')
            ->with('status', 'danger')
            ->withInput();
        }

        session(['ShippingMethodId' => $request->shippingmethod_id]);
        return redirect()->action('Front\CheckoutController@PaymentMethod');
    }

    public function PaymentMethod()
    {
        return View('front.checkout.paymentmethod');
    }

    public function PaymentMethodNext(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'paymentmethod_id' => 'required'
        ]);

        if ($validator->fails()) {
            return redirect()->back()
            ->with('message', 'ERROR-INPUT: Code EI1001')
            ->with('status', 'danger')
            ->withInput();
        }

        session(['PaymentMethodId' => $request->paymentmethod_id]);
        return redirect()->action('Front\CheckoutController@Confirm');
    }

    public function Confirm()
    {
        $billingAddressId = $value = session('BillingAddressId');
        $billingaddress = BookAddress::find($billingAddressId);

        $shippingAddressId = $value = session('ShippingAddressId');
        $shippingaddress = BookAddress::find($billingAddressId);

        $shippingMethodId = $value = session('ShippingMethodId');

        $paymentMethodId = $value = session('PaymentMethodId');

        return View('front.checkout.confirm', compact('billingaddress', 'shippingaddress', 'shippingMethodId', 'paymentMethodId'));
    }

    public function ConfirmNext(Request $request)
    {

    }

    public function Complete()
    {

    }

    public function CompleteNext(Request $request)
    {

    }
}
