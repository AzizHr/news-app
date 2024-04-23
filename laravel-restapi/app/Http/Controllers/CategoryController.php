<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories, 200);
    }

    public function filter()
    {
        $categoryId = request()->get('id');

        $fetchedCategory = Category::find($categoryId);

        if (!$fetchedCategory) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        // Get news directly from the category and filter by expiration
        $newsFromCategory = $fetchedCategory->news()
            ->where('expired_at', '>', now())
            ->orderBy('started_at', 'desc')
            ->get();

        // Get news from subcategories and filter by expiration
        $subcategoriesNews = $fetchedCategory->subcategories()->with('news')->get()->pluck('news')->flatten()->where('expired_at', '>', now());

        // Merge both sets of news
        $allNews = $newsFromCategory->merge($subcategoriesNews);

        // Eager load the 'category' relationship for each news item
        $allNews->load('category');

        return response()->json($allNews, 200);
    }
}
