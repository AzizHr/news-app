<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/news', [NewsController::class, 'index']);
Route::middleware('auth:sanctum')->get('/news/{id}', [NewsController::class, 'show']);
Route::middleware('auth:sanctum')->post('/news', [NewsController::class, 'store']);
Route::middleware('auth:sanctum')->delete('/news/{id}', [NewsController::class, 'destroy']);
Route::middleware('auth:sanctum')->put('/news/{id}', [NewsController::class, 'update']);
Route::middleware('auth:sanctum')->get('/search', [NewsController::class, 'search']);


Route::middleware('auth:sanctum')->get('/categories', [CategoryController::class, 'index']);
Route::middleware('auth:sanctum')->get('/categories/filter', [CategoryController::class, 'filter']);

Route::post('/auth/register',[AuthController::class,'register']);
Route::post('/auth/login',[AuthController::class,'login']);
Route::post('/logout',[AuthController::class,'logout'])
  ->middleware('auth:sanctum');

