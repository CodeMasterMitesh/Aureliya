import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import ProductList from './pages/ProductList.jsx'
import ProductPage from './pages/ProductPage.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import Profile from './pages/Profile.jsx'
import Invoice from './pages/Invoice.jsx'
import OrderDetail from './pages/OrderDetail.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Dashboard from './pages/Dashboard.jsx'
import NotFound from './pages/NotFound.jsx'
import { useAuth } from './store/auth.js'
import { getMe } from './api/profile.js'

export default function App() {
  const token = useAuth((s)=>s.token)
  const user = useAuth((s)=>s.user)
  const setUser = useAuth((s)=>s.setUser)

  useEffect(()=>{
    let active = true
    async function hydrate(){
      if (token && !user) {
        try { const me = await getMe(); if (active) setUser(me) } catch (e) { /* ignore */ }
      }
    }
    hydrate()
    return ()=>{ active=false }
  }, [token])
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders/success" element={<OrderSuccess />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders/:id/invoice" element={<Invoice />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
