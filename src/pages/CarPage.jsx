import { useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
  FaTachometerAlt,
  FaCogs,
  FaGasPump,
  FaEdit,
  FaTrashAlt,
  FaShieldAlt,
} from 'react-icons/fa'

import ConfirmModal from '../components/modalConfirm'

const card =
  'rounded-2xl border border-[#F0EEF5]/10 bg-gradient-to-b from-[#2E1A40]/80 to-[#2E1A40]/40 backdrop-blur'

const CarPage = ({ deleteCar }) => {
  const navigate = useNavigate()
  const car = useLoaderData()
  const dealer = car.company
  const [showConfirm, setShowConfirm] = useState(false)

  const onDeleteClick = async () => {
    setShowConfirm(false)
    await deleteCar(car.id)
    toast.success('Car deleted successfully')
    navigate('/cars')
  }

  const specs = [
    { icon: FaCalendarAlt, label: 'Year', value: car.year },
    { icon: FaTachometerAlt, label: 'Mileage', value: car.mileage },
    { icon: FaCogs, label: 'Transmission', value: car.transmission },
    { icon: FaGasPump, label: 'Fuel type', value: car.fuelType },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0D0D0D] text-[#F0EEF5]">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#8B3FC8]/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8">
        {/* Back link */}
        <Link
          to="/cars"
          className="group inline-flex items-center gap-2 rounded-full border border-[#F0EEF5]/10 bg-[#2E1A40]/40 px-4 py-2 text-sm font-medium text-[#F0EEF5]/80 transition hover:border-[#8B3FC8] hover:text-[#F0EEF5]"
        >
          <FaArrowLeft className="text-[#8B3FC8] transition-transform group-hover:-translate-x-1" />
          Back to Cars
        </Link>

        {/* Big photo */}
        <div className="relative mt-6 overflow-hidden rounded-3xl border border-[#F0EEF5]/10">
          <img
            src={car.image}
            alt={car.title}
            className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
            <div>
              <span className="inline-block rounded-full bg-[#8B3FC8]/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                {car.type}
              </span>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-5xl">
                {car.title}
              </h1>
              <p className="mt-2 flex items-center gap-2 text-[#F0EEF5]/70">
                <FaMapMarkerAlt className="text-[#8B3FC8]" />
                {car.location}
              </p>
            </div>
            <div className="hidden rounded-2xl border border-[#F0EEF5]/15 bg-[#0D0D0D]/60 px-6 py-4 backdrop-blur sm:block">
              <p className="text-xs uppercase tracking-widest text-[#F0EEF5]/50">Price</p>
              <p className="text-3xl font-bold">{car.price}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <main className="space-y-8">
            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {specs.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className={`${card} group p-5 transition hover:-translate-y-1 hover:border-[#8B3FC8]/60`}
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#8B3FC8]/15 text-[#8B3FC8] transition group-hover:bg-[#8B3FC8] group-hover:text-[#F0EEF5]">
                    <Icon />
                  </div>
                  <p className="text-xs uppercase tracking-wider text-[#F0EEF5]/50">{label}</p>
                  <p className="mt-1 text-lg font-semibold">{value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <section className={`${card} p-6 sm:p-8`}>
              <h2 className="mb-4 flex items-center gap-3 text-xl font-bold">
                <span className="h-6 w-1 rounded-full bg-[#8B3FC8]" />
                About this car
              </h2>
              <p className="whitespace-pre-line leading-relaxed text-[#F0EEF5]/70">
                {car.description}
              </p>
            </section>
          </main>

          {/* Side panel (stays in view while scrolling) */}
          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            {/* Price + contact */}
            <div className={`${card} p-6`}>
              <p className="text-xs uppercase tracking-widest text-[#F0EEF5]/50">Asking price</p>
              <p className="mt-1 text-4xl font-extrabold">{car.price}</p>

              <div className="mt-6 grid gap-3">
                <a
                  href={`tel:${dealer.contactPhone}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#8B3FC8] px-4 py-3 font-semibold shadow-lg shadow-[#8B3FC8]/30 transition hover:bg-[#5C2D7A]"
                >
                  <FaPhoneAlt /> Call dealer
                </a>
                <a
                  href={`mailto:${dealer.contactEmail}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#F0EEF5]/15 px-4 py-3 font-semibold transition hover:border-[#8B3FC8] hover:bg-[#8B3FC8]/10"
                >
                  <FaEnvelope /> Send email
                </a>
              </div>
            </div>

            {/* Dealer */}
            <div className={`${card} p-6`}>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8B3FC8] to-[#5C2D7A] text-lg font-bold">
                  {dealer.name?.charAt(0)}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#F0EEF5]/50">Dealer</p>
                  <h3 className="text-lg font-bold">{dealer.name}</h3>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#F0EEF5]/60">
                {dealer.description}
              </p>

              <div className="mt-5 space-y-2 border-t border-[#F0EEF5]/10 pt-5 text-sm">
                <a
                  href={`mailto:${dealer.contactEmail}`}
                  className="flex items-center gap-3 break-all text-[#F0EEF5]/80 transition hover:text-[#8B3FC8]"
                >
                  <FaEnvelope className="shrink-0 text-[#8B3FC8]" /> {dealer.contactEmail}
                </a>
                <a
                  href={`tel:${dealer.contactPhone}`}
                  className="flex items-center gap-3 text-[#F0EEF5]/80 transition hover:text-[#8B3FC8]"
                >
                  <FaPhoneAlt className="shrink-0 text-[#8B3FC8]" /> {dealer.contactPhone}
                </a>
              </div>
            </div>

            {/* Manage */}
            <div className={`${card} p-6`}>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#F0EEF5]/50">
                <FaShieldAlt className="text-[#8B3FC8]" /> Manage listing
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to={`/edit-car/${car.id}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#F0EEF5]/10 px-4 py-3 text-sm font-semibold transition hover:bg-[#8B3FC8]"
                >
                  <FaEdit /> Edit
                </Link>

                <button
                  type="button"
                  onClick={() => setShowConfirm(true)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#EF4444]/40 bg-[#EF4444]/10 px-4 py-3 text-sm font-semibold text-[#F87171] transition hover:border-[#B91C1C] hover:bg-[#B91C1C] hover:text-white"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <ConfirmModal
        open={showConfirm}
        title="Delete this listing?"
        message="This will permanently remove the car from CarHaven."
        confirmLabel="Delete listing"
        onConfirm={onDeleteClick}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  )
}

const carLoader = async ({ params }) => {
  const res = await fetch(`/api/cars/${params.id}`)
  if (!res.ok) throw new Response('Car not found', { status: res.status })
  return res.json()
}

export { CarPage as default, carLoader }