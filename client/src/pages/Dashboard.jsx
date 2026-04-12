import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import {
  FaCar, FaUser, FaCalendarAlt, FaClock, FaMapMarkerAlt,
  FaSignOutAlt, FaCrown, FaRocket, FaStar, FaCheck,
  FaTimes, FaMotorcycle, FaTruckPickup, FaPhoneAlt,
  FaEnvelope, FaEdit, FaSave, FaHistory, FaChartLine,
  FaRedo, FaArrowRight
} from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()

  // States
  const [activeTab, setActiveTab] = useState('overview')
  const [bookings, setBookings] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    })

    fetchData()
  }, [isAuthenticated])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [bookingsRes, subsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/bookings?phone=${user?.phone}`).catch(() => ({ data: { bookings: [] } })),
        axios.get(`http://localhost:5000/api/subscriptions?phone=${user?.phone}`).catch(() => ({ data: { subscriptions: [] } }))
      ])
      setBookings(bookingsRes.data.bookings || [])
      setSubscriptions(subsRes.data.subscriptions || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate days remaining
  const getDaysRemaining = (endDate) => {
    const today = new Date()
    const end = new Date(endDate)
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }

  // Get progress percentage
  const getProgress = (startDate, endDate) => {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    const now = new Date().getTime()
    const total = end - start
    const elapsed = now - start
    const percent = Math.min(100, Math.max(0, (elapsed / total) * 100))
    return percent
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  // Status badge
  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: '#FEF3C7', color: '#D97706', icon: <FaClock /> },
      confirmed: { bg: '#DBEAFE', color: '#2563EB', icon: <FaCheck /> },
      'in-progress': { bg: '#E0E7FF', color: '#4F46E5', icon: <FaCar /> },
      completed: { bg: '#D1FAE5', color: '#059669', icon: <FaCheck /> },
      cancelled: { bg: '#FEE2E2', color: '#DC2626', icon: <FaTimes /> },
      active: { bg: '#D1FAE5', color: '#059669', icon: <FaCheck /> },
      expired: { bg: '#FEE2E2', color: '#DC2626', icon: <FaTimes /> }
    }
    return styles[status] || styles.pending
  }

  // Vehicle icon
  const getVehicleIcon = (type) => {
    switch (type) {
      case 'bike': return <FaMotorcycle />
      case 'suv': return <FaTruckPickup />
      default: return <FaCar />
    }
  }

  // Plan details
  const getPlanDetails = (plan) => {
    const plans = {
      basic: { icon: <FaStar />, color: '#64748b', name: 'Basic Plan', features: ['Alternate day wash', 'Exterior only'] },
      premium: { icon: <FaCrown />, color: '#D97706', name: 'Premium Plan', features: ['Daily wash', 'Interior 2x/month', 'Wax 1x/month'] },
      business: { icon: <FaRocket />, color: '#4F46E5', name: 'Business Plan', features: ['Up to 5 cars', 'Full detailing', 'Dedicated manager'] }
    }
    return plans[plan] || plans.basic
  }

  // Handle logout
  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  // Renew subscription
  const handleRenew = async (sub) => {
    try {
      await axios.post(`http://localhost:5000/api/subscriptions/${sub._id}/renew`)
      toast.success('🎉 Subscription renewed successfully!')
      fetchData()
    } catch (error) {
      toast.error('Failed to renew. Please try again.')
    }
  }

  // Active subscription
  const activeSub = subscriptions.find(s => s.status === 'active')

  // Stats
  const stats = {
    totalBookings: bookings.length,
    completedBookings: bookings.filter(b => b.status === 'completed').length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    activeSubs: subscriptions.filter(s => s.status === 'active').length
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '80px' }}>
        <div style={{ textAlign: 'center', color: '#4F46E5' }}>
          <FaCar style={{ fontSize: '3rem', marginBottom: '15px' }} />
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', paddingTop: '90px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '15px'
          }}
        >
          <div>
            <h1 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '5px' }}>
              Welcome, {user?.name}! 👋
            </h1>
            <p style={{ color: '#64748b' }}>Manage your car wash services</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/booking" style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 24px', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              color: 'white', borderRadius: '12px', textDecoration: 'none', fontWeight: '600'
            }}>
              <FaCar /> Book Wash
            </Link>
            <button onClick={handleLogout} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 24px', background: '#FEE2E2', color: '#DC2626',
              border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600'
            }}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', overflowX: 'auto' }}>
          {[
            { id: 'overview', label: 'Overview', icon: <FaChartLine /> },
            { id: 'bookings', label: 'My Bookings', icon: <FaCalendarAlt /> },
            { id: 'subscription', label: 'My Plan', icon: <FaCrown /> },
            { id: 'profile', label: 'Profile', icon: <FaUser /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 20px',
                background: activeTab === tab.id ? 'white' : 'transparent',
                color: activeTab === tab.id ? '#4F46E5' : '#64748b',
                border: activeTab === tab.id ? '2px solid #4F46E5' : '2px solid transparent',
                borderRadius: '12px', cursor: 'pointer', fontWeight: activeTab === tab.id ? '600' : '400',
                whiteSpace: 'nowrap', transition: 'all 0.3s',
                boxShadow: activeTab === tab.id ? '0 5px 15px rgba(79,70,229,0.15)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ============ OVERVIEW TAB ============ */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
              {[
                { label: 'Total Bookings', value: stats.totalBookings, icon: <FaCalendarAlt />, color: '#4F46E5' },
                { label: 'Completed', value: stats.completedBookings, icon: <FaCheck />, color: '#10B981' },
                { label: 'Pending', value: stats.pendingBookings, icon: <FaClock />, color: '#F59E0B' },
                { label: 'Active Plans', value: stats.activeSubs, icon: <FaCrown />, color: '#8B5CF6' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    background: 'white', padding: '25px', borderRadius: '16px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderLeft: `4px solid ${stat.color}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b' }}>{stat.value}</div>
                      <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{stat.label}</div>
                    </div>
                    <div style={{
                      width: '50px', height: '50px', borderRadius: '12px',
                      background: `${stat.color}15`, color: stat.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem'
                    }}>
                      {stat.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Active Plan Card */}
            {activeSub && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  borderRadius: '20px', padding: '30px', color: 'white', marginBottom: '25px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      {getPlanDetails(activeSub.plan).icon}
                      <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{getPlanDetails(activeSub.plan).name}</h3>
                    </div>
                    <p style={{ opacity: 0.9, marginBottom: '5px' }}>
                      Vehicle: {activeSub.vehicleType?.toUpperCase()} • {activeSub.vehicleNumber}
                    </p>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                      {formatDate(activeSub.startDate)} → {formatDate(activeSub.endDate)}
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '800' }}>{getDaysRemaining(activeSub.endDate)}</div>
                    <div style={{ opacity: 0.9 }}>Days Left</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ marginTop: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', opacity: 0.9, marginBottom: '8px' }}>
                    <span>Plan Progress</span>
                    <span>{Math.round(getProgress(activeSub.startDate, activeSub.endDate))}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgress(activeSub.startDate, activeSub.endDate)}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      style={{ height: '100%', background: 'white', borderRadius: '10px' }}
                    />
                  </div>
                </div>

                {/* Features */}
                <div style={{ display: 'flex', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
                  {getPlanDetails(activeSub.plan).features.map((feature, i) => (
                    <span key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '5px',
                      padding: '5px 12px', background: 'rgba(255,255,255,0.2)',
                      borderRadius: '20px', fontSize: '0.85rem'
                    }}>
                      <FaCheck /> {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* No Active Plan */}
            {!activeSub && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  background: 'white', borderRadius: '20px', padding: '40px',
                  textAlign: 'center', marginBottom: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}
              >
                <FaCrown style={{ fontSize: '3rem', color: '#e2e8f0', marginBottom: '15px' }} />
                <h3 style={{ color: '#1e293b', marginBottom: '10px' }}>No Active Subscription</h3>
                <p style={{ color: '#64748b', marginBottom: '20px' }}>Subscribe to a plan and save more on regular washes!</p>
                <Link to="/pricing" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 30px', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  color: 'white', borderRadius: '12px', textDecoration: 'none', fontWeight: '600'
                }}>
                  View Plans <FaArrowRight />
                </Link>
              </motion.div>
            )}

            {/* Recent Bookings */}
            <div style={{
              background: 'white', borderRadius: '16px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden'
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '20px 25px', borderBottom: '1px solid #e2e8f0'
              }}>
                <h3 style={{ margin: 0 }}>Recent Bookings</h3>
                <button onClick={() => setActiveTab('bookings')} style={{
                  background: 'none', border: 'none', color: '#4F46E5', cursor: 'pointer', fontWeight: '600'
                }}>
                  View All →
                </button>
              </div>

              {bookings.length > 0 ? (
                bookings.slice(0, 3).map((booking, index) => {
                  const statusInfo = getStatusBadge(booking.status)
                  return (
                    <div key={booking._id} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '15px 25px', borderBottom: '1px solid #f1f5f9'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{
                          width: '45px', height: '45px', borderRadius: '12px',
                          background: '#f1f5f9', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', color: '#4F46E5', fontSize: '1.2rem'
                        }}>
                          {getVehicleIcon(booking.vehicleType)}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: '#1e293b', textTransform: 'capitalize' }}>{booking.service}</div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                            {booking.vehicleNumber} • {formatDate(booking.date)}
                          </div>
                        </div>
                      </div>
                      <span style={{
                        padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem',
                        fontWeight: '600', background: statusInfo.bg, color: statusInfo.color,
                        display: 'flex', alignItems: 'center', gap: '5px'
                      }}>
                        {statusInfo.icon} {booking.status}
                      </span>
                    </div>
                  )
                })
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                  <FaCalendarAlt style={{ fontSize: '2rem', marginBottom: '10px', opacity: 0.3 }} />
                  <p>No bookings yet</p>
                  <Link to="/booking" style={{ color: '#4F46E5', fontWeight: '600' }}>Book your first wash →</Link>
                </div>
              )}
            </div>
          </>
        )}

        {/* ============ BOOKINGS TAB ============ */}
        {activeTab === 'bookings' && (
          <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ padding: '20px 25px', borderBottom: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: 0 }}>All Bookings ({bookings.length})</h3>
            </div>

            {bookings.length > 0 ? (
              bookings.map((booking) => {
                const statusInfo = getStatusBadge(booking.status)
                return (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      padding: '20px 25px', borderBottom: '1px solid #f1f5f9',
                      display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto',
                      gap: '20px', alignItems: 'center'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '50px', height: '50px', borderRadius: '12px',
                        background: '#f1f5f9', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: '#4F46E5', fontSize: '1.3rem'
                      }}>
                        {getVehicleIcon(booking.vehicleType)}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', textTransform: 'capitalize' }}>{booking.service}</div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                          {booking.vehicleType?.toUpperCase()} • {booking.vehicleNumber}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', fontSize: '0.9rem' }}>
                        <FaCalendarAlt /> {formatDate(booking.date)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', fontSize: '0.85rem', marginTop: '5px' }}>
                        <FaClock /> {booking.time}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', fontSize: '0.85rem' }}>
                      <FaMapMarkerAlt /> {booking.address?.substring(0, 30)}...
                    </div>

                    <span style={{
                      padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem',
                      fontWeight: '600', background: statusInfo.bg, color: statusInfo.color,
                      display: 'flex', alignItems: 'center', gap: '5px', textTransform: 'capitalize'
                    }}>
                      {statusInfo.icon} {booking.status}
                    </span>
                  </motion.div>
                )
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
                <FaCalendarAlt style={{ fontSize: '3rem', marginBottom: '15px', opacity: 0.3 }} />
                <h3>No Bookings Yet</h3>
                <p>Book your first car wash!</p>
                <Link to="/booking" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 25px', background: '#4F46E5', color: 'white',
                  borderRadius: '10px', textDecoration: 'none', fontWeight: '600', marginTop: '15px'
                }}>
                  Book Now <FaArrowRight />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ============ SUBSCRIPTION TAB ============ */}
        {activeTab === 'subscription' && (
          <>
            {/* Active Plan */}
            {subscriptions.filter(s => s.status === 'active').map((sub) => {
              const planInfo = getPlanDetails(sub.plan)
              const daysLeft = getDaysRemaining(sub.endDate)
              const progress = getProgress(sub.startDate, sub.endDate)

              return (
                <motion.div
                  key={sub._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'white', borderRadius: '20px',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.08)', overflow: 'hidden', marginBottom: '25px'
                  }}
                >
                  {/* Plan Header */}
                  <div style={{
                    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                    padding: '30px', color: 'white'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '1.5rem' }}>{planInfo.icon}</span>
                          <h2 style={{ margin: 0 }}>{planInfo.name}</h2>
                          <span style={{
                            padding: '3px 10px', background: 'rgba(255,255,255,0.2)',
                            borderRadius: '20px', fontSize: '0.8rem'
                          }}>
                            Active
                          </span>
                        </div>
                        <p style={{ opacity: 0.9 }}>₹{sub.amount}/{sub.billingCycle || 'month'}</p>
                      </div>
                      <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', padding: '15px 25px', borderRadius: '15px' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{daysLeft}</div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Days Remaining</div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div style={{ marginTop: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', opacity: 0.9, marginBottom: '8px' }}>
                        <span>{formatDate(sub.startDate)}</span>
                        <span>{formatDate(sub.endDate)}</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1 }}
                          style={{
                            height: '100%', borderRadius: '10px',
                            background: daysLeft <= 7 ? '#EF4444' : daysLeft <= 15 ? '#F59E0B' : 'white'
                          }}
                        />
                      </div>
                      {daysLeft <= 7 && (
                        <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#FEF3C7' }}>
                          ⚠️ Your plan expires soon! Renew to continue services.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Plan Details */}
                  <div style={{ padding: '25px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '5px' }}>Vehicle</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                          {getVehicleIcon(sub.vehicleType)} {sub.vehicleType?.toUpperCase()} • {sub.vehicleNumber}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '5px' }}>Preferred Time</div>
                        <div style={{ fontWeight: '600' }}>{sub.preferredTime || 'Not set'}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '5px' }}>Services Done</div>
                        <div style={{ fontWeight: '600' }}>{sub.servicesCompleted || 0} washes</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '5px' }}>Auto-Renew</div>
                        <div style={{ fontWeight: '600', color: sub.autoRenew ? '#10B981' : '#EF4444' }}>
                          {sub.autoRenew ? '✅ Enabled' : '❌ Disabled'}
                        </div>
                      </div>
                    </div>

                    {/* Plan Features */}
                    <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '12px' }}>
                      <h4 style={{ marginBottom: '10px', color: '#1e293b' }}>Plan Features</h4>
                      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        {planInfo.features.map((feature, i) => (
                          <span key={i} style={{
                            display: 'flex', alignItems: 'center', gap: '5px',
                            color: '#059669', fontSize: '0.9rem'
                          }}>
                            <FaCheck /> {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Renew Button */}
                    {daysLeft <= 15 && (
                      <button
                        onClick={() => handleRenew(sub)}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                          width: '100%', padding: '14px', marginTop: '20px',
                          background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                          color: 'white', border: 'none', borderRadius: '12px',
                          fontSize: '1rem', fontWeight: '600', cursor: 'pointer'
                        }}
                      >
                        <FaRedo /> Renew Plan
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}

            {/* Expired Plans */}
            {subscriptions.filter(s => s.status === 'expired' || s.status === 'cancelled').length > 0 && (
              <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <div style={{ padding: '20px 25px', borderBottom: '1px solid #e2e8f0' }}>
                  <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaHistory /> Past Subscriptions
                  </h3>
                </div>
                {subscriptions.filter(s => s.status !== 'active').map((sub) => (
                  <div key={sub._id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '15px 25px', borderBottom: '1px solid #f1f5f9'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', textTransform: 'capitalize' }}>
                        {getPlanDetails(sub.plan).icon} {sub.plan} Plan
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        {formatDate(sub.startDate)} → {formatDate(sub.endDate)}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        ...getStatusBadge(sub.status),
                        padding: '5px 12px', borderRadius: '20px',
                        fontSize: '0.8rem', fontWeight: '600',
                        background: getStatusBadge(sub.status).bg,
                        color: getStatusBadge(sub.status).color
                      }}>
                        {sub.status}
                      </span>
                      <button
                        onClick={() => handleRenew(sub)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '5px',
                          padding: '8px 15px', background: '#4F46E5', color: 'white',
                          border: 'none', borderRadius: '8px', cursor: 'pointer',
                          fontSize: '0.85rem', fontWeight: '500'
                        }}
                      >
                        <FaRedo /> Reactivate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Subscriptions */}
            {subscriptions.length === 0 && (
              <div style={{
                background: 'white', borderRadius: '20px', padding: '60px',
                textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                <FaCrown style={{ fontSize: '4rem', color: '#e2e8f0', marginBottom: '20px' }} />
                <h3 style={{ color: '#1e293b', marginBottom: '10px' }}>No Subscription Plan</h3>
                <p style={{ color: '#64748b', marginBottom: '25px' }}>
                  Subscribe to a plan and enjoy regular washes at discounted rates!
                </p>
                <Link to="/pricing" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 30px', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  color: 'white', borderRadius: '12px', textDecoration: 'none', fontWeight: '600'
                }}>
                  Browse Plans <FaArrowRight />
                </Link>
              </div>
            )}
          </>
        )}

        {/* ============ PROFILE TAB ============ */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'white', borderRadius: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden'
            }}
          >
            {/* Profile Header */}
            <div style={{
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              padding: '40px', textAlign: 'center', color: 'white'
            }}>
              <div style={{
                width: '90px', height: '90px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 15px', fontSize: '2.5rem', fontWeight: '700'
              }}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <h2 style={{ margin: '0 0 5px' }}>{user?.name}</h2>
              <p style={{ opacity: 0.9 }}>Member since {formatDate(user?.createdAt || new Date())}</p>
            </div>

            {/* Profile Form */}
            <div style={{ padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h3 style={{ margin: 0 }}>Personal Information</h3>
                <button
                  onClick={() => setEditMode(!editMode)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    padding: '8px 16px', background: editMode ? '#FEE2E2' : '#f1f5f9',
                    color: editMode ? '#DC2626' : '#4F46E5',
                    border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500'
                  }}
                >
                  {editMode ? <><FaTimes /> Cancel</> : <><FaEdit /> Edit</>}
                </button>
              </div>

              <div style={{ display: 'grid', gap: '20px' }}>
                {[
                  { label: 'Full Name', name: 'name', icon: <FaUser />, value: profileData.name },
                  { label: 'Email', name: 'email', icon: <FaEnvelope />, value: profileData.email },
                  { label: 'Phone', name: 'phone', icon: <FaPhoneAlt />, value: profileData.phone }
                ].map((field) => (
                  <div key={field.name}>
                    <label style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      marginBottom: '8px', fontWeight: '600', color: '#334155', fontSize: '0.95rem'
                    }}>
                      {field.icon} {field.label}
                    </label>
                    <input
                      type={field.name === 'email' ? 'email' : 'text'}
                      name={field.name}
                      value={field.value}
                      onChange={(e) => setProfileData({ ...profileData, [field.name]: e.target.value })}
                      disabled={!editMode}
                      style={{
                        width: '100%', padding: '14px 16px',
                        border: '2px solid #e2e8f0', borderRadius: '12px',
                        fontSize: '1rem', outline: 'none',
                        background: editMode ? 'white' : '#f8fafc',
                        color: '#1e293b', opacity: editMode ? 1 : 0.8
                      }}
                    />
                  </div>
                ))}

                {editMode && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => {
                      toast.success('Profile updated successfully!')
                      setEditMode(false)
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      padding: '14px', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                      color: 'white', border: 'none', borderRadius: '12px',
                      fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '10px'
                    }}
                  >
                    <FaSave /> Save Changes
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Dashboard;