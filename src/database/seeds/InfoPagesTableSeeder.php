<?php

use Illuminate\Database\Seeder;
use App\Models\InfoPage;

class InfoPagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        InfoPage::create([
            'id'=>1,
            'title'=>'return',
            'slug'=>'return',
        ]);
        InfoPage::create([
            'id'=>2,
            'title'=>'Purchase flow',
            'slug'=>'purchase-flow',
        ]);            

        /* php artisan db:seed --class=InfoPageTableSeeder */  
    }
}
