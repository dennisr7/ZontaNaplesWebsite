import "@fontsource/playfair-display";
import "@fontsource/montserrat";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import RootLayout from "./layouts/RootLayout.jsx";
import App from "./App.jsx";                // Home sections
import Contact from "./pages/Contact.jsx";  // Contact page
import Donation from "./pages/Donation.jsx"; // Donation page
import ZontaCentennial from "./pages/ZontaCentennial.jsx"; //Zonta100Years page
import Membership from "./pages/Membership.jsx"; 


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donation />} />
          <Route path="/centennial" element={<ZontaCentennial />} />
          <Route path="/membership" element={<Membership />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

