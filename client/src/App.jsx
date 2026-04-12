import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import ProtectedRoute from './components/ProtectedRoute'

import { AdminProvider } from './context/AdminContext'
import { AuthProvider } from './context/AuthContext'

import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import About from './pages/About'
import BookingPage from './pages/BookingPage'
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
)

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <ScrollToTop />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          } />

          {/* Public Routes */}
          <Route path="/" element={
            <PublicLayout><Home /></PublicLayout>
          } />
          <Route path="/services" element={
            <PublicLayout><ServicesPage /></PublicLayout>
          } />
          <Route path="/pricing" element={
            <PublicLayout><PricingPage /></PublicLayout>
          } />
          <Route path="/about" element={
            <PublicLayout><About /></PublicLayout>
          } />
          <Route path="/contact" element={
            <PublicLayout><ContactPage /></PublicLayout>
          } />
          <Route path="/login" element={
            <PublicLayout><Login /></PublicLayout>
          } />
          <Route path="/register" element={
            <PublicLayout><Register /></PublicLayout>
          } />

          {/* Protected Routes */}
          <Route path="/booking" element={
            <PublicLayout>
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            </PublicLayout>
          } />
          <Route path="/my-dashboard" element={
            <PublicLayout>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </PublicLayout>
          } />
        </Routes>
      </AdminProvider>
    </AuthProvider>
  )
}

export default App;