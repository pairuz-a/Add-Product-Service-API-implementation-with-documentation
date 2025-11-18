import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Sidebar from '../Components/Sidebar';
import { ArrowLeft, Save } from 'lucide-react';

export default function IncomeForm({ income }) {
  const isEditing = !!income;
  
  const { data, setData, post, put, processing, errors } = useForm({
    month: income?.month || '',
    revenue: income?.revenue || '',
    growth: income?.growth || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      put(route('incomes.update', income.id));
    } else {
      post(route('incomes.store'));
    }
  };

  return (
    <>
      <Head title={isEditing ? 'Edit Income' : 'Create Income'} />
      
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar currentRoute="/income" />
        
        <main className="flex-1 ml-80">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-6 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href={route('incomes.index')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {isEditing ? 'Edit Income' : 'Create New Income'}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {isEditing ? 'Update income record' : 'Add a new income record'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="max-w-3xl">
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
                
                {/* Month */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Month <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.month}
                    onChange={(e) => setData('month', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="January"
                  />
                  {errors.month && (
                    <p className="text-red-500 text-sm mt-1">{errors.month}</p>
                  )}
                </div>

                {/* Revenue */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Revenue ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={data.revenue}
                    onChange={(e) => setData('revenue', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="12500"
                  />
                  {errors.revenue && (
                    <p className="text-red-500 text-sm mt-1">{errors.revenue}</p>
                  )}
                </div>

                {/* Growth */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Growth (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={data.growth}
                    onChange={(e) => setData('growth', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="8.5"
                  />
                  {errors.growth && (
                    <p className="text-red-500 text-sm mt-1">{errors.growth}</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href={route('incomes.index')}
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
                    {processing ? 'Saving...' : isEditing ? 'Update Income' : 'Create Income'}
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
