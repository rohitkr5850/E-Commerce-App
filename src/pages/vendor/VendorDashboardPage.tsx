import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ShoppingBag, Users, DollarSign, TrendingUp, ArrowRight, AlertTriangle } from 'lucide-react';
import { mockVendorStats, mockVendorSales, mockProducts } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const VendorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  // Filter products by current vendor
  const vendorProducts = mockProducts.filter(p => p.vendorName === 'TechGadgets');
  
  // Format data for revenue chart
  const revenueData = {
    labels: mockVendorSales.map(sale => sale.date),
    datasets: [
      {
        label: 'Revenue',
        data: mockVendorSales.map(sale => sale.revenue),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };
  
  // Format data for orders chart
  const ordersData = {
    labels: mockVendorSales.map(sale => sale.date),
    datasets: [
      {
        label: 'Orders',
        data: mockVendorSales.map(sale => sale.orders),
        backgroundColor: 'rgb(16, 185, 129)',
        borderRadius: 4,
      }
    ]
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Welcome back, {user?.name}</h1>
        <p className="text-neutral-600">Here's what's happening with your store today.</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-500 font-medium">Total Revenue</h3>
            <div className="bg-primary-100 p-2 rounded-lg">
              <DollarSign className="h-5 w-5 text-primary-600" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold">${mockVendorStats.totalRevenue.toLocaleString()}</p>
            <div className="flex items-center text-success-500 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>12%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-500 font-medium">Total Orders</h3>
            <div className="bg-secondary-100 p-2 rounded-lg">
              <ShoppingBag className="h-5 w-5 text-secondary-600" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold">{mockVendorStats.totalOrders}</p>
            <div className="flex items-center text-success-500 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>8%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-500 font-medium">Total Products</h3>
            <div className="bg-accent-100 p-2 rounded-lg">
              <ShoppingBag className="h-5 w-5 text-accent-600" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold">{mockVendorStats.totalProducts}</p>
            <div className="flex items-center text-success-500 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>5%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-500 font-medium">Avg. Rating</h3>
            <div className="bg-warning-100 p-2 rounded-lg">
              <Users className="h-5 w-5 text-warning-600" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold">{mockVendorStats.averageRating}</p>
            <div className="flex items-center text-success-500 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>2%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Revenue Overview</h3>
            <select className="text-sm border border-neutral-300 rounded-md p-1">
              <option>Last 30 days</option>
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-80">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Orders Overview</h3>
            <select className="text-sm border border-neutral-300 rounded-md p-1">
              <option>Last 30 days</option>
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-80">
            <Bar data={ordersData} options={chartOptions} />
          </div>
        </div>
      </div>
      
      {/* Low Stock Alert */}
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-warning-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-warning-800 mb-1">Low Stock Alert</h4>
            <p className="text-warning-700 text-sm mb-2">
              The following products are running low on inventory:
            </p>
            <ul className="text-sm text-warning-700 list-disc list-inside ml-1 mb-3">
              {vendorProducts.filter(p => p.stock < 25).map(product => (
                <li key={product.id}>
                  {product.title} <span className="text-warning-600 font-medium">({product.stock} left)</span>
                </li>
              ))}
            </ul>
            <Link 
              to="/vendor/products" 
              className="text-sm font-medium text-warning-700 hover:text-warning-800 flex items-center"
            >
              Update inventory
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow-soft overflow-hidden mb-8">
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          <h3 className="font-semibold">Recent Products</h3>
          <Link 
            to="/vendor/products" 
            className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center"
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {vendorProducts.slice(0, 5).map(product => (
                <tr key={product.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={product.thumbnail} 
                        alt={product.title}
                        className="h-10 w-10 rounded object-cover mr-3"
                      />
                      <div className="font-medium text-neutral-800 truncate max-w-xs">{product.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-neutral-800">
                      ${product.price}
                    </div>
                    {product.discountPercentage && (
                      <div className="text-xs text-neutral-500">
                        {product.discountPercentage}% off
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${
                      product.stock < 10 ? 'text-error-600' :
                      product.stock < 25 ? 'text-warning-600' :
                      'text-success-600'
                    }`}>
                      {product.stock} units
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-neutral-100">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-neutral-500 text-sm">
                    {product.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};