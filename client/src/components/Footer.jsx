import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCar, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaUserShield } from 'react-icons/fa';
import "../styles/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Brand */}
          <div>
            <Link to="/" className="footer-logo">
              <FaCar className="footer-logo-icon" />
              <span>Wash<span className="footer-highlight">OnWheels</span></span>
            </Link>

            <p className="footer-description">
              Professional doorstep car and bike washing service. 
              Eco-friendly, convenient, and affordable.
            </p>

            <div className="footer-social">
              <motion.a href="#" className="footer-social-icon" whileHover={{ scale: 1.2, background: '#4F46E5' }}>
                <FaFacebook />
              </motion.a>
              <motion.a href="#" className="footer-social-icon" whileHover={{ scale: 1.2, background: '#4F46E5' }}>
                <FaInstagram />
              </motion.a>
              <motion.a href="#" className="footer-social-icon" whileHover={{ scale: 1.2, background: '#4F46E5' }}>
                <FaTwitter />
              </motion.a>
              <motion.a href="#" className="footer-social-icon" whileHover={{ scale: 1.2, background: '#4F46E5' }}>
                <FaLinkedin />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/services" className="footer-link">Services</Link></li>
              <li><Link to="/pricing" className="footer-link">Pricing</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li><Link to="/services" className="footer-link">Exterior Wash</Link></li>
              <li><Link to="/services" className="footer-link">Interior Detailing</Link></li>
              <li><Link to="/services" className="footer-link">Eco Wash</Link></li>
              <li><Link to="/services" className="footer-link">Premium Package</Link></li>
              <li><Link to="/services" className="footer-link">Bike Wash</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer-title">Contact Us</h3>
            <ul className="footer-links">
              <li className="footer-contact">
                <FaPhone className="footer-contact-icon" />
                <span>+91 99748 37395</span>
              </li>
              <li className="footer-contact">
                <FaWhatsapp className="footer-contact-icon" />
                <span>+91 98765 43210</span>
              </li>
              <li className="footer-contact">
                <FaEnvelope className="footer-contact-icon" />
                <span>hello@washonwheels.com</span>
              </li>
              <li className="footer-contact">
                <FaMapMarkerAlt className="footer-contact-icon" />
                <span>Gandhinagar, Gujarat</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="footer-bottom-text">
            © {currentYear} WashOnWheels. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-bottom-link">Terms of Service</Link>

            {/* Admin */}
            <Link to="/admin/login" className="footer-admin">
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