import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaCar, FaUsers, FaCalendarAlt, FaMoneyBillWave,
  FaClipboardList, FaSignOutAlt, FaHome, FaEnvelope,
  FaCheck, FaClock, FaTimes, FaEye, FaTrash,
  FaChartLine, FaSearch, FaFilter, FaStar,
  FaMotorcycle, FaTruckPickup, FaPhoneAlt,
  FaMapMarkerAlt, FaBars, FaTimes as FaClose,
  FaSync, FaCrown, FaRocket
} from 'react-icons/fa'
import { useAdmin } from '../context/AdminContext'
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const { admin, adminLogout } = useAdmin()
  const navigate = useNavigate()

  // States
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [bookings, setBookings] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [contacts, setContacts] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [newStatus, setNewStatus] = useState('')

  // Fetch data
  useEffect(() => {
    fetchAllData()
  }, [])

  // Stats
const stats = {
  totalBookings: bookings.length,
  pendingBookings: bookings.filter(b => b.status === 'pending').length,
  completedBookings: bookings.filter(b => b.status === 'completed').length,
  cancelledBookings: bookings.filter(b => b.status === 'cancelled').length,
  confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
  totalSubscriptions: subscriptions.length,
  activeSubscriptions: subscriptions.filter(s => s.status === 'active').length,
  totalContacts: contacts.length,
  newContacts: contacts.filter(c => c.status === 'new').length,
  revenue: bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + (b.amount || 0), 0)
}

// Filter bookings
const filteredBookings = bookings.filter(booking => {
  const matchesSearch = searchQuery === '' ||
    booking.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.phone?.includes(searchQuery) ||
    booking.vehicleNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
  return matchesSearch && matchesStatus
})
  const fetchAllData = async () => {
  setLoading(true)
  try {
    const [bookingsRes, subsRes, contactsRes] = await Promise.all([
      axios.get(`${API}/api/bookings`).catch(() => ({ data: { bookings: [] } })),
      axios.get(`${API}/api/subscriptions`).catch(() => ({ data: { subscriptions: [] } })),
      axios.get(`${API}/api/contact`).catch(() => ({ data: { contacts: [] } }))
    ])
    setBookings(bookingsRes.data.bookings || [])
    setSubscriptions(subsRes.data.subscriptions || [])
    setContacts(contactsRes.data.contacts || [])
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    setLoading(false)
  }
}

const updateBookingStatus = async (id, status) => {
  try {
    await axios.patch(`${API}/api/bookings/${id}`, { status })
    fetchAllData()
    setShowModal(false)
  } catch (error) {
    console.error('Error updating status:', error)
  }
}

const deleteBooking = async (id) => {
  if (window.confirm('Are you sure?')) {
    try {
      await axios.delete(`${API}/api/bookings/${id}`)
      fetchAllData()
    } catch (error) {
      console.error('Error deleting booking:', error)
    }
  }
}

const deleteContact = async (id) => {
  if (window.confirm('Are you sure?')) {
    try {
      await axios.delete(`${API}/api/contact/${id}`)
      fetchAllData()
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }
}

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Status badge
  const getStatusStyle = (status) => {
    const styles = {
      pending: { bg: '#FEF3C7', color: '#D97706', label: 'Pending' },
      confirmed: { bg: '#DBEAFE', color: '#2563EB', label: 'Confirmed' },
      'in-progress': { bg: '#E0E7FF', color: '#4F46E5', label: 'In Progress' },
      completed: { bg: '#D1FAE5', color: '#059669', label: 'Completed' },
      cancelled: { bg: '#FEE2E2', color: '#DC2626', label: 'Cancelled' },
      active: { bg: '#D1FAE5', color: '#059669', label: 'Active' },
      expired: { bg: '#FEE2E2', color: '#DC2626', label: 'Expired' },
      new: { bg: '#DBEAFE', color: '#2563EB', label: 'New' },
      read: { bg: '#F3F4F6', color: '#6B7280', label: 'Read' },
      replied: { bg: '#D1FAE5', color: '#059669', label: 'Replied' }
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

  // Handle logout
  const handleLogout = () => {
    adminLogout()
    navigate('/admin/login')
  }

  // Styles
  const s = {
    layout: {
      display: 'flex',
      minHeight: '100vh',
      background: '#f1f5f9',
      fontFamily: "'Poppins', sans-serif"
    },
    sidebar: {
      width: sidebarOpen ? '260px' : '0px',
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      color: 'white',
      transition: 'all 0.3s',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column'
    },
    sidebarHeader: {
      padding: '25px 20px',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    sidebarLogo: {
      fontSize: '1.5rem',
      fontWeight: '700'
    },
    navItem: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 20px',
      color: isActive ? '#818cf8' : 'rgba(255,255,255,0.7)',
      background: isActive ? 'rgba(79,70,229,0.15)' : 'transparent',
      border: 'none',
      width: '100%',
      textAlign: 'left',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: isActive ? '600' : '400',
      transition: 'all 0.3s',
      borderLeft: isActive ? '3px solid #818cf8' : '3px solid transparent'
    }),
    main: {
      flex: 1,
      marginLeft: sidebarOpen ? '260px' : '0',
      transition: 'margin-left 0.3s',
      padding: '20px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 25px',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      marginBottom: '25px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginBottom: '25px'
    },
    statCard: (color) => ({
      background: 'white',
      padding: '25px',
      borderRadius: '16px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      borderLeft: `4px solid ${color}`
    }),
    statIcon: (color) => ({
      width: '55px',
      height: '55px',
      borderRadius: '12px',
      background: `${color}15`,
      color: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem'
    }),
    statValue: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#1e293b'
    },
    statLabel: {
      color: '#64748b',
      fontSize: '0.9rem'
    },
    tableContainer: {
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      overflow: 'hidden'
    },
    tableHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 25px',
      borderBottom: '1px solid #e2e8f0',
      flexWrap: 'wrap',
      gap: '15px'
    },
    searchBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: '#f8fafc',
      padding: '10px 15px',
      borderRadius: '10px',
      border: '1px solid #e2e8f0'
    },
    searchInput: {
      border: 'none',
      background: 'transparent',
      outline: 'none',
      fontSize: '0.9rem',
      width: '200px'
    },
    filterSelect: {
      padding: '10px 15px',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      background: '#f8fafc',
      fontSize: '0.9rem',
      outline: 'none',
      cursor: 'pointer'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      padding: '15px 20px',
      textAlign: 'left',
      background: '#f8fafc',
      color: '#64748b',
      fontWeight: '600',
      fontSize: '0.85rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    td: {
      padding: '15px 20px',
      borderBottom: '1px solid #f1f5f9',
      color: '#334155',
      fontSize: '0.9rem'
    },
    statusBadge: (status) => {
      const style = getStatusStyle(status)
      return {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '600',
        background: style.bg,
        color: style.color
      }
    },
    actionBtn: (color) => ({
      padding: '8px',
      border: 'none',
      borderRadius: '8px',
      background: `${color}15`,
      color: color,
      cursor: 'pointer',
      fontSize: '0.9rem',
      margin: '0 3px',
      transition: 'all 0.3s'
    }),
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      background: 'white',
      padding: '30px',
      borderRadius: '20px',
      width: '90%',
      maxWidth: '600px',
      maxHeight: '80vh',
      overflow: 'auto',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
    },
    refreshBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      background: '#4F46E5',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500'
    },
    noData: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#64748b'
    },
    contactCard: {
      background: '#f8fafc',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '15px',
      border: '1px solid #e2e8f0'
    }
  }

  return (
    <div style={s.layout}>
      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={s.sidebarHeader}>
          <FaCar style={{ fontSize: '1.8rem', color: '#818cf8' }} />
          <span style={s.sidebarLogo}>WashOnWheels</span>
        </div>

        <nav style={{ flex: 1, padding: '15px 0' }}>
          {[
            { id: 'dashboard', icon: <FaHome />, label: 'Dashboard' },
            { id: 'bookings', icon: <FaClipboardList />, label: 'Bookings' },
            { id: 'subscriptions', icon: <FaCrown />, label: 'Subscriptions' },
            { id: 'contacts', icon: <FaEnvelope />, label: 'Messages' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={s.navItem(activeTab === item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.id === 'bookings' && stats.pendingBookings > 0 && (
                <span style={{
                  marginLeft: 'auto',
                  background: '#ef4444',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontSize: '0.75rem'
                }}>
                  {stats.pendingBookings}
                </span>
              )}
              {item.id === 'contacts' && stats.newContacts > 0 && (
                <span style={{
                  marginLeft: 'auto',
                  background: '#3b82f6',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontSize: '0.75rem'
                }}>
                  {stats.newContacts}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#4F46E5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700'
            }}>
              {admin?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{admin?.name || 'Admin'}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Super Admin</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 15px',
              background: 'rgba(239,68,68,0.15)',
              color: '#ef4444',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '0.9rem'
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={s.main}>
        {/* Header */}
        <div style={s.header}>
          <div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b', marginRight: '15px' }}
            >
              <FaBars />
            </button>
            <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b' }}>
              {activeTab === 'dashboard' && '📊 Dashboard'}
              {activeTab === 'bookings' && '📋 Bookings'}
              {activeTab === 'subscriptions' && '👑 Subscriptions'}
              {activeTab === 'contacts' && '📨 Messages'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={fetchAllData} style={s.refreshBtn}>
              <FaSync /> Refresh
            </button>
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: '#f1f5f9',
              color: '#64748b',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '0.9rem'
            }}>
              <FaHome /> View Site
            </Link>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#4F46E5' }}>
            Loading data...
          </div>
        )}

        {/* ============ DASHBOARD TAB ============ */}
        {activeTab === 'dashboard' && !loading && (
          <>
            <div style={s.statsGrid}>
              {[
                { label: 'Total Bookings', value: stats.totalBookings, icon: <FaClipboardList />, color: '#4F46E5' },
                { label: 'Pending', value: stats.pendingBookings, icon: <FaClock />, color: '#F59E0B' },
                { label: 'Completed', value: stats.completedBookings, icon: <FaCheck />, color: '#10B981' },
                { label: 'Revenue', value: `₹${stats.revenue}`, icon: <FaMoneyBillWave />, color: '#059669' },
                { label: 'Active Subs', value: stats.activeSubscriptions, icon: <FaCrown />, color: '#8B5CF6' },
                { label: 'Total Subs', value: stats.totalSubscriptions, icon: <FaRocket />, color: '#3B82F6' },
                { label: 'Messages', value: stats.totalContacts, icon: <FaEnvelope />, color: '#EC4899' },
                { label: 'New Messages', value: stats.newContacts, icon: <FaStar />, color: '#EF4444' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  style={s.statCard(stat.color)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div style={s.statIcon(stat.color)}>{stat.icon}</div>
                  <div>
                    <div style={s.statValue}>{stat.value}</div>
                    <div style={s.statLabel}>{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div style={s.tableContainer}>
              <div style={s.tableHeader}>
                <h3 style={{ margin: 0, color: '#1e293b' }}>Recent Bookings</h3>
                <button onClick={() => setActiveTab('bookings')} style={{ color: '#4F46E5', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
                  View All →
                </button>
              </div>
              {bookings.length > 0 ? (
                <table style={s.table}>
                  <thead>
                    <tr>
                      <th style={s.th}>Customer</th>
                      <th style={s.th}>Vehicle</th>
                      <th style={s.th}>Service</th>
                      <th style={s.th}>Date</th>
                      <th style={s.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((booking) => (
                      <tr key={booking._id}>
                        <td style={s.td}>
                          <div style={{ fontWeight: '600' }}>{booking.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{booking.phone}</div>
                        </td>
                        <td style={s.td}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {getVehicleIcon(booking.vehicleType)}
                            <span>{booking.vehicleNumber}</span>
                          </div>
                        </td>
                        <td style={s.td}>{booking.service}</td>
                        <td style={s.td}>{formatDate(booking.date)}</td>
                        <td style={s.td}>
                          <span style={s.statusBadge(booking.status)}>
                            {getStatusStyle(booking.status).label}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={s.noData}>
                  <FaClipboardList style={{ fontSize: '3rem', marginBottom: '15px', opacity: 0.3 }} />
                  <p>No bookings yet</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* ============ BOOKINGS TAB ============ */}
        {activeTab === 'bookings' && !loading && (
          <div style={s.tableContainer}>
            <div style={s.tableHeader}>
              <h3 style={{ margin: 0 }}>All Bookings ({filteredBookings.length})</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <div style={s.searchBox}>
                  <FaSearch style={{ color: '#94a3b8' }} />
                  <input
                    type="text"
                    placeholder="Search name, phone, vehicle..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={s.searchInput}
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={s.filterSelect}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {filteredBookings.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={s.table}>
                  <thead>
                    <tr>
                      <th style={s.th}>Customer</th>
                      <th style={s.th}>Phone</th>
                      <th style={s.th}>Vehicle</th>
                      <th style={s.th}>Service</th>
                      <th style={s.th}>Date & Time</th>
                      <th style={s.th}>Address</th>
                      <th style={s.th}>Status</th>
                      <th style={s.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking._id}>
                        <td style={s.td}>
                          <div style={{ fontWeight: '600' }}>{booking.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{booking.email}</div>
                        </td>
                        <td style={s.td}>{booking.phone}</td>
                        <td style={s.td}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {getVehicleIcon(booking.vehicleType)}
                            <div>
                              <div style={{ fontWeight: '500', textTransform: 'capitalize' }}>{booking.vehicleType}</div>
                              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{booking.vehicleNumber}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ ...s.td, textTransform: 'capitalize' }}>{booking.service}</td>
                        <td style={s.td}>
                          <div>{formatDate(booking.date)}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{booking.time}</div>
                        </td>
                        <td style={s.td}>
                          <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {booking.address}
                          </div>
                        </td>
                        <td style={s.td}>
                          <span style={s.statusBadge(booking.status)}>
                            {getStatusStyle(booking.status).label}
                          </span>
                        </td>
                        <td style={s.td}>
                          <button
                            style={s.actionBtn('#4F46E5')}
                            title="View/Edit"
                            onClick={() => {
                              setSelectedBooking(booking)
                              setNewStatus(booking.status)
                              setShowModal(true)
                            }}
                          >
                            <FaEye />
                          </button>
                          <button
                            style={s.actionBtn('#EF4444')}
                            title="Delete"
                            onClick={() => deleteBooking(booking._id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={s.noData}>
                <FaClipboardList style={{ fontSize: '3rem', marginBottom: '15px', opacity: 0.3 }} />
                <h3>No Bookings Found</h3>
                <p>No bookings match your search criteria</p>
              </div>
            )}
          </div>
        )}

        {/* ============ SUBSCRIPTIONS TAB ============ */}
        {activeTab === 'subscriptions' && !loading && (
          <div style={s.tableContainer}>
            <div style={s.tableHeader}>
              <h3 style={{ margin: 0 }}>All Subscriptions ({subscriptions.length})</h3>
            </div>

            {subscriptions.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={s.table}>
                  <thead>
                    <tr>
                      <th style={s.th}>Customer</th>
                      <th style={s.th}>Phone</th>
                      <th style={s.th}>Plan</th>
                      <th style={s.th}>Vehicle</th>
                      <th style={s.th}>Amount</th>
                      <th style={s.th}>Start Date</th>
                      <th style={s.th}>End Date</th>
                      <th style={s.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((sub) => (
                      <tr key={sub._id}>
                        <td style={s.td}>
                          <div style={{ fontWeight: '600' }}>{sub.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{sub.email}</div>
                        </td>
                        <td style={s.td}>{sub.phone}</td>
                        <td style={s.td}>
                          <span style={{
                            padding: '5px 12px',
                            borderRadius: '20px',
                            fontWeight: '600',
                            fontSize: '0.8rem',
                            textTransform: 'capitalize',
                            background: sub.plan === 'premium' ? '#FEF3C7' : sub.plan === 'business' ? '#E0E7FF' : '#F1F5F9',
                            color: sub.plan === 'premium' ? '#D97706' : sub.plan === 'business' ? '#4F46E5' : '#64748b'
                          }}>
                            {sub.plan === 'premium' && '👑 '}
                            {sub.plan === 'business' && '🚀 '}
                            {sub.plan}
                          </span>
                        </td>
                        <td style={{ ...s.td, textTransform: 'capitalize' }}>{sub.vehicleType}</td>
                        <td style={s.td}>
                          <span style={{ fontWeight: '700', color: '#059669' }}>₹{sub.amount}</span>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>/{sub.billingCycle}</div>
                        </td>
                        <td style={s.td}>{formatDate(sub.startDate)}</td>
                        <td style={s.td}>{formatDate(sub.endDate)}</td>
                        <td style={s.td}>
                          <span style={s.statusBadge(sub.status)}>
                            {getStatusStyle(sub.status).label}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={s.noData}>
                <FaCrown style={{ fontSize: '3rem', marginBottom: '15px', opacity: 0.3 }} />
                <h3>No Subscriptions Found</h3>
                <p>No subscriptions have been created yet</p>
              </div>
            )}
          </div>
        )}

        {/* ============ CONTACTS TAB ============ */}
        {activeTab === 'contacts' && !loading && (
          <div style={s.tableContainer}>
            <div style={s.tableHeader}>
              <h3 style={{ margin: 0 }}>Contact Messages ({contacts.length})</h3>
            </div>

            <div style={{ padding: '20px' }}>
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <div key={contact._id} style={s.contactCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                      <div>
                        <h4 style={{ margin: '0 0 5px', color: '#1e293b' }}>{contact.name}</h4>
                        <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: '#64748b' }}>
                          <span><FaPhoneAlt style={{ marginRight: '5px' }} />{contact.phone}</span>
                          <span><FaEnvelope style={{ marginRight: '5px' }} />{contact.email}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={s.statusBadge(contact.status)}>
                          {getStatusStyle(contact.status).label}
                        </span>
                        <button
                          style={s.actionBtn('#EF4444')}
                          onClick={() => deleteContact(contact._id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <strong style={{ color: '#334155' }}>Subject: </strong>
                      <span>{contact.subject}</span>
                    </div>
                    <div style={{
                      padding: '15px',
                      background: 'white',
                      borderRadius: '10px',
                      color: '#475569',
                      lineHeight: '1.6'
                    }}>
                      {contact.message}
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#94a3b8' }}>
                      Received: {formatDate(contact.createdAt)}
                    </div>
                  </div>
                ))
              ) : (
                <div style={s.noData}>
                  <FaEnvelope style={{ fontSize: '3rem', marginBottom: '15px', opacity: 0.3 }} />
                  <h3>No Messages</h3>
                  <p>No contact messages received yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ============ BOOKING DETAIL MODAL ============ */}
      {showModal && selectedBooking && (
        <div style={s.modal} onClick={() => setShowModal(false)}>
          <motion.div
            style={s.modalContent}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0 }}>Booking Details</h2>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}
              >
                <FaClose />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
              {[
                { label: 'Customer', value: selectedBooking.name },
                { label: 'Phone', value: selectedBooking.phone },
                { label: 'Email', value: selectedBooking.email || 'N/A' },
                { label: 'Vehicle Type', value: selectedBooking.vehicleType },
                { label: 'Vehicle Number', value: selectedBooking.vehicleNumber },
                { label: 'Service', value: selectedBooking.service },
                { label: 'Date', value: formatDate(selectedBooking.date) },
                { label: 'Time', value: selectedBooking.time }
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '5px' }}>{item.label}</div>
                  <div style={{ fontWeight: '600', color: '#1e293b', textTransform: 'capitalize' }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '5px' }}>Address</div>
              <div style={{ fontWeight: '500', color: '#1e293b' }}>
                <FaMapMarkerAlt style={{ marginRight: '5px', color: '#EF4444' }} />
                {selectedBooking.address}
              </div>
            </div>

            {selectedBooking.notes && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '5px' }}>Notes</div>
                <div style={{ color: '#1e293b' }}>{selectedBooking.notes}</div>
              </div>
            )}

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '10px', color: '#334155' }}>
                Update Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '12px 25px',
                  background: '#f1f5f9',
                  color: '#64748b',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => updateBookingStatus(selectedBooking._id, newStatus)}
                style={{
                  padding: '12px 25px',
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Update Status
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard;