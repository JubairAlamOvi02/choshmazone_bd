import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, fetchProducts } from '../api/products';
import ProductCard from '../components/product/ProductCard';
import ReviewSection from '../components/product/ReviewSection';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState('highlights');
    const { addToCart } = useCart();

    useEffect(() => {
        const loadPageData = async () => {
            setLoading(true);
            try {
                // Fetch main product
                const data = await fetchProductById(id);
                setProduct(data);

                // Fetch related products (same category)
                if (data && data.category_id) {
                    const related = await fetchProducts({ category_id: data.category_id });
                    setRelatedProducts(related.filter(p => p.id !== parseInt(id)).slice(0, 4));
                }
            } catch (error) {
                console.error('Error loading PDP:', error);
                // Fallback for demonstration
                setProduct({
                    id: id,
                    name: 'Premium Aviator Elite',
                    price: 4500,
                    description: 'The Aviator Elite represents the pinnacle of eyewear engineering. Featuring polarized lenses and a lightweight titanium frame, these sunglasses offer unparalleled clarity and comfort for the discerning individual.',
                    category_name: 'Luxury',
                    rating: 4.8,
                    images: [
                        { image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080', is_main: true },
                        { image_url: 'https://images.unsplash.com/photo-1511499767390-a7335958beab?q=80&w=2080', is_main: false },
                        { image_url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2080', is_main: false }
                    ],
                    specs: 'Frame: Grade 5 Titanium | Lens: UV400 Polarized | Weight: 18g',
                    highlights: 'Zero-Distortion Vision | Scratch Resistant Coating | Lifetime Frame Warranty'
                });
            } finally {
                setLoading(false);
                window.scrollTo(0, 0);
            }
        };
        loadPageData();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-black"><div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div></div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center bg-black">Product not found.</div>;

    const images = product.images && product.images.length > 0
        ? product.images
        : [{ image_url: 'https://via.placeholder.com/800x1000?text=No+Image', is_main: true }];

    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": images.map(img => img.image_url),
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": "Choshmazone"
        },
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "BDT",
            "price": product.price,
            "availability": product.stock_quantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating || "4.8",
            "reviewCount": "24"
        }
    };

    return (
        <div className="pt-32 pb-24 bg-black">
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumbs */}
                <div className="flex gap-2 text-xs text-white/40 uppercase tracking-widest mb-12">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-white/60">{product.category_name}</span>
                    <span>/</span>
                    <span className="text-white">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
                    {/* Image Gallery */}
                    <div className="space-y-6">
                        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden glass-dark border border-white/5 relative group">
                            <img
                                src={images[activeImage].image_url}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-6 right-6">
                                <div className="w-12 h-12 glass rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </div>
                            </div>
                        </div>
                        {/* Thumbnails */}
                        <div className="flex gap-4">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-500 ${activeImage === idx ? 'border-accent scale-105' : 'border-white/5 opacity-50 hover:opacity-100'}`}
                                >
                                    <img src={img.image_url} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 tracking-tight leading-tight uppercase">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-6 mb-8">
                            <span className="text-3xl font-display font-bold text-accent">৳{parseFloat(product.price).toLocaleString()}</span>
                            <div className="h-6 w-[1px] bg-white/10"></div>
                            <div className="flex items-center gap-2">
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5].map(s => <svg key={s} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)}
                                </div>
                                <span className="text-sm font-bold text-white/40 tracking-widest">({product.rating}/5.0)</span>
                            </div>
                        </div>

                        <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-xl">
                            {product.description}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-20">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 py-5 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-accent hover:text-white transition-all duration-500 shadow-xl active:scale-95"
                            >
                                Add to Shopping Bag
                            </button>
                            <button className="flex-1 py-5 glass text-white font-bold uppercase tracking-widest rounded-full hover:bg-white/5 transition-all duration-500">
                                View Size Guide
                            </button>
                        </div>

                        {/* Accordion/Tabs */}
                        <div className="space-y-4">
                            {[
                                { id: 'highlights', title: 'Product Highlights', content: product.highlights },
                                { id: 'specs', title: 'Specifications', content: product.specs },
                                { id: 'shipping', title: 'Shipping & Returns', content: 'Free doorstep delivery in Dhaka (৳60) and nationwide (৳120). 7-day hassle-free return policy.' }
                            ].map((tab) => (
                                <div key={tab.id} className="glass-dark rounded-3xl overflow-hidden border border-white/5">
                                    <button
                                        onClick={() => setActiveTab(activeTab === tab.id ? '' : tab.id)}
                                        className="w-full px-8 py-6 flex items-center justify-between text-left group"
                                    >
                                        <span className={`text-sm font-bold uppercase tracking-[0.2em] transition-colors ${activeTab === tab.id ? 'text-accent' : 'text-white/60 group-hover:text-white'}`}>
                                            {tab.title}
                                        </span>
                                        <svg className={`w-5 h-5 transition-transform duration-500 ${activeTab === tab.id ? 'rotate-180 text-accent' : 'text-white/20'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </button>
                                    <div className={`transition-all duration-500 ease-in-out ${activeTab === tab.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                                        <div className="px-8 pb-8 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-6">
                                            {tab.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="border-t border-white/5 pt-24">
                        <div className="flex items-end justify-between mb-16">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 uppercase">YOU MAY ALSO LIKE</h2>
                                <p className="text-white/40">Complete your look with our curated recommendations.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </div>
                )}

                {/* Reviews Section */}
                <ReviewSection productId={id} />
            </div>
        </div>
    );
};

export default ProductDetails;
