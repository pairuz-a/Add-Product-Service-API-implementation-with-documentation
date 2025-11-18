<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'product_id',
        'quantity',
        'total_price',
        'customer_name',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
