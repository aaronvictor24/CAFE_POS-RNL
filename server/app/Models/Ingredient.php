<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Ingredient extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'tbl_ingredients';
    protected $primaryKey = 'ingredient_id';
    protected $fillable = [
        'name',
        'category_id',
        'unit',
        'cost_per_unit',
        'quantity_in_stock',
        'low_stock_threshold',
        'status',
        'is_deleted'
    ];

    protected $casts = [
        'cost_per_unit' => 'decimal:2',
        'quantity_in_stock' => 'decimal:2',
        'low_stock_threshold' => 'decimal:2',
        'is_deleted' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    public function products()
    {
        return $this->hasMany(ProductIngredient::class, 'ingredient_id');
    }
}
