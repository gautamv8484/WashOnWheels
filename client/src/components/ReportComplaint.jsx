import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  FaExclamationTriangle, FaTimes, FaPaperPlane,
  FaCheckCircle, FaClock, FaWrench, FaMoneyBillWave,
  FaUserTie, FaCalendarTimes, FaCreditCard, FaMobileAlt,
  FaLightbulb, FaQuestionCircle
} from 'react-icons/fa'
import axios from 'axios'

const ReportComplaint = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState({
    type: '',
    subject: '',
    description: '',
    bookingId: '',
    vehicleNumber: '',
    priority: 'medium'
  })

  const complaintTypes = [
    { id: 'service-quality', label: 'Poor Service Quality', icon: <FaWrench />, color: '#EF4444' },
    { id: 'late-arrival', label: 'Late Arrival', icon: <FaClock />, color: '#F59E0B' },
    { id: 'damage', label: 'Vehicle Damage', icon: <FaExclamationTriangle />, color: '#DC2626' },
    { id: 'billing', label: 'Billing Issue', icon: <FaMoneyBillWave />, color: '#8B5CF6' },
    { id: 'staff-behavior', label: 'Staff Behavior', icon: <FaUserTie />, color: '#EC4899' },
    { id: 'missed-service', label: 'Missed Service', icon: <FaCalendarTimes />, color: '#F97316' },
    { id: 'subscription-issue', label: 'Subscription Issue', icon: <FaCreditCard />, color: '#6366F1' },
    { id: 'app-issue', label: 'Website/App Issue', icon: <FaMobileAlt />, color: '#14B8A6' },
    { id: 'suggestion', label: 'Suggestion', icon: <FaLightbulb />, color: '#10B981' },
    { id: 'other', label: 'Other', icon: <FaQuestionCircle />, color: '#64748B' }
  ]

  const handleOpen = () => {
    if (!isAuthenticated) {
      toast.warning('⚠️ Please login first to submit a complaint')
      navigate('/login', { state: { from: '/' } })
      return
    }
    setShowForm(true)
    setSubmitted(false)
    setFormData({
      type: '',
      subject: '',
      description: '',
      bookingId: '',
      vehicleNumber: '',
      priority: 'medium'
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.type) {
      toast.warning('Please select complaint type')
      return
    }
    if (!formData.subject.trim()) {
      toast.warning('Please enter a subject')
      return
    }
    if (!formData.description.trim()) {
      toast.warning('Please describe your issue')
      return
    }

    setLoading(true)

    try {
      await axios.post('http://localhost:5000/api/complaints', {
        name: user.name,
        email: user.email,
        phone: user.phone,
        type: formData.type,
        subject: formData.subject,
        description: formData.description,
        bookingId: formData.bookingId,
        vehicleNumber: formData.vehicleNumber.toUpperCase(),
        priority: formData.priority
      })

      setSubmitted(true)
      toast.success('✅ Complaint submitted successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit complaint')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Report Section on Homepage */}
      <section ref={ref} style={{
        padding: '80px 5%',
        // background: 'linear-gradient(135deg, #FEF2F2, #FFF7ED)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <span style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#EF4444',
              borderRadius: '30px',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Report & Complaint
            </span>

            <h2 style={{ fontSize: '2.5rem', color: '#1e293b', margin: '15px 0' }}>
              Have an <span style={{
                background: 'linear-gradient(135deg, #EF4444, #F97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Issue?</span> Let Us Know
            </h2>

            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '30px', lineHeight: '1.8' }}>
              We take every complaint seriously. Report any issues with our service
              and we'll resolve them within 24 hours.
            </p>

            {/* Quick Stats */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              marginBottom: '35px',
              flexWrap: 'wrap'
            }}>
              {[
                { label: 'Avg Resolution', value: '< 24 hrs', icon: '⏱️' },
                { label: 'Resolution Rate', value: '98%', icon: '✅' },
                { label: 'Customer Satisfaction', value: '4.8/5', icon: '⭐' }
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{stat.icon}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e293b' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 40px',
                background: 'linear-gradient(135deg, #EF4444, #F97316)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)'
              }}
            >
              <FaExclamationTriangle /> Report an Issue
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ============ COMPLAINT MODAL ============ */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
            style={{
              position: 'fixed',
              top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'white',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '600px',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
              }}
            >
              {/* Success State */}
              {submitted ? (
                <div style={{ padding: '60px 30px', textAlign: 'center' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <FaCheckCircle style={{ fontSize: '4rem', color: '#10B981', marginBottom: '20px' }} />
                  </motion.div>
                  <h2 style={{ color: '#1e293b', marginBottom: '10px' }}>Complaint Submitted!</h2>
                  <p style={{ color: '#64748b', marginBottom: '25px', lineHeight: '1.7' }}>
                    Your complaint has been received. Our team will review it
                    and get back to you within 24 hours.
                  </p>
                  <p style={{
                    padding: '10px 20px',
                    background: '#F0FDF4',
                    color: '#059669',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    marginBottom: '25px',
                    display: 'inline-block'
                  }}>
                    📧 You'll receive updates via email and WhatsApp
                  </p>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button
                      onClick={() => setShowForm(false)}
                      style={{
                        padding: '12px 30px',
                        background: '#f1f5f9',
                        color: '#64748b',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Close
                    </button>
                    <button
                      onClick={() => navigate('/my-dashboard')}
                      style={{
                        padding: '12px 30px',
                        background: '#4F46E5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      View My Complaints
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Modal Header */}
                  <div style={{
                    background: 'linear-gradient(135deg, #EF4444, #F97316)',
                    padding: '25px 30px',
                    color: 'white',
                    borderRadius: '24px 24px 0 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h2 style={{ margin: '0 0 5px', fontSize: '1.4rem' }}>
                        <FaExclamationTriangle style={{ marginRight: '10px' }} />
                        Report an Issue
                      </h2>
                      <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem' }}>
                        We'll resolve it within 24 hours
                      </p>
                    </div>
                    <button
                      onClick={() => setShowForm(false)}
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        border: 'none',
                        color: 'white',
                        width: '40px', height: '40px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FaTimes />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} style={{ padding: '30px' }}>
                    {/* Complaint Type */}
                    <div style={{ marginBottom: '25px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '12px',
                        fontWeight: '600',
                        color: '#334155'
                      }}>
                        What's the issue? *
                      </label>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '10px'
                      }}>
                        {complaintTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, type: type.id })}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '12px 15px',
                              border: `2px solid ${formData.type === type.id ? type.color : '#e2e8f0'}`,
                              borderRadius: '10px',
                              background: formData.type === type.id ? `${type.color}10` : 'white',
                              cursor: 'pointer',
                              fontSize: '0.85rem',
                              fontWeight: formData.type === type.id ? '600' : '400',
                              color: formData.type === type.id ? type.color : '#64748b',
                              transition: 'all 0.3s',
                              textAlign: 'left'
                            }}
                          >
                            <span style={{ fontSize: '1.1rem' }}>{type.icon}</span>
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Priority */}
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '600',
                        color: '#334155'
                      }}>
                        Priority Level
                      </label>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {[
                          { id: 'low', label: 'Low', color: '#10B981' },
                          { id: 'medium', label: 'Medium', color: '#F59E0B' },
                          { id: 'high', label: 'High', color: '#F97316' },
                          { id: 'urgent', label: 'Urgent', color: '#EF4444' }
                        ].map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, priority: p.id })}
                            style={{
                              flex: 1,
                              padding: '10px',
                              border: `2px solid ${formData.priority === p.id ? p.color : '#e2e8f0'}`,
                              borderRadius: '10px',
                              background: formData.priority === p.id ? `${p.color}15` : 'white',
                              cursor: 'pointer',
                              fontWeight: formData.priority === p.id ? '600' : '400',
                              color: formData.priority === p.id ? p.color : '#64748b',
                              fontSize: '0.85rem',
                              transition: 'all 0.3s'
                            }}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Subject */}
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '600',
                        color: '#334155'
                      }}>
                        Subject *
                      </label>
                      <input
                        type="text"
                        placeholder="Brief description of the issue"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        maxLength={200}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#EF4444'}
                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                      />
                      <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#94a3b8', marginTop: '5px' }}>
                        {formData.subject.length}/200
                      </div>
                    </div>

                    {/* Description */}
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '600',
                        color: '#334155'
                      }}>
                        Describe the Issue *
                      </label>
                      <textarea
                        placeholder="Please provide detailed information about the issue..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        rows="4"
                        maxLength={2000}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          outline: 'none',
                          fontFamily: 'inherit',
                          resize: 'vertical'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#EF4444'}
                        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                      />
                      <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#94a3b8', marginTop: '5px' }}>
                        {formData.description.length}/2000
                      </div>
                    </div>

                    {/* Optional Fields */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontWeight: '600',
                          color: '#334155',
                          fontSize: '0.9rem'
                        }}>
                          Booking ID (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="Enter booking ID"
                          value={formData.bookingId}
                          onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '0.95rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontWeight: '600',
                          color: '#334155',
                          fontSize: '0.9rem'
                        }}>
                          Vehicle Number (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., KA01AB1234"
                          value={formData.vehicleNumber}
                          onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '2px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '0.95rem',
                            outline: 'none',
                            textTransform: 'uppercase'
                          }}
                        />
                      </div>
                    </div>

                    {/* User Info Preview */}
                    <div style={{
                      padding: '15px',
                      background: '#f8fafc',
                      borderRadius: '12px',
                      marginBottom: '25px'
                    }}>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '5px' }}>
                        Submitting as:
                      </div>
                      <div style={{ fontWeight: '600', color: '#1e293b' }}>
                        {user?.name} • {user?.phone} • {user?.email}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        style={{
                          flex: 1,
                          padding: '16px',
                          background: '#f1f5f9',
                          color: '#64748b',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          flex: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '16px',
                          background: loading
                            ? '#94a3b8'
                            : 'linear-gradient(135deg, #EF4444, #F97316)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {loading ? 'Submitting...' : <><FaPaperPlane /> Submit Complaint</>}
                      </motion.button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ReportComplaint;