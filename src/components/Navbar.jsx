import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaCarSide, FaBars, FaTimes } from 'react-icons/fa';

const links = [
  { to: '/', label: 'Home' },
  { to: '/cars', label: 'Cars' },
  { to: '/add-car', label: 'Add Car' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const desktopLink = ({ isActive }) =>
    `relative text-sm font-medium tracking-wide transition-colors duration-300
     after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#8B3FC8]
     after:transition-all after:duration-300
     ${
       isActive
         ? 'text-white after:w-full'
         : 'text-[#F0EEF5]/70 hover:text-white after:w-0 hover:after:w-full'
     }`;

  const mobileLink = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-base font-medium transition-all duration-300
     ${
       isActive
         ? 'bg-[#8B3FC8] text-white'
         : 'text-[#F0EEF5]/80 hover:bg-[#5C2D7A] hover:pl-6 hover:text-white'
     }`;

  return (
    <nav
      className={`sticky top-0 z-50 animate-nav-drop border-b transition-all duration-300 ${
        scrolled
          ? 'border-[#5C2D7A]/60 bg-[#0D0D0D]/90 shadow-lg shadow-[#8B3FC8]/10 backdrop-blur-md'
          : 'border-transparent bg-[#0D0D0D]'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2" onClick={() => setOpen(false)}>
          <FaCarSide className="text-2xl text-[#8B3FC8] transition-transform duration-500 group-hover:translate-x-1.5 group-hover:scale-110" />
          <span className="text-xl font-bold tracking-tight text-[#F0EEF5]">
            Car<span className="text-[#8B3FC8]">Haven</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={desktopLink}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          to="/add-car"
          className="hidden rounded-full bg-[#8B3FC8] px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5C2D7A] hover:shadow-lg hover:shadow-[#8B3FC8]/40 active:translate-y-0 md:inline-block"
        >
          Sell a Car
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="relative h-10 w-10 text-2xl text-[#F0EEF5] md:hidden"
        >
          <FaBars
            className={`absolute inset-0 m-auto transition-all duration-300 ${
              open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
            }`}
          />
          <FaTimes
            className={`absolute inset-0 m-auto transition-all duration-300 ${
              open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
            }`}
          />
        </button>
      </div>

      {/* Mobile menu (slides open smoothly) */}
      <div
        className={`grid bg-[#2E1A40] transition-[grid-template-rows] duration-300 ease-in-out md:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-1 px-4 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={mobileLink}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;