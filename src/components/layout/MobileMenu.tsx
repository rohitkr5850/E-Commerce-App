import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingBag, 
  BarChart2, Settings, Menu, X 
} from 'lucide-react';

export const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { path: '/vendor/dashboard', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard' },
    { path: '/vendor/products', icon: <ShoppingBag className="h-5 w-5" />, label: 'Products' },
    { path: '/vendor/orders', icon: <Package className="h-5 w-5" />, label: 'Orders' },
    { path: '/vendor/analytics', icon: <BarChart2 className="h-5 w-5" />, label: 'Analytics' },
    { path: '/profile', icon: <Settings className="h-5 w-5" />, label: 'Settings' },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <>
      {/* Mobile menu toggle */}
      <div className="md:hidden bg-white border-b border-neutral-200 p-4 sticky top-16 z-40">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-neutral-800"
        >
          <span className="font-medium">Vendor Dashboard</span>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 animate-slide-down">
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 p-3 rounded-md ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
      
      {/* Desktop sidebar */}
      <div className="hidden md:block w-64 bg-white min-h-screen border-r border-neutral-200 sticky top-16">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-neutral-800 mb-6">Vendor Dashboard</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 p-3 rounded-md ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};