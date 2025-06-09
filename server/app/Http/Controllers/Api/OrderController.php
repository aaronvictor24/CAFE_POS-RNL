<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ingredient;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductIngredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function loadOrders()
    {
        $orders = Order::with('items')->orderBy('created_at', 'desc')->get();
        return response()->json($orders);
    }

    public function storeOrder(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'nullable|integer',
            'total_amount' => 'required|numeric',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:tbl_products,product_id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();
        try {
            // --- STOCK VALIDATION: Check all ingredient stocks first ---
            foreach ($validated['items'] as $item) {
                $productIngredients = ProductIngredient::where('product_id', $item['product_id'])->get();
                foreach ($productIngredients as $pi) {
                    $ingredient = Ingredient::find($pi->ingredient_id);
                    $deductQty = $pi->quantity_required * $item['quantity'];
                    if (!$ingredient) {
                        DB::rollBack();
                        return response()->json([
                            'message' => "Ingredient not found for ingredient_id: {$pi->ingredient_id}"
                        ], 400);
                    }
                    if ($ingredient->quantity_in_stock < $deductQty) {
                        DB::rollBack();
                        return response()->json([
                            'message' => "Insufficient stock for ingredient: {$ingredient->name}"
                        ], 400);
                    }
                }
            }
            // --- END STOCK VALIDATION ---

            // Now safe to create order and deduct stock
            $order = Order::create([
                'employee_id' => $validated['employee_id'] ?? null,
                'total_amount' => $validated['total_amount'],
            ]);

            foreach ($validated['items'] as $item) {
                OrderItem::create([
                    'order_id' => $order->order_id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);

                // Deduct ingredient stock
                $productIngredients = ProductIngredient::where('product_id', $item['product_id'])->get();
                foreach ($productIngredients as $pi) {
                    $ingredient = Ingredient::find($pi->ingredient_id);
                    if ($ingredient) {
                        $deductQty = $pi->quantity_required * $item['quantity'];
                        $ingredient->quantity_in_stock -= $deductQty;
                        $ingredient->save();
                    }
                }
            }

            DB::commit();
            return response()->json(['message' => 'Order placed successfully!'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Order failed!', 'error' => $e->getMessage()], 500);
        }
    }

    public function getOrder($orderId)
    {
        $order = Order::with('items')->findOrFail($orderId);
        return response()->json($order);
    }
}
