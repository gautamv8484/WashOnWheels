import Hero from '../components/Hero';
import Services from '../components/Services';
import Stats from '../components/Stats';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import BookingForm from '../components/BookingForm';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import ReportComplaint from '../components/ReportComplaint';

const Home = () => {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <HowItWorks />
      <WhyChooseUs />
      <Pricing />
      <Testimonials />
      <BookingForm />
      <ReportComplaint/>
      <FAQ />
      <Contact />
    </main>
  )
}

export default Home;