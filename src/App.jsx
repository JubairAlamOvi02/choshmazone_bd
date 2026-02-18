import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import CartDrawer from './components/layout/CartDrawer'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Shop from './pages/Shop'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import AdminLayout from './components/layout/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Orders from './pages/admin/Orders'
import Products from './pages/admin/Products'
import TrackOrder from './pages/TrackOrder'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-black">
        <Routes>
          {/* Main Storefront Routes */}
          <Route path="/" element={<><Navbar /><CartDrawer /><Home /></>} />
          <Route path="/shop" element={<><Navbar /><CartDrawer /><Shop /></>} />
          <Route path="/product/:id" element={<><Navbar /><CartDrawer /><ProductDetails /></>} />
          <Route path="/checkout" element={<><Navbar /><CartDrawer /><Checkout /></>} />
          <Route path="/track-order" element={<><Navbar /><CartDrawer /><TrackOrder /></>} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<div>Customers Page (Coming Soon)</div>} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
