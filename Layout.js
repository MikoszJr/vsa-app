import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Wrench, Home, History } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const navItems = [
    { name: 'Home', path: 'Home', icon: Home },
    { name: 'History', path: 'History', icon: History }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Service Assistant</span>
            </Link>

            {/* Navigation Links */}
            <div className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPageName === item.path;
                return (
                  <Link
                    key={item.path}
                    to={createPageUrl(item.path)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-400 text-sm">
          © 2024 Vehicle Service Assistant. Powered by AI.
        </div>
      </footer>
    </div>
  );
}