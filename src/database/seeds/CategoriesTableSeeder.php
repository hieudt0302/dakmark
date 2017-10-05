<?php

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //name , description , url,`order`,image_icon
        if (Category::count() == 0) {
            //1
            $category1 = Category::create([
                'name' => 'Blog',
                'url' => 'blog',
                'description'          => 'Description',
                'order'         => 0,
                'image_icon'       => ''
            ]);

            $category2 =Category::create([
                'name' => 'Shop',
                'url' => 'shop',
                'description'          => 'Description',
                'order'         => 1,
                'image_icon'       => ''
            ]);

            $category3 =Category::create([
                'name' => 'Cà Phê Và Ẩm Thực',
                'url' => 'shop',
                'description'          => 'Description',
                'order'         => 0,
                'image_icon'       => '',
                'parent_id' =>2
            ]);
        }
    }
}
