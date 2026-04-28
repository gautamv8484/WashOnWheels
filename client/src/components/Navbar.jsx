import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaCar, FaPhone, FaWhatsapp, FaUser, FaSignOutAlt, FaCalendarAlt, FaCrown } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setShowProfileMenu(false)
  }, [location])

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClick = () => setShowProfileMenu(false)
    if (showProfileMenu) {
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [showProfileMenu])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ]

  const handleLogout = () => {
    logout()
    setShowProfileMenu(false)
    navigate('/')
  }

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      navigate('/booking')
    }
  }

  return (
    <motion.nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: scrolled ? '12px 5%' : '18px 5%',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 5px 30px rgba(0, 0, 0, 0.1)' : 'none'
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none'
        }}>
          <FaCar style={{ fontSize: '2rem', color: '#4F46E5' }} />
          <span style={{
            fontSize: '1.6rem',
            fontWeight: '700',
            // color: scrolled ? '#1e293b' : 'white',
            transition: 'color 0.3s'
          }}>
            Wash<span style={{ color: '#4F46E5' }}>OnWheels</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '35px'
        }}
        className="desktop-menu"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                // color: scrolled ? '#1e293b' : 'rgba(255, 255, 255, 0.95)',
                fontSize: '1rem',
                fontWeight: location.pathname === link.path ? '600' : '500',
                textDecoration: 'none',
                borderBottom: location.pathname === link.path ? '2px solid #4F46E5' : '2px solid transparent',
                padding: '8px 0',
                transition: 'all 0.3s'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
        className="desktop-actions"
        >
          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/917043300954"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: '#25D366',
              color: 'white',
              borderRadius: '50px',
              fontWeight: '600',
              textDecoration: 'none',
              fontSize: '0.85rem'
            }}
          >
            <FaWhatsapp /> WhatsApp
          </motion.a>

          {/* If User is NOT Logged In */}
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                style={{
                  padding: '10px 22px',
                  color: scrolled ? '#4F46E5' : 'white',
                  border: `2px solid ${scrolled ? '#4F46E5' : 'white'}`,
                  borderRadius: '50px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}
              >
                Login
              </Link>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  style={{
                    padding: '10px 22px',
                    background: scrolled ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' : 'white',
                    color: scrolled ? 'white' : '#4F46E5',
                    borderRadius: '50px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.15)'
                  }}
                >
                  Register
                </Link>
              </motion.div>
            </>
          ) : (
            <>
              {/* Book Now Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/booking"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 22px',
                    background: scrolled ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' : 'white',
                    color: scrolled ? 'white' : '#4F46E5',
                    borderRadius: '50px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.15)'
                  }}
                >
                  <FaCar /> Book Now
                </Link>
              </motion.div>

              {/* User Profile Button */}
              <div style={{ position: 'relative' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowProfileMenu(!showProfileMenu)
                  }}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 5px 15px rgba(79,70,229,0.3)'
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </motion.button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: 'absolute',
                        top: '55px',
                        right: 0,
                        background: 'white',
                        borderRadius: '16px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                        width: '260px',
                        overflow: 'hidden',
                        zIndex: 100
                      }}
                    >
                      {/* User Info */}
                      <div style={{
                        padding: '20px',
                        background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                        color: 'white'
                      }}>
                        <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{user?.name}</div>
                        <div style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: '3px' }}>{user?.email}</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '3px' }}>📱 {user?.phone}</div>
                      </div>

                      {/* Menu Items */}
                      <div style={{ padding: '10px' }}>
                        <Link
                          to="/my-dashboard"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '12px 15px',
                            color: '#1e293b',
                            textDecoration: 'none',
                            borderRadius: '10px',
                            transition: 'background 0.3s',
                            fontWeight: '500'
                          }}
                          onMouseEnter={(e) => e.target.style.background = '#f1f5f9'}
                          onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                          <FaUser style={{ color: '#4F46E5' }} /> My Dashboard
                        </Link>

                        <Link
                          to="/my-dashboard"
                          onClick={() => {/* Will navigate to bookings tab */}}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '12px 15px',
                            color: '#1e293b',
                            textDecoration: 'none',
                            borderRadius: '10px',
                            transition: 'background 0.3s',
                            fontWeight: '500'
                          }}
                          onMouseEnter={(e) => e.target.style.background = '#f1f5f9'}
                          onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                          <FaCalendarAlt style={{ color: '#10B981' }} /> My Bookings
                        </Link>

                        <Link
                          to="/my-dashboard"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '12px 15px',
                            color: '#1e293b',
                            textDecoration: 'none',
                            borderRadius: '10px',
                            transition: 'background 0.3s',
                            fontWeight: '500'
                          }}
                          onMouseEnter={(e) => e.target.style.background = '#f1f5f9'}
                          onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                          <FaCrown style={{ color: '#D97706' }} /> My Plan
                        </Link>

                        <div style={{ height: '1px', background: '#e2e8f0', margin: '5px 0' }} />

                        <button
                          onClick={handleLogout}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '12px 15px',
                            color: '#DC2626',
                            background: 'none',
                            border: 'none',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            width: '100%',
                            textAlign: 'left',
                            fontWeight: '500',
                            fontSize: '0.95rem',
                            transition: 'background 0.3s'
                          }}
                          onMouseEnter={(e) => e.target.style.background = '#FEE2E2'}
                          onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        >
                          <FaSignOutAlt /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            fontSize: '1.8rem',
            color: scrolled ? '#1e293b' : 'white',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '0 0 20px 20px',
              boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
              marginTop: '10px'
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  display: 'block',
                  padding: '12px 20px',
                  color: location.pathname === link.path ? '#4F46E5' : '#1e293b',
                  textDecoration: 'none',
                  fontWeight: '500',
                  borderRadius: '10px',
                  background: location.pathname === link.path ? 'rgba(79,70,229,0.1)' : 'transparent',
                  marginBottom: '5px'
                }}
              >
                {link.label}
              </Link>
            ))}

            <div style={{ height: '1px', background: '#e2e8f0', margin: '10px 0' }} />

            {!isAuthenticated ? (
              <>
                <Link to="/login" style={{
                  display: 'block', padding: '12px 20px', color: '#4F46E5',
                  textDecoration: 'none', fontWeight: '600', borderRadius: '10px',
                  textAlign: 'center', border: '2px solid #4F46E5', marginBottom: '10px'
                }}>
                  Login
                </Link>
                <Link to="/register" style={{
                  display: 'block', padding: '12px 20px',
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  color: 'white', textDecoration: 'none', fontWeight: '600',
                  borderRadius: '10px', textAlign: 'center'
                }}>
                  Register
                </Link>
              </>
            ) : (
              <>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 20px', background: '#f8fafc', borderRadius: '10px', marginBottom: '10px'
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: '#4F46E5', color: 'white', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontWeight: '700'
                  }}>
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600' }}>{user?.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{user?.email}</div>
                  </div>
                </div>

                <Link to="/my-dashboard" style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '12px 20px', color: '#1e293b', textDecoration: 'none',
                  fontWeight: '500', borderRadius: '10px'
                }}>
                  <FaUser style={{ color: '#4F46E5' }} /> My Dashboard
                </Link>

                <Link to="/booking" style={{
                  display: 'block', padding: '12px 20px',
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  color: 'white', textDecoration: 'none', fontWeight: '600',
                  borderRadius: '10px', textAlign: 'center', marginTop: '10px'
                }}>
                  🚗 Book Now
                </Link>

                <button onClick={handleLogout} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '12px 20px', color: '#DC2626', background: 'none',
                  border: 'none', cursor: 'pointer', fontWeight: '500',
                  width: '100%', marginTop: '10px', borderRadius: '10px'
                }}>
                  <FaSignOutAlt /> Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for responsive */}
      <style>{`
        @media (max-width: 968px) {
          .desktop-menu, .desktop-actions { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </motion.nav>
  )
}

export default Navbar;