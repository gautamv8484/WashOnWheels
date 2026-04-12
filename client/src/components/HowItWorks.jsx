import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaMobileAlt, FaCalendarCheck, FaCar, FaSmile, FaArrowRight } from 'react-icons/fa'

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const steps = [
    {
      icon: <FaMobileAlt />,
      number: '01',
      title: 'Book Online',
      description: 'Choose your service and book through our website, WhatsApp, or call us directly.',
      color: '#4F46E5'
    },
    {
      icon: <FaCalendarCheck />,
      number: '02',
      title: 'Schedule Time',
      description: 'Pick your preferred date, time slot, and location. We work around your schedule.',
      color: '#10B981'
    },
    {
      icon: <FaCar />,
      number: '03',
      title: 'We Arrive',
      description: 'Our professional team arrives at your doorstep with all equipment ready.',
      color: '#F59E0B'
    },
    {
      icon: <FaSmile />,
      number: '04',
      title: 'Enjoy Clean Car',
      description: 'Relax while we work. Your sparkling clean vehicle is ready in no time!',
      color: '#EC4899'
    }
  ]

  return (
    <section className="how-it-works" ref={ref}>
      <div className="hiw-container">
        <motion.div
          className="hiw-header"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="section-tag">Simple Process</span>
          <h2>How It <span className="gradient-text">Works</span></h2>
          <p>Getting your car washed has never been easier. Just 4 simple steps!</p>
        </motion.div>

        <div className="steps-wrapper">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-item"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className="step-icon-wrapper"
                whileHover={{ scale: 1.1, rotate: 5 }}
                style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)` }}
              >
                <span className="step-icon">{step.icon}</span>
                <span className="step-number">{step.number}</span>
              </motion.div>

              <h3>{step.title}</h3>
              <p>{step.description}</p>

              {index < steps.length - 1 && (
                <motion.div
                  className="step-connector"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '100%' } : {}}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                >
                  <FaArrowRight />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="hiw-cta"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="/booking"
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Your First Wash 🚗
          </motion.a>
        </motion.div>
      </div>

      <style jsx>{`
        .how-it-works {
          padding: 100px 5%;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .how-it-works::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(79, 70, 229, 0.1), transparent);
          top: -200px;
          right: -200px;
          border-radius: 50%;
        }

        .hiw-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .hiw-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .hiw-header h2 {
          font-size: 2.8rem;
          margin: 15px 0;
        }

        .hiw-header p {
          color: #94a3b8;
          font-size: 1.1rem;
        }

        .steps-wrapper {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          position: relative;
        }

        .step-item {
          text-align: center;
          position: relative;
        }

        .step-icon-wrapper {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .step-icon {
          font-size: 2rem;
          color: white;
        }

        .step-number {
          position: absolute;
          top: -10px;
          right: -10px;
          background: white;
          color: #0f172a;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.8rem;
        }

        .step-item h3 {
          font-size: 1.3rem;
          margin-bottom: 10px;
        }

        .step-item p {
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .step-connector {
          position: absolute;
          top: 50px;
          left: 60%;
          color: #4F46E5;
          font-size: 1.2rem;
        }

        .hiw-cta {
          text-align: center;
          margin-top: 60px;
        }

        .cta-button {
          display: inline-block;
          padding: 18px 40px;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          color: white;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 10px 30px rgba(79, 70, 229, 0.4);
          transition: all 0.3s;
        }

        @media (max-width: 968px) {
          .steps-wrapper {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .step-connector {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .steps-wrapper {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

export default HowItWorks;