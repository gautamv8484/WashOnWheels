import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaPlus, FaMinus } from 'react-icons/fa'

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const faqs = [
    {
      question: 'How does doorstep car wash work?',
      answer: 'Simply book a service through our website or WhatsApp. Our professional cleaner will arrive at your location with all necessary equipment. Your car will be cleaned at your parking spot - home, office, or anywhere convenient!'
    },
    {
      question: 'Is water required at my location?',
      answer: 'No! We use advanced waterless cleaning technology for most services. Our eco-friendly products require minimal to no water, saving up to 150 liters per wash compared to traditional car washes.'
    },
    {
      question: 'What if I need to cancel or reschedule?',
      answer: 'You can cancel or reschedule up to 2 hours before your appointment at no extra cost. For subscription plans, we offer unlimited free rescheduling.'
    },
    {
      question: 'Are your cleaners trustworthy?',
      answer: 'Absolutely! All our cleaning professionals undergo thorough background verification, training, and are equipped with uniforms and ID cards. They are insured and supervised for your peace of mind.'
    },
    {
      question: 'How long does a typical car wash take?',
      answer: 'An exterior wash takes about 30-40 minutes. Interior detailing takes 45-60 minutes. Premium packages with full detailing can take up to 90 minutes depending on vehicle size.'
    },
    {
      question: 'Do you offer services for apartments and offices?',
      answer: 'Yes! We specialize in apartment complexes and office parking lots. We can service multiple vehicles and offer special corporate rates for regular fleet maintenance.'
    }
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="faq" ref={ref}>
      <div className="faq-container">
        <motion.div
          className="faq-header"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="section-tag">FAQs</span>
          <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
          <p>Got questions? We've got answers!</p>
        </motion.div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <h3>{faq.question}</h3>
                <span className="faq-icon">
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </div>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .faq {
          padding: 100px 5%;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
        }

        .faq-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .faq-header h2 {
          font-size: 2.8rem;
          margin: 15px 0;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .faq-item {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
        }

        .faq-item:hover {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .faq-item.active {
          box-shadow: 0 10px 30px rgba(79, 70, 229, 0.15);
        }

        .faq-question {
          padding: 25px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .faq-question h3 {
          font-size: 1.1rem;
          color: #1e293b;
          margin: 0;
          flex: 1;
        }

        .faq-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4F46E5;
          font-size: 0.9rem;
          margin-left: 20px;
          transition: all 0.3s;
        }

        .faq-item.active .faq-icon {
          background: #4F46E5;
          color: white;
        }

        .faq-answer {
          overflow: hidden;
        }

        .faq-answer p {
          padding: 0 30px 25px;
          color: #64748b;
          line-height: 1.7;
        }
      `}</style>
    </section>
  )
}

export default FAQ;