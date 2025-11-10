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
import FAQ from "./pages/FAQ.jsx";
import Impact from "./pages/Impact.jsx"; // ← ADD THIS IMPORT
import { CartProvider } from "./context/CartContext.jsx"; // ✅ Correct
import MerchandisePage from "./pages/MerchandisePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import EventsPage from "./pages/Events.jsx";
import ScholarshipsHome from "./pages/ScholarshipsHome.jsx";

import YWPAApply from "./pages/YWPAApply.jsx";
import STEMApply from "./pages/STEMApply.jsx";
import FGCUApply from "./pages/FGCUApply.jsx";

import WhoWeAre from "./pages/WhoWeAre.jsx";





createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donation />} />
          <Route path="/centennial" element={<ZontaCentennial />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/impact" element={<Impact />} /> {/* ← ADD THIS ROUTE */}
          <Route path="/merchandise" element={<MerchandisePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/scholarships" element={<ScholarshipsHome />} />
          <Route path="/scholarships/ywpa-apply" element={<YWPAApply />} />
          <Route path="/scholarships/stem-apply" element={<STEMApply />} />
          <Route path="/scholarships/fgcu-apply" element={<FGCUApply />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </CartProvider>
  </StrictMode>
);