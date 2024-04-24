<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Define categories with their names and optional parent IDs
        $categories = [
            [
                'name' => 'Actualités',
                'children' => [
                    ['name' => 'Politique'],
                    ['name' => 'Économie'],
                    ['name' => 'Sport'],
                ],
            ],
            [
                'name' => 'Divertissement',
                'children' => [
                    ['name' => 'Cinéma'],
                    ['name' => 'Musique'],
                    ['name' => 'Sorties'],
                ],
            ],
            [
                'name' => 'Technologie',
                'children' => [
                    [
                        'name' => 'Informatique',
                        'children' => [
                            ['name' => 'Ordinateurs de bureau'],
                            ['name' => 'PC portable'],
                            ['name' => 'Connexion internet'],
                        ],
                    ],
                    [
                        'name' => 'Gadgets',
                        'children' => [
                            ['name' => 'Smartphones'],
                            ['name' => 'Tablettes'],
                            ['name' => 'Jeux vidéo'],
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Santé',
                'children' => [
                    ['name' => 'Médecine'],
                    ['name' => 'Bien-être'],
                ],
            ],
        ];

        // Seed categories recursively
        $this->seedCategories($categories);
    }

    /**
     * Seed categories recursively.
     *
     * @param array $categories
     * @param int|null $parentId
     * @return void
     */
    private function seedCategories(array $categories, int $parentId = null)
    {
        foreach ($categories as $category) {
            // Insert the category
            $categoryId = DB::table('categories')->insertGetId([
                'name' => $category['name'],
                'parent_id' => $parentId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Recur for children
            if (isset($category['children'])) {
                $this->seedCategories($category['children'], $categoryId);
            }
        }
    }
}
