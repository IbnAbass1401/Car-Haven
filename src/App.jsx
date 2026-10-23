import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePages from "./pages/HomePages";
import MainLayout from "./layouts/MainLayout";
import CarsPage from './pages/CarsPage';
import NotFoundPage from './pages/NotFoundPage';
import CarPage, { carLoader} from './pages/CarPage';
import AddCarPage from './pages/AddCarPage'
import EditCarPage from './pages/EditCarPage'

const App = () => {

  //Add New Car
 const addCar = async (newCar) => {
  const res = await fetch('/api/cars', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCar),
  });
  if (!res.ok) throw new Error(`Server replied ${res.status}`);
};

  // Delete Job
  const deleteCar = async (id) => {
    const res = await fetch(`/api/cars/${id}`, {
      method: 'DELETE',
    });
    return;
  }

// Update Car
const updateCar = async (car) => {
  const res = await fetch(`/api/cars/${car.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  return;
};

  const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} >
      <Route index element={<HomePages />} />
      <Route path="/cars" element={<CarsPage />} />
      <Route path="/add-car" element={<AddCarPage addCarSubmit={addCar} />} />
      <Route path="/edit-car/:id" element={<EditCarPage updateCarSubmit={updateCar} />} loader={carLoader} />
      <Route path="/cars/:id" element={<CarPage deleteCar={deleteCar} />} loader={carLoader} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)

  return (
    <RouterProvider router={router} />
  )
}

export default App



