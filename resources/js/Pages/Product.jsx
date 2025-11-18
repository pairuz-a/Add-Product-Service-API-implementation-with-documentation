import { useState } from 'react';
import { Head, Link } from '@inertiajs/react'; 
import Sidebar from '../Components/Sidebar';
import { Search, Filter, Plus, Edit, Trash2 } from 'lucide-react'; 

export default function Product({ products = [] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head title="Products" />
      
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar currentRoute="/products" /> 
        
        <main className="flex-1 ml-80">
          <div className="sticky top-0 z-10 px-8 py-6 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
                <p className="mt-1 text-gray-600 dark:text-gray-400">Manage your product catalog</p>
              </div>
              <Link
                href={route('products.create')} 
                className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </Link>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute w-5 h-5 text-gray-500 left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 transition border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Filter className="w-5 h-5" />
                Filter
              </button>
            </div>

            <div className="overflow-hidden bg-white border border-gray-200 rounded-lg dark:border-gray-700 dark:bg-gray-800">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-left text-gray-900 dark:text-white">Product Name</th>
                    <th className="px-6 py-4 text-sm font-semibold text-left text-gray-900 dark:text-white">Category</th>
                    <th className="px-6 py-4 text-sm font-semibold text-left text-gray-900 dark:text-white">Price</th>
                    <th className="px-6 py-4 text-sm font-semibold text-left text-gray-900 dark:text-white">Stock</th>
                    <th className="px-6 py-4 text-sm font-semibold text-left text-gray-900 dark:text-white">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-left text-gray-900 dark:text-white">Actions</th> 
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="transition hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{product.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{product.category}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">${product.price}</td>
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{product.stock} units</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            product.status === 'active'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {product.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm"> 
                          <div className="flex items-center gap-2">
                            <Link
                              href={route('products.edit', product.id)}
                              className="font-medium text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <Link
                              href={route('products.destroy', product.id)}
                              method="delete"
                              as="button"
                              type="button"
                              className="font-medium text-red-600 hover:text-red-900"
                              onClick={(e) => {
                                if (!confirm('Are you sure you want to delete this product?')) {
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
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                        No products found.
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