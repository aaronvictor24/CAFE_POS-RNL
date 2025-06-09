<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function loadProducts()
    {
        $products = Product::with(['category'])
            ->where('tbl_products.is_deleted', false)
            ->get();

        return response()->json([
            'products' =>  $products
        ], 200);
    }

    public function getProduct($productId)
    {
        $product = Product::with('category')->find($productId);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found.'
            ], 404);
        }

        return response()->json([
            'product' => $product
        ], 200);
    }

    public function storeProduct(Request $request)
    {
        $validated = $request->validate([
            'product' => ['required', 'min:4', 'max:55'],
            'category_id' => ['required', 'exists:tbl_categories,category_id'],
            'unit' => ['required', 'string', 'max:55'],
            'stock_quantity' => ['required', 'integer', 'min:0'],
            'price' => ['required', 'numeric', 'min:0']
        ]);

        Product::create([
            'product' => $validated['product'],
            'category_id' => $validated['category_id'],
            'unit' => $validated['unit'],
            'stock_quantity' => $validated['stock_quantity'],
            'price' => $validated['price']
        ]);

        return response()->json([
            'message' => 'Product Successfully Added.'
        ], 200);
    }

    public function updateProduct(Request $request, Product $product)
    {
        $validated = $request->validate([
            'product' => ['required', 'min:4', 'max:55'],
            'category' => ['required', 'exists:tbl_categories,category_id'],
            'unit' => ['required', 'string', 'max:55'],
            'stock_quantity' => ['required', 'integer', 'min:0'],
            'price' => ['required', 'numeric', 'min:0']
        ]);

        $product->update([
            'product' => $validated['product'],
            'category_id' => $validated['category'],
            'unit' => $validated['unit'],
            'stock_quantity' => $validated['stock_quantity'],
            'price' => $validated['price']
        ]);

        return response()->json([
            'message' => 'Product Successfully Updated.'
        ], 200);
    }
    public function destroyProduct(Product $product)
    {
        $product->update([
            'is_deleted' => true
        ]);

        return response()->json([
            'message' => 'Product Successfully Deleted.'
        ], 200);
    }
}
