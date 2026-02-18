import React, { useState, useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import { fetchProducts } from '../api/products';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    const categories = ['All', 'Classic', 'Sport', 'Modern', 'Luxury'];

    // Mock data for initial UI demonstration while DB is being populated
    const mockProducts = [
        { id: 1, name: 'Obsidian Noir', price: 2450, category_name: 'Luxury', main_image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080', is_featured: true, rating: 4.9 },
        { id: 2, name: 'Crimson Peak', price: 1800, category_name: 'Classic', main_image: 'https://images.unsplash.com/photo-1511499767390-a7335958beab?q=80&w=2080', is_featured: false, rating: 4.7 },
        { id: 3, name: 'Azure Glide', price: 3200, category_name: 'Sport', main_image: 'https://images.unsplash.com/photo-1577803645773-f9337ef4871c?q=80&w=2080', is_featured: true, rating: 5.0 },
        { id: 4, name: 'Velvet Gold', price: 5500, category_name: 'Luxury', main_image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2080', is_featured: false, rating: 4.8 },
    ];

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                if (data && data.length > 0) {
                    setProducts(data);
                } else {
                    setProducts(mockProducts);
                }
            } catch (error) {
                console.warn('API not connected yet, using mock data:', error);
                setProducts(mockProducts);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const filteredProducts = activeFilter === 'All'
        ? products
        : products.filter(p => p.category_name === activeFilter);

    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">THE CATALOGUE</h2>
                    <p className="text-white/40 max-w-md">Curated selection of our finest eyewear, crafted for clarity and distinction.</p>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500 ${activeFilter === cat
                                    ? 'bg-accent text-white shadow-[0_0_20px_rgba(255,100,0,0.3)]'
                                    : 'glass hover:bg-white/10 text-white/60'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-[450px] bg-white/5 rounded-3xl"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-20 glass-dark rounded-3xl">
                    <p className="text-white/40 italic">No products found in this category.</p>
                </div>
            )}
        </section>
    );
};

export default Shop;
