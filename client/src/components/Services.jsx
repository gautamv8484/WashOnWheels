import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaCar, FaMotorcycle, FaSprayCan, FaStar, FaLeaf, FaCogs, FaCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

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

  // Styles object
  const styles = {
    services: {
      padding: '100px 5%',
      background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: '60px',
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
      letterSpacing: '1px',
    },
    headerTitle: {
      fontSize: '2.8rem',
      color: '#1e293b',
      margin: '15px 0',
    },
    gradientText: {
      background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    headerDesc: {
      color: '#64748b',
      fontSize: '1.1rem',
      maxWidth: '600px',
      margin: '0 auto',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '30px',
      marginBottom: '50px',
    },
    card: {
      background: 'white',
      padding: '35px 30px',
      borderRadius: '20px',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
    },
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
      color: color,
    }),
    cardTitle: {
      fontSize: '1.5rem',
      color: '#1e293b',
      marginBottom: '15px',
      fontWeight: '600',
    },
    cardDesc: {
      color: '#64748b',
      lineHeight: '1.7',
      marginBottom: '20px',
    },
    featuresList: {
      listStyle: 'none',
      marginBottom: '25px',
      padding: 0,
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 0',
      color: '#64748b',
    },
    checkIcon: {
      color: '#10B981',
      fontSize: '0.9rem',
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '20px',
      borderTop: '1px solid #e2e8f0',
    },
    price: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#4F46E5',
    },
    duration: {
      fontSize: '0.85rem',
      color: '#64748b',
    },
    button: (color) => ({
      padding: '12px 24px',
      border: 'none',
      borderRadius: '10px',
      color: 'white',
      fontWeight: '600',
      cursor: 'pointer',
      background: color,
      transition: 'all 0.3s',
    }),
    cta: {
      textAlign: 'center',
      marginTop: '50px',
    },
    ctaText: {
      color: '#64748b',
      marginBottom: '10px',
    },
    ctaLink: {
      color: '#4F46E5',
      fontWeight: '600',
      fontSize: '1.1rem',
      textDecoration: 'none',
    },
  }

  return (
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
            Premium Car Care <span style={styles.gradientText}>Solutions</span>
          </h2>
          <p style={styles.headerDesc}>
            Choose from our range of professional cleaning services designed to keep your vehicle in pristine condition.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          style={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
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
                    <FaCheck style={styles.checkIcon} /> {feature}
                  </motion.li>
                ))}
              </ul>

              {/* Footer */}
              <div style={styles.cardFooter}>
                <div>
                  <span style={styles.price}>{service.price}</span>
                  <p style={styles.duration}>⏱️ {service.duration}</p>
                </div>
                <motion.button
                  style={styles.button(service.color)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now
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
          <Link to="/contact" style={styles.ctaLink}>Contact Us →</Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Services;