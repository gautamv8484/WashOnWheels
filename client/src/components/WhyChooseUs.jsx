import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaClock, FaLeaf, FaUserTie, FaShieldAlt, FaWallet, FaMobileAlt } from 'react-icons/fa'

const WhyChooseUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const features = [
    {
      icon: <FaClock />,
      title: 'Save Time',
      description: 'No more waiting in queues. We come to you at your preferred time.',
      color: '#4F46E5'
    },
    {
      icon: <FaLeaf />,
      title: 'Eco-Friendly',
      description: 'Our waterless technology saves 150+ liters of water per wash.',
      color: '#10B981'
    },
    {
      icon: <FaUserTie />,
      title: 'Professional Staff',
      description: 'Trained, uniformed, and background-verified cleaning experts.',
      color: '#F59E0B'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Insured Service',
      description: 'Your vehicle is covered against any accidental damage.',
      color: '#EF4444'
    },
    {
      icon: <FaWallet />,
      title: 'Best Prices',
      description: 'Premium quality service at competitive, transparent pricing.',
      color: '#8B5CF6'
    },
    {
      icon: <FaMobileAlt />,
      title: 'Easy Booking',
      description: 'Book via website, WhatsApp, or call. Instant confirmation!',
      color: '#06B6D4'
    }
  ]

  return (
    <section className="why-choose-us" ref={ref}>
      <div className="wcu-container">
        <motion.div
          className="wcu-header"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="section-tag">Why Us</span>
          <h2>Why Choose <span className="gradient-text">WashOnWheels</span>?</h2>
          <p>We're not just another car wash. Here's what makes us different.</p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <motion.div
                className="feature-icon"
                style={{ background: `${feature.color}15`, color: feature.color }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {feature.icon}
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .why-choose-us {
          padding: 100px 5%;
          background: white;
        }

        .wcu-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .wcu-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .wcu-header h2 {
          font-size: 2.8rem;
          margin: 15px 0;
        }

        .wcu-header p {
          color: #64748b;
          font-size: 1.1rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .feature-card {
          background: #f8fafc;
          padding: 40px 30px;
          border-radius: 20px;
          text-align: center;
          transition: all 0.3s;
        }

        .feature-card:hover {
          background: white;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
          font-size: 2rem;
        }

        .feature-card h3 {
          font-size: 1.3rem;
          margin-bottom: 12px;
          color: #1e293b;
        }

        .feature-card p {
          color: #64748b;
          line-height: 1.6;
        }

        @media (max-width: 968px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

export default WhyChooseUs;