import {  Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ScrollToTop from "../components/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#F0EEF5] text-[#0D0D0D]">  
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <ToastContainer />
    </div>
  )
}

export default MainLayout