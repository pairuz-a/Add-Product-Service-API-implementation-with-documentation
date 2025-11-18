<?php

namespace App\Http\Controllers;

use App\Models\Income;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class IncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $incomes = Income::latest()->get();
        
        $totalRevenue = $incomes->sum('revenue');
        $avgRevenue = $incomes->avg('revenue');

        return Inertia::render('Income', [
            'incomes' => $incomes,
            'totalRevenue' => $totalRevenue,
            'avgRevenue' => $avgRevenue,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('IncomeForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'month' => 'required|string|max:255',
            'revenue' => 'required|numeric|min:0',
            'growth' => 'required|numeric',
        ]);

        Income::create($validated);

        return Redirect::route('incomes.index')->with('success', 'Income created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Income $income)
    {
        return Inertia::render('IncomeForm', [
            'income' => $income
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Income $income)
    {
        $validated = $request->validate([
            'month' => 'required|string|max:255',
            'revenue' => 'required|numeric|min:0',
            'growth' => 'required|numeric',
        ]);

        $income->update($validated);

        return Redirect::route('incomes.index')->with('success', 'Income updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Income $income)
    {
        $income->delete();

        return Redirect::route('incomes.index')->with('success', 'Income deleted successfully.');
    }
}
