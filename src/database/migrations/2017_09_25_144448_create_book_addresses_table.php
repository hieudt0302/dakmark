<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('book_addresses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('contact');
            $table->string('address');
            $table->string('district',50);
            $table->string('city',50);
            $table->string('country',50);
            $table->string('zipcode');
            $table->string('phone',20);
            $table->string('fax',20);
            $table->string('email');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            // ->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('book_addresses');
    }
}
