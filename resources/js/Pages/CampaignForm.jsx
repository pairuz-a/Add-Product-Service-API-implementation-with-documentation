import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Sidebar from '../Components/Sidebar';
import { ArrowLeft, Save } from 'lucide-react';

export default function CampaignForm({ campaign }) {
  const isEditing = !!campaign;
  
  const { data, setData, post, put, processing, errors } = useForm({
    name: campaign?.name || '',
    status: campaign?.status || 'Active',
    reach: campaign?.reach || '',
    clicks: campaign?.clicks || '',
    conversion: campaign?.conversion || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      put(route('campaigns.update', campaign.id));
    } else {
      post(route('campaigns.store'));
    }
  };

  return (
    <>
      <Head title={isEditing ? 'Edit Campaign' : 'Create Campaign'} />
      
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar currentRoute="/promote" />
        
        <main className="flex-1 ml-80">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-6 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href={route('campaigns.index')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {isEditing ? 'Edit Campaign' : 'Create New Campaign'}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {isEditing ? 'Update campaign information' : 'Add a new campaign to your marketing'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="max-w-3xl">
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
                
                {/* Name */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Campaign Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Summer Sale Campaign"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Status */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="Active">Active</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Ended">Ended</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                  )}
                </div>

                {/* Reach & Clicks */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Reach
                    </label>
                    <input
                      type="number"
                      value={data.reach}
                      onChange={(e) => setData('reach', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="5000"
                    />
                    {errors.reach && (
                      <p className="text-red-500 text-sm mt-1">{errors.reach}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Clicks
                    </label>
                    <input
                      type="number"
                      value={data.clicks}
                      onChange={(e) => setData('clicks', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="250"
                    />
                    {errors.clicks && (
                      <p className="text-red-500 text-sm mt-1">{errors.clicks}</p>
                    )}
                  </div>
                </div>

                {/* Conversion */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Conversion (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={data.conversion}
                    onChange={(e) => setData('conversion', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="5.5"
                  />
                  {errors.conversion && (
                    <p className="text-red-500 text-sm mt-1">{errors.conversion}</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href={route('campaigns.index')}
                    className="flex-1 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition text-center"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={processing}
                    className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-5 h-5" />
                    {processing ? 'Saving...' : isEditing ? 'Update Campaign' : 'Create Campaign'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
