import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { districts, getDeliveryCharge } from '../utils/locations';
import { createOrder } from '../api/orders';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        district: '',
        thana: '',
        shipping_address: '',
        order_notes: '',
        payment_method: 'cod'
    });

    const [availableThanas, setAvailableThanas] = useState([]);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [error, setError] = useState(null);

    // Redirect if cart is empty
    useEffect(() => {
        if (cart.length === 0 && !orderSuccess) {
            navigate('/');
        }
    }, [cart, navigate, orderSuccess]);

    // Update thanas and delivery charge when district changes
    useEffect(() => {
        if (formData.district) {
            const district = districts.find(d => d.name === formData.district);
            if (district) {
                setAvailableThanas(district.thanas);
                setDeliveryCharge(district.delivery_charge);
            } else {
                setAvailableThanas([]);
                setDeliveryCharge(120); // Default outside
            }
        }
    }, [formData.district]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'district') {
            setFormData(prev => ({ ...prev, thana: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const orderData = {
            ...formData,
            items: cart,
            total_amount: cartTotal + deliveryCharge,
            delivery_charge: deliveryCharge
        };

        try {
            const response = await createOrder(orderData);
            if (response.status === 'success') {
                setOrderSuccess(response.data.order_id);
                clearCart();
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 text-center"
                >
                    <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
                    <p className="text-neutral-400 mb-2">Your order ID is <span className="text-white font-mono">#{orderSuccess}</span></p>
                    <p className="text-neutral-400 mb-8">We've sent a confirmation email and will contact you soon for verification.</p>

                    {formData.payment_method === 'bkash' && (
                        <div className="bg-pink-600/10 border border-pink-600/20 rounded-2xl p-4 mb-8 text-left">
                            <h3 className="text-pink-500 font-bold mb-2 flex items-center">
                                <span className="bg-pink-600 text-white text-[10px] px-2 py-0.5 rounded-full mr-2">bKash</span>
                                Payment Instructions
                            </h3>
                            <p className="text-sm text-neutral-300 mb-2">Please send <strong>৳{cartTotal + deliveryCharge}</strong> to:</p>
                            <p className="text-lg font-mono text-white mb-2">01XXXXXXXXX (Personal)</p>
                            <p className="text-xs text-neutral-500 italic">* Use your Phone Number as reference. Your order will be processed after manual verification.</p>
                        </div>
                    )}

                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-neutral-200 transition-colors"
                    >
                        Back to Shopping
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
            <h1 className="text-4xl font-black mb-8">Checkout</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {/* Shipping Section */}
                    <section className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 backdrop-blur-xl">
                        <h2 className="text-xl font-bold mb-6 flex items-center">
                            <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-sm mr-3">1</span>
                            Shipping Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs text-neutral-500 uppercase tracking-widest ml-2">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    name="customer_name"
                                    value={formData.customer_name}
                                    onChange={handleInputChange}
                                    className="w-full bg-black border border-neutral-800 rounded-2xl py-4 px-6 focus:border-white focus:outline-none transition-colors"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-neutral-500 uppercase tracking-widest ml-2">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    name="customer_phone"
                                    value={formData.customer_phone}
                                    onChange={handleInputChange}
                                    className="w-full bg-black border border-neutral-800 rounded-2xl py-4 px-6 focus:border-white focus:outline-none transition-colors"
                                    placeholder="01XXXXXXXXX"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs text-neutral-500 uppercase tracking-widest ml-2">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    name="customer_email"
                                    value={formData.customer_email}
                                    onChange={handleInputChange}
                                    className="w-full bg-black border border-neutral-800 rounded-2xl py-4 px-6 focus:border-white focus:outline-none transition-colors"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-neutral-500 uppercase tracking-widest ml-2">District</label>
                                <select
                                    required
                                    name="district"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    className="w-full bg-black border border-neutral-800 rounded-2xl py-4 px-6 focus:border-white focus:outline-none transition-colors appearance-none"
                                >
                                    <option value="">Select District</option>
                                    {districts.map(d => (
                                        <option key={d.name} value={d.name}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-neutral-500 uppercase tracking-widest ml-2">Thana / Area</label>
                                <select
                                    required
                                    name="thana"
                                    value={formData.thana}
                                    onChange={handleInputChange}
                                    disabled={!formData.district}
                                    className="w-full bg-black border border-neutral-800 rounded-2xl py-4 px-6 focus:border-white focus:outline-none transition-colors appearance-none disabled:opacity-50"
                                >
                                    <option value="">Select Thana</option>
                                    {availableThanas.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs text-neutral-500 uppercase tracking-widest ml-2">Detailed Address</label>
                                <textarea
                                    required
                                    name="shipping_address"
                                    value={formData.shipping_address}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full bg-black border border-neutral-800 rounded-2xl py-4 px-6 focus:border-white focus:outline-none transition-colors"
                                    placeholder="House, Road, Apartment etc."
                                ></textarea>
                            </div>
                        </div>
                    </section>

                    {/* Payment Section */}
                    <section className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 backdrop-blur-xl">
                        <h2 className="text-xl font-bold mb-6 flex items-center">
                            <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-sm mr-3">2</span>
                            Payment Method
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label className={`relative flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all ${formData.payment_method === 'cod' ? 'border-white bg-white/5' : 'border-neutral-800 hover:border-neutral-700'}`}>
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="cod"
                                    className="hidden"
                                    checked={formData.payment_method === 'cod'}
                                    onChange={handleInputChange}
                                />
                                <div className="flex-1">
                                    <p className="font-bold">Cash on Delivery</p>
                                    <p className="text-sm text-neutral-500">Pay when you receive the order</p>
                                </div>
                                {formData.payment_method === 'cod' && <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-black rounded-full"></div></div>}
                            </label>

                            <label className={`relative flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all ${formData.payment_method === 'bkash' ? 'border-pink-600 bg-pink-600/5' : 'border-neutral-800 hover:border-neutral-700'}`}>
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="bkash"
                                    className="hidden"
                                    checked={formData.payment_method === 'bkash'}
                                    onChange={handleInputChange}
                                />
                                <div className="flex-1">
                                    <p className="font-bold flex items-center">
                                        bKash
                                        <span className="ml-2 text-[10px] bg-pink-600 px-1 rounded text-white text-xs">Manual</span>
                                    </p>
                                    <p className="text-sm text-neutral-500">Get instructions after placing order</p>
                                </div>
                                {formData.payment_method === 'bkash' && <div className="w-5 h-5 bg-pink-600 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full"></div></div>}
                            </label>
                        </div>
                    </section>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-black rounded-xl overflow-hidden border border-neutral-800 flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold truncate">{item.name}</p>
                                        <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-mono">৳{item.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 py-6 border-y border-neutral-800 mb-6">
                            <div className="flex justify-between text-neutral-400">
                                <span>Subtotal</span>
                                <span className="text-white">৳{cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-neutral-400">
                                <span>Delivery Fee</span>
                                <span className="text-white">৳{deliveryCharge}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-8">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-2xl font-black">৳{cartTotal + deliveryCharge}</span>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl mb-4">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all ${isSubmitting ? 'bg-neutral-700 cursor-not-allowed' : 'bg-white text-black hover:bg-neutral-200 active:scale-[0.98]'}`}
                        >
                            {isSubmitting ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
