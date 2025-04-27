import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, TrendingUp, Award, ShoppingBag, Store } from 'lucide-react';
import { ProductGrid } from '../components/products/ProductGrid';
import { Product } from '../types';
import { mockProducts, productCategories } from '../data/mockData';

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Filter products for different sections
      setFeaturedProducts(mockProducts.filter(p => p.rating >= 4.5).slice(0, 4));
      
      // Sort by created date descending for new arrivals
      const sortedByDate = [...mockProducts].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      setNewArrivals(sortedByDate.slice(0, 4));
      
      // Products with "Best Seller" badge
      setBestSellers(
        mockProducts.filter(p => p.badges?.includes('Best Seller')).slice(0, 4)
      );
      
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-16 rounded-lg mb-12">
        <div className="container-custom mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Shop from Thousands of Trusted Vendors
              </h1>
              <p className="text-lg mb-6 text-primary-100">
                Discover unique products from the best brands at competitive prices. 
                Your one-stop shop for all your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="btn btn-accent btn-lg">
                  Shop Now
                </Link>
                <Link to="/register" className="btn btn-outline border-white text-black hover:bg-white hover:text-primary-800 btn-lg">
                  Become a Vendor
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-lg transform translate-y-4">
                  <img 
                    src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Electronics" 
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg transform -translate-y-4">
                  <img 
                    src="https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Fashion" 
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg transform -translate-y-4">
                  <img 
                    src="https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Home Goods" 
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg transform translate-y-4">
                  <img 
                    src="https://images.pexels.com/photos/3962294/pexels-photo-3962294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Beauty" 
                    className="w-full h-40 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <div className="container-custom mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productCategories.slice(0, 8).map((category, index) => (
              <Link 
                key={index}
                to={`/products?category=${encodeURIComponent(category)}`}
                className="bg-white rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-300 group"
              >
                <div className="p-6 text-center">
                  <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 group-hover:bg-primary-200 transition-colors">
                    {index === 0 ? <TrendingUp className="h-6 w-6" /> :
                     index === 1 ? <ShoppingBag className="h-6 w-6" /> :
                     index === 2 ? <Store className="h-6 w-6" /> :
                     <Award className="h-6 w-6" />}
                  </div>
                  <h3 className="font-medium text-neutral-800 group-hover:text-primary-600 transition-colors">
                    {category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16">
        <div className="container-custom mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Featured Products</h2>
            <Link 
              to="/products" 
              className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
            >
              View All
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} loading={loading} />
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mb-16">
        <div className="container-custom mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">New Arrivals</h2>
            <Link 
              to="/products?sort=newest" 
              className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
            >
              View All
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
          <ProductGrid products={newArrivals} loading={loading} />
        </div>
      </section>

      {/* Best Sellers */}
      <section className="mb-16">
        <div className="container-custom mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Best Sellers</h2>
            <Link 
              to="/products?sort=popularity" 
              className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
            >
              View All
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
          <ProductGrid products={bestSellers} loading={loading} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <div className="container-custom mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Johnson',
                avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                text: "I've been shopping here for months, and the quality of products and service is consistently excellent. The variety of vendors means I can find exactly what I need.",
                rating: 5,
              },
              {
                name: 'Michael Chen',
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                text: "As someone who loves supporting small businesses, this platform is perfect. It's easy to use, has secure payment options, and the delivery is always faster than expected.",
                rating: 5,
              },
              {
                name: 'Emily Rodriguez',
                avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
                text: "The tracking feature is amazing! I always know exactly when my packages will arrive. The customer service team is also incredibly responsive whenever I have questions.",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-soft p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-neutral-800">{testimonial.name}</h4>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-neutral-600">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mb-16">
        <div className="container-custom mx-auto">
          <div className="bg-accent-50 rounded-lg p-8 md:p-12">
            <div className="md:flex items-center justify-between">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-accent-900">
                  Become a Vendor and Start Selling Today
                </h2>
                <p className="text-accent-700 mb-6 md:pr-12">
                  Join thousands of successful vendors on our platform. Reach millions of customers, 
                  manage your inventory easily, and grow your business with our powerful tools.
                </p>
                <Link to="/register" className="btn btn-accent">
                  Get Started
                </Link>
              </div>
              <div className="md:w-1/3">
                <img 
                  src="https://images.pexels.com/photos/6169656/pexels-photo-6169656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Become a Vendor"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};