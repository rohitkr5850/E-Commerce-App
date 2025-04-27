import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-8">
        <div className="text-9xl font-bold text-primary-200">404</div>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">Page not found</h1>
      <p className="text-neutral-600 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/" className="btn btn-primary flex items-center justify-center">
          <Home className="mr-2 h-5 w-5" />
          Go to Homepage
        </Link>
        <Link to="/products" className="btn btn-outline flex items-center justify-center">
          <Search className="mr-2 h-5 w-5" />
          Browse Products
        </Link>
      </div>
    </div>
  );
};