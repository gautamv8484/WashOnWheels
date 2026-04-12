import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCar, FaMotorcycle, FaStar, FaUsers, FaLeaf } from 'react-icons/fa'

const Hero = () => {
  const styles = {
    hero: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '120px 5% 80px',
      display: 'flex',
      alignItems: 'center',
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      alignItems: 'center',
      position: 'relative',
      zIndex: 1,
    },
    content: {
      color: 'white',
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      borderRadius: '50px',
      marginBottom: '25px',
      fontSize: '0.9rem',
      fontWeight: '500',
    },
    badgeIcon: {
      color: '#fbbf24',
    },
    title: {
      fontSize: '3.5rem',
      fontWeight: '800',
      lineHeight: '1.2',
      marginBottom: '25px',
    },
    gradientText: {
      background: 'linear-gradient(to right, #fbbf24, #f59e0b)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    description: {
      fontSize: '1.2rem',
      lineHeight: '1.8',
      opacity: 0.9,
      marginBottom: '35px',
    },
    buttons: {
      display: 'flex',
      gap: '20px',
      marginBottom: '40px',
    },
    btnPrimary: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '16px 32px',
      background: 'white',
      color: '#4F46E5',
      borderRadius: '50px',
      fontSize: '1.1rem',
      fontWeight: '600',
      textDecoration: 'none',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s',
    },
    btnSecondary: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '16px 32px',
      background: 'transparent',
      color: 'white',
      border: '2px solid white',
      borderRadius: '50px',
      fontSize: '1.1rem',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'all 0.3s',
    },
    features: {
      display: 'flex',
      gap: '30px',
      flexWrap: 'wrap',
    },
    feature: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: 'white',
    },
    featureIcon: {
      fontSize: '1.3rem',
      color: '#fbbf24',
    },
    imageSection: {
      position: 'relative',
    },
    imageWrapper: {
      position: 'relative',
      width: '100%',
    },
    heroImage: {
      width: '100%',
      filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))',
    },
    floatingCard: {
      position: 'absolute',
      background: 'white',
      padding: '15px 20px',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    card1: {
      top: '10%',
      left: '-5%',
    },
    card2: {
      top: '50%',
      right: '-5%',
    },
    card3: {
      bottom: '10%',
      left: '10%',
    },
    cardIcon: {
      fontSize: '2rem',
    },
    cardNumber: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#4F46E5',
    },
    cardLabel: {
      fontSize: '0.85rem',
      color: '#64748b',
    },
    bubble: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
    },
    bubble1: {
      width: '400px',
      height: '400px',
      top: '-100px',
      right: '-100px',
    },
    bubble2: {
      width: '300px',
      height: '300px',
      bottom: '-150px',
      left: '-100px',
    },
  }

  return (
    <section style={styles.hero}>
      {/* Background Bubbles */}
      <motion.div
        style={{...styles.bubble, ...styles.bubble1}}
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        style={{...styles.bubble, ...styles.bubble2}}
        animate={{
          y: [20, -20, 20],
          x: [10, -10, 10],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div style={styles.container}>
        {/* Content */}
        <motion.div
          style={styles.content}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            style={styles.badge}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FaStar style={styles.badgeIcon} />
            <span>Rated 4.9/5 by 10,000+ Customers</span>
          </motion.div>

          <motion.h1
            style={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Professional Car Wash<br />
            At Your <span style={styles.gradientText}>Doorstep</span>
          </motion.h1>

          <motion.p
            style={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Experience premium, eco-friendly car and bike washing service right at your home or office. 
            Save time, save water, and keep your vehicle sparkling clean!
          </motion.p>

          <motion.div
            style={styles.buttons}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/booking" style={styles.btnPrimary}>
                <FaCar /> Book Car Wash
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/booking" style={styles.btnSecondary}>
                <FaMotorcycle /> Book Bike Wash
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            style={styles.features}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div style={styles.feature}>
              <FaLeaf style={styles.featureIcon} />
              <span>Eco-Friendly</span>
            </div>
            <div style={styles.feature}>
              <FaUsers style={styles.featureIcon} />
              <span>Professional Team</span>
            </div>
            <div style={styles.feature}>
              <FaStar style={styles.featureIcon} />
              <span>100% Satisfaction</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          style={styles.imageSection}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div style={styles.imageWrapper}>
            {/* Replace with actual car image */}
            <div style={{
              width: '100%',
              height: '400px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
            }}>
              🚗
            </div>

            {/* Floating Cards */}
            <motion.div
              style={{...styles.floatingCard, ...styles.card1}}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div style={styles.cardIcon}>🚗</div>
              <div>
                <div style={styles.cardNumber}>50K+</div>
                <div style={styles.cardLabel}>Cars Washed</div>
              </div>
            </motion.div>

            <motion.div
              style={{...styles.floatingCard, ...styles.card2}}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 }}
            >
              <div style={styles.cardIcon}>⭐</div>
              <div>
                <div style={styles.cardNumber}>4.9</div>
                <div style={styles.cardLabel}>Rating</div>
              </div>
            </motion.div>

            <motion.div
              style={{...styles.floatingCard, ...styles.card3}}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 }}
            >
              <div style={styles.cardIcon}>💧</div>
              <div>
                <div style={styles.cardNumber}>90%</div>
                <div style={styles.cardLabel}>Water Saved</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero;