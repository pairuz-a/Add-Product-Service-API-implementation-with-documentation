<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display the dashboard with customer stats
     */
    public function index()
    {
        // Get statistics
        $totalCustomers = Customer::count();
        $members = Customer::members()->count();
        $activeNow = Customer::activeNow()->count();
        
        // Get customers with pagination
        $customers = Customer::query()
            ->orderBy('created_at', 'desc')
            ->paginate(8);

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalCustomers' => $totalCustomers,
                'members' => $members,
                'activeNow' => $activeNow,
            ],
            'customers' => $customers,
        ]);
    }

    /**
     * Show the customers page (full list)
     */
    public function list(Request $request)
    {
        $query = Customer::query();

        // Search functionality
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%");
            });
        }

        // Sort functionality
        if ($request->has('sort')) {
            $sortBy = $request->input('sort');
            switch ($sortBy) {
                case 'newest':
                    $query->orderBy('created_at', 'desc');
                    break;
                case 'oldest':
                    $query->orderBy('created_at', 'asc');
                    break;
                case 'name':
                    $query->orderBy('name', 'asc');
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $customers = $query->paginate(10);

        return Inertia::render('Customers', [
            'customers' => $customers,
            'filters' => [
                'search' => $request->input('search', ''),
                'sort' => $request->input('sort', 'newest'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new customer
     */
    public function create()
    {
        return Inertia::render('CustomerForm', [
            'customer' => null,
        ]);
    }

    /**
     * Store a newly created customer
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|unique:customers,email',
            'country' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
            'is_member' => 'boolean',
        ]);

        $validated['is_member'] = $request->boolean('is_member');
        $validated['last_active_at'] = $validated['status'] === 'active' ? now() : null;

        Customer::create($validated);

        return redirect()->route('customers.index')
            ->with('success', 'Customer created successfully!');
    }

    /**
     * Show the form for editing a customer
     */
    public function edit(Customer $customer)
    {
        return Inertia::render('CustomerForm', [
            'customer' => $customer,
        ]);
    }

    /**
     * Update the specified customer
     */
    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|unique:customers,email,' . $customer->id,
            'country' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
            'is_member' => 'boolean',
        ]);

        $validated['is_member'] = $request->boolean('is_member');
        
        // Update last_active_at if status changed to active
        if ($validated['status'] === 'active' && $customer->status !== 'active') {
            $validated['last_active_at'] = now();
        }

        $customer->update($validated);

        return redirect()->route('customers.index')
            ->with('success', 'Customer updated successfully!');
    }

    /**
     * Remove the specified customer (soft delete)
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();

        return redirect()->route('customers.index')
            ->with('success', 'Customer deleted successfully!');
    }

    /**
     * Restore a soft-deleted customer
     */
    public function restore($id)
    {
        $customer = Customer::withTrashed()->findOrFail($id);
        $customer->restore();

        return redirect()->route('customers.index')
            ->with('success', 'Customer restored successfully!');
    }

    /**
     * Permanently delete a customer
     */
    public function forceDelete($id)
    {
        $customer = Customer::withTrashed()->findOrFail($id);
        $customer->forceDelete();

        return redirect()->route('customers.index')
            ->with('success', 'Customer permanently deleted!');
    }
}