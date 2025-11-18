import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Sidebar from '../Components/Sidebar';
import { TrendingUp, DollarSign, ArrowUp, Plus, Edit, Trash2, Search } from 'lucide-react';

export default function Income({ incomes = [], totalRevenue = 0, avgRevenue = 0 }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIncomes = incomes.filter(item =>
    item.month.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head title="Income" />
      
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar currentRoute="/income" />
        
        <main className="flex-1 ml-80">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-6 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Income</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Revenue analytics and insights</p>
              </div>
              <Link
                href={route('incomes.create')}
                className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                <Plus className="w-5 h-5" />
                Add Income
              </Link>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">${(totalRevenue / 1000).toFixed(1)}K</p>
                  </div>
                  <DollarSign className="w-12 h-12 text-emerald-500 opacity-20" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Average Monthly</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">${(avgRevenue / 1000).toFixed(1)}K</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-blue-500 opacity-20" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Growth Rate</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {incomes.length > 0 ? `${incomes[incomes.length - 1].growth > 0 ? '+' : ''}${incomes[incomes.length - 1].growth}%` : '0%'}
                    </p>
                  </div>
                  <ArrowUp className="w-12 h-12 text-emerald-500 opacity-20" />
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute w-5 h-5 text-gray-500 left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by month..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            {/* Income Table */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Month</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Revenue</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Growth</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredIncomes.length > 0 ? (
                    filteredIncomes.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{item.month}</td>
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">${parseFloat(item.revenue).toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`font-medium ${item.growth > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {item.growth > 0 ? '+' : ''}{item.growth}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Link
                              href={route('incomes.edit', item.id)}
                              className="font-medium text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <Link
                              href={route('incomes.destroy', item.id)}
                              method="delete"
                              as="button"
                              type="button"
                              className="font-medium text-red-600 hover:text-red-900"
                              onClick={(e) => {
                                if (!confirm('Are you sure you want to delete this income record?')) {
                                  e.preventDefault();
                                }
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                        No income records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}