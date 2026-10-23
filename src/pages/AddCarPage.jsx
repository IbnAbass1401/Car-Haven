import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const labelClass = 'block text-[#F0EEF5] font-semibold mb-2';
const inputClass =
  'w-full rounded-lg bg-[#0D0D0D] border border-[#5C2D7A] text-[#F0EEF5] placeholder-[#F0EEF5]/40 py-2.5 px-3 focus:outline-none focus:border-[#8B3FC8] focus:ring-1 focus:ring-[#8B3FC8]';

const AddCarPage = ({ addCarSubmit }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [transmission, setTransmission] = useState('Automatic');
  const [fuelType, setFuelType] = useState('Petrol');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const navigate = useNavigate();

  // Pick a photo from the computer, shrink it, and store it as a base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => toast.error('Could not read that photo. Try another one.');
      img.onload = () => {
        const maxWidth = 600;
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas
          .getContext('2d')
          .drawImage(img, 0, 0, canvas.width, canvas.height);
        setImage(canvas.toDataURL('image/jpeg', 0.6));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error('Please add a car photo');
      return;
    }

    const newCar = {
      title,
      type,
      location,
      description,
      price: `$${Number(price).toLocaleString('en-US')}`,
      image,
      year: Number(year),
      mileage,
      transmission,
      fuelType,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactPhone,
      },
    };

     try {
      await addCarSubmit(newCar);
      toast.success('Car listed successfully');
      navigate('/cars');
    } catch (err) {
      toast.error(`Could not list car: ${err.message}`);
    }
  };

  return (
    <section className="bg-[#0D0D0D] min-h-screen">
      <div className="container m-auto max-w-2xl py-24 px-4">
        <div className="bg-[#2E1A40] border border-[#5C2D7A] rounded-xl px-6 py-8 md:px-10">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl font-semibold text-[#F0EEF5] mb-1">
              List a car
            </h2>
            <p className="text-[#F0EEF5]/70 mb-8">
              Fill in the details buyers will see on the listing.
            </p>

            {/* Vehicle */}
            <h3 className="text-xl font-semibold text-[#F0EEF5] pb-3 mb-5 border-b border-[#5C2D7A]">
              Vehicle
            </h3>

            <div className="mb-5">
              <label htmlFor="title" className={labelClass}>
                Listing title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={inputClass}
                placeholder="e.g. BMW M8 Competition Coupe"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label htmlFor="type" className={labelClass}>
                  Brand
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  className={inputClass}
                  placeholder="e.g. BMW"
                  required
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="year" className={labelClass}>
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  className={inputClass}
                  placeholder="e.g. 2023"
                  min="1990"
                  max="2030"
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="mileage" className={labelClass}>
                  Mileage
                </label>
                <input
                  type="text"
                  id="mileage"
                  name="mileage"
                  className={inputClass}
                  placeholder="e.g. 12,000 km"
                  required
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="transmission" className={labelClass}>
                  Transmission
                </label>
                <select
                  id="transmission"
                  name="transmission"
                  className={inputClass}
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div>
                <label htmlFor="fuelType" className={labelClass}>
                  Fuel type
                </label>
                <select
                  id="fuelType"
                  name="fuelType"
                  className={inputClass}
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <div>
                <label htmlFor="price" className={labelClass}>
                  Price (USD)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className={inputClass}
                  placeholder="e.g. 134100"
                  min="0"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="location" className={labelClass}>
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className={inputClass}
                placeholder="e.g. Lagos, Nigeria"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="image" className={labelClass}>
                Car photo
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-[#F0EEF5]/80 file:mr-4 file:rounded-lg file:border-0 file:bg-[#8B3FC8] file:px-4 file:py-2.5 file:font-semibold file:text-[#F0EEF5] file:cursor-pointer hover:file:bg-[#5C2D7A]"
              />
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="mt-4 w-full h-56 object-cover rounded-lg border border-[#5C2D7A]"
                />
              )}
            </div>

            <div className="mb-10">
              <label htmlFor="description" className={labelClass}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className={inputClass}
                rows="4"
                placeholder="Condition, features, service history"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Dealer */}
            <h3 className="text-xl font-semibold text-[#F0EEF5] pb-3 mb-5 border-b border-[#5C2D7A]">
              Dealer
            </h3>

            <div className="mb-5">
              <label htmlFor="company" className={labelClass}>
                Dealership name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className={inputClass}
                placeholder="Dealership name"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="company_description" className={labelClass}>
                About the dealership
              </label>
              <textarea
                id="company_description"
                name="company_description"
                className={inputClass}
                rows="3"
                placeholder="What does your dealership sell?"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div>
                <label htmlFor="contact_email" className={labelClass}>
                  Contact email
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  className={inputClass}
                  placeholder="Email for buyers"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="contact_phone" className={labelClass}>
                  Contact phone
                </label>
                <input
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  className={inputClass}
                  placeholder="Optional"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>
            </div>

            <button
              className="w-full bg-[#8B3FC8] hover:bg-[#5C2D7A] text-[#F0EEF5] font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#F0EEF5]/60"
              type="submit"
            >
              List car
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddCarPage;