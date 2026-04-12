import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaLeaf, FaUsers, FaTrophy, FaHeart } from 'react-icons/fa'
import Stats from '../components/Stats'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const values = [
    {
      icon: <FaLeaf />,
      title: 'Sustainability',
      description: 'We save 150+ liters of water per wash using eco-friendly technology.'
    },
    {
      icon: <FaUsers />,
      title: 'Customer First',
      description: 'Your convenience and satisfaction are our top priorities.'
    },
    {
      icon: <FaTrophy />,
      title: 'Excellence',
      description: 'We deliver premium quality service, every single time.'
    },
    {
      icon: <FaHeart />,
      title: 'Integrity',
      description: 'Honest pricing, reliable service, and transparent communication.'
    }
  ]

  return (
    <main className="about-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>About WashOnWheels</h1>
        <p>Making car care convenient, eco-friendly, and hassle-free</p>
      </motion.div>

      <section className="about-story" ref={ref}>
        <div className="story-container">
          <motion.div
            className="story-content"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
          >
            <span className="section-tag">Our Story</span>
            <h2>Started with a Simple Idea</h2>
            <p>
              WashOnWheels was founded in 2023 with a mission to revolutionize the way people 
              care for their vehicles. We noticed that busy professionals were spending hours 
              waiting at car washes or neglecting their vehicles due to lack of time.
            </p>
            <p>
              Our solution? Bring professional car washing right to your doorstep. Using 
              eco-friendly, waterless technology, we not only save your time but also help 
              conserve our planet's precious water resources.
            </p>
            <p>
              Today, we've served over 50,000 vehicles and counting. Our team of trained 
              professionals ensures that every car we touch receives the premium care it deserves.
            </p>
          </motion.div>

          <motion.div
            className="story-image"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
          >
            <img src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600" alt="Car Wash" />
          </motion.div>
        </div>
      </section>

      <section className="our-values">
        <div className="values-container">
          <h2>Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Stats />
      <WhyChooseUs />
      <Testimonials />

      <style jsx>{`
        .about-page {
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

        .about-story {
          padding: 100px 5%;
        }

        .story-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .story-content h2 {
          font-size: 2.5rem;
          margin: 15px 0 25px;
        }

        .story-content p {
          color: #64748b;
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .story-image img {
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
        }

        .our-values {
          padding: 100px 5%;
          background: #f8fafc;
        }

        .values-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .values-container h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 50px;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        .value-card {
          background: white;
          padding: 40px 30px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .value-icon {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: white;
          font-size: 1.8rem;
        }

        .value-card h3 {
          margin-bottom: 10px;
        }

        .value-card p {
          color: #64748b;
        }

        @media (max-width: 968px) {
          .story-container {
            grid-template-columns: 1fr;
          }

          .values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .values-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  )
}

export default About;