<?php

namespace Database\Factories;

use App\Models\News;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class NewsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = News::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // Get all category IDs from the database
        $categoryIds = Category::pluck('id')->toArray();

        return [
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraph,
            'started_at' => now(),
            'expired_at' => now()->addDays(7),
            'category_id' => $this->faker->randomElement($categoryIds),
        ];
    }
}
