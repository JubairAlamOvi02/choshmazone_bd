import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Users,
    Settings,
    LogOut,
    Eye
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const location = useLocation();
    const { logout, user } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
        { icon: Package, label: 'Products', path: '/admin/products' },
        { icon: Users, label: 'Customers', path: '/admin/customers' },
    ];

    return (
        <div className="flex min-h-screen bg-black text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-neutral-800 bg-neutral-900/50 backdrop-blur-xl sticky top-0 h-screen overflow-y-auto">
                <div className="p-8">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:bg-accent transition-colors">
                            <div className="w-4 h-4 rounded-full border-2 border-black"></div>
                        </div>
                        <span className="font-display font-bold text-xl tracking-tighter uppercase">Admin Panel</span>
                    </Link>
                </div>

                <nav className="px-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${isActive
                                    ? 'bg-white text-black font-bold'
                                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="text-sm uppercase tracking-widest">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-8 left-4 right-4 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                    >
                        <Eye size={20} />
                        <span className="text-sm uppercase tracking-widest">View Store</span>
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                    >
                        <LogOut size={20} />
                        <span className="text-sm uppercase tracking-widest font-bold">Log Out</span>
                    </button>

                    <div className="mt-8 px-4 py-4 bg-neutral-800/50 rounded-2xl border border-neutral-700">
                        <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Signed in as</p>
                        <p className="text-sm font-bold truncate">{user?.full_name || 'Admin'}</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-12">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
