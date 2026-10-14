import { Link } from 'react-router-dom';
import cars from '../cars.json';
import CarListing from './CarListing';

const CarListings = ({ isHome = false }) => {
  const carList = isHome ? cars.slice(0, 4) : cars;

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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {carList.map((car, index) => (
            <CarListing key={car.id} car={car} index={index} />
          ))}
        </div>

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