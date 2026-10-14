import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaTachometerAlt,
  FaCogs,
  FaGasPump,
} from 'react-icons/fa';

const CarListing = ({ car, index = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Fade the card in when it scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${(index % 4) * 100}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#5C2D7A]/50 bg-[#2E1A40]/60 transition-colors duration-300 hover:border-[#8B3FC8]">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={car.image}
            alt={car.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-md bg-[#8B3FC8] px-2.5 py-1 text-xs font-semibold text-white">
            {car.type}
          </span>
          <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md bg-[#0D0D0D]/80 px-2.5 py-1 text-xs font-medium text-[#F0EEF5]">
            <FaCalendarAlt className="text-[#8B3FC8]" />
            {car.year}
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold text-[#F0EEF5]">{car.title}</h3>
          <p className="mt-1 text-2xl font-extrabold text-[#8B3FC8]">
            {car.salary}
          </p>

          <p className="mt-2 flex items-center gap-2 text-sm text-[#F0EEF5]/60">
            <FaMapMarkerAlt className="text-[#8B3FC8]" />
            {car.location}
          </p>

          {/* Specs */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#F0EEF5]/80">
            <span className="flex items-center gap-1.5 rounded-md border border-[#5C2D7A] px-2.5 py-1">
              <FaTachometerAlt className="text-[#8B3FC8]" />
              {car.mileage}
            </span>
            <span className="flex items-center gap-1.5 rounded-md border border-[#5C2D7A] px-2.5 py-1">
              <FaCogs className="text-[#8B3FC8]" />
              {car.transmission}
            </span>
            <span className="flex items-center gap-1.5 rounded-md border border-[#5C2D7A] px-2.5 py-1">
              <FaGasPump className="text-[#8B3FC8]" />
              {car.fuelType}
            </span>
          </div>

          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#F0EEF5]/70">
            {car.description}
          </p>

          {/* Dealer */}
          <div className="mt-5 border-t border-[#5C2D7A]/50 pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#8B3FC8]/50 bg-[#8B3FC8]/20 font-bold text-[#8B3FC8]">
                {car.type.charAt(0)}
              </div>
              <p className="truncate text-sm font-semibold text-[#F0EEF5]">
                {car.company.name}
              </p>
            </div>

            <div className="mt-3 space-y-2 text-xs text-[#F0EEF5]/70">
              <a
                href={`tel:${car.company.contactPhone}`}
                className="flex items-center gap-2 transition-colors hover:text-[#8B3FC8]"
              >
                <FaPhoneAlt className="text-[#8B3FC8]" />
                {car.company.contactPhone}
              </a>
              <a
                href={`mailto:${car.company.contactEmail}`}
                className="flex items-center gap-2 transition-colors hover:text-[#8B3FC8]"
              >
                <FaEnvelope className="shrink-0 text-[#8B3FC8]" />
                <span className="truncate">{car.company.contactEmail}</span>
              </a>
            </div>
          </div>

          {/* Button */}
          <Link
            to={`/cars/${car.id}`}
            className="mt-5 block rounded-lg bg-[#8B3FC8] py-2.5 text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#5C2D7A]"
          >
            View Details
          </Link>
        </div>
      </article>
    </div>
  );
};

export default CarListing;