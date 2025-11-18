import { ChevronLeft, ChevronRight } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function CustomerTable({ searchQuery = '', customers }) {
  // Filter customers based on search query (client-side filtering)
  const filteredData = customers.data.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle pagination
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
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Customer Name
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Company
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Phone Number
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Email
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Country
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-white">
                    {customer.name}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{customer.company}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{customer.phone}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{customer.email}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">{customer.country}</td>
                  <td className="py-4 px-4 text-sm">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        customer.status === 'active'
                          ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {customer.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {customers.from || 0} to {customers.to || 0} of {customers.total} entries
        </p>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(customers.prev_page_url)}
            disabled={!customers.prev_page_url}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {customers.links?.slice(1, -1).map((link, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(link.url)}
              className={`w-8 h-8 rounded-lg font-medium transition-colors ${
                link.active
                  ? 'bg-purple-600 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {link.label}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(customers.next_page_url)}
            disabled={!customers.next_page_url}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}