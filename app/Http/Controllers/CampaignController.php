<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class CampaignController extends Controller
{
    public function index()
    {
        $campaigns = Campaign::latest()->get();

        return Inertia::render('Promote', [
            'campaigns' => $campaigns
        ]);
    }

    public function create()
    {
        return Inertia::render('CampaignForm');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:Active,Scheduled,Ended',
            'reach' => 'nullable|integer|min:0',
            'clicks' => 'nullable|integer|min:0',
            'conversion' => 'nullable|numeric|min:0|max:100',
        ]);

        Campaign::create($validated);

        return Redirect::route('campaigns.index')->with('success', 'Campaign created successfully.');
    }

    public function edit(Campaign $campaign)
    {
        return Inertia::render('CampaignForm', [
            'campaign' => $campaign
        ]);
    }

    public function update(Request $request, Campaign $campaign)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:Active,Scheduled,Ended',
            'reach' => 'nullable|integer|min:0',
            'clicks' => 'nullable|integer|min:0',
            'conversion' => 'nullable|numeric|min:0|max:100',
        ]);

        $campaign->update($validated);

        return Redirect::route('campaigns.index')->with('success', 'Campaign updated successfully.');
    }

    public function destroy(Campaign $campaign)
    {
        $campaign->delete();

        return Redirect::route('campaigns.index')->with('success', 'Campaign deleted successfully.');
    }
}