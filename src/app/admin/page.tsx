'use client';

import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-master-navy text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold">BN Admin</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <a href="#" className="block px-4 py-2 bg-master-blue rounded">Dashboard</a>
          <a href="#" className="block px-4 py-2 hover:bg-white/10 rounded">Products</a>
          <a href="#" className="block px-4 py-2 hover:bg-white/10 rounded">Orders</a>
          <a href="#" className="block px-4 py-2 hover:bg-white/10 rounded">Customers</a>
          <a href="#" className="block px-4 py-2 hover:bg-white/10 rounded">Settings</a>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="text-sm text-gray-400 hover:text-white">Log Out</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, Admin</span>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Sales', value: 'PKR 1.2M', change: '+12%' },
            { label: 'Active Orders', value: '24', change: '+5%' },
            { label: 'Products', value: '45', change: '0%' },
            { label: 'Customers', value: '890', change: '+18%' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-green-500 text-sm mt-2">{stat.change} vs last month</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Total</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-4 font-mono text-sm">#BN-{1000 + i}</td>
                  <td className="p-4">Customer {i}</td>
                  <td className="p-4 text-gray-500">Oct {20 + i}, 2023</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${i % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {i % 2 === 0 ? 'Delivered' : 'Pending'}
                    </span>
                  </td>
                  <td className="p-4">PKR {(15000 * i).toLocaleString()}</td>
                  <td className="p-4">
                    <button className="text-master-blue hover:underline text-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
