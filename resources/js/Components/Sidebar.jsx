import { useState } from 'react';
import { Home, Package, Users, TrendingUp, Megaphone, HelpCircle, Settings, Bell, ChevronRight, Menu, X } from 'lucide-react';
import { Link } from '@inertiajs/react';

const NAV_ITEMS = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Package, label: 'Product', href: '/products' },
  { icon: Users, label: 'Customers', href: '/customers' },
  { icon: TrendingUp, label: 'Income', href: '/income' },
  { icon: Megaphone, label: 'Promote', href: '/promote' },
  { icon: HelpCircle, label: 'Help', href: '/help' },
];

export default function Sidebar({ currentRoute = '/', onSettingsClick = () => {}, onNotificationsClick = () => {} }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-40 p-2 text-white bg-purple-600 rounded-lg bottom-6 left-6 md:hidden"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <div className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 z-30 ${isCollapsed ? 'w-20' : 'w-80'}`}>
        {/* Logo */}
        <div className="relative px-6 py-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-purple-600 rounded-lg">
              <span className="text-lg font-bold text-white">S</span>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Management</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute items-center justify-center hidden w-6 h-6 transition bg-gray-100 rounded-full md:flex right-4 top-8 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ChevronRight className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                  <item.icon className="w-5 h-5" />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </div>
                {isActive && !isCollapsed && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Action Buttons */}
        <div className="p-4 space-y-3 border-t border-gray-200 dark:border-gray-800">
          <button 
            onClick={onNotificationsClick}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition`}
            title={isCollapsed ? 'Notifications' : ''}
          >
            <Bell className="w-5 h-5" />
            {!isCollapsed && <span className="text-sm font-medium">Notifications</span>}
          </button>
          <button 
            onClick={onSettingsClick}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition`}
            title={isCollapsed ? 'Settings' : ''}
          >
            <Settings className="w-5 h-5" />
            {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
          </button>
        </div>

        {/* User Profile */}
        {!isCollapsed ? (
          <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Evano</p>
              <p className="text-xs text-gray-500 truncate dark:text-gray-400">Project Manager</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center px-4 py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" title="Evano" />
          </div>
        )}
      </div>
    </>
  );
}