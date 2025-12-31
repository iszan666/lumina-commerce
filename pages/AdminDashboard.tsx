import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { UserRole, Order } from '../types';
import { CURRENCY_SYMBOL } from '../constants';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Package, Users, DollarSign, Activity, ChevronDown, ChevronUp, Truck, CheckCircle, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg shadow-black/20">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        {trend && <p className="text-xs font-medium text-emerald-400 mt-2 flex items-center"><TrendingUp size={12} className="mr-1" aria-hidden="true"/> {trend}</p>}
      </div>
      <div className={`p-2.5 rounded-lg ${color} bg-opacity-20 border border-white/10`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} aria-hidden="true" />
      </div>
    </div>
  </div>
);

export const AdminDashboard = () => {
  const { user, orders, updateOrderStatus } = useStore();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  if (!user || user.role !== UserRole.ADMIN) {
    return <div className="p-12 text-center text-red-500 font-bold bg-slate-950 min-h-screen">Access Denied</div>;
  }

  // Enhanced Mock Data
  const monthlyData = [
    { name: 'Jan', revenue: 42000, visitors: 2400 },
    { name: 'Feb', revenue: 48000, visitors: 2800 },
    { name: 'Mar', revenue: 55000, visitors: 3200 },
    { name: 'Apr', revenue: 51000, visitors: 2900 },
    { name: 'May', revenue: 68000, visitors: 3800 },
    { name: 'Jun', revenue: 74000, visitors: 4200 },
    { name: 'Jul', revenue: 89000, visitors: 4800 },
  ];

  const topProducts = [
    { name: 'Quantum X', sales: 156 },
    { name: 'Horizon 5', sales: 134 },
    { name: 'Sonic Boom', sales: 98 },
    { name: 'Vision Pro', sales: 65 },
    { name: 'PixelLens', sales: 42 },
  ];

  const demographics = [
    { name: '18-24', value: 25 },
    { name: '25-34', value: 45 },
    { name: '35-44', value: 20 },
    { name: '45+', value: 10 },
  ];

  const COLORS = ['#8b5cf6', '#a78bfa', '#ec4899', '#f43f5e'];

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 428000); 

  const toggleOrder = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-900/30 text-emerald-400 border border-emerald-900/50';
      case 'shipped': return 'bg-blue-900/30 text-blue-400 border border-blue-900/50';
      case 'processing': return 'bg-violet-900/30 text-violet-400 border border-violet-900/50';
      default: return 'bg-yellow-900/30 text-yellow-400 border border-yellow-900/50';
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value={`${CURRENCY_SYMBOL}${totalRevenue.toLocaleString()}`} icon={DollarSign} color="bg-emerald-500" trend="+12.5% from last month" />
        <StatCard title="Total Orders" value={orders.length + 1242} icon={Package} color="bg-violet-500" trend="+8.2% from last month" />
        <StatCard title="Active Users" value="3,892" icon={Users} color="bg-blue-500" trend="+24% new signups" />
        <StatCard title="Stock Alert" value="3 Items" icon={Activity} color="bg-red-500" />
      </div>

      {/* Analytics Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Revenue Trends Area Chart */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg shadow-black/20 lg:col-span-2 h-96">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Revenue Trends</h3>
            <label htmlFor="revenue-period" className="sr-only">Select period</label>
            <select id="revenue-period" className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm outline-none text-slate-300 focus:border-violet-500">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${CURRENCY_SYMBOL}${value}`} tick={{fill: '#94a3b8'}} />
              <Tooltip 
                cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '4 4' }} 
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #334155', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }} 
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Demographics Pie Chart */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg shadow-black/20 h-96">
          <h3 className="text-lg font-bold text-white mb-6">Customer Demographics</h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={demographics}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {demographics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #334155', color: '#f8fafc' }} itemStyle={{ color: '#fff' }} />
              <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-slate-400 ml-1">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analytics Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Top Products Bar Chart */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg shadow-black/20 h-80">
          <h3 className="text-lg font-bold text-white mb-6">Top Selling Products</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#334155" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #334155', color: '#f8fafc' }} itemStyle={{ color: '#fff' }} />
              <Bar dataKey="sales" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Visitor Traffic Line Chart */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg shadow-black/20 h-80">
          <h3 className="text-lg font-bold text-white mb-6">Visitor Traffic</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid #334155', color: '#f8fafc' }} itemStyle={{ color: '#fff' }} />
              <Line type="monotone" dataKey="visitors" stroke="#ec4899" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill:'#ec4899' }} activeDot={{ r: 6, stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-lg shadow-black/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/30">
           <h3 className="text-lg font-bold text-white">Manage Orders</h3>
           <div className="flex gap-2">
             <button className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors">Export CSV</button>
             <button className="px-3 py-1.5 text-xs font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-500 transition-colors">Filter</button>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-400">
            <thead className="text-xs text-slate-500 uppercase bg-slate-950/50">
              <tr>
                <th scope="col" className="px-6 py-3 font-semibold">Order ID</th>
                <th scope="col" className="px-6 py-3 font-semibold">Date</th>
                <th scope="col" className="px-6 py-3 font-semibold">Customer</th>
                <th scope="col" className="px-6 py-3 font-semibold">Status</th>
                <th scope="col" className="px-6 py-3 text-right font-semibold">Amount</th>
                <th scope="col" className="px-6 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <React.Fragment key={order.id}>
                  <tr className={`border-b border-slate-800 transition-colors ${expandedOrderId === order.id ? 'bg-violet-900/10' : 'hover:bg-slate-800/50'}`}>
                    <td className="px-6 py-4 font-medium text-slate-200">{order.id}</td>
                    <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{order.userId}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-200">{CURRENCY_SYMBOL}{order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => toggleOrder(order.id)}
                        aria-label={expandedOrderId === order.id ? "Collapse order details" : "Expand order details"}
                        aria-expanded={expandedOrderId === order.id}
                        className="text-slate-500 hover:text-violet-400 transition-colors p-1"
                      >
                        {expandedOrderId === order.id ? <ChevronUp size={20} aria-hidden="true" /> : <ChevronDown size={20} aria-hidden="true" />}
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded Detail View */}
                  {expandedOrderId === order.id && (
                    <tr className="bg-slate-950/30 border-b border-slate-800">
                      <td colSpan={6} className="px-6 py-6">
                        <div className="flex flex-col md:flex-row gap-8">
                          {/* Items List */}
                          <div className="flex-grow">
                            <h4 className="font-semibold text-slate-200 mb-3 flex items-center">
                              <Package size={16} className="mr-2 text-violet-500" aria-hidden="true" /> Order Items
                            </h4>
                            <div className="space-y-3">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-slate-900 p-3 rounded-lg border border-slate-800">
                                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover opacity-80" />
                                  <div className="flex-grow">
                                    <p className="font-medium text-slate-200">{item.name}</p>
                                    <p className="text-xs text-slate-500">{item.category}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-slate-200">{item.quantity} x {CURRENCY_SYMBOL}{item.price.toFixed(2)}</p>
                                    <p className="text-xs text-slate-500 font-semibold">{CURRENCY_SYMBOL}{(item.quantity * item.price).toFixed(2)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Order Actions */}
                          <div className="md:w-72 flex-shrink-0">
                            <h4 className="font-semibold text-slate-200 mb-3 flex items-center">
                               <Truck size={16} className="mr-2 text-violet-500" aria-hidden="true" /> Update Status
                            </h4>
                            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                              <label htmlFor={`status-select-${order.id}`} className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Current Status</label>
                              <select 
                                id={`status-select-${order.id}`}
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-300"
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                              </select>
                              
                              <div className="mt-4 pt-4 border-t border-slate-800">
                                <p className="text-xs text-slate-500 mb-2">
                                  Updating the status will send a notification to the customer.
                                </p>
                                {order.status === 'delivered' && (
                                  <div className="flex items-center text-emerald-500 text-xs font-medium animate-pulse">
                                    <CheckCircle size={14} className="mr-1" aria-hidden="true" /> Order Completed
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              
              {orders.length === 0 && (
                <tr>
                   <td colSpan={6} className="px-6 py-8 text-center text-slate-600">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};