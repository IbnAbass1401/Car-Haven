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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} >
      <Route index element={<HomePages />} />
      <Route path="/cars" element={<CarsPage />} />
      <Route path="/cars/:id" element={<CarPage />} loader={carLoader} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App



