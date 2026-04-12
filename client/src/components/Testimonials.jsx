import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Testimonials = () => {
  const [current, setCurrent] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'IT Professional',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      text: 'WashOnWheels has been a game-changer! My car looks brand new every day without me having to do anything. The subscription is totally worth it!',
      rating: 5,
      location: 'Bangalore'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Marketing Manager',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'I love the eco-friendly approach. They save so much water compared to traditional car washes. Plus, the team is super professional!',
      rating: 5,
      location: 'Mumbai'
    },
    {
      id: 3,
      name: 'Amit Patel',
      role: 'Business Owner',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      text: 'Managing a fleet of 10 cars was a headache until I found WashOnWheels. Their business plan has made vehicle maintenance effortless.',
      rating: 5,
      location: 'Delhi'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      role: 'Doctor',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      text: 'With my busy schedule, having someone come to my apartment to wash my car is perfect. The booking process is super simple!',
      rating: 5,
      location: 'Hyderabad'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="testimonials" ref={ref}>
      <div className="testimonials-container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="section-tag">Testimonials</span>
          <h2>What Our <span className="gradient-text">Customers Say</span></h2>
          <p>Don't just take our word for it. Here's what real customers think!</p>
        </motion.div>

        <div className="testimonials-slider">
          <button className="nav-btn prev" onClick={prev}>
            <FaChevronLeft />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="testimonial-card"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <FaQuoteLeft className="quote-icon" />
              
              <p className="testimonial-text">
                "{testimonials[current].text}"
              </p>

              <div className="rating">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <FaStar key={i} className="star" />
                ))}
              </div>

              <div className="testimonial-author">
                <img 
                  src={testimonials[current].image} 
                  alt={testimonials[current].name} 
                />
                <div className="author-info">
                  <h4>{testimonials[current].name}</h4>
                  <p>{testimonials[current].role}</p>
                  <span className="location">📍 {testimonials[current].location}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button className="nav-btn next" onClick={next}>
            <FaChevronRight />
          </button>
        </div>

        <div className="dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === current ? 'active' : ''}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonials {
          padding: 100px 5%;
          background: linear-gradient(135deg, #f8fafc, #fff);
        }

        .testimonials-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .testimonials-header h2 {
          font-size: 2.8rem;
          margin: 15px 0;
        }

        .testimonials-slider {
          position: relative;
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .testimonial-card {
          background: white;
          padding: 50px;
          border-radius: 30px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          text-align: center;
          flex: 1;
        }

        .quote-icon {
          font-size: 3rem;
          color: #4F46E5;
          opacity: 0.3;
          margin-bottom: 20px;
        }

        .testimonial-text {
          font-size: 1.25rem;
          line-height: 1.8;
          color: #334155;
          margin-bottom: 25px;
        }

        .rating {
          margin-bottom: 25px;
        }

        .star {
          color: #F59E0B;
          font-size: 1.3rem;
          margin: 0 3px;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .testimonial-author img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #4F46E5;
        }

        .author-info {
          text-align: left;
        }

        .author-info h4 {
          font-size: 1.2rem;
          color: #1e293b;
          margin-bottom: 5px;
        }

        .author-info p {
          color: #64748b;
          font-size: 0.95rem;
        }

        .location {
          font-size: 0.85rem;
          color: #94a3b8;
        }

        .nav-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: none;
          background: white;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4F46E5;
          font-size: 1.2rem;
          transition: all 0.3s;
        }

        .nav-btn:hover {
          background: #4F46E5;
          color: white;
          transform: scale(1.1);
        }

        .dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 40px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background: #e2e8f0;
          cursor: pointer;
          transition: all 0.3s;
        }

        .dot.active {
          background: #4F46E5;
          width: 30px;
          border-radius: 20px;
        }

        @media (max-width: 768px) {
          .testimonial-card {
            padding: 30px;
          }

          .testimonial-text {
            font-size: 1.05rem;
          }

          .nav-btn {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

export default Testimonials;