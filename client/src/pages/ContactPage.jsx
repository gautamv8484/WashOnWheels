import Contact from '../components/Contact'
import { motion } from 'framer-motion'

const ContactPage = () => {
  return (
    <main className="contact-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Get in touch!</p>
      </motion.div>
      
      <Contact />

      <style jsx>{`
        .contact-page {
          padding-top: 80px;
        }

        .page-header {
          text-align: center;
          padding: 60px 5%;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
        }

        .page-header h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
      `}</style>
    </main>
  )
}

export default ContactPage;