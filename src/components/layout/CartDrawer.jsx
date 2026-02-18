import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            ></div>

            {/* Drawer */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md glass-dark border-l border-white/5 shadow-2xl flex flex-col">
                    {/* Header */}
                    <div className="px-8 py-8 flex items-center justify-between border-b border-white/5">
                        <h2 className="text-2xl font-display font-bold uppercase tracking-tight">Shopping Bag</h2>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 hover:bg-white/5 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 custom-scrollbar">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 11h14l1 12H4L5 11z"></path></svg>
                                </div>
                                <p className="text-white/40 italic">Your bag is currently empty.</p>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="mt-8 text-accent text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="flex gap-6 group">
                                    <div className="w-24 h-32 rounded-2xl overflow-hidden bg-white/5 flex-shrink-0">
                                        <img src={item.main_image || (item.images && item.images[0]?.image_url)} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-sm font-bold uppercase tracking-widest group-hover:text-accent transition-colors">{item.name}</h3>
                                                <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-red-500 transition-colors">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </div>
                                            <p className="text-xs text-white/40 mb-4">{item.category_name}</p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center glass rounded-full px-3 py-1 scale-90 origin-left">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center hover:text-accent font-bold">-</button>
                                                    <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center hover:text-accent font-bold">+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm font-display font-bold">৳{(item.price * item.quantity).toLocaleString()}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="px-8 py-8 border-t border-white/5 space-y-6">
                            <div className="flex justify-between items-end">
                                <span className="text-xs text-white/40 uppercase tracking-[0.2em] font-bold">Subtotal</span>
                                <span className="text-2xl font-display font-bold">৳{cartTotal.toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] text-white/20 uppercase tracking-widest text-center">Shipping & taxes calculated at checkout</p>
                            <Link
                                to="/checkout"
                                onClick={() => setIsCartOpen(false)}
                                className="block w-full py-5 bg-white text-black text-center font-bold uppercase tracking-widest rounded-full hover:bg-accent hover:text-white transition-all duration-500 shadow-xl"
                            >
                                Checkout Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
