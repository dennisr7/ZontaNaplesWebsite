import "@fontsource/playfair-display";
import "@fontsource/montserrat";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import RootLayout from "./layouts/RootLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import App from "./App.jsx";                // Home sections
import Contact from "./pages/Contact.jsx";  // Contact page
import Donate from "./pages/Donate.jsx"; // Donation page
import ZontaCentennial from "./pages/ZontaCentennial.jsx"; //Zonta100Years page
import Membership from "./pages/Membership.jsx"; 
import FAQ from "./pages/FAQ.jsx";
import Impact from "./pages/Impact.jsx"; // ← ADD THIS IMPORT
import { CartProvider } from "./context/CartContext.jsx"; // ✅ Correct
import Shop from "./pages/Shop.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import EventsPage from "./pages/Events.jsx";
import ScholarshipsHome from "./pages/ScholarshipsHome.jsx";

import YWPAApply from "./pages/YWPAApply.jsx";
import STEMApply from "./pages/STEMApply.jsx";
import FGCUApply from "./pages/FGCUApply.jsx";

import WhoWeAre from "./pages/WhoWeAre.jsx";

import DonateSuccess from "./pages/DonateSuccess.jsx";
import ShopSuccess from "./pages/ShopSuccess.jsx";
import ProductCheckout from "./pages/ProductCheckout.jsx";

import NotFound from "./pages/NotFound.jsx";



//admin dashboard 
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ScholarshipManagement from "./pages/admin/ScholarshipManagement.jsx";
import ScholarshipDetail from "./pages/admin/ScholarshipDetail.jsx";
import EventManagement from "./pages/admin/EventManagement.jsx";
import EventCreate from "./pages/admin/EventCreate.jsx";
import EventEdit from "./pages/admin/EventEdit.jsx";
import MemberManagement from "./pages/admin/MemberManagement.jsx";
import MemberDetail from "./pages/admin/MemberDetail.jsx";
import DonationManagement from "./pages/admin/DonationManagement.jsx";
import ProductManagement from "./pages/admin/ProductManagement.jsx";
import ProductForm from "./pages/admin/ProductForm.jsx";
import OrderManagement from "./pages/admin/OrderManagement.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donate/success" element={<DonateSuccess />} />
          <Route path="/centennial" element={<ZontaCentennial />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/impact" element={<Impact />} /> {/* ← ADD THIS ROUTE */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/checkout/:id" element={<ProductCheckout />} />
          <Route path="/shop/success" element={<ShopSuccess />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/scholarships" element={<ScholarshipsHome />} />
          <Route path="/scholarships/ywpa-apply" element={<YWPAApply />} />
          <Route path="/scholarships/stem-apply" element={<STEMApply />} />
          <Route path="/scholarships/fgcu-apply" element={<FGCUApply />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
        </Route>

        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/scholarships" element={<ScholarshipManagement />} />
          <Route path="/admin/scholarships/:id" element={<ScholarshipDetail />} />
          <Route path="/admin/events" element={<EventManagement />} />
          <Route path="/admin/events/create" element={<EventCreate />} />
          <Route path="/admin/events/edit/:id" element={<EventEdit />} />
          <Route path="/admin/members" element={<MemberManagement />} />
          <Route path="/admin/members/:id" element={<MemberDetail />} />
          <Route path="/admin/donations" element={<DonationManagement />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/admin/products" element={<ProductManagement />} />
          <Route path="/admin/products/create" element={<ProductForm />} />
          <Route path="/admin/products/edit/:id" element={<ProductForm />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  </StrictMode>
);