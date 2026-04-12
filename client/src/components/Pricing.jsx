import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCheck, FaCrown, FaStar, FaRocket, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true)
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Subscription form
  const [formData, setFormData] = useState({
    vehicleType: 'car',
    vehicleNumber: '',
    address: '',
    preferredTime: '',
    notes: ''
  })

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      icon: <FaStar />,
      monthlyPrice: 800,
      yearlyPrice: 7500,
      description: 'Perfect for occasional car care',
      features: [
        'Alternate day exterior wash',
        'Tyre cleaning included',
        'WhatsApp support',
        'Free cancellation',
        'Service tracking'
      ],
      notIncluded: [
        'Interior cleaning',
        'Wax polish',
        'Priority booking'
      ],
      color: '#64748b',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: <FaCrown />,
      monthlyPrice: 1500,
      yearlyPrice: 14000,
      description: 'Most popular choice for car owners',
      features: [
        'Daily exterior wash',
        'Interior cleaning (2x/month)',
        'Wax polish (1x/month)',
        'Priority booking',
        'Dedicated cleaner',
        '24/7 WhatsApp support',
        'Free rescheduling'
      ],
      notIncluded: [],
      color: '#4F46E5',
      popular: true
    },
    {
      id: 'business',
      name: 'Business',
      icon: <FaRocket />,
      monthlyPrice: 5000,
      yearlyPrice: 48000,
      description: 'Ideal for fleet owners & offices',
      features: [
        'Up to 5 vehicles covered',
        'Daily wash for all vehicles',
        'Full detailing (4x/month)',
        'On-site supervisor',
        'Invoice & GST billing',
        'Dedicated account manager',
        'Custom scheduling',
        'Emergency support'
      ],
      notIncluded: [],
      color: '#10B981',
      popular: false
    }
  ]

  const timeSlots = [
    '6:00 AM - 8:00 AM',
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM'
  ]

  // Handle plan selection
  const handleSelectPlan = (plan) => {
    if (!isAuthenticated) {
      toast.warning('⚠️ Please login first to subscribe')
      navigate('/login', { state: { from: '/pricing' } })
      return
    }

    setSelectedPlan(plan)
    setShowModal(true)
    setFormData({
      vehicleType: 'car',
      vehicleNumber: '',
      address: '',
      preferredTime: '',
      notes: ''
    })
  }

  // Handle subscription submit
  const handleSubscribe = async (e) => {
    e.preventDefault()

    if (!formData.vehicleNumber || !formData.address) {
      toast.warning('Please fill all required fields')
      return
    }

    setLoading(true)

    try {
      const price = isMonthly
        ? selectedPlan.monthlyPrice
        : selectedPlan.yearlyPrice

      const startDate = new Date()
      const endDate = new Date()
      if (isMonthly) {
        endDate.setMonth(endDate.getMonth() + 1)
      } else {
        endDate.setFullYear(endDate.getFullYear() + 1)
      }

      const subscriptionData = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        plan: selectedPlan.id,
        billingCycle: isMonthly ? 'monthly' : 'yearly',
        vehicleType: formData.vehicleType,
        vehicleNumber: formData.vehicleNumber.toUpperCase(),
        amount: price,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        address: formData.address,
        preferredTime: formData.preferredTime,
        notes: formData.notes,
        status: 'active',
        autoRenew: false
      }

      await axios.post(
        'http://localhost:5000/api/subscriptions',
        subscriptionData
      )

      toast.success(`🎉 Successfully subscribed to ${selectedPlan.name} Plan!`)
      setShowModal(false)
      setSelectedPlan(null)

      // Redirect to dashboard
      navigate('/my-dashboard')
    } catch (error) {
      console.error('Subscription error:', error)
      toast.error(
        error.response?.data?.message || 'Subscription failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      style={{ padding: '100px 5%', background: 'white' }}
      id="pricing"
      ref={ref}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '60px' }}
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span style={{
            display: 'inline-block',
            padding: '8px 20px',
            background: 'rgba(79, 70, 229, 0.1)',
            color: '#4F46E5',
            borderRadius: '30px',
            fontSize: '0.9rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Pricing Plans
          </span>
          <h2 style={{ fontSize: '2.8rem', color: '#1e293b', margin: '15px 0' }}>
            Choose Your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Subscription
            </span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '30px' }}>
            Save more with our monthly subscription plans. Cancel anytime!
          </p>

          {/* Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px'
          }}>
            <span style={{
              fontWeight: '600',
              color: isMonthly ? '#4F46E5' : '#64748b'
            }}>
              Monthly
            </span>
            <div
              onClick={() => setIsMonthly(!isMonthly)}
              style={{
                width: '60px',
                height: '30px',
                background: '#e2e8f0',
                borderRadius: '50px',
                position: 'relative',
                cursor: 'pointer'
              }}
            >
              <motion.div
                animate={{ x: isMonthly ? 2 : 32 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{
                  width: '26px',
                  height: '26px',
                  background: '#4F46E5',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
              />
            </div>
            <span style={{
              fontWeight: '600',
              color: !isMonthly ? '#4F46E5' : '#64748b'
            }}>
              Yearly{' '}
              <span style={{
                background: '#10B981',
                color: 'white',
                padding: '3px 8px',
                borderRadius: '5px',
                fontSize: '0.75rem'
              }}>
                Save 20%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              style={{
                background: 'white',
                border: `2px solid ${plan.popular ? '#4F46E5' : '#e2e8f0'}`,
                borderRadius: '20px',
                padding: '40px 30px',
                position: 'relative',
                boxShadow: plan.popular
                  ? '0 20px 60px rgba(79, 70, 229, 0.2)'
                  : '0 5px 20px rgba(0,0,0,0.05)',
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s'
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '30px',
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  color: 'white',
                  padding: '8px 20px',
                  borderRadius: '50px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  boxShadow: '0 5px 15px rgba(79, 70, 229, 0.3)'
                }}>
                  🔥 Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: `${plan.color}15`,
                  color: plan.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '2rem'
                }}>
                  {plan.icon}
                </div>
                <h3 style={{ fontSize: '1.8rem', color: '#1e293b', marginBottom: '10px' }}>
                  {plan.name}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div style={{ textAlign: 'center', margin: '30px 0' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMonthly ? 'monthly' : 'yearly'}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem', color: '#64748b' }}>₹</span>
                    <span style={{ fontSize: '3.5rem', fontWeight: '800', color: '#4F46E5' }}>
                      {isMonthly ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '1.1rem' }}>
                      /{isMonthly ? 'month' : 'year'}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Features */}
              <ul style={{ listStyle: 'none', margin: '30px 0', padding: 0 }}>
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 0',
                      color: '#475569'
                    }}
                  >
                    <FaCheck style={{ color: plan.color, fontSize: '0.9rem', flexShrink: 0 }} />
                    {feature}
                  </motion.li>
                ))}
                {plan.notIncluded.map((feature, i) => (
                  <li
                    key={`not-${i}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 0',
                      color: '#cbd5e1',
                      textDecoration: 'line-through'
                    }}
                  >
                    <FaTimes style={{ color: '#e2e8f0', fontSize: '0.9rem' }} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Subscribe Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelectPlan(plan)}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: plan.popular ? 'none' : `2px solid ${plan.color}`,
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  background: plan.popular
                    ? `linear-gradient(135deg, ${plan.color}, #7C3AED)`
                    : 'transparent',
                  color: plan.popular ? 'white' : plan.color,
                  transition: 'all 0.3s'
                }}
              >
                {isAuthenticated ? 'Subscribe Now' : 'Login & Subscribe'}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          style={{ textAlign: 'center', marginTop: '50px' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p style={{ color: '#64748b' }}>
            All plans include free cancellation within 24 hours. No hidden fees!
          </p>
        </motion.div>
      </div>

      {/* ============ SUBSCRIPTION MODAL ============ */}
      <AnimatePresence>
        {showModal && selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
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
                maxWidth: '550px',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
              }}
            >
              {/* Modal Header */}
              <div style={{
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                padding: '30px',
                color: 'white',
                borderRadius: '24px 24px 0 0'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '8px'
                    }}>
                      {selectedPlan.icon}
                      <h2 style={{ margin: 0, fontSize: '1.5rem' }}>
                        {selectedPlan.name} Plan
                      </h2>
                    </div>
                    <p style={{ opacity: 0.9 }}>
                      ₹{isMonthly ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice}
                      /{isMonthly ? 'month' : 'year'}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: 'none',
                      color: 'white',
                      width: '40px',
                      height: '40px',
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
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubscribe} style={{ padding: '30px' }}>
                {/* User Info */}
                <div style={{
                  padding: '15px',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  marginBottom: '25px'
                }}>
                  <p style={{ margin: '0 0 5px', fontWeight: '600', color: '#1e293b' }}>
                    {user?.name}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
                    {user?.email} • {user?.phone}
                  </p>
                </div>

                {/* Vehicle Type */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#334155'
                  }}>
                    Vehicle Type *
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px'
                  }}>
                    {['bike', 'car', 'suv'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, vehicleType: type })}
                        style={{
                          padding: '12px',
                          border: `2px solid ${formData.vehicleType === type ? '#4F46E5' : '#e2e8f0'}`,
                          borderRadius: '10px',
                          background: formData.vehicleType === type
                            ? 'rgba(79,70,229,0.05)'
                            : 'white',
                          cursor: 'pointer',
                          fontWeight: '600',
                          color: formData.vehicleType === type ? '#4F46E5' : '#64748b',
                          textTransform: 'capitalize',
                          transition: 'all 0.3s'
                        }}
                      >
                        {type === 'bike' ? '🏍️' : type === 'car' ? '🚗' : '🚙'} {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vehicle Number */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#334155'
                  }}>
                    Vehicle Number *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., KA 01 AB 1234"
                    value={formData.vehicleNumber}
                    onChange={(e) => setFormData({
                      ...formData,
                      vehicleNumber: e.target.value
                    })}
                    required
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      textTransform: 'uppercase'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                {/* Address */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#334155'
                  }}>
                    Service Address *
                  </label>
                  <textarea
                    placeholder="Enter your complete address"
                    value={formData.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: e.target.value
                    })}
                    required
                    rows="3"
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
                    onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>

                {/* Preferred Time */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#334155'
                  }}>
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({
                      ...formData,
                      preferredTime: e.target.value
                    })}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Select preferred time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                {/* Notes */}
                <div style={{ marginBottom: '25px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#334155'
                  }}>
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    placeholder="Any special instructions..."
                    value={formData.notes}
                    onChange={(e) => setFormData({
                      ...formData,
                      notes: e.target.value
                    })}
                    rows="2"
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
                  />
                </div>

                {/* Order Summary */}
                <div style={{
                  padding: '20px',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  marginBottom: '25px'
                }}>
                  <h4 style={{ margin: '0 0 15px', color: '#1e293b' }}>
                    Order Summary
                  </h4>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    color: '#64748b'
                  }}>
                    <span>{selectedPlan.name} Plan ({isMonthly ? 'Monthly' : 'Yearly'})</span>
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>
                      ₹{isMonthly ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    color: '#64748b'
                  }}>
                    <span>Vehicle</span>
                    <span style={{ textTransform: 'capitalize' }}>
                      {formData.vehicleType} {formData.vehicleNumber && `- ${formData.vehicleNumber.toUpperCase()}`}
                    </span>
                  </div>
                  <div style={{
                    height: '1px',
                    background: '#e2e8f0',
                    margin: '15px 0'
                  }} />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: '700',
                    fontSize: '1.2rem',
                    color: '#1e293b'
                  }}>
                    <span>Total</span>
                    <span style={{ color: '#4F46E5' }}>
                      ₹{isMonthly ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '12px'
                }}>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
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
                      padding: '16px',
                      background: loading
                        ? '#94a3b8'
                        : 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {loading ? 'Processing...' : `Subscribe - ₹${isMonthly ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice}`}
                  </motion.button>
                </div>

                <p style={{
                  textAlign: 'center',
                  marginTop: '15px',
                  fontSize: '0.8rem',
                  color: '#94a3b8'
                }}>
                  🔒 Secure checkout • Cancel anytime
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Pricing;