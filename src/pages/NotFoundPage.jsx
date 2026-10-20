import { Link } from 'react-router-dom'
import { FaCar } from 'react-icons/fa'

const NotFoundPage = () => {
  return (
    <section className="bg-[#F0EEF5] min-h-[70vh] flex flex-col justify-center items-center text-center px-6 py-16">
      <FaCar className="text-5xl text-[#8B3FC8] mb-6" />

      <h1 className="text-7xl md:text-8xl font-bold text-[#2E1A40] mb-3">
        404
      </h1>

      <h2 className="text-2xl font-semibold text-[#5C2D7A] mb-3">
        Wrong turn, this page doesn't exist
      </h2>

      <p className="text-[#0D0D0D]/70 max-w-md mb-8">
        The page you're looking for may have been moved or removed. Head back
        home or keep browsing our listings.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/"
          className="bg-[#8B3FC8] hover:bg-[#5C2D7A] text-white font-medium rounded-lg px-6 py-3 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          to="/cars"
          className="border border-[#2E1A40] text-[#2E1A40] hover:bg-[#2E1A40] hover:text-[#F0EEF5] font-medium rounded-lg px-6 py-3 transition-colors"
        >
          Browse Cars
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage