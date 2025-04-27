import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { mockOrders } from '../data/mockData';
import { Order } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundOrder = mockOrders.find(o => o.id === id);
      setOrder(foundOrder || null);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-error-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
          <p className="text-neutral-600">The order you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const steps = [
    { status: 'Order Placed', icon: Package, date: order.createdAt },
    { status: 'Processing', icon: Clock, date: order.updatedAt },
    { status: 'Shipped', icon: Truck, date: order.updatedAt },
    { status: 'Delivered', icon: CheckCircle, date: order.estimatedDelivery },
  ];

  const currentStep = steps.findIndex(step => 
    step.status.toLowerCase() === order.status.toLowerCase()
  );

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Order Tracking</h1>

      {/* Order Info */}
      <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-neutral-500 mb-1">Order Number</h3>
            <p className="text-lg font-medium">{order.id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-500 mb-1">Order Date</h3>
            <p className="text-lg">{order.createdAt.toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-500 mb-1">Estimated Delivery</h3>
            <p className="text-lg">{order.estimatedDelivery?.toLocaleDateString() || 'To be determined'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-500 mb-1">Shipping Address</h3>
            <p className="text-lg">
              {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
          </div>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Tracking Timeline</h2>
        <div className="relative">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={step.status} className="flex items-center mb-8 last:mb-0">
                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                  isCompleted ? 'bg-primary-600' : 'bg-neutral-200'
                } ${isCurrent ? 'ring-2 ring-primary-600 ring-offset-2' : ''}`}>
                  <step.icon className={`h-4 w-4 ${isCompleted ? 'text-white' : 'text-neutral-500'}`} />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${isCompleted ? 'text-primary-600' : 'text-neutral-500'}`}>
                      {step.status}
                    </h3>
                    <span className="text-sm text-neutral-500">
                      {step.date?.toLocaleDateString()}
                    </span>
                  </div>
                  {isCurrent && (
                    <p className="text-sm text-neutral-600 mt-1">
                      Your order is currently {step.status.toLowerCase()}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-soft overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <h2 className="text-xl font-semibold">Order Items</h2>
        </div>
        <div className="divide-y divide-neutral-200">
          {order.items.map((item) => (
            <div key={item.id} className="p-6 flex items-center">
              <img 
                src={item.product.thumbnail} 
                alt={item.product.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-6 flex-1">
                <h3 className="font-medium">{item.product.title}</h3>
                <p className="text-sm text-neutral-500">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 bg-neutral-50">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>${order.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg pt-2 border-t">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};