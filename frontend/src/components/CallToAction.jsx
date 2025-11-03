// src/components/CallToAction.jsx
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-b from-red-800/90 to-yellow-600/90 text-white py-16 text-center">
      <h3 className="text-3xl font-bold mb-4">Be Part of the Change</h3>
      <p className="text-lg mb-6">Join us in making a difference in our community and beyond.</p>
      <Link 
        to="/membership"
        onClick={() => window.scrollTo(0, 0)}
        className="inline-block bg-white text-yellow-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-100 transition"
      >
        Become a Member
      </Link>
    </section>
  );
}