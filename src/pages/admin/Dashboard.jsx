import React from 'react';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';
import {
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

const mockData = [
    { name: 'Mon', sales: 4000, orders: 24 },
    { name: 'Tue', sales: 3000, orders: 18 },
    { name: 'Wed', sales: 5000, orders: 32 },
    { name: 'Thu', sales: 2780, orders: 15 },
    { name: 'Fri', sales: 6890, orders: 45 },
    { name: 'Sat', sales: 8390, orders: 52 },
    { name: 'Sun', sales: 3490, orders: 21 },
];

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
                <Icon size={24} className={color.replace('bg-', 'text-')} />
            </div>
            <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'} font-bold`}>
                {change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {Math.abs(change)}%
            </div>
        </div>
        <p className="text-neutral-400 text-sm uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-3xl font-black">{value}</h3>
    </div>
);

const Dashboard = () => {
    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">Overview</h1>
                <p className="text-neutral-500">Welcome back, here's what's happening today.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value="৳124,500"
                    change={12.5}
                    icon={DollarSign}
                    color="bg-emerald-500"
                />
                <StatCard
                    title="Orders"
                    value="156"
                    change={8.2}
                    icon={ShoppingBag}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Customers"
                    value="2,420"
                    change={-3.1}
                    icon={Users}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Conversion"
                    value="4.5%"
                    change={2.4}
                    icon={TrendingUp}
                    color="bg-orange-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sales Chart */}
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl">
                    <h3 className="text-lg font-bold mb-8 uppercase tracking-widest">Revenue Growth</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockData}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#525252"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#525252"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `৳${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '16px' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#ffffff"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Orders Chart */}
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl">
                    <h3 className="text-lg font-bold mb-8 uppercase tracking-widest">Daily Orders</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#525252"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#525252"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '16px' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ fill: '#ffffff10' }}
                                />
                                <Bar dataKey="orders" fill="#ffffff" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Orders Table (Brief version) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden">
                <div className="p-8 border-b border-neutral-800 flex justify-between items-center">
                    <h3 className="text-lg font-bold uppercase tracking-widest">Recent Orders</h3>
                    <button className="text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-neutral-500 uppercase text-[10px] tracking-[0.2em] bg-neutral-800/20">
                            <tr>
                                <th className="px-8 py-4">Order ID</th>
                                <th className="px-8 py-4">Customer</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="px-8 py-6 font-mono font-bold text-sm text-neutral-300">#CZ-342{i}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm">Customer Name</span>
                                            <span className="text-xs text-neutral-500">Dhaka, BD</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${i % 2 === 0 ? 'bg-orange-500/10 text-orange-500' : 'bg-green-500/10 text-green-500'}`}>
                                            {i % 2 === 0 ? 'Processing' : 'Delivered'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right font-bold text-sm">৳4,250</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
