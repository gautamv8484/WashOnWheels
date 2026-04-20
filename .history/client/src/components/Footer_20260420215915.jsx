import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCar, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaUserShield } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const styles = {
    footer: {
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      color: 'white',
      padding: '80px 5% 30px',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
      gap: '50px',
      marginBottom: '50px',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '1.5rem',
      fontWeight: '700',
      color: 'white',
      textDecoration: 'none',
      marginBottom: '20px',
    },
    logoIcon: {
      color: '#4F46E5',
      fontSize: '2rem',
    },
    highlight: {
      color: '#4F46E5',
    },
    description: {
      color: '#94a3b8',
      lineHeight: '1.7',
      marginBottom: '25px',
    },
    socialLinks: {
      display: 'flex',
      gap: '15px',
    },
    socialIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      transition: 'all 0.3s',
      cursor: 'pointer',
    },
    sectionTitle: {
      fontSize: '1.2rem',
      marginBottom: '25px',
      position: 'relative',
    },
    underline: {
      content: '""',
      position: 'absolute',
      bottom: '-10px',
      left: 0,
      width: '30px',
      height: '3px',
      background: '#4F46E5',
      borderRadius: '2px',
    },
    linksList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    link: {
      color: '#94a3b8',
      textDecoration: 'none',
      marginBottom: '12px',
      display: 'block',
      transition: 'all 0.3s',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '15px',
      color: '#94a3b8',
    },
    contactIcon: {
      color: '#4F46E5',
    },
    bottom: {
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      paddingTop: '30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '15px'
    },
    bottomText: {
      color: '#64748b',
    },
    bottomLinks: {
      display: 'flex',
      gap: '30px',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    bottomLink: {
      color: '#64748b',
      textDecoration: 'none',
      transition: 'all 0.3s',
    },
    adminLink: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      color: '#4F46E5',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '0.9rem',
      padding: '8px 14px',
      border: '1px solid rgba(79, 70, 229, 0.3)',
      borderRadius: '20px',
      background: 'rgba(79, 70, 229, 0.08)'
    }
  }

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Brand */}
          <div>
            <Link to="/" style={styles.logo}>
              <FaCar style={styles.logoIcon} />
              <span>Wash<span style={styles.highlight}>OnWheels</span></span>
            </Link>
            <p style={styles.description}>
              Professional doorstep car and bike washing service. 
              Eco-friendly, convenient, and affordable.
            </p>
            <div style={styles.socialLinks}>
              <motion.a 
                href="#" 
                style={styles.socialIcon}
                whileHover={{ scale: 1.2, background: '#4F46E5' }}
              >
                <FaFacebook />
              </motion.a>
              <motion.a 
                href="#" 
                style={styles.socialIcon}
                whileHover={{ scale: 1.2, background: '#4F46E5' }}
              >
                <FaInstagram />
              </motion.a>
              <motion.a 
                href="#" 
                style={styles.socialIcon}
                whileHover={{ scale: 1.2, background: '#4F46E5' }}
              >
                <FaTwitter />
              </motion.a>
              <motion.a 
                href="#" 
                style={styles.socialIcon}
                whileHover={{ scale: 1.2, background: '#4F46E5' }}
              >
                <FaLinkedin />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={styles.sectionTitle}>
              Quick Links
              <div style={styles.underline}></div>
            </h3>
            <ul style={styles.linksList}>
              <li><Link to="/" style={styles.link}>Home</Link></li>
              <li><Link to="/services" style={styles.link}>Services</Link></li>
              <li><Link to="/pricing" style={styles.link}>Pricing</Link></li>
              <li><Link to="/about" style={styles.link}>About Us</Link></li>
              <li><Link to="/contact" style={styles.link}>Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 style={styles.sectionTitle}>
              Services
              <div style={styles.underline}></div>
            </h3>
            <ul style={styles.linksList}>
              <li><Link to="/services" style={styles.link}>Exterior Wash</Link></li>
              <li><Link to="/services" style={styles.link}>Interior Detailing</Link></li>
              <li><Link to="/services" style={styles.link}>Eco Wash</Link></li>
              <li><Link to="/services" style={styles.link}>Premium Package</Link></li>
              <li><Link to="/services" style={styles.link}>Bike Wash</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={styles.sectionTitle}>
              Contact Us
              <div style={styles.underline}></div>
            </h3>
            <ul style={styles.linksList}>
              <li style={styles.contactItem}>
                <FaPhone style={styles.contactIcon} />
                <span>+91 99748 37395</span>
              </li>
              <li style={styles.contactItem}>
                <FaWhatsapp style={styles.contactIcon} />
                <span>+91 98765 43210</span>
              </li>
              <li style={styles.contactItem}>
                <FaEnvelope style={styles.contactIcon} />
                <span>hello@washonwheels.com</span>
              </li>
              <li style={styles.contactItem}>
                <FaMapMarkerAlt style={styles.contactIcon} />
                <span>Gandhinagar, Gujrat</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={styles.bottom}>
          <p style={styles.bottomText}>© {currentYear} WashOnWheels. All rights reserved.</p>
          <div style={styles.bottomLinks}>
            <Link to="/privacy" style={styles.bottomLink}>Privacy Policy</Link>
            <Link to="/terms" style={styles.bottomLink}>Terms of Service</Link>

            {/* ✅ Admin Login Button */}
            <Link to="/admin/login" style={styles.adminLink}>
              <FaUserShield />
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;