<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use App\Models\Activity;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory()->createMany([
            [
                'name' => 'Mario Rossi',
                'email' => 'mario@example.com',
                'password' => bcrypt('password')
            ],
            [
                'name' => 'Giovanni Verdi',
                'email' => 'giovanni@example.com',
                'password' => bcrypt('password')
            ],
            [
                'name' => 'Lucia Bianchi',
                'email' => 'lucia@example.com',
                'password' => bcrypt('password')
            ]
        ]);

        $projects = Project::factory(5)->create();

        foreach ($users as $user) {
            foreach ($projects as $project) {
                Activity::factory()
                    ->count(rand(3, 8))
                    ->create([
                        'project_id' => $project->id,
                        'employee_id' => $user->id
                    ]);
            }
        }
    }
}
