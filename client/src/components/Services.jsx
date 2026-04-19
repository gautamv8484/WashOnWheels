import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  FaCar, FaMotorcycle, FaSprayCan, FaStar, 
  FaLeaf, FaCogs, FaCheck, FaLock 
} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext' // ✅ AuthContext use karo

const Services = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth() // ✅ Direct se lo
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // ✅ Handle Book Now click
  const handleBookNow = (service) => {
    if (!isAuthenticated) {
      // Not logged in - show modal
      setSelectedService(service)
      setShowLoginModal(true)
    } else {
      // Logged in - go to booking
      navigate('/booking', { 
        state: { 
          serviceName: service.title, 
          servicePrice: service.price,
          serviceDuration: service.duration,
          serviceColor: service.color
        } 
      })
    }
  }

  const services = [
    {
      icon: <FaCar />,
      title: 'Exterior Wash',
      description: 'Complete exterior cleaning including body wash, tyre cleaning, and window polish.',
      price: '₹250',
      duration: '30 mins',
      color: '#4F46E5',
      features: ['Body Wash', 'Tyre Shine', 'Window Clean', 'Door Jambs']
    },
    {
      icon: <FaSprayCan />,
      title: 'Interior Detailing',
      description: 'Deep interior cleaning with vacuum, dashboard polish, and seat cleaning.',
      price: '₹400',
      duration: '45 mins',
      color: '#10B981',
      features: ['Vacuuming', 'Dashboard Polish', 'Seat Cleaning', 'AC Vent Clean']
    },
    {
      icon: <FaLeaf />,
      title: 'Eco Wash',
      description: 'Waterless, eco-friendly cleaning using biodegradable products.',
      price: '₹300',
      duration: '35 mins',
      color: '#059669',
      features: ['Waterless Clean', 'Biodegradable', 'Scratch-Free', 'Eco Products']
    },
    {
      icon: <FaStar />,
      title: 'Premium Package',
      description: 'Complete detailing with wax polish, engine cleaning, and ceramic coating.',
      price: '₹800',
      duration: '90 mins',
      color: '#8B5CF6',
      features: ['Full Detailing', 'Wax Polish', 'Engine Clean', 'Ceramic Coat']
    },
    {
      icon: <FaMotorcycle />,
      title: 'Bike Wash',
      description: 'Professional bike cleaning with chain lubrication and chrome polish.',
      price: '₹100',
      duration: '20 mins',
      color: '#F59E0B',
      features: ['Body Wash', 'Chain Lube', 'Chrome Polish', 'Seat Clean']
    },
    {
      icon: <FaCogs />,
      title: 'Engine Detailing',
      description: 'Professional engine bay cleaning and degreasing service.',
      price: '₹350',
      duration: '40 mins',
      color: '#EF4444',
      features: ['Degreasing', 'Pressure Clean', 'Dressing', 'Protection']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <>
      <section style={styles.services} id="services" ref={ref}>
        <div style={styles.container}>

          {/* Header */}
          <motion.div
            style={styles.header}
            initial={{ opacity: 0, y: -30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span style={styles.sectionTag}>Our Services</span>
            <h2 style={styles.headerTitle}>
              Premium Car Care{' '}
              <span style={styles.gradientText}>Solutions</span>
            </h2>
            <p style={styles.headerDesc}>
              Choose from our range of professional cleaning services designed
              to keep your vehicle in pristine condition.
            </p>

            {/* ✅ Login reminder - sirf tab dikhao jab logged out ho */}
            {!isAuthenticated && (
              <motion.div
                style={styles.loginBadge}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <FaLock style={{ marginRight: '8px' }} />
                Please login to book any service
              </motion.div>
            )}
          </motion.div>

          {/* Services Grid */}
          <motion.div
            style={styles.grid}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                style={styles.card}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                }}
              >
                {/* Color top bar */}
                <div style={styles.cardTopBar(service.color)} />

                {/* Icon */}
                <div style={styles.cardIcon(service.color)}>
                  {service.icon}
                </div>

                {/* Title */}
                <h3 style={styles.cardTitle}>{service.title}</h3>

                {/* Description */}
                <p style={styles.cardDesc}>{service.description}</p>

                {/* Features */}
                <ul style={styles.featuresList}>
                  {service.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      style={styles.featureItem}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <FaCheck style={styles.checkIcon} />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Footer */}
                <div style={styles.cardFooter}>
                  <div>
                    <span style={{ ...styles.price, color: service.color }}>
                      {service.price}
                    </span>
                    <p style={styles.duration}>⏱️ {service.duration}</p>
                  </div>

                  {/* ✅ Book Now Button */}
                  <motion.button
                    style={styles.button(service.color)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBookNow(service)}
                  >
                    {isAuthenticated ? (
                      <>🚗 Book Now</>
                    ) : (
                      <>
                        <FaLock style={{ fontSize: '0.8rem' }} />
                        Book Now
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            style={styles.cta}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <p style={styles.ctaText}>Looking for custom packages?</p>
            <Link to="/contact" style={styles.ctaLink}>
              Contact Us →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ✅ Login Modal */}
      {showLoginModal && (
        <motion.div
          style={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowLoginModal(false)}
        >
          <motion.div
            style={styles.modal}
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Icon */}
            <div style={styles.modalIconBox}>
              <FaLock style={{ fontSize: '2rem', color: '#4F46E5' }} />
            </div>

            {/* Modal Content */}
            <h2 style={styles.modalTitle}>Login Required! 🔐</h2>
            <p style={styles.modalDesc}>
              <strong style={{ color: '#4F46E5' }}>
                {selectedService?.title}
              </strong>{' '}
              book karne ke liye pehle login karo.
            </p>

            {/* Selected Service Preview */}
            {selectedService && (
              <div style={styles.servicePreview}>
                <div style={styles.previewLeft}>
                  <span style={styles.previewTitle}>
                    {selectedService.title}
                  </span>
                  <span style={styles.previewDuration}>
                    ⏱️ {selectedService.duration}
                  </span>
                </div>
                <span style={{
                  ...styles.previewPrice,
                  color: selectedService.color
                }}>
                  {selectedService.price}
                </span>
              </div>
            )}

            {/* Modal Buttons */}
            <div style={styles.modalButtons}>
              <motion.button
                style={styles.cancelBtn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </motion.button>

              <motion.button
                style={styles.loginBtn}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: '0 8px 20px rgba(79,70,229,0.4)' 
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowLoginModal(false)
                  // ✅ Correct state pass kar raha hai
                  navigate('/login', {
                    state: {
                      from: '/booking',          
                      serviceName: selectedService.title,
                      servicePrice: selectedService.price,
                      serviceDuration: selectedService.duration,
                      serviceColor: selectedService.color
                    }
                  })
                }}
              >
                🔐 Login to Book
              </motion.button>
            </div>

            {/* ✅ /register use karo - /signup nahi hai route mein */}
            <p style={styles.signupText}>
              Account nahi hai?{' '}
              <Link
                to="/register"
                style={styles.signupLink}
                onClick={() => setShowLoginModal(false)}
              >
                Register karo Free 🚀
              </Link>
            </p>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

const styles = {
  services: {
    padding: '100px 5%',
    background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)'
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px'
  },
  sectionTag: {
    display: 'inline-block',
    padding: '8px 20px',
    background: 'rgba(79, 70, 229, 0.1)',
    color: '#4F46E5',
    borderRadius: '30px',
    fontSize: '0.9rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  headerTitle: {
    fontSize: '2.8rem',
    color: '#1e293b',
    margin: '15px 0'
  },
  gradientText: {
    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  headerDesc: {
    color: '#64748b',
    fontSize: '1.1rem',
    maxWidth: '600px',
    margin: '0 auto'
  },
  loginBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    marginTop: '20px',
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
    color: '#92400E',
    borderRadius: '30px',
    fontSize: '0.9rem',
    fontWeight: '600',
    border: '1px solid #F59E0B'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    marginBottom: '50px'
  },
  card: {
    background: 'white',
    padding: '35px 30px',
    borderRadius: '20px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  cardTopBar: (color) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: color,
    borderRadius: '20px 20px 0 0'
  }),
  cardIcon: (color) => ({
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    fontSize: '2rem',
    background: `${color}20`,
    color: color
  }),
  cardTitle: {
    fontSize: '1.5rem',
    color: '#1e293b',
    marginBottom: '15px',
    fontWeight: '600'
  },
  cardDesc: {
    color: '#64748b',
    lineHeight: '1.7',
    marginBottom: '20px'
  },
  featuresList: {
    listStyle: 'none',
    marginBottom: '25px',
    padding: 0
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 0',
    color: '#64748b'
  },
  checkIcon: {
    color: '#10B981',
    fontSize: '0.9rem',
    flexShrink: 0
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #e2e8f0'
  },
  price: {
    fontSize: '1.8rem',
    fontWeight: '700'
  },
  duration: {
    fontSize: '0.85rem',
    color: '#64748b',
    margin: 0
  },
  button: (color) => ({
    padding: '12px 20px',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    background: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '0.95rem',
    minWidth: '130px',
    minHeight: '44px'        
  }),
  cta: {
    textAlign: 'center',
    marginTop: '50px'
  },
  ctaText: {
    color: '#64748b',
    marginBottom: '10px'
  },
  ctaLink: {
    color: '#4F46E5',
    fontWeight: '600',
    fontSize: '1.1rem',
    textDecoration: 'none'
  },
  // Modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(4px)'
  },
  modal: {
    background: 'white',
    borderRadius: '24px',
    padding: '40px',
    maxWidth: '420px',
    width: '90%',
    textAlign: 'center',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)'
  },
  modalIconBox: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'rgba(79, 70, 229, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px'
  },
  modalTitle: {
    fontSize: '1.8rem',
    color: '#1e293b',
    marginBottom: '12px',
    fontWeight: '700'
  },
  modalDesc: {
    color: '#64748b',
    lineHeight: '1.7',
    marginBottom: '20px',
    fontSize: '0.95rem'
  },
  servicePreview: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(79, 70, 229, 0.05)',
    border: '1px solid rgba(79, 70, 229, 0.2)',
    borderRadius: '12px',
    padding: '12px 20px',
    marginBottom: '25px'
  },
  previewLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '4px'
  },
  previewTitle: {
    fontWeight: '600',
    color: '#1e293b',
    fontSize: '0.95rem'
  },
  previewDuration: {
    fontSize: '0.8rem',
    color: '#64748b'
  },
  previewPrice: {
    fontWeight: '700',
    fontSize: '1.3rem'
  },
  modalButtons: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px'
  },
  cancelBtn: {
    flex: 1,
    padding: '14px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    background: 'white',
    color: '#64748b',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.95rem'
  },
  loginBtn: {
    flex: 2,
    padding: '14px',
    border: 'none',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
    color: 'white',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '0.95rem'
  },
  signupText: {
    color: '#64748b',
    fontSize: '0.9rem',
    margin: 0
  },
  signupLink: {
    color: '#4F46E5',
    fontWeight: '600',
    textDecoration: 'none'
  }
}

export default Services;