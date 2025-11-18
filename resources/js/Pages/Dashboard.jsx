import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Head } from '@inertiajs/react';
import Sidebar from '../Components/Sidebar';
import StatCard from '../Components/StatCard';
import CustomerTable from '../Components/CustomerTable';
import UpgradeCard from '../Components/UpgradeCard';

export default function Dashboard({ stats, customers }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  return (
    <>
      <Head title="Dashboard" />
      
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar currentRoute="/" />
        
        <main className="flex-1 ml-80">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-6 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  Hello Admin <span className="text-2xl">👋</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back to your dashboard</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 w-64"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Stats Grid - Using Real Data */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total Customers"
                value={stats.totalCustomers.toLocaleString()}
                change="+16%"
                trend="up"
                icon="👥"
                color="from-cyan-400 to-cyan-500"
              />
              <StatCard
                title="Members"
                value={stats.members.toLocaleString()}
                change="-1%"
                trend="down"
                icon="👤"
                color="from-teal-400 to-teal-500"
              />
              <StatCard
                title="Active Now"
                value={stats.activeNow.toLocaleString()}
                change="+5%"
                trend="up"
                icon="🟢"
                color="from-orange-400 to-orange-500"
              />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Customers Table */}
              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Customers</h2>
                      <p className="text-sm text-cyan-500 mt-1">Active Members</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 w-48"
                        />
                      </div>
                      
                      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors text-sm">
                        Sort by: {sortBy}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <CustomerTable searchQuery={searchQuery} customers={customers} />
                </div>
              </div>

              {/* Sidebar Card */}
              <div className="lg:col-span-1">
                <UpgradeCard />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}