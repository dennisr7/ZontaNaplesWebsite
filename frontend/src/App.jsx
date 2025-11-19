// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Hero from "./components/Hero.jsx";
import Mission from "./components/Mission.jsx";
import Zonta100Years from "./components/Zonta100years.jsx";
import Events from "./components/Events.jsx";
import Facebook from "./components/Facebook.jsx";
import GoogleMaps from "./components/GoogleMaps.jsx";
import Sponsors from "./components/Sponsors.jsx";
import CallToAction from "./components/CallToAction.jsx";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="font-sans bg-white text-gray-900">
              <Hero />
              <Mission />
              <Zonta100Years />
              <Events />
              <Facebook />
              <GoogleMaps />
              <Sponsors />
              <CallToAction />
            </div>
          }
        />
      </Routes>
    </>
  );
}
