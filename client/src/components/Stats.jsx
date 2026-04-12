import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { FaCar, FaUsers, FaStar, FaLeaf } from 'react-icons/fa'

const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  })

  const stats = [
    {
      icon: <FaCar />,
      number: 50000,
      suffix: '+',
      label: 'Cars Washed',
      color: '#4F46E5'
    },
    {
      icon: <FaUsers />,
      number: 15000,
      suffix: '+',
      label: 'Happy Customers',
      color: '#10B981'
    },
    {
      icon: <FaStar />,
      number: 4.9,
      suffix: '',
      label: 'Average Rating',
      decimals: 1,
      color: '#F59E0B'
    },
    {
      icon: <FaLeaf />,
      number: 90,
      suffix: '%',
      label: 'Water Saved',
      color: '#059669'
    }
  ]

  return (
    <section className="stats" ref={ref}>
      <div className="stats-container">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-item"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.15 }}
          >
            <motion.div
              className="stat-icon"
              style={{ color: stat.color, background: `${stat.color}15` }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {stat.icon}
            </motion.div>
            
            <div className="stat-number">
              {inView && (
                <CountUp
                  end={stat.number}
                  duration={2.5}
                  decimals={stat.decimals || 0}
                  suffix={stat.suffix}
                />
              )}
            </div>
            
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .stats {
          padding: 80px 5%;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
        }

        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .stat-item {
          text-align: center;
          padding: 30px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .stat-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 1.8rem;
        }

        .stat-number {
          font-size: 2.8rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 5px;
        }

        .stat-label {
          color: #64748b;
          font-size: 1rem;
        }

        @media (max-width: 968px) {
          .stats-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .stats-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

export default Stats;