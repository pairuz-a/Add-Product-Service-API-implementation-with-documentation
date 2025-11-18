import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Sidebar from '../Components/Sidebar';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import CustomerTable from '../Components/CustomerTable';

export default function Customers({ customers, filters }) {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route('customers.index'), { search: searchQuery }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleDelete = (customerId) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      router.delete(route('customers.destroy', customerId), {
        preserveScroll: true,
      });
    }
  };

  return (
    <>
      <Head title="Customers" />
      
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar currentRoute="/customers" />
        
        <main className="flex-1 ml-80">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-6 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customers</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and view all your customers</p>
              </div>
              
              <Link
                href={route('customers.create')}
                className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                <Plus className="w-5 h-5" />
                Add Customer
              </Link>
            </div>
          </div>

          <div className="p-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search customers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                  >
                    Search
                  </button>
                  {filters.search && (
                    <Link
                      href={route('customers.index')}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      Clear
                    </Link>
                  )}
                </div>
              </form>

              {/* Customer Table with Actions */}
              <CustomerTableWithActions customers={customers} onDelete={handleDelete} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// Customer Table Component with Edit/Delete Actions
function CustomerTableWithActions({ customers, onDelete }) {
  const handlePageChange = (url) => {
    if (url) {
      router.get(url, {}, { preserveState: true, preserveScroll: true });
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Name</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Company</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Email</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Phone</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Country</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.data.length > 0 ? (
              customers.data.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-white">{customer.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{customer.company}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{customer.email}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{customer.phone}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{customer.country}</td>
                  <td className="py-4 px-4 text-sm">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'active'
                        ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {customer.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={route('customers.edit', customer.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </Link>
                      <button
                        onClick={() => onDelete(customer.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-12 text-center">
                  <div className="text-gray-500 dark:text-gray-400">
                    <p className="text-lg font-semibold mb-2">No customers found</p>
                    <p className="text-sm">Start by adding your first customer!</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {customers.data.length > 0 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {customers.from || 0} to {customers.to || 0} of {customers.total} entries
          </p>
          
          <div className="flex items-center gap-2">
            {customers.links?.map((link, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(link.url)}
                disabled={!link.url}
                dangerouslySetInnerHTML={{ __html: link.label }}
                className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                  link.active
                    ? 'bg-purple-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}