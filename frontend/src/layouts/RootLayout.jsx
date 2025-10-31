import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="font-sans bg-white text-gray-900">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
