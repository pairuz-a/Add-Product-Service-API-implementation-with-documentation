<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductApiController extends Controller
{
    /**
     * Display a listing of products.
     */
    public function index()
    {
        $products = Product::all();

        return response()->json([
            'success' => true,
            'message' => 'Products retrieved successfully',
            'data' => $products
        ], 200);
    }

    /**
     * Store a newly created product.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'status' => 'nullable|in:active,inactive',
        ]);

        // Set default status if not provided
        if (!isset($validated['status'])) {
            $validated['status'] = 'active';
        }

        $product = Product::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => $product
        ], 201);
    }

    /**
     * Update product stock.
     */
    public function updateStock(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
                'data' => null
            ], 404);
        }

        $validated = $request->validate([
            'stock' => 'required|integer|min:0',
        ]);

        $product->update(['stock' => $validated['stock']]);

        return response()->json([
            'success' => true,
            'message' => 'Stock updated successfully',
            'data' => $product
        ], 200);
    }

    /**
     * Search products by name.
     */
    public function search(Request $request)
    {
        $query = $request->query('name');

        if (!$query) {
            return response()->json([
                'success' => false,
                'message' => 'Search query parameter "name" is required',
                'data' => []
            ], 400);
        }

        $products = Product::where('name', 'like', '%' . $query . '%')->get();

        return response()->json([
            'success' => true,
            'message' => 'Products found',
            'data' => $products
        ], 200);
    }

    /**
     * Delete all products with zero stock.
     */
    public function deleteOutOfStock()
    {
        $deletedCount = Product::where('stock', 0)->delete();

        return response()->json([
            'success' => true,
            'message' => "Successfully deleted {$deletedCount} products with zero stock",
            'deleted_count' => $deletedCount
        ], 200);
    }
}
