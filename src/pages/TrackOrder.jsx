import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, Hash } from 'lucide-react';
import axios from 'axios';

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [phone, setPhone] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setOrder(null);

        try {
            const response = await axios.get(`/api/orders/track.php?order_id=${orderId}&phone=${phone}`);
            if (response.data.status === 'success') {
                setOrder(response.data.data);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to track order. Please check your details.');
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { id: 'pending', label: 'Order Placed', icon: Clock },
        { id: 'processing', label: 'Processing', icon: Package },
        { id: 'shipped', label: 'In Transit', icon: Truck },
        { id: 'delivered', label: 'Delivered', icon: CheckCircle },
    ];

    const getActiveStep = (status) => {
        return steps.findIndex(step => step.id === status);
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-black text-white selection:bg-accent selection:text-black">
            <div className="max-w-4xl mx-auto px-6">
                <header className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Track Order</h1>
                    <p className="text-white/40 text-lg uppercase tracking-widest font-bold">Follow your vision's journey</p>
                </header>

                <div className="glass-dark border border-white/5 rounded-[2.5rem] p-8 md:p-12 mb-12">
                    <form onSubmit={handleTrack} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        <div className="space-y-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold ml-4">Order ID</label>
                            <div className="relative">
                                <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. 101"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    className="w-full bg-black border border-white/5 rounded-2xl py-5 pl-14 pr-6 focus:border-accent focus:outline-none transition-all text-sm font-mono"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold ml-4">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                <input
                                    required
                                    type="tel"
                                    placeholder="01XXXXXXXXX"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-black border border-white/5 rounded-2xl py-5 pl-14 pr-6 focus:border-accent focus:outline-none transition-all text-sm font-mono"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 mt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-all duration-500 shadow-2xl active:scale-95"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Search size={20} />
                                        <span>Track My Vision</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold text-center"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {order && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-12"
                        >
                            {/* Status Stepper */}
                            <div className="relative flex justify-between items-center px-4 md:px-12 py-12 glass-dark border border-white/5 rounded-[2.5rem] overflow-hidden">
                                <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5 -translate-y-[40px] z-0 hidden md:block"></div>
                                <div
                                    className="absolute top-1/2 left-0 h-1 bg-accent -translate-y-[40px] z-0 transition-all duration-1000 hidden md:block"
                                    style={{ width: `${(getActiveStep(order.status) / (steps.length - 1)) * 100}%` }}
                                ></div>

                                {steps.map((step, idx) => {
                                    const Icon = step.icon;
                                    const isActive = getActiveStep(order.status) >= idx;
                                    const isCurrent = getActiveStep(order.status) === idx;

                                    return (
                                        <div key={step.id} className="relative z-10 flex flex-col items-center gap-4">
                                            <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-700 ${isActive ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'bg-neutral-900 text-white/20 border border-white/5'} ${isCurrent ? 'scale-110 !bg-accent !text-white !shadow-[0_0_30px_rgba(255,100,0,0.4)]' : ''}`}>
                                                <Icon size={isActive ? 20 : 18} />
                                            </div>
                                            <div className="text-center">
                                                <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-white/20'}`}>{step.label}</p>
                                                {isCurrent && <p className="text-[8px] text-accent uppercase font-black tracking-tighter mt-1 animate-pulse">Live Update</p>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Order Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="glass-dark border border-white/5 rounded-[2.5rem] p-10 space-y-8">
                                    <div>
                                        <h3 className="text-xs text-white/30 uppercase tracking-[0.2em] font-black mb-6">Delivery Details</h3>
                                        <div className="space-y-6">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0"><MapPin size={18} className="text-accent" /></div>
                                                <div>
                                                    <p className="text-sm font-bold text-white uppercase">{order.customer_name}</p>
                                                    <p className="text-sm text-white/40 leading-relaxed mt-1">{order.shipping_address}, {order.thana}, {order.district}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0"><Phone size={18} className="text-accent" /></div>
                                                <div>
                                                    <p className="text-sm font-bold text-white uppercase">{order.customer_phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-dark border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-center">
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                                            <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Total Bill</span>
                                            <span className="text-2xl font-black">৳{parseFloat(order.total_amount).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                                            <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Payment</span>
                                            <span className="text-sm font-black uppercase tracking-widest bg-white/5 px-4 py-1 rounded-full">{order.payment_method}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-4">
                                            <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Placed On</span>
                                            <span className="text-sm font-mono text-white/70">{new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="glass-dark border border-white/5 rounded-[2.5rem] p-10">
                                <h3 className="text-xs text-white/30 uppercase tracking-[0.2em] font-black mb-8">Package Contents</h3>
                                <div className="space-y-6">
                                    {order.items && order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-6 p-4 rounded-3xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                            <div className="w-16 h-16 bg-black rounded-2xl border border-white/5 flex items-center justify-center text-accent font-black">
                                                {item.quantity}x
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-black uppercase tracking-wider">{item.name}</p>
                                                <p className="text-xs text-white/40 font-mono mt-1">PRICE: ৳{parseFloat(item.unit_price).toLocaleString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-black tracking-tight">৳{(item.unit_price * item.quantity).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TrackOrder;
