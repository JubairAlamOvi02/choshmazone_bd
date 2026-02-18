import React, { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    Eye,
    Truck,
    CheckCircle,
    XCircle,
    MapPin,
    Phone,
    Mail
} from 'lucide-react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Mock orders for UI design
    const mockOrders = [
        {
            id: 101,
            customer_name: 'Al-Amin Hossain',
            customer_phone: '01712345678',
            customer_email: 'alamin@example.com',
            status: 'pending',
            total_amount: 5450,
            payment_method: 'bkash',
            district: 'Dhaka',
            thana: 'Dhanmondi',
            shipping_address: 'House 12, Road 5',
            created_at: '2026-02-18 14:30'
        },
        {
            id: 102,
            customer_name: 'Sabina Yasmin',
            customer_phone: '01812345679',
            customer_email: 'sabina@example.com',
            status: 'processing',
            total_amount: 3200,
            payment_method: 'cod',
            district: 'Chittagong',
            thana: 'Bakalia',
            shipping_address: 'Lane 3, Block B',
            created_at: '2026-02-18 12:15'
        }
    ];

    useEffect(() => {
        // Fetch orders from API eventually
        setOrders(mockOrders);
        setLoading(false);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-orange-500/10 text-orange-500';
            case 'processing': return 'bg-blue-500/10 text-blue-500';
            case 'shipped': return 'bg-purple-500/10 text-purple-500';
            case 'delivered': return 'bg-green-500/10 text-green-5010';
            case 'cancelled': return 'bg-red-500/10 text-red-500';
            default: return 'bg-neutral-500/10 text-neutral-500';
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter">Orders</h1>
                    <p className="text-neutral-500">Manage customer orders and shipments.</p>
                </div>

                <div className="flex gap-3">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="bg-neutral-900 border border-neutral-800 rounded-2xl py-3 pl-12 pr-6 focus:border-white focus:outline-none transition-all w-64 text-sm"
                        />
                    </div>
                    <button className="p-3 bg-neutral-900 border border-neutral-800 rounded-2xl text-neutral-400 hover:text-white transition-colors">
                        <Filter size={20} />
                    </button>
                </div>
            </header>

            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-neutral-500 uppercase text-[10px] tracking-[0.2em] bg-neutral-800/20">
                            <tr>
                                <th className="px-8 py-4">ID</th>
                                <th className="px-8 py-4">Customer</th>
                                <th className="px-8 py-4 text-center">Date</th>
                                <th className="px-8 py-4">Payment</th>
                                <th className="px-8 py-4 text-center">Status</th>
                                <th className="px-8 py-4 text-right">Amount</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-8 py-6 font-mono font-bold text-sm text-neutral-300">#{order.id}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm">{order.customer_name}</span>
                                            <span className="text-xs text-neutral-500">{order.customer_phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center text-xs text-neutral-400">
                                        {order.created_at}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-300">{order.payment_method}</span>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right font-bold text-sm">৳{order.total_amount.toLocaleString()}</td>
                                    <td className="px-8 py-6 text-right">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="p-2 text-neutral-500 hover:text-white transition-colors hover:bg-white/5 rounded-xl"
                                        >
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Detail Modal (Simplified Overlay) */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedOrder(null)}></div>
                    <div className="relative bg-neutral-900 border border-neutral-800 rounded-[2.5rem] w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-8 border-b border-neutral-800 flex justify-between items-center bg-gradient-to-r from-neutral-800/10 to-transparent">
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter">Order Detail</h3>
                                <p className="text-neutral-500 text-sm font-mono mt-1">#ORDER-{selectedOrder.id}</p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 hover:bg-white/5 rounded-full text-neutral-500 hover:text-white transition-colors"
                            >
                                <XCircle size={24} />
                            </button>
                        </div>

                        <div className="p-8 grid grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-2 font-bold">Customer Info</p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm">
                                            <Eye size={14} className="text-neutral-500" />
                                            <span className="font-bold">{selectedOrder.customer_name}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-neutral-400">
                                            <Mail size={14} className="text-neutral-500" />
                                            <span>{selectedOrder.customer_email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-neutral-400">
                                            <Phone size={14} className="text-neutral-500" />
                                            <span>{selectedOrder.customer_phone}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-2 font-bold">Shipping Address</p>
                                    <div className="flex gap-3 text-sm text-neutral-400">
                                        <MapPin size={16} className="text-neutral-500 flex-shrink-0" />
                                        <span>{selectedOrder.shipping_address}, {selectedOrder.thana}, {selectedOrder.district}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-2 font-bold">Status & Payment</p>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between items-center p-3 bg-black rounded-2xl border border-neutral-800">
                                            <span className="text-xs text-neutral-500 uppercase tracking-widest">Payment</span>
                                            <span className="text-xs font-bold uppercase">{selectedOrder.payment_method}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-black rounded-2xl border border-neutral-800">
                                            <span className="text-xs text-neutral-500 uppercase tracking-widest">Status</span>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(selectedOrder.status)}`}>
                                                {selectedOrder.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-neutral-800/20 border-t border-neutral-800 flex gap-4">
                            <button className="flex-1 py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors">
                                <Truck size={18} />
                                <span className="uppercase text-xs tracking-widest">Update to Processing</span>
                            </button>
                            <button className="px-6 py-4 bg-red-500/10 text-red-500 border border-red-500/20 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors">
                                <XCircle size={18} />
                                <span className="uppercase text-xs tracking-widest">Cancel</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
