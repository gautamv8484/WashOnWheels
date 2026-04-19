import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaEnvelope, FaLock, FaCar, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

const from = location.state?.from || '/my-dashboard'

  // ✅ CORRECT - Redirect inside useEffect
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/my-dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!formData.email || !formData.password) {
    toast.warning('Please fill in all fields')
    return
  }

  setLoading(true)
  try {
    await login(formData.email, formData.password)
    toast.success('🎉 Welcome back!')
    
    // ✅ Agar service data hai state mein toh booking pe bhejo with data
    if (location.state?.from === '/booking' && location.state?.serviceName) {
      navigate('/booking', {
        state: {
          serviceName: location.state.serviceName,
          servicePrice: location.state.servicePrice,
          serviceDuration: location.state.serviceDuration,
          serviceColor: location.state.serviceColor
        }
      })
    } else {
      navigate(from)
    }
  } catch (error) {
    toast.error(error.message || 'Login failed')
  } finally {
    setLoading(false)
  }
}

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 20px 60px',
      background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'white',
          padding: '50px',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '450px'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{
              width: '70px',
              height: '70px',
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: 'white',
              fontSize: '1.8rem'
            }}
          >
            <FaCar />
          </motion.div>
          <h1 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '8px' }}>
            Welcome Back!
          </h1>
          <p style={{ color: '#64748b' }}>Login to your WashOnWheels account</p>

          {location.state?.from && (
            <div style={{
              marginTop: '15px',
              padding: '10px 15px',
              background: '#FEF3C7',
              color: '#D97706',
              borderRadius: '10px',
              fontSize: '0.9rem'
            }}>
              ⚠️ Please login first to continue
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#334155'
            }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <FaEnvelope style={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8'
              }} />
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({
                  ...formData,
                  email: e.target.value
                })}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 45px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#334155'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <FaLock style={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8'
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({
                  ...formData,
                  password: e.target.value
                })}
                required
                style={{
                  width: '100%',
                  padding: '14px 50px 14px 45px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8',
                  fontSize: '1.1rem'
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '16px',
              background: loading
                ? '#94a3b8'
                : 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        <p style={{
          textAlign: 'center',
          marginTop: '25px',
          color: '#64748b'
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{
            color: '#4F46E5',
            fontWeight: '600',
            textDecoration: 'none'
          }}>
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login;