import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    // Fallback image if main_image is missing
    const displayImage = product.main_image || 'https://via.placeholder.com/400x500?text=No+Image';

    return (
        <Link to={`/product/${product.id}`} className="group relative glass-dark rounded-3xl p-4 overflow-hidden transition-all duration-500 hover:border-white/20 hover:translate-y-[-8px] block cursor-pointer">
            {/* Image Container */}
            <div className="relative h-64 md:h-80 w-full mb-6 rounded-2xl overflow-hidden bg-white/5">
                <img
                    src={displayImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Badge (Optional) */}
                {product.is_featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-accent/90 text-white text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm">
                        Featured
                    </div>
                )}

                {/* Quick Add Button (Desktop Only on hover) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none md:pointer-events-auto">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product);
                        }}
                        className="px-6 py-3 bg-white text-black font-semibold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 hover:bg-accent hover:text-white"
                    >
                        Add to Bag
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="px-2">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-[10px] text-accent uppercase tracking-[0.2em] font-bold">
                        {product.category_name || 'Sunglasses'}
                    </p>
                    <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <span className="text-[10px] text-white/60">{product.rating || '4.8'}</span>
                    </div>
                </div>

                <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-1">
                    {product.name}
                </h3>

                <div className="flex items-center justify-between">
                    <p className="text-xl font-display font-bold">৳{parseFloat(product.price).toLocaleString()}</p>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(product);
                        }}
                        className="md:hidden w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
