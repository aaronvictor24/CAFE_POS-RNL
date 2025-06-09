<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tbl_ingredients', function (Blueprint $table) {
            $table->id('ingredient_id');
            $table->string('name', 100);
            $table->unsignedBigInteger('category_id');
            $table->string('unit', 50); // e.g., grams, ml, pcs
            $table->decimal('cost_per_unit', 10, 2);
            $table->decimal('quantity_in_stock', 10, 2);
            $table->decimal('low_stock_threshold', 10, 2)->nullable();
            $table->string('status')->default('In Stock'); // or use enum if preferred
            $table->tinyInteger('is_deleted')->default(false); // Soft delete
            $table->timestamps();

            $table->foreign('category_id')
                ->references('category_id')
                ->on('tbl_categories')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('tbl_ingredients');
        Schema::enableForeignKeyConstraints();
    }
};
