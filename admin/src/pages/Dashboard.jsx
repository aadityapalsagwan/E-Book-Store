import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    books: 0,
    users: 0,
    sales: 0,
    revenue: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const COLORS = ['#4f46e5', '#10b981', '#9333ea', '#ef4444'];

  const chartData = [
    { name: 'Books', value: stats.books },
    { name: 'Users', value: stats.users },
    { name: 'Sales', value: stats.sales },
    // { name: 'Revenue', value: stats.revenue },
  ];
  const chartData1 = [
    { name: 'Revenue', value: stats.revenue },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />
      <main className="ml-64 pt-20 p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">📊 Admin Dashboard</h2>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <p className="text-gray-500">Total Books</p>
              <h3 className="text-2xl font-bold text-blue-600">{stats.books}</h3>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <p className="text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold text-green-600">{stats.users}</h3>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <p className="text-gray-500">Total Sales</p>
              <h3 className="text-2xl font-bold text-purple-600">{stats.sales}</h3>
            </div>
            <div className="bg-white shadow-md rounded-xl p-6 text-center">
              <p className="text-gray-500">Revenue (₹)</p>
              <h3 className="text-2xl font-bold text-red-600">
                ₹{stats.revenue.toLocaleString()}
              </h3>
            </div>
          </div>

          {/* Graphs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">📶 Summary Bar Chart</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">🧩 Data Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Line Graphs for Revenue and Sales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">💰 Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[chartData1[0]]}> 
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">🛒 Sales Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[chartData[2]]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#9333ea" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Users</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[chartData[3]]}> 
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div> */}

            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">💰 Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[chartData[3]]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>


              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">🛒 Sales Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[chartData[2]]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#9333ea" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div> */}

          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
