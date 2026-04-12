import BookingForm from '../components/BookingForm'
import { motion } from 'framer-motion'

const BookingPage = () => {
  return (
    <main className="booking-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Book Your Car Wash</h1>
        <p>Schedule a professional doorstep cleaning service</p>
      </motion.div>
      
      <BookingForm />

      <style jsx>{`
        .booking-page {
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

        .page-header p {
          opacity: 0.9;
        }
      `}</style>
    </main>
  )
}

export default BookingPage;