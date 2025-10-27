// src/components/Hero.jsx
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="h-screen bg-gradient-to-b from-yellow-600 via-yellow-600 to-red-800
 flex items-center justify-center text-center text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img src="/src/assets/zonta-full-logo.png" alt="Zonta Club of Naples full logo" className="mx-auto mb-6 w-60" />
        <h2 className="text-7xl font-bold mb-16 font-[Montserrat] tracking-wide">Zonta Club of Naples</h2>
        <h2 className="text-5xl font-bold mb-4">Empowering Women, Changing Lives</h2>
        <p className="text-xl mb-8">
          Zonta Club of Naples is dedicated to advancing the status of women through service and advocacy.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-yellow-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-100">Join Us</button>
          <button className="bg-yellow-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-700">Donate</button>
        </div>
      </motion.div>
    </section>
  );
}