<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductIngredient extends Model
{
    use HasFactory;

    protected $table = 'tbl_product_ingredients';
    protected $primaryKey = 'product_ingredient_id'; // if you kept the custom PK name

    protected $fillable = [
        'product_id',
        'ingredient_id',
        'quantity_required',
        'is_deleted',
    ];

    // Relationships (optional, for convenience)
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class, 'ingredient_id');
    }
}
