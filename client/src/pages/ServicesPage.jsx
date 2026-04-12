import Services from '../components/Services'
import { motion } from 'framer-motion'

const ServicesPage = () => {
  return (
    <main className="services-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Our Services</h1>
        <p>Professional car care solutions for every need</p>
      </motion.div>
      
      <Services />

      <style jsx>{`
        .services-page {
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

export default ServicesPage;