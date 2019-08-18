<?php

use Illuminate\Database\Seeder;
use App\Models\Setting;
class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $setting = Setting::where('key', 'copyright1')->first();
        if(!$setting) {
            Setting::create([
                'key'  => 'copyright1',
                'value' => 'Copyright © 2019 Pokofarms - All Rights Reserved'
            ]);
        }

        $setting = Setting::where('key', 'copyright2')->first();
        if(!$setting) {
            Setting::create([
                'key'  => 'copyright2',
                'value' => 'Bản quyền thuộc Pokofarms Đăk Hà, TP. Kon Tum, Việt Nam'
            ]);
        }
    }
}
