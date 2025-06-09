<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductIngredient;
use Illuminate\Http\Request;

class ProductIngredientController extends Controller
{
    // List all ingredients for a product
    public function loadProductIngredients($productId)
    {
        $ingredients = ProductIngredient::with('ingredient')
            ->where('product_id', $productId)
            ->get();

        return response()->json([
            'ingredients' => $ingredients
        ], 200);
    }

    // Add an ingredient to a product
    public function storeProductIngredient(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:tbl_products,product_id',
            'ingredient_id' => 'required|exists:tbl_ingredients,ingredient_id',
            'quantity_required' => 'required|numeric|min:0.01',
        ]);

        ProductIngredient::create($validated);

        return response()->json([
            'message' => 'Ingredient added to product.'
        ], 200);
    }

    // Update an ingredient in a product
    public function updateProductIngredient(Request $request, ProductIngredient $productIngredient)
    {
        $validated = $request->validate([
            'quantity_required' => 'required|numeric|min:0.01',
        ]);

        $productIngredient->update($validated);

        return response()->json([
            'message' => 'Product ingredient updated.'
        ], 200);
    }

    // Remove an ingredient from a product
    public function destroyProductIngredient(ProductIngredient $productIngredient)
    {
        $productIngredient->delete();

        return response()->json([
            'message' => 'Product ingredient removed.'
        ], 200);
    }
}
