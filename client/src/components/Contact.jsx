import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { toast } from 'react-toastify'
import axios from 'axios'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: 'Call Us',
      info: '+91 98765 43210',
      link: 'tel:+919876543210',
      color: '#4F46E5'
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      info: '+91 98765 43210',
      link: 'https://wa.me/919876543210',
      color: '#25D366'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Us',
      info: 'hello@washonwheels.com',
      link: 'mailto:hello@washonwheels.com',
      color: '#EF4444'
    },
    {
      icon: <FaClock />,
      title: 'Working Hours',
      info: '7 AM - 9 PM (All Days)',
      link: null,
      color: '#F59E0B'
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post('/api/contact', formData)
      toast.success('Message sent successfully! We will contact you soon.')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact" ref={ref}>
      <div className="contact-container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="section-tag">Contact Us</span>
          <h2>Get In <span className="gradient-text">Touch</span></h2>
          <p>Have questions? We'd love to hear from you!</p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info-cards"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                className="contact-card"
                target={item.link?.startsWith('http') ? '_blank' : ''}
                whileHover={{ scale: 1.03 }}
              >
                <div
                  className="contact-icon"
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  {item.icon}
                </div>
                <div className="contact-text">
                  <h4>{item.title}</h4>
                  <p>{item.info}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Sending...' : 'Send Message 📨'}
            </motion.button>
          </motion.form>
        </div>
      </div>

      <style jsx>{`
        .contact {
          padding: 100px 5%;
          background: white;
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .contact-header h2 {
          font-size: 2.8rem;
          margin: 15px 0;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 50px;
        }

        .contact-info-cards {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 25px;
          background: #f8fafc;
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.3s;
        }

        .contact-card:hover {
          background: white;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transform: translateX(10px);
        }

        .contact-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .contact-text h4 {
          color: #1e293b;
          margin-bottom: 5px;
        }

        .contact-text p {
          color: #64748b;
        }

        .contact-form {
          background: #f8fafc;
          padding: 40px;
          border-radius: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 15px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s;
          background: white;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #4F46E5;
          outline: none;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
        }

        .submit-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 968px) {
          .contact-content {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

export default Contact;