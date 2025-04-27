import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import { mockOrders } from '../../data/mockData';
import { Order, OrderStatus } from '../../types';

export const UserOrdersPage: React.FC = () => {
  const [orders] = useState<Order[]>(mockOrders);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');
  const [dateFilter, setDateFilter] = useState('all');

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const matchesDate = dateFilter === 'all' || (
      dateFilter === 'today' ? 
        order.createdAt.toDateString() === new Date().toDateString() :
      dateFilter === 'week' ?
        order.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) :
      dateFilter === 'month' ?
        order.createdAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) :
        true
    );
    return matchesStatus && matchesDate;
  });

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Package className="h-5 w-5 text-warning-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-primary-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-info-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-success-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-error-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-soft p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus)}
            className="p-2 border border-neutral-300 rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="p-2 border border-neutral-300 rounded-md"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-soft overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-neutral-500">Order #{order.id}</div>
                  <div className="text-sm text-neutral-500">
                    Placed on {order.createdAt.toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(order.status)}
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    order.status === 'delivered' ? 'bg-success-100 text-success-800' :
                    order.status === 'cancelled' ? 'bg-error-100 text-error-800' :
                    order.status === 'shipped' ? 'bg-info-100 text-info-800' :
                    order.status === 'processing' ? 'bg-primary-100 text-primary-800' :
                    'bg-warning-100 text-warning-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-20 w-20 object-cover rounded"
                    />
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-medium">{item.product.title}</h3>
                      <p className="text-neutral-500">Quantity: {item.quantity}</p>
                      <p className="text-neutral-500">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-neutral-500">Total Amount</div>
                    <div className="text-2xl font-bold">${order.total.toFixed(2)}</div>
                  </div>
                  <Link
                    to={`/orders/track/${order.id}`}
                    className="btn btn-primary"
                  >
                    Track Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No orders found</h3>
            <p className="text-neutral-600">
              Try adjusting your filters or start shopping to create new orders.
            </p>
            <Link to="/products" className="btn btn-primary mt-4">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};