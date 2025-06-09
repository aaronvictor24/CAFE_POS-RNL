<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function loadCategories()
    {
        $categories = Category::where('tbl_categories.is_deleted', false)
            ->get();

        return response()->json([
            'categories' => $categories
        ], 200);
    }

    public function getCategory($categoryId)
    {
        $category = Category::find($categoryId);
        return response()->json([
            'category' => $category
        ], 200);
    }

    public function storeCategory(Request $request)
    {
        $validated = $request->validate([
            'category' => ['required', 'min:4', 'max:10']
        ]);

        Category::create([
            'category' => $validated['category'],
            'is_deleted' => false,
        ]);

        return response()->json([
            'message' => 'Category Successfully Added'
        ]);
    }

    public function updateCategory(Request $request, Category $category)
    {
        $validated = $request->validate([
            'category' => ['required', 'min:4', 'max:10']
        ]);

        $category->update([
            'category' => $validated['category']
        ]);

        return response()->json([
            'message' => 'Category Successfully Updated.'
        ], 200);
    }

    public function destroyCategory(Category $category)
    {
        $category->update([
            'is_deleted' => true
        ]);

        return response()->json([
            'message' => 'Category Successfully Deleted.'
        ]);
    }
}
