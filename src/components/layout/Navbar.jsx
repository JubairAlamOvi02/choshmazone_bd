import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { setIsCartOpen, cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
            <div className={`max-w-7xl mx-auto px-6 h-16 rounded-full glass flex items-center justify-between transition-all duration-500 ${isScrolled ? 'mx-4' : 'mx-6'}`}>
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
                        <div className="w-4 h-4 rounded-full border-2 border-black"></div>
                    </div>
                    <span className="font-display font-bold text-xl tracking-tighter uppercase">Choshmazone</span>
                </Link>

                {/* Nav Links - Desktop */}
                <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-widest uppercase">
                    <Link to="/" className="hover:text-accent transition-colors">Shop</Link>
                    <Link to="/track-order" className="hover:text-accent transition-colors">Track Order</Link>
                    <Link to="/" className="hover:text-accent transition-colors">Contact</Link>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-6">
                    <div className="cursor-pointer hover:text-accent transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <div
                        className="relative cursor-pointer hover:text-accent transition-colors"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 11h14l1 12H4L5 11z"></path></svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-[10px] text-white flex items-center justify-center rounded-full animate-pulse">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    <Link to="/admin" className="cursor-pointer hover:text-accent transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </Link>
                    <div className="md:hidden cursor-pointer hover:text-accent transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
