import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FilterX, ChevronDown, Check, SlidersHorizontal, Search, 
  Star, ArrowUpDown
} from 'lucide-react';
import { ProductGrid } from '../components/products/ProductGrid';
import { Product, ProductFilter } from '../types';
import { extendedProductList, productCategories } from '../data/mockData';

export const ProductsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get query params from URL
  const searchParams = new URLSearchParams(location.search);
  
  // State for filters
  const [filters, setFilters] = useState<ProductFilter>({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    rating: searchParams.get('rating') ? Number(searchParams.get('rating')) : undefined,
    sortBy: (searchParams.get('sortBy') as ProductFilter['sortBy']) || 'newest',
  });
  
  // UI state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedRating, setSelectedRating] = useState<number | undefined>(filters.rating);
  
  // Apply filters and fetch products
  useEffect(() => {
    setLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      // Filter products based on current filters
      let filteredProducts = [...extendedProductList];
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(
          p => p.title.toLowerCase().includes(searchLower) || 
               p.description.toLowerCase().includes(searchLower) ||
               p.category.toLowerCase().includes(searchLower)
        );
      }
      
      if (filters.category) {
        filteredProducts = filteredProducts.filter(
          p => p.category === filters.category
        );
      }
      
      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(
          p => p.price >= (filters.minPrice || 0)
        );
      }
      
      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(
          p => p.price <= (filters.maxPrice || 10000)
        );
      }
      
      if (filters.rating !== undefined) {
        filteredProducts = filteredProducts.filter(
          p => p.rating >= (filters.rating || 0)
        );
      }
      
      // Sort products
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'rating-desc':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            filteredProducts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            break;
          default:
            break;
        }
      }
      
      setProducts(filteredProducts);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [filters]);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.search) params.set('search', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice !== undefined) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.rating !== undefined) params.set('rating', filters.rating.toString());
    if (filters.sortBy) params.set('sortBy', filters.sortBy);
    
    navigate(`${location.pathname}?${params.toString()}`);
  }, [filters, navigate, location.pathname]);
  
  // Apply price range filter
  const handlePriceRangeApply = () => {
    setFilters(prev => ({
      ...prev,
      minPrice: priceRange.min,
      maxPrice: priceRange.max
    }));
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: undefined,
      maxPrice: undefined,
      rating: undefined,
      sortBy: 'newest',
    });
    setPriceRange({ min: 0, max: 1000 });
    setSelectedRating(undefined);
  };
  
  // Set rating filter
  const handleRatingFilter = (rating: number) => {
    if (selectedRating === rating) {
      setSelectedRating(undefined);
      setFilters(prev => ({ ...prev, rating: undefined }));
    } else {
      setSelectedRating(rating);
      setFilters(prev => ({ ...prev, rating: rating }));
    }
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <div className="text-neutral-600">
          {products.length} products available
          {filters.category && ` in ${filters.category}`}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="w-full flex items-center justify-center space-x-2 p-3 border border-neutral-300 rounded-md"
          >
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
        
        {/* Filters Sidebar */}
        <div className={`bg-white rounded-lg shadow-soft p-4 ${mobileFiltersOpen ? 'block' : 'hidden'} md:block md:w-64 h-fit sticky top-24`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Filters</h3>
            <button
              onClick={handleClearFilters}
              className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
            >
              <FilterX className="h-4 w-4 mr-1" />
              Clear All
            </button>
          </div>
          
          {/* Categories */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Categories</h4>
            <div className="space-y-2">
              {productCategories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    checked={filters.category === category}
                    onChange={() => setFilters(prev => ({ ...prev, category: category }))}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-neutral-700">{category}</span>
                </label>
              ))}
              {filters.category && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
                  className="text-sm text-primary-600 hover:text-primary-800 mt-2"
                >
                  Clear category
                </button>
              )}
            </div>
          </div>
          
          {/* Price Range */}
          <div className="mb-6 border-t border-neutral-200 pt-6">
            <h4 className="font-medium mb-3">Price Range</h4>
            <div className="flex items-center gap-2 mb-3">
              <div className="relative rounded-md shadow-sm">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">$</span>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                  className="pl-7 p-2 text-sm border border-neutral-300 rounded-md w-full"
                  placeholder="Min"
                />
              </div>
              <span className="text-neutral-400">to</span>
              <div className="relative rounded-md shadow-sm">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-500">$</span>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className="pl-7 p-2 text-sm border border-neutral-300 rounded-md w-full"
                  placeholder="Max"
                />
              </div>
            </div>
            <button
              onClick={handlePriceRangeApply}
              className="w-full btn btn-sm btn-outline"
            >
              Apply
            </button>
          </div>
          
          {/* Ratings */}
          <div className="mb-6 border-t border-neutral-200 pt-6">
            <h4 className="font-medium mb-3">Ratings</h4>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingFilter(rating)}
                  className={`flex items-center w-full p-2 rounded-md ${
                    selectedRating === rating ? 'bg-primary-50' : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex mr-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">& Up</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Products Section */}
        <div className="flex-1">
          {/* Search and Sort Controls */}
          <div className="bg-white rounded-lg shadow-soft p-4 mb-6">
            <div className="md:flex items-center justify-between">
              <div className="relative mb-4 md:mb-0 md:mr-4 md:flex-1">
                <input
                  type="text"
                  value={filters.search || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  placeholder="Search products..."
                  className="pl-10 p-2 border border-neutral-300 rounded-md w-full"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
              </div>
              
              <div className="flex items-center">
                <span className="text-neutral-600 mr-2 whitespace-nowrap">Sort by:</span>
                <div className="relative z-10 w-full md:w-auto">
                  <select
                    value={filters.sortBy || 'newest'}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as ProductFilter['sortBy'] }))}
                    className="appearance-none block w-full bg-white border border-neutral-300 text-neutral-700 py-2 px-3 pr-8 rounded-md"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Top Rated</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-700">
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Active Filters */}
          {(filters.category || filters.minPrice !== undefined || filters.maxPrice !== undefined || filters.rating) && (
            <div className="bg-white rounded-lg shadow-soft p-4 mb-6 flex flex-wrap gap-2 items-center">
              <span className="text-neutral-600 mr-2">Active filters:</span>
              
              {filters.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100">
                  Category: {filters.category}
                  <button 
                    onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
                    className="ml-1 text-neutral-500 hover:text-neutral-800"
                  >
                    ×
                  </button>
                </span>
              )}
              
              {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100">
                  Price: ${filters.minPrice || 0} - ${filters.maxPrice || '1000+'}
                  <button 
                    onClick={() => setFilters(prev => ({ ...prev, minPrice: undefined, maxPrice: undefined }))}
                    className="ml-1 text-neutral-500 hover:text-neutral-800"
                  >
                    ×
                  </button>
                </span>
              )}
              
              {filters.rating && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100">
                  Rating: {filters.rating}+ Stars
                  <button 
                    onClick={() => {
                      setFilters(prev => ({ ...prev, rating: undefined }));
                      setSelectedRating(undefined);
                    }}
                    className="ml-1 text-neutral-500 hover:text-neutral-800"
                  >
                    ×
                  </button>
                </span>
              )}
              
              <button
                onClick={handleClearFilters}
                className="text-sm text-primary-600 hover:text-primary-800 ml-auto"
              >
                Clear All
              </button>
            </div>
          )}
          
          {/* Product Grid */}
          <ProductGrid products={products} loading={loading} />
          
          {/* Pagination */}
          {!loading && products.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow-sm">
                <button className="px-3 py-2 rounded-l-md border border-neutral-300 text-neutral-700 hover:bg-neutral-50">
                  Previous
                </button>
                <button className="px-3 py-2 border-t border-b border-neutral-300 bg-primary-50 text-primary-600 font-medium">
                  1
                </button>
                <button className="px-3 py-2 border-t border-b border-neutral-300 text-neutral-700 hover:bg-neutral-50">
                  2
                </button>
                <button className="px-3 py-2 border-t border-b border-neutral-300 text-neutral-700 hover:bg-neutral-50">
                  3
                </button>
                <button className="px-3 py-2 rounded-r-md border border-neutral-300 text-neutral-700 hover:bg-neutral-50">
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};