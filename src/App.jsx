// src/App.jsx
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Mission from "./components/Mission.jsx";
import Zonta100Years from "./components/Zonta100years.jsx";
import Events from "./components/Events.jsx";
import CallToAction from "./components/CallToAction.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="font-sans bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Mission />
      <Zonta100Years />
      <Events />
      <CallToAction />
      <Footer />
    </div>
  );
}
