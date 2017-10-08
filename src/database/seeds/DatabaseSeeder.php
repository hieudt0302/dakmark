<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $this->call(PermissionTableSeeder::class);
         $this->call(RolesTableSeeder::class);
         $this->call(RolePermissionsTableSeeder::class);
         $this->call(UsersTableSeeder::class);
         $this->call(CategoriesTableSeeder::class);
         
         $this->call(ProductsTableSeeder::class);

        // $this->call(LanguagesTableSeeder::class);
        // $this->call(FaqsTableSeeder::class);
        // $this->call(FaqTranslationsTableSeeder::class);    
        $this->call(InfoPagesTableSeeder::class);
        $this->call(InfoPageTranslationsTableSeeder::class);               
    }
}
