import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
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
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Star } from 'lucide-react';
import { mockVendorStats, mockVendorSales } from '../../data/mockData';

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

export const VendorAnalyticsPage: React.FC = () => {
  // Revenue data for the line chart
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

  // Orders data for the bar chart
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
      <h1 className="text-2xl font-bold mb-6">Analytics Overview</h1>

      {/* Stats Cards */}
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
            <div className="bg-success-100 p-2 rounded-lg">
              <ShoppingBag className="h-5 w-5 text-success-600" />
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
            <div className="bg-warning-100 p-2 rounded-lg">
              <ShoppingBag className="h-5 w-5 text-warning-600" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold">{mockVendorStats.totalProducts}</p>
            <div className="flex items-center text-error-500 text-sm">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span>3%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-neutral-500 font-medium">Avg. Rating</h3>
            <div className="bg-info-100 p-2 rounded-lg">
              <Star className="h-5 w-5 text-info-600" />
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

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow-soft overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <h3 className="font-semibold">Top Selling Products</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVendorSales.slice(0, 6).map((sale, index) => (
              <div key={index} className="bg-neutral-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Product {index + 1}</span>
                  <span className="text-sm text-success-600">${sale.revenue}</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${(sale.orders / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};