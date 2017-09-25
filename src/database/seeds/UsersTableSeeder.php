<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (User::count() == 0) {
            $role = Role::where('name', 'admin')->firstOrFail();
            $user = User::create([
                'username'  => 'admin',
                'firs_tname' => 'Admin',
                'last_name' => 'Is',
                'email'          => 'admin@admin.com',
                'phone'         => '+84 123 456 789',
                'password'       => bcrypt('admin'),
                'remember_token' => str_random(60),
                'activated' => true
            ]);

            $user->roles()->attach($role);
        }
    }
}
