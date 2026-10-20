import { Link } from 'react-router-dom';
import CarListing from './CarListing';
import { useState,useEffect } from 'react';
import Spinner from "./Spinner"

const CarListings = ({ isHome = false }) => {
  const [cars, setCars] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    const fetchCars = async() => {
      const apiUrl = isHome ? '/api/cars?_page=1&_per_page=4' : '/api/cars'
      try {
        const res = await fetch (apiUrl)
        const data = await res.json()
        setCars(isHome ? data.data : data);
      } catch (error) {
        console.log('Error fetching data error')
      } finally {
        setLoading (false)
      }
    }

    fetchCars()
  }, [])

  return (
    <section className="bg-[#0D0D0D] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-[#F0EEF5] sm:text-4xl">
            {isHome ? 'Featured Cars' : 'Browse All Cars'}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#F0EEF5]/60">
            Hand-picked luxury and performance cars from trusted dealers.
          </p>
          <div className="mx-auto mt-5 h-1 w-16 rounded bg-[#8B3FC8]" />
        </div>

        {/* Grid */}

         {loading ? (
                <Spinner loading={loading} />
            ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cars.map((car, index) => (
            <CarListing key={car.id} car={car} index={index} />
          ))}
        </div>
        )}

        {/* View all button (home only) */}
        {isHome && (
          <div className="mt-12 text-center">
            <Link
              to="/cars"
              className="inline-block rounded-lg border border-[#8B3FC8] px-8 py-3 font-semibold text-[#F0EEF5] transition-colors duration-300 hover:bg-[#8B3FC8]"
            >
              View All Cars
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CarListings;