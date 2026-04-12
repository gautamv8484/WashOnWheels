import { motion } from 'framer-motion'
import { FaCar } from 'react-icons/fa'

const Loader = () => {
  return (
    <div className="loader">
      <motion.div
        className="loader-car"
        animate={{
          x: [-50, 50, -50],
          rotate: [0, 0, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <FaCar />
      </motion.div>
      <motion.div
        className="loader-text"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading...
      </motion.div>

      <style jsx>{`
        .loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .loader-car {
          font-size: 4rem;
          color: #4F46E5;
          margin-bottom: 20px;
        }

        .loader-text {
          font-size: 1.2rem;
          color: #64748b;
        }
      `}</style>
    </div>
  )
}

export default Loader;