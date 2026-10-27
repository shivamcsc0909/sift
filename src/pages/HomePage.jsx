import BookingSection from '../components/BookingSection'
import FeaturedMenu from '../components/FeaturedMenu'
import Gallery from '../components/Gallery'
import Hero from '../components/Hero'
import Highlights from '../components/Highlights'
import HowItWorks from '../components/HowItWorks'
import LocationSection from '../components/LocationSection'
import Reviews from '../components/Reviews'

function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <BookingSection />
        <HowItWorks />
        <FeaturedMenu />
        <Highlights />
        <Gallery />
        <Reviews />
        <LocationSection />
      </main>
      <a className="mobile-booking-bar" href="#booking">
        Book Table
      </a>
    </>
  )
}

export default HomePage
