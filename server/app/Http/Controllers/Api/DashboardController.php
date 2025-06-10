<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function summary()
    {
        // Total sales (sum of all order totals)
        $totalSales = DB::table('tbl_orders')->sum('total_amount');

        // Products sold (sum of all quantities)
        $productsSold = DB::table('tbl_order_items')->sum('quantity');

        // Transactions (number of orders)
        $transactions = DB::table('tbl_orders')->count();

        // Cost of goods (sum of all order item prices)
        $costOfGoods = DB::table('tbl_order_items')->sum(DB::raw('quantity * price'));

        return response()->json([
            'total_sales' => $totalSales,
            'products_sold' => $productsSold,
            'transactions' => $transactions,
            'cost_of_goods' => $costOfGoods,
        ]);
    }
}
