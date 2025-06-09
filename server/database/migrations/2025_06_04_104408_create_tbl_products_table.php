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
        Schema::create('tbl_products', function (Blueprint $table) {
            $table->id('product_id');
            $table->string('product', 55);
            $table->unsignedBigInteger('category_id');
            $table->string('unit', 55);
            $table->integer('stock_quantity')->default(0);
            $table->decimal('price', 10, 2);
            $table->tinyInteger('is_deleted')->default(false);
            $table->timestamps();

            $table->foreign('category_id')
                ->references('category_id')
                ->on('tbl_categories')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('tbl_products');
        Schema::enableForeignKeyConstraints();
    }
};
