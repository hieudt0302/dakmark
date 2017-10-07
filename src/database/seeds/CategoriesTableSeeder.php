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
                'slug' => 'blog',
                'description'          => 'Description',
                'order'         => 0,
                'image_icon'       => '',
                'is_menu_avaiable'=>true,
            ]);

            $category2 =Category::create([
                'name' => 'Shop',
                'slug' => 'shop',
                'description'          => 'Description',
                'order'         => 1,
                'is_menu_avaiable'=>true,
                'image_icon'       => ''
            ]);

            $category3 =Category::create([
                'name' => 'Cà Phê Và Ẩm Thực',
                'slug' => 'ca-phe-va-am-thuc',
                'description'          => 'Description',
                'order'         => 0,
                'image_icon'       => '',
                'is_menu_avaiable'=>true,
                'parent_id' =>2
            ]);
            $category4 =Category::create([
                'name' => 'Cà Phê Và Sức Khỏe',
                'slug' => 'ca-phe-va-suc-khoe',
                'description'          => 'Description',
                'order'         => 1,
                'image_icon'       => '',
                'is_menu_avaiable'=>true,
                'parent_id' =>2
            ]);

            $category5 = Category::create([
                'name' => 'Thế Giới Cà Phê',
                'slug' => 'the-gioi-ca-phe',
                'description'          => 'Description',
                'order'         => 0,
                'image_icon'       => '',
                'is_menu_avaiable'=>true,
                'parent_id' =>1
            ]);
        }
    }
}
