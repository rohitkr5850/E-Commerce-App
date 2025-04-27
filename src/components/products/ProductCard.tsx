import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  // Calculate discounted price
  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;
  
  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <div className="card group h-full flex flex-col">
      <Link to={`/products/${product.id}`} className="block h-full">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          {product.badges && product.badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-col space-y-1">
              {product.badges.map((badge, index) => (
                <span 
                  key={index} 
                  className={`badge ${
                    badge === 'New' ? 'badge-primary' :
                    badge === 'Best Seller' ? 'badge-accent' :
                    badge === 'Hot Deal' ? 'badge-error' :
                    badge === 'Eco-Friendly' ? 'badge-success' :
                    'badge-secondary'
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
          
          {/* Discount Tag */}
          {product.discountPercentage && (
            <div className="absolute top-2 right-2 bg-error-500 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round(product.discountPercentage)}% OFF
            </div>
          )}
          
          {/* Quick actions */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handleAddToCart}
              className="text-white hover:text-primary-400 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button className="text-white hover:text-primary-400 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-neutral-500">{product.category}</span>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm ml-1">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="text-base font-medium text-neutral-800 mb-1 line-clamp-2 flex-grow">
            {product.title}
          </h3>
          
          <div className="flex items-baseline mb-1">
            <span className="text-lg font-semibold text-neutral-800">
              ${discountedPrice.toFixed(2)}
            </span>
            
            {product.discountPercentage && (
              <span className="text-sm text-neutral-500 line-through ml-2">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="text-xs text-neutral-500 mt-1">
            Sold by <span className="text-neutral-700">{product.vendorName}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};