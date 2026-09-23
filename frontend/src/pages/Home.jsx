import Hero from '../components/Hero'
import AboutVision from '../components/AboutVision'
import ProgramGrid from '../components/ProgramGrid'
import ValuesBand from '../components/ValuesBand'
import NewsGrid from '../components/NewsGrid'
import LocationMap from '../components/LocationMap'
import CtaBanner from '../components/CtaBanner'

export default function Home() {
  return (
    <main className="w-full pt-20 bg-ivory">
      <div className="flex flex-col w-full">
        <Hero />
        <AboutVision />
        <ProgramGrid />
        <ValuesBand />
        <NewsGrid />
        <LocationMap />
        <CtaBanner />
      </div>
    </main>
  )
}
