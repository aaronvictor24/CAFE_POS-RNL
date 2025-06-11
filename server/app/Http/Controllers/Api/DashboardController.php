<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function loadSummary()
    {
        $totalSales = DB::table('tbl_orders')->sum('total_amount');
        $productsSold = DB::table('tbl_order_items')->sum('quantity');
        $transactions = DB::table('tbl_orders')->count();
        $dailySales = DB::table('tbl_orders')
            ->where('created_at', '>=', now()->subDay())
            ->sum('total_amount');

        return response()->json([
            'total_sales' => $totalSales,
            'products_sold' => $productsSold,
            'transactions' => $transactions,
            'daily_sales' => $dailySales,
        ]);
    }

    public function getYesterdaySales()
    {
        $yesterday = now()->subDay();
        $today = now()->startOfDay();

        $order = DB::table('tbl_orders')
            ->whereBetween('created_at', [$yesterday, $today])
            ->get();

        return response()->json(['orders' => $order]);
    }
}
