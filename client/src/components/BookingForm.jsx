import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { toast } from 'react-toastify'
import { 
  FaCar, FaMotorcycle, FaTruckPickup, FaCalendarAlt, 
  FaClock, FaMapMarkerAlt, FaUser, FaPhone, FaCheck,
  FaLock, FaEnvelope
} from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import '../styles/booking.css'

const API_URL = import.meta.env.VITE_API_URL + '/api'

const BookingForm = () => {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()
  const serviceData = location.state || null

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleType: '',
    vehicleNumber: '',
    service: '',
    date: '',
    time: '',
    address: '',
    notes: ''
  })

  // ✅ Auto-fill user data
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
      }))
    }
  }, [isAuthenticated, user])

  // ✅ Auto-select service from Services page
  useEffect(() => {
    if (serviceData?.serviceName) {
      const serviceMap = {
        'Exterior Wash': 'exterior',
        'Interior Detailing': 'interior',
        'Eco Wash': 'eco',
        'Premium Package': 'premium',
        'Bike Wash': 'bike',
        'Engine Detailing': 'engine'
      }
      const serviceId = serviceMap[serviceData.serviceName]
      if (serviceId) {
        setFormData(prev => ({ ...prev, service: serviceId }))
        setStep(2)
      }
    }
  }, [serviceData])

  const vehicleTypes = [
    { id: 'bike', icon: <FaMotorcycle />, label: 'Bike' },
    { id: 'car', icon: <FaCar />, label: 'Car' },
    { id: 'suv', icon: <FaTruckPickup />, label: 'SUV' }
  ]

  const services = [
    { id: 'exterior', name: 'Exterior Wash', price: '₹250', duration: '30 mins' },
    { id: 'interior', name: 'Interior Detailing', price: '₹400', duration: '45 mins' },
    { id: 'eco', name: 'Eco Wash', price: '₹300', duration: '35 mins' },
    { id: 'premium', name: 'Premium Package', price: '₹800', duration: '90 mins' },
    { id: 'bike', name: 'Bike Wash', price: '₹100', duration: '20 mins' },
    { id: 'engine', name: 'Engine Detailing', price: '₹350', duration: '40 mins' }
  ]

  const timeSlots = [
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM'
  ]

  const selectedService = services.find(s => s.id === formData.service)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleVehicleSelect = (type) => {
    setFormData({ ...formData, vehicleType: type })
  }

  const handleServiceSelect = (service) => {
    setFormData({ ...formData, service })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')

      await axios.post(
        `${API_URL}/bookings`,
        {
          ...formData,
          userId: user?._id || null
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      )

      toast.success('🚗 Booking Confirmed! We will contact you shortly.')

      setFormData(prev => ({
        ...prev,
        vehicleType: '',
        vehicleNumber: '',
        service: '',
        date: '',
        time: '',
        address: '',
        notes: ''
      }))
      setStep(1)

    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (step === 1) {
      if (!formData.vehicleType) {
        toast.warning('Please select a vehicle type')
        return
      }
      if (!formData.vehicleNumber) {
        toast.warning('Please enter vehicle number')
        return
      }
    }
    if (step === 2) {
      if (!formData.service) {
        toast.warning('Please select a service')
        return
      }
      if (!formData.date) {
        toast.warning('Please select a date')
        return
      }
      if (!formData.time) {
        toast.warning('Please select a time slot')
        return
      }
    }
    setStep(step + 1)
  }

  const prevStep = () => setStep(step - 1)

  return (
    <section className="booking-section" id="booking" ref={ref}>
      <div className="booking-container">
        <motion.div
          className="booking-header"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="section-tag">Book Now</span>
          <h2>Schedule Your <span className="gradient-text">Car Wash</span></h2>
          <p>Quick and easy booking in just 3 steps</p>

          {/* ✅ Logged in user welcome */}
          {isAuthenticated && user && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '15px',
                padding: '10px 20px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid #10B981',
                borderRadius: '30px',
                color: '#059669',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              <FaCheck /> Welcome {user.name}! Your details are pre-filled ✨
            </motion.div>
          )}

          {/* ✅ Service selected badge */}
          {serviceData?.serviceName && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '10px',
                marginLeft: '10px',
                padding: '10px 20px',
                background: 'rgba(79, 70, 229, 0.1)',
                border: '1px solid #4F46E5',
                borderRadius: '30px',
                color: '#4F46E5',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              <FaCar /> {serviceData.serviceName} - {serviceData.servicePrice}
            </motion.div>
          )}
        </motion.div>

        {/* Progress Bar */}
        <div className="progress-bar">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`progress-step ${step >= s ? 'active' : ''}`}>
              <div className="step-circle">{s}</div>
              <span>{s === 1 ? 'Vehicle' : s === 2 ? 'Service' : 'Details'}</span>
            </div>
          ))}
          <div className="progress-line">
            <motion.div
              className="progress-fill"
              animate={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        <motion.form
          className="booking-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {/* ========== STEP 1: Vehicle ========== */}
          {step === 1 && (
            <motion.div
              className="form-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h3>Select Your Vehicle</h3>
              <div className="vehicle-options">
                {vehicleTypes.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    className={`vehicle-card ${formData.vehicleType === vehicle.id ? 'selected' : ''}`}
                    onClick={() => handleVehicleSelect(vehicle.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="vehicle-icon">{vehicle.icon}</span>
                    <span className="vehicle-label">{vehicle.label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="form-group">
                <label><FaCar /> Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  placeholder="e.g., KA 01 AB 1234"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>
          )}

          {/* ========== STEP 2: Service ========== */}
          {step === 2 && (
            <motion.div
              className="form-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h3>Choose Service</h3>
              <div className="service-options">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    className={`service-card ${formData.service === service.id ? 'selected' : ''}`}
                    onClick={() => handleServiceSelect(service.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="service-info">
                      <h4>{service.name}</h4>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span className="service-price">{service.price}</span>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          ⏱️ {service.duration}
                        </span>
                      </div>
                    </div>
                    <div className={`radio-btn ${formData.service === service.id ? 'checked' : ''}`} />
                  </motion.div>
                ))}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><FaCalendarAlt /> Preferred Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label><FaClock /> Time Slot</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========== STEP 3: Details ========== */}
          {step === 3 && (
            <motion.div
              className="form-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h3>Your Details</h3>

              {/* ✅ Logged in - auto filled card */}
              {isAuthenticated && user ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '15px 20px',
                    background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                    border: '1px solid #86efac',
                    borderRadius: '12px',
                    marginBottom: '20px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#059669',
                    fontWeight: '600',
                    marginBottom: '12px'
                  }}>
                    <FaLock style={{ fontSize: '0.9rem' }} />
                    Your details are auto-filled from your account
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px'
                  }}>
                    <div style={infoCardStyle}>
                      <FaUser style={{ color: '#4F46E5' }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Name</div>
                        <div style={{ fontWeight: '600', color: '#1e293b' }}>{user.name}</div>
                      </div>
                    </div>
                    <div style={infoCardStyle}>
                      <FaPhone style={{ color: '#4F46E5' }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Phone</div>
                        <div style={{ fontWeight: '600', color: '#1e293b' }}>{user.phone}</div>
                      </div>
                    </div>
                    <div style={infoCardStyle}>
                      <FaEnvelope style={{ color: '#4F46E5' }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Email</div>
                        <div style={{ fontWeight: '600', color: '#1e293b' }}>{user.email}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // ✅ Guest - manual fill
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label><FaUser /> Full Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label><FaPhone /> Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label><FaEnvelope /> Email (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {/* Address */}
              <div className="form-group">
                <label><FaMapMarkerAlt /> Service Address</label>
                <textarea
                  name="address"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>📝 Special Instructions (Optional)</label>
                <textarea
                  name="notes"
                  placeholder="Any specific instructions for the cleaner..."
                  value={formData.notes}
                  onChange={handleChange}
                  rows="2"
                />
              </div>

              {/* ✅ Booking Summary */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  padding: '20px',
                  background: '#f8fafc',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  marginTop: '10px'
                }}
              >
                <h4 style={{ margin: '0 0 15px', color: '#1e293b', fontSize: '1rem' }}>
                  📋 Booking Summary
                </h4>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {[
                    {
                      label: 'Vehicle',
                      value: `${formData.vehicleType?.toUpperCase()} • ${formData.vehicleNumber}`
                    },
                    {
                      label: 'Service',
                      value: `${selectedService?.name} (${selectedService?.price})`
                    },
                    {
                      label: 'Date & Time',
                      value: `${formData.date} | ${formData.time}`
                    },
                    {
                      label: 'Customer',
                      value: isAuthenticated ? user.name : formData.name
                    }
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.9rem',
                      paddingBottom: '8px',
                      borderBottom: i < 3 ? '1px solid #e2e8f0' : 'none'
                    }}>
                      <span style={{ color: '#64748b' }}>{item.label}</span>
                      <span style={{
                        fontWeight: '600',
                        color: '#1e293b',
                        textTransform: 'capitalize'
                      }}>
                        {item.value}
                      </span>
                    </div>
                  ))}

                  {/* Total */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '5px',
                    paddingTop: '10px',
                    borderTop: '2px solid #4F46E5'
                  }}>
                    <span style={{ fontWeight: '700', color: '#1e293b' }}>Total Amount</span>
                    <span style={{
                      fontWeight: '800',
                      color: '#4F46E5',
                      fontSize: '1.2rem'
                    }}>
                      {selectedService?.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="form-navigation">
            {step > 1 && (
              <motion.button
                type="button"
                className="btn-prev"
                onClick={prevStep}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                ← Previous
              </motion.button>
            )}

            {step < 3 ? (
              <motion.button
                type="button"
                className="btn-next"
                onClick={nextStep}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Next →
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                className="btn-submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? '⏳ Booking...' : '🚀 Confirm Booking'}
              </motion.button>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  )
}

const infoCardStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 14px',
  background: 'white',
  borderRadius: '10px',
  border: '1px solid #e2e8f0'
}

export default BookingForm;