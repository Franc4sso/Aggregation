<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->randomElement([
                'Mars Rover',
                'Manhattan',
                'Apollo',
                'Voyager',
                'Enterprise'
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
