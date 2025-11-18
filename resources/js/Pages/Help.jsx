import { Head } from '@inertiajs/react';
import Sidebar from '../Components/Sidebar';
import { MessageSquare, FileText, Phone, Mail } from 'lucide-react';

const faqs = [
  { question: 'How do I reset my password?', answer: 'Go to settings and click "Change Password".' },
  { question: 'How do I add a new product?', answer: 'Navigate to Products and click "Add Product" button.' },
  { question: 'How do I export customer data?', answer: 'Go to Customers and use the Export option in the menu.' },
  { question: 'What payment methods are supported?', answer: 'We support Credit Card, PayPal, and Bank Transfer.' },
];

export default function Help() {
  return (
    <>
      <Head title="Help & Support" />
      
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar currentRoute="/help" />
        
        <main className="flex-1 ml-80">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-6 z-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Help & Support</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Get answers to common questions</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Support Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                <MessageSquare className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Chat</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Chat with our support team in real-time</p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                <Mail className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Support</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">support@dashboard.com</p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                <Phone className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Phone Support</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">+1 (555) 123-4567</p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                <FileText className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Documentation</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">View our detailed guides and tutorials</p>
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <details key={idx} className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <summary className="flex items-center justify-between font-medium text-gray-900 dark:text-white">
                      {faq.question}
                      <span className="text-gray-500 group-open:rotate-180 transition">▼</span>
                    </summary>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}