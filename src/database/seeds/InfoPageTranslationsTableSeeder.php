<?php

use Illuminate\Database\Seeder;
use App\Models\InfoPageTranslation;

class InfoPageTranslationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        InfoPageTranslation::create([
            'id'=>1,
            'info_page_id'=>1,
            'language_id'=>1,
            'content'=>'Tu di bo va mang hang den showroom cua chung toi.',
        ]);
        InfoPageTranslation::create([
            'id'=>2,
            'info_page_id'=>1,
            'language_id'=>2,
            'content'=>'Just bring to our showroom.',
        ]);
        InfoPageTranslation::create([
            'id'=>3,
            'info_page_id'=>1,
            'language_id'=>3,
            'content'=>'Chu mi nga.',
        ]);   

        InfoPageTranslation::create([
            'id'=>4,
            'info_page_id'=>2,
            'language_id'=>1,
            'content'=>'Den cua hang ma mua.',
        ]);
        InfoPageTranslation::create([
            'id'=>5,
            'info_page_id'=>2,
            'language_id'=>2,
            'content'=>'Check product here and go to showroom to buy.',
        ]);
        InfoPageTranslation::create([
            'id'=>6,
            'info_page_id'=>2,
            'language_id'=>3,
            'content'=>'Chin thien hao ron a.',
        ]);                     

        /* php artisan db:seed --class=InfoPageTranslationsTableSeeder */         
    }
}
