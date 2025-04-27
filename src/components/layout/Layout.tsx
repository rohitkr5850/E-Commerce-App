import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Check if the current route is a vendor dashboard route
  const isVendorDashboard = location.pathname.startsWith('/vendor');
  
  // Check if the current user is a vendor
  const isVendor = user?.role === 'vendor';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {isVendorDashboard && isVendor ? (
          <div className="flex flex-col md:flex-row">
            <MobileMenu />
            <div className="w-full">{children}</div>
          </div>
        ) : (
          <div className="container-custom mx-auto py-6">{children}</div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};