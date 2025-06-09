<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

class Product extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'tbl_products';
    protected $primaryKey = 'product_id';
    protected $fillable = [
        'product',
        'category_id',
        'unit',
        'stock_quantity',
        'price',
        'is_deleted'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    public function ingredients()
    {
        return $this->hasMany(ProductIngredient::class, 'product_id');
    }
}
