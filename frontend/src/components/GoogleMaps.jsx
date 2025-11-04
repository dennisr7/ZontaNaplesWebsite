// src/components/Mission.jsx
import { motion } from "framer-motion";

export default function Mission() {
  return (
    <section id="about" className="bg-gray-100 py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-10">
        
        {/* Text Section (Left Side) */}
        <div className="flex-1">
          <motion.h3
            className="text-3xl font-bold text-yellow-600 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Join us for our next meeting!
          </motion.h3>

          <motion.p
            className="text-lg leading-relaxed text-gray-700 max-w-md mx-auto md:mx-0 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
          >
            We meet the first Tuesday of every month at the Collier Community Foundation or via Zoom call.
          </motion.p>

          <motion.h3
            className="text-2xl font-bold text-yellow-600 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            The Collier Community Foundation <br />
            1110 Pine Ridge Rd Ste 200, Naples, FL 34108
          </motion.h3>
        </div>

        {/* Image Section (Right Side with Link) */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <a
            href="https://www.google.com/maps/place/Collier+Community+Foundation/@26.2111588,-81.7987518,17.21z/data=!3m1!5s0x88db1e6b9b284415:0x9eb3f1c0fb63443a!4m6!3m5!1s0x88dae1e7a398639b:0x45596724d5304443!8m2!3d26.2109188!4d-81.7966863!16s%2Fg%2F1td48skv?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3Dy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/src/assets/zonta-map.png"
              alt="Map of Zonta Meeting Location"
              className="rounded-2xl shadow-lg w-full max-w-md hover:scale-105 transition-transform duration-300"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
