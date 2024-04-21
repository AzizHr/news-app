<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsController extends Controller
{
    // Validator rules for news
    private $newsRules = [
        'title' => 'required|string|max:255',
        'content' => 'required',
        'category_id' => 'required|exists:categories,id',
    ];

    // Helper method to generate Not Found response
    private function notFoundResponse()
    {
        return response()->json(['message' => 'No news was found'], 404);
    }

    public function index()
    {
        $news = News::with('category')->get();
        return response()->json($news, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->newsRules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $news = News::create($request->all());

        return response()->json($news, 201);
    }

    public function show($id)
    {
        $news = News::find($id);
        if (!$news) {
            return $this->notFoundResponse();
        }
        return response()->json($news, 200);
    }

    public function update(Request $request, $id)
    {
        $news = News::find($id);
        if (!$news) {
            return $this->notFoundResponse();
        }

        $validator = Validator::make($request->all(), $this->newsRules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $news->update($request->all());

        return response()->json($news, 200);
    }

    public function destroy($id)
    {
        $news = News::find($id);
        if (!$news) {
            return $this->notFoundResponse();
        }

        $news->delete();

        return response()->json(['message' => 'News deleted successfully'], 204);
    }

    public function search(Request $request)
    {
        $search = $request->input('search');

        $news = News::where('title', 'like', "%$search%")
            ->orWhere('content', 'like', "%$search%")
            ->get();

        if ($news->isEmpty()) {
            return $this->notFoundResponse();
        }

        return response()->json($news, 200);
    }
}
