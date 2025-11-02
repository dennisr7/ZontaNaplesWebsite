// src/components/RootLayout.jsx
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet, useLocation } from "react-router-dom";

export default function RootLayout() {
  const location = useLocation();
  
  // Define colors for each page
  const getColorsForPage = () => {
    switch(location.pathname) {
      case "/centennial":
        return { navbar: "blue", footer: "blue" };
      case "/donate":
        return { navbar: "default", footer: "red" };
      case "/contact":
        return { navbar: "default", footer: "red" }; 
      case "/membership":
        return { navbar: "default", footer: "red" };
      case "/faq":
        return { navbar: "default", footer: "red" };
      default: // Home page
        return { navbar: "default", footer: "default" };
    }
  };

  const colors = getColorsForPage();

  return (
    <div className="font-sans bg-white text-gray-900">
      <Navbar backgroundColor={colors.navbar} />
      <Outlet />
      <Footer backgroundColor={colors.footer} />
    </div>
  );
}