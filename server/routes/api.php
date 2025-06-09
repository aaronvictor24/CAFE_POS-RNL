<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\GenderController;
use App\Http\Controllers\API\IngredientController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductIngredientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::get('/employee', 'employee');
        Route::post('/logout', 'logout');
    });

    Route::controller(GenderController::class)->group(function () {
        Route::get('/loadGenders', 'loadGenders');
        Route::get('/getGender/{genderId}', 'getGender');
        Route::post('/storeGender', 'storeGender');
        Route::put('/updateGender/{gender}', 'updateGender');
        Route::put('/destroyGender/{gender}', 'destroyGender');
    });

    Route::controller(EmployeeController::class)->group(function () {
        Route::get('/loadEmployees', 'loadEmployees');
        Route::post('/storeEmployee', 'storeEmployee');
        Route::put('/updateEmployee/{employee}', 'updateEmployee');
        Route::put('/destroyEmployee/{employee}', 'destroyEmployee');
    });

    Route::controller(CategoryController::class)->group(function () {
        Route::get('/loadCategories', 'loadCategories');
        Route::get('/getCategory/{categoryId}', 'getCategory');
        Route::post('/storeCategory', 'storeCategory');
        Route::put('/updateCategory/{category}', 'updateCategory');
        Route::put('/destroyCategory/{category}', 'destroyCategory');
    });

    Route::controller(ProductController::class)->group(function () {
        Route::get('/loadProducts', 'loadProducts');
        Route::get('/getProduct/{productId}', 'getProduct');
        Route::post('/storeProduct', 'storeProduct');
        Route::put('/updateProduct/{product}', 'updateProduct');
        Route::put('/destroyProduct/{product}', 'destroyProduct');
    });

    Route::controller(IngredientController::class)->group(function () {
        Route::get('/loadIngredients', 'loadIngredients');
        Route::get('/getIngredient/{ingredientId}', 'getIngredient');
        Route::post('/storeIngredient', 'storeIngredient');
        Route::put('/updateIngredient/{ingredient}', 'updateIngredient');
        Route::put('/destroyIngredient/{ingredient}', 'destroyIngredient');
    });

    Route::controller(ProductIngredientController::class)->group(function () {
        Route::get('/loadProductIngredients/{productId}', 'loadProductIngredients');
        Route::post('/storeProductIngredient', 'storeProductIngredient');
        Route::put('/updateProductIngredient/{productIngredient}', 'updateProductIngredient');
        Route::put('/destroyProductIngredient/{productIngredient}', 'destroyProductIngredient');
    });

    Route::controller(OrderController::class)->group(function () {
        Route::get('/loadOrders', 'loadOrders');
        Route::post('/storeOrder', 'storeOrder');
        Route::get('/getOrder/{orderId}', 'getOrder');
    });
});


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');