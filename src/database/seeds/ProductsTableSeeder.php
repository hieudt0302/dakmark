<?php

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\User;


class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        if (Product::count() == 0) {
            
            $user = User::where('username', 'admin')->firstOrFail();

            //10
            $product10 = Product::create([
                'sku'  => 'SKU010',
                'name' => 'Cà phê Socola',
                'url' => 'product-10',
                'price'          => 1000,
                'summary'         => 'Summary',
                'description'       => 'Description',
                'specs' => 'Specs',
                'author_id' => $user->id
            ]);
            //9
            $product9 = Product::create([
                'sku'  => 'SKU009',
                'name' => 'Cà phê Sài Gòn',
                'url' => 'product-9',
                'price'          => 900,
                'summary'         => 'Summary',
                'description'       => 'Description',
                'specs' => 'Specs',
                'author_id' => $user->id
            ]);

            //8
            $product8 =Product::create([
                'sku'  => 'SKU008',
                'name' => 'Cà phê hòa tan 2',
                'url' => 'product-8',
                'price'          => 800,
                'summary'         => 'Summary',
                'description'       => 'Description',
                'specs' => 'Specs',
                'author_id' => $user->id
            ]);

            //7
            $product7 =Product::create([
                'sku'  => 'SKU007',
                'name' => 'Cà phê hòa tan 1',
                'url' => 'product-7',
                'price'          => 700,
                'summary'         => 'Summary',
                'description'       => 'Description',
                'specs' => 'Specs',
                'author_id' => $user->id
            ]);

            //6
            $product6 =Product::create([
                'sku'  => 'SKU006',
                'name' => 'Máy pha cà phê',
                'url' => 'product-6',
                'price'          => 600,
                'summary'         => 'Summary',
                'description'       => 'Description',
                'specs' => 'Specs',
                'author_id' => $user->id
            ]);

             //5
             $product5 =Product::create([
                'sku'  => 'SKU005',
                'name' => 'Muỗng cà phê',
                'url' => 'product-5',
                'price'          => 500,
                'summary'         => 'Summary',
                'description'       => 'Description',
                'specs' => 'Specs',
                'author_id' => $user->id
            ]);


             //4
             $product4 =Product::create([
                'sku'  => 'SKU004',
                'name' => 'Ly Cà phê',
                'url' => 'product-4',
                'price'          => 400,
                'summary'         => 'Summary',
                'description'       => 'Description',
                'specs' => 'Specs',
                'author_id' => $user->id
            ]);

            //3
            $product3 =Product::create([
                'sku'  => 'SKU003',
                'name' => 'Cà phê gói',
                'url' => 'product-3',
                'price'          => 300,
                'summary'         => 'Summary',
                'description'       => 'Description',
                'specs' => 'Specs',
                'author_id' => $user->id
            ]);

            //2
            $product2 =Product::create([
                'sku'  => 'SKU002',
                'name' => 'Cà phê phin 2',
                'url' => 'product-2',
                'price'          => 200,
                'summary'         => 'Summary',
                'description'       => 'Description',
                'specs' => 'Specs',
                'author_id' => $user->id
            ]);

            //1
            $product1 =Product::create([
                'sku'  => 'SKU001',
                'name' => 'Cà phê phin 1',
                'url' => 'product-1',
                'price'          => 100,
                'summary'         => 'Summary',
                'description'       => 'Description',
                'specs' => 'Specs',
                'author_id' => $user->id
            ]);

            
            

        }
    }
}
