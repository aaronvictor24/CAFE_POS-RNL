<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_product_ingredients', function (Blueprint $table) {
            $table->id('product_ingredient_id');
            $table->foreignId('product_id')->constrained('products', 'product_id');
            $table->foreignId('ingredient_id')->constrained('ingredients', 'ingredient_id');
            $table->float('quantity_required');
            $table->tinyInteger('is_deleted')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('tbl_product_ingredients');
        Schema::enableForeignKeyConstraints();
    }
};
