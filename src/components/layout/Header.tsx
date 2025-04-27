import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, ShoppingCart, User, Menu, X, 
  LogOut, Package, ChevronDown, Store
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  // Handle scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white md:bg-transparent'}`}>
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-neutral-900">ShopHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-neutral-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            <Link to="/products" className="text-neutral-700 hover:text-primary-600 font-medium">
              Products
            </Link>
            <div className="relative group">
              <button className="flex items-center text-neutral-700 hover:text-primary-600 font-medium">
                Categories
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link to="/products?category=Electronics" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                    Electronics
                  </Link>
                  <Link to="/products?category=Clothing" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                    Clothing
                  </Link>
                  <Link to="/products?category=Home+%26+Kitchen" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                    Home & Kitchen
                  </Link>
                  <Link to="/products?category=Beauty+%26+Personal+Care" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                    Beauty & Personal Care
                  </Link>
                  <Link to="/products" className="block px-4 py-2 text-sm text-primary-600 hover:bg-neutral-100 font-medium">
                    View All Categories
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-100 rounded-full"
            >
              <Search className="h-5 w-5" />
            </button>
            
            <Link 
              to="/cart" 
              className="p-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-100 rounded-full relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} 
                  className="flex items-center space-x-1 text-neutral-700 hover:text-primary-600"
                >
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                    ) : (
                      <span className="text-primary-700 font-medium">{user.name.charAt(0)}</span>
                    )}
                  </div>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-neutral-700 border-b border-neutral-100">
                        Signed in as <span className="font-medium">{user.name}</span>
                      </div>
                      
                      {user.role === 'vendor' && (
                        <Link 
                          to="/vendor/dashboard" 
                          className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Vendor Dashboard
                        </Link>
                      )}
                      
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      
                      <Link 
                        to="/orders" 
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Your Orders
                      </Link>
                      
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-error-600 hover:bg-neutral-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-1 text-neutral-700 hover:text-primary-600"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <Link 
              to="/cart" 
              className="p-2 text-neutral-700 hover:text-primary-600 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Link>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 text-neutral-700 hover:text-primary-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 animate-slide-down">
          <div className="container-custom mx-auto py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full p-2 pl-10 border border-neutral-300 rounded-md"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              </div>
              <button type="submit" className="sr-only">Search</button>
            </form>
            
            <nav className="space-y-4">
              <Link 
                to="/" 
                className="block text-neutral-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="block text-neutral-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/products?category=Electronics" 
                className="block text-neutral-700 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Electronics
              </Link>
              <Link 
                to="/products?category=Clothing" 
                className="block text-neutral-700 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Clothing
              </Link>
              <Link 
                to="/products?category=Home+%26+Kitchen" 
                className="block text-neutral-700 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home & Kitchen
              </Link>
              
              {user ? (
                <>
                  <div className="pt-4 border-t border-neutral-100">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
                        ) : (
                          <span className="text-primary-700 font-medium">{user.name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-neutral-500">{user.email}</div>
                      </div>
                    </div>
                    
                    {user.role === 'vendor' && (
                      <Link 
                        to="/vendor/dashboard" 
                        className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 mb-3"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Store className="h-5 w-5" />
                        <span>Vendor Dashboard</span>
                      </Link>
                    )}
                    
                    <Link 
                      to="/profile" 
                      className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 mb-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                    
                    <Link 
                      to="/orders" 
                      className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 mb-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Package className="h-5 w-5" />
                      <span>Your Orders</span>
                    </Link>
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-error-600 hover:text-error-700 w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-4 border-t border-neutral-100">
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    <span>Sign In</span>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="hidden md:block bg-white border-t border-neutral-100 shadow-md animate-slide-down">
          <div className="container-custom mx-auto py-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="flex-grow p-2 border border-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                autoFocus
              />
              <button 
                type="submit" 
                className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-r-md"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};