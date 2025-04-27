import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-neutral-400" />
          <h2 className="mt-2 text-lg font-medium text-neutral-900">Your cart is empty</h2>
          <p className="mt-1 text-sm text-neutral-500">Start shopping to add items to your cart</p>
          <Link to="/products" className="btn btn-primary mt-6">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow-soft overflow-hidden">
        {/* Cart Items */}
        <ul className="divide-y divide-neutral-200">
          {cart.items.map((item) => (
            <li key={item.id} className="p-6">
              <div className="flex items-center">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="h-20 w-20 object-cover rounded"
                />
                <div className="ml-6 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-neutral-900">{item.product.title}</h3>
                    <p className="text-lg font-medium text-neutral-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-neutral-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1 text-neutral-600 hover:bg-neutral-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-neutral-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-neutral-600 hover:bg-neutral-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-error-600 hover:text-error-800 flex items-center"
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>
                    <div className="text-sm text-neutral-500">
                      ${item.price.toFixed(2)} each
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        {/* Cart Summary */}
        <div className="bg-neutral-50 p-6">
          <div className="space-y-2">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span>${cart.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Shipping</span>
              <span>${cart.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Tax</span>
              <span>${cart.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-medium text-neutral-900 pt-4 border-t border-neutral-200">
              <span>Total</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Link
              to="/checkout"
              className="btn btn-primary w-full justify-center"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/products"
              className="btn btn-outline w-full justify-center mt-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};