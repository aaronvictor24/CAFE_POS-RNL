<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function loadIngredients()
    {
        $ingredients = Ingredient::with('category')
            ->where('is_deleted', false)
            ->get();

        return response()->json([
            'ingredients' => $ingredients
        ], 200);
    }

    public function getIngredient($ingredientId)
    {
        $ingredient = Ingredient::find($ingredientId);

        if (!$ingredient || $ingredient->is_deleted) {
            return response()->json([
                'message' => 'Ingredient not found.'
            ], 404);
        }

        return response()->json([
            'ingredient' => $ingredient
        ], 200);
    }

    public function storeIngredient(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'category_id' => ['required', 'exists:tbl_categories,category_id'],
            'unit' => ['required', 'string', 'max:50'],
            'cost_per_unit' => ['required', 'numeric', 'min:0'],
            'quantity_in_stock' => ['required', 'numeric', 'min:0'],
            'low_stock_threshold' => ['nullable', 'numeric', 'min:0'],
        ]);

        $status = $this->determineStatus($validated['quantity_in_stock'], $validated['low_stock_threshold']);

        Ingredient::create([
            'name' => $validated['name'],
            'category_id' => $validated['category_id'],
            'unit' => $validated['unit'],
            'cost_per_unit' => $validated['cost_per_unit'],
            'quantity_in_stock' => $validated['quantity_in_stock'],
            'low_stock_threshold' => $validated['low_stock_threshold'],
            'status' => $status
        ]);

        return response()->json([
            'message' => 'Ingredient Successfully Added.'
        ], 200);
    }

    public function updateIngredient(Request $request, Ingredient $ingredient)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'category_id' => ['required', 'exists:tbl_categories,category_id'],
            'unit' => ['required', 'string', 'max:50'],
            'cost_per_unit' => ['required', 'numeric', 'min:0'],
            'quantity_in_stock' => ['required', 'numeric', 'min:0'],
            'low_stock_threshold' => ['nullable', 'numeric', 'min:0'],
        ]);

        $status = $this->determineStatus($validated['quantity_in_stock'], $validated['low_stock_threshold']);

        $ingredient->update([
            'name' => $validated['name'],
            'category_id' => $validated['category_id'],
            'unit' => $validated['unit'],
            'cost_per_unit' => $validated['cost_per_unit'],
            'quantity_in_stock' => $validated['quantity_in_stock'],
            'low_stock_threshold' => $validated['low_stock_threshold'],
            'status' => $status
        ]);

        return response()->json([
            'message' => 'Ingredient Successfully Updated.'
        ], 200);
    }

    public function destroyIngredient(Ingredient $ingredient)
    {
        $ingredient->update([
            'is_deleted' => true
        ]);

        return response()->json([
            'message' => 'Ingredient Successfully Deleted.'
        ], 200);
    }

    private function determineStatus($quantity, $threshold)
    {
        if ($threshold !== null && $quantity <= $threshold) {
            return 'Low';
        }
        return 'In Stock';
    }


    public function lowStockIngredients()
    {
        $lowStock = Ingredient::where('is_deleted', false)
            ->whereNotNull('low_stock_threshold')
            ->whereColumn('quantity_in_stock', '<=', 'low_stock_threshold')
            ->get();

        return response()->json([
            'low_stock_ingredients' => $lowStock
        ], 200);
    }
}
