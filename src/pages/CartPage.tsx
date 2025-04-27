import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      navigate('/');
    }, 2000);
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/products" className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800 mb-8">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </Link>
          <div className="text-center mt-8">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h2>
            <p className="mt-1 text-sm text-gray-500">Start shopping to add items to your cart</p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/products" className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800 mb-8">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Continue Shopping
        </Link>

        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {cart.items.map((item) => (
              <li key={item.id} className="p-4 sm:p-6">
                <div className="flex items-center">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="h-20 w-20 object-cover rounded"
                  />
                  <div className="ml-6 flex-1">
                    <div className="flex items-center justify-between">
                      <Link to={`/products/${item.product.id}`} className="text-lg font-medium text-gray-900 hover:text-primary-600">
                        {item.product.title}
                      </Link>
                      <p className="text-lg font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-gray-700 border-x">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${cart.subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <p>Shipping</p>
              <p>${cart.shipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <p>Tax</p>
              <p>${cart.tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-lg font-medium text-gray-900 mt-4 pt-4 border-t">
              <p>Total</p>
              <p>${cart.total.toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6">
              {checkoutSuccess ? (
                <div className="text-center py-4">
                  <div className="text-green-600 font-medium mb-2">Order placed successfully!</div>
                  <p className="text-sm text-gray-600">Redirecting to home page...</p>
                </div>
              ) : (
                <button
                  onClick={handleCheckout}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};