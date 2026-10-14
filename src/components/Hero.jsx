import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const stats = [
  { value: '10+', label: 'Premium Cars' },
  { value: '10', label: 'Top Brands' },
  { value: '100%', label: 'Trusted Dealers' },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#2E1A40]">
      {/* Glowing background blobs */}
      <div className="animate-glow pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#8B3FC8] blur-[120px]" />
      <div
        className="animate-glow pointer-events-none absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-[#5C2D7A] blur-[120px]"
        style={{ animationDelay: '2s' }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        {/* Text side */}
        <div className="text-center md:text-left">
        
          <h1
            className="animate-fade-up mt-6 text-4xl font-extrabold leading-tight text-[#F0EEF5] sm:text-5xl lg:text-6xl"
            style={{ animationDelay: '0.15s' }}
          >
            Find Your <span className="text-[#8B3FC8]">Dream Car</span> Today
          </h1>

          <p
            className="animate-fade-up mx-auto mt-5 max-w-lg text-base text-[#F0EEF5]/70 md:mx-0 md:text-lg"
            style={{ animationDelay: '0.3s' }}
          >
            Explore luxury and performance cars from trusted dealers across
            the country. Your next ride is just a click away.
          </p>

          <div
            className="animate-fade-up mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start justify-center"
            style={{ animationDelay: '0.45s' }}
          >
            <Link
              to="/cars"
              className="group inline-flex items-center gap-2 rounded-full bg-[#8B3FC8] px-7 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5C2D7A] hover:shadow-lg hover:shadow-[#8B3FC8]/40"
            >
              Browse Cars
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/add-car"
              className="rounded-full border border-[#F0EEF5]/30 px-7 py-3 font-semibold text-[#F0EEF5] transition-all duration-300 hover:border-[#8B3FC8] hover:bg-[#8B3FC8]/10"
            >
              Sell a Car
            </Link>
          </div>

          {/* Stats */}
          <div
            className="animate-fade-up mt-12 grid grid-cols-3 gap-4 border-t border-[#F0EEF5]/10 pt-8"
            style={{ animationDelay: '0.6s' }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-[#F0EEF5] sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-[#F0EEF5]/60 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image side */}
        <div
          className="animate-fade-up relative"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="absolute inset-4 rounded-3xl bg-[#8B3FC8]/30 blur-2xl" />
          <img
            src="/images/hero-img.jpg"
            alt="Featured luxury car"
            className="animate-float relative w-full rounded-3xl border border-[#F0EEF5]/10 object-cover shadow-2xl shadow-black/50"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;