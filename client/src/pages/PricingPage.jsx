import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import { motion } from 'framer-motion'

const PricingPage = () => {
  return (
    <main className="pricing-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Pricing Plans</h1>
        <p>Affordable subscription plans for regular car care</p>
      </motion.div>
      
      <Pricing />
      <FAQ />

      <style jsx>{`
        .pricing-page {
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

export default PricingPage;