import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { toast } from 'react-toastify'
import { FaCar, FaMotorcycle, FaTruckPickup, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser, FaPhone } from 'react-icons/fa'
import axios from 'axios'
import '../styles/booking.css'

const BookingForm = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

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

  const vehicleTypes = [
    { id: 'bike', icon: <FaMotorcycle />, label: 'Bike' },
    { id: 'car', icon: <FaCar />, label: 'Car' },
    { id: 'suv', icon: <FaTruckPickup />, label: 'SUV' }
  ]

  const services = [
    { id: 'exterior', name: 'Exterior Wash', price: '₹250' },
    { id: 'interior', name: 'Interior Detailing', price: '₹400' },
    { id: 'eco', name: 'Eco Wash', price: '₹300' },
    { id: 'premium', name: 'Premium Package', price: '₹800' }
  ]

  const timeSlots = [
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM',
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM'
  ]

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
      const response = await axios.post('/api/bookings', formData)
      toast.success('🚗 Booking Confirmed! We will contact you shortly.')
      setFormData({
        name: '', phone: '', email: '', vehicleType: '', vehicleNumber: '',
        service: '', date: '', time: '', address: '', notes: ''
      })
      setStep(1)
    } catch (error) {
      toast.error('Booking failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (step === 1 && !formData.vehicleType) {
      toast.warning('Please select a vehicle type')
      return
    }
    if (step === 2 && !formData.service) {
      toast.warning('Please select a service')
      return
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
          {/* Step 1: Vehicle Selection */}
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

          {/* Step 2: Service Selection */}
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
                      <span className="service-price">{service.price}</span>
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
                  <select name="time" value={formData.time} onChange={handleChange} required>
                    <option value="">Select time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact Details */}
          {step === 3 && (
            <motion.div
              className="form-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h3>Your Details</h3>
              
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
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>📧 Email (Optional)</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

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
            </motion.div>
          )}

          {/* Navigation Buttons */}
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
                {loading ? 'Booking...' : 'Confirm Booking 🚀'}
              </motion.button>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  )
}

export default BookingForm;