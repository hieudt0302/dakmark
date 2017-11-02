<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

class Subscribe extends Model
{
     /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'subscribe';

    /* Hàm này thiếu function. Lỗi không nên đẩy lên git nhé mọi người */
    // public static existEmail($email){
    // 	$exist = DB::table('subscribe')->where('email', $email)->first();
    // 	if(!empty($exist))
    // 		return true;
    // 	return false;
    // }
}
