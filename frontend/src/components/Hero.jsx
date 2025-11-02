import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-center text-white px-4 overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: "url('/src/assets/zonta-women.png')",
          backgroundPosition: "center 80px",
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/80 via-yellow-700/70 to-red-900/90"></div>

      {/* Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/src/assets/zonta-full-logo.png"
          alt="Zonta Club of Naples full logo"
          className="mx-auto mb-6 w-60"
        />
        <h2 className="text-7xl font-bold mb-16 font-[Montserrat] tracking-wide">
          Zonta Club of Naples
        </h2>
        <h2 className="text-5xl font-bold mb-4">
          Empowering Women, Changing Lives
        </h2>
        <p className="text-xl mb-8">
          Zonta Club of Naples is dedicated to advancing the status of women
          through service and advocacy.
        </p>

        <div className="space-x-4">
          {/* ✅ Updated Join Us button */}
          <Link
            to="/membership"
            className="inline-block bg-white text-yellow-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-100 transition"
          >
            Join Us
          </Link>

          {/* ✅ Donate button */}
          <Link
            to="/donate"
            className="inline-block bg-yellow-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-700 transition"
          >
            Donate
          </Link>
        </div>
      </motion.div>
    </section>
  );
}