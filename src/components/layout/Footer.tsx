import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Store } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-200 pt-12 pb-6">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Store className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold text-white">ShopHub</span>
            </div>
            <p className="mb-4 text-neutral-400">
              Your one-stop multi-vendor marketplace for all your shopping needs. Discover products from thousands of trusted sellers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-primary-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-neutral-400 hover:text-primary-500 transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/cart" className="text-neutral-400 hover:text-primary-500 transition-colors">Cart</Link>
              </li>
              <li>
                <Link to="/login" className="text-neutral-400 hover:text-primary-500 transition-colors">Account</Link>
              </li>
              <li>
                <Link to="/orders" className="text-neutral-400 hover:text-primary-500 transition-colors">Track Orders</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-medium mb-4">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=Electronics" className="text-neutral-400 hover:text-primary-500 transition-colors">Electronics</Link>
              </li>
              <li>
                <Link to="/products?category=Clothing" className="text-neutral-400 hover:text-primary-500 transition-colors">Clothing</Link>
              </li>
              <li>
                <Link to="/products?category=Home+%26+Kitchen" className="text-neutral-400 hover:text-primary-500 transition-colors">Home & Kitchen</Link>
              </li>
              <li>
                <Link to="/products?category=Beauty+%26+Personal+Care" className="text-neutral-400 hover:text-primary-500 transition-colors">Beauty & Personal Care</Link>
              </li>
              <li>
                <Link to="/products?category=Sports+%26+Outdoors" className="text-neutral-400 hover:text-primary-500 transition-colors">Sports & Outdoors</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-medium mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5" />
                <span className="text-neutral-400">Bengaluru , India </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-500" />
                <span className="text-neutral-400">+9191919191</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-500" />
                <span className="text-neutral-400">support@shophub.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-neutral-700 pt-8 pb-6">
          <div className="md:flex items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-white font-medium mb-2">Subscribe to our newsletter</h4>
              <p className="text-neutral-400">Get the latest updates on new products and special sales</p>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="p-2 text-neutral-900 rounded-l-md w-full md:w-64 focus:outline-none"
              />
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-neutral-700 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} ShopHub. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-neutral-400">
            <a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Shipping Policy</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};