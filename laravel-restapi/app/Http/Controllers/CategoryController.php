<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index() {
        $categories = Category::with('parent', 'subcategories.subcategories', 'subcategories.news', 'news')->get();
        return response()->json($categories, 200);
    }

    public function search() {
        $fetchedCategory = Category::where('name', request()->get('search'))->first();

        if ($fetchedCategory) {
            $news = $fetchedCategory->news;
        
            $subcategoriesNews = $fetchedCategory->subcategories()->with('news')->get()->pluck('news')->flatten();
        
            $allNews = $news->merge($subcategoriesNews);
        
            return response()->json($allNews, 200);
        }
    
        return response()->json(['message' => 'Category not found'], 404);
    }
}
