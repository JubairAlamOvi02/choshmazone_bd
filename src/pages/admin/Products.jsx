import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Package,
    Image as ImageIcon,
    AlertCircle,
    X,
    Save
} from 'lucide-react';
import { fetchProducts } from '../../api/products';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Mock initial data
    const mockProducts = [
        { id: 1, name: 'Obsidian Noir', price: 2450, category_name: 'Luxury', stock_quantity: 45, status: 'active', main_image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080' },
        { id: 2, name: 'Crimson Peak', price: 1800, category_name: 'Classic', stock_quantity: 12, status: 'active', main_image: 'https://images.unsplash.com/photo-1511499767390-a7335958beab?q=80&w=2080' },
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
                setProducts(mockProducts);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const openModal = (product = null) => {
        setEditingProduct(product || {
            name: '',
            price: '',
            category_id: '',
            description: '',
            stock_quantity: 0,
            status: 'active'
        });
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter">Products</h1>
                    <p className="text-neutral-500">Manage your eyewear inventory.</p>
                </div>

                <div className="flex gap-3">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="bg-neutral-900 border border-neutral-800 rounded-2xl py-3 pl-12 pr-6 focus:border-white focus:outline-none transition-all w-64 text-sm"
                        />
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="px-6 py-3 bg-white text-black font-bold rounded-2xl flex items-center gap-2 hover:bg-neutral-200 active:scale-95 transition-all"
                    >
                        <Plus size={18} />
                        <span className="uppercase text-xs tracking-widest text-inherit">Add Product</span>
                    </button>
                </div>
            </header>

            {/* Product Table */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-neutral-500 uppercase text-[10px] tracking-[0.2em] bg-neutral-800/20">
                            <tr>
                                <th className="px-8 py-4">Product</th>
                                <th className="px-8 py-4">Category</th>
                                <th className="px-8 py-4 text-center">Stock</th>
                                <th className="px-8 py-4">Price</th>
                                <th className="px-8 py-4 text-center">Status</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-16 bg-black rounded-xl overflow-hidden border border-neutral-800 flex-shrink-0">
                                                <img src={product.main_image || product.image_url} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm tracking-tight">{product.name}</span>
                                                <span className="text-[10px] text-neutral-500 font-mono italic">#{product.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-center">
                                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">{product.category_name}</span>
                                    </td>
                                    <td className="px-8 py-4 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className={`text-sm font-bold ${product.stock_quantity < 10 ? 'text-red-500' : 'text-white'}`}>{product.stock_quantity}</span>
                                            {product.stock_quantity < 10 && <span className="text-[8px] text-red-500 uppercase font-black tracking-tighter">Low Stock</span>}
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 font-bold text-sm">৳{Number(product.price).toLocaleString()}</td>
                                    <td className="px-8 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${product.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => openModal(product)}
                                                className="p-2 text-neutral-500 hover:text-white transition-colors hover:bg-white/5 rounded-xl"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-2 text-neutral-500 hover:text-red-500 transition-colors hover:bg-white/5 rounded-xl">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Product Edit/Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-neutral-900 border border-neutral-800 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar animate-in slide-in-from-bottom-8 duration-500">
                        <div className="p-8 border-b border-neutral-800 flex justify-between items-center sticky top-0 bg-neutral-900 z-10">
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter">
                                    {editingProduct.id ? 'Edit Product' : 'Add New Product'}
                                </h3>
                                <p className="text-neutral-500 text-sm">Fill in the product details and save.</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-white/5 rounded-full text-neutral-500 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Form Side */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-bold ml-2">Product Name</label>
                                    <input
                                        type="text"
                                        value={editingProduct.name}
                                        className="w-full bg-black border border-neutral-800 rounded-2xl py-4 px-6 focus:border-white focus:outline-none transition-all placeholder:text-neutral-700"
                                        placeholder="e.g. Midnight Aviator"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-bold ml-2">Price (৳)</label>
                                        <input
                                            type="number"
                                            value={editingProduct.price}
                                            className="w-full bg-black border border-neutral-800 rounded-2xl py-4 px-6 focus:border-white focus:outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-bold ml-2">Stock</label>
                                        <input
                                            type="number"
                                            value={editingProduct.stock_quantity}
                                            className="w-full bg-black border border-neutral-800 rounded-2xl py-4 px-6 focus:border-white focus:outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-bold ml-2">Description</label>
                                    <textarea
                                        rows="4"
                                        className="w-full bg-black border border-neutral-800 rounded-2xl py-4 px-6 focus:border-white focus:outline-none transition-all"
                                        placeholder="Detail product features..."
                                    >
                                        {editingProduct.description}
                                    </textarea>
                                </div>
                            </div>

                            {/* Image Side */}
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-bold ml-2">Product Image</label>
                                    <div className="aspect-[3/4] bg-black border border-neutral-800 rounded-3xl flex flex-col items-center justify-center group cursor-pointer hover:border-white/50 transition-all overflow-hidden relative">
                                        {editingProduct.main_image ? (
                                            <>
                                                <img src={editingProduct.main_image} alt="" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <span className="text-xs font-bold uppercase tracking-widest text-white">Change Image</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <ImageIcon size={48} className="text-neutral-700 group-hover:text-neutral-500 transition-colors mb-4" />
                                                <p className="text-xs text-neutral-600 uppercase tracking-widest">Click to upload</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-orange-500/5 border border-orange-500/10 p-4 rounded-2xl flex items-start gap-3">
                                    <AlertCircle size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-[10px] text-orange-500/80 uppercase font-black tracking-[0.1em] leading-relaxed">
                                        Images are automatically resized for web performance. Recommended aspect ratio is 3:4.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border-t border-neutral-800 flex gap-4 sticky bottom-0 bg-neutral-900 border-opacity-50 mt-8">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-4 bg-neutral-800 text-white font-bold rounded-2xl hover:bg-neutral-700 transition-all uppercase text-xs tracking-widest"
                            >
                                Cancel
                            </button>
                            <button className="flex-1 py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-200 active:scale-[0.98] transition-all uppercase text-xs tracking-widest">
                                <Save size={18} />
                                Save Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
