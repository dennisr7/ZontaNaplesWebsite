// src/pages/Events.jsx
import { motion } from "framer-motion";
import { EVENTS } from "../data/events";

export default function Events() {
  return (
    <main className="relative min-h-screen pt-32 px-6 flex flex-col items-center text-center overflow-hidden">
      {/* Background gradient matching other pages */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/80 via-yellow-700/70 to-red-900/90" />

      <div className="relative z-10 w-full max-w-6xl">
        {/* Zonta Logo at top */}
        <img
          src="/src/assets/zonta-full-logo.png"
          alt="Zonta Club Full Logo"
          className="mx-auto mb-8 w-48 opacity-90 hover:opacity-100 transition duration-300"
        />

        <h1 className="text-4xl font-bold mb-4 text-white">Upcoming Events</h1>
        <p className="text-lg mb-12 text-white/90">
          Join us at our upcoming events and help make a difference in our community
        </p>

        <div className="w-full bg-white shadow-lg rounded-2xl p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENTS.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-50 rounded-xl shadow-md p-6 text-center border border-gray-200"
              >
                <h3 className="text-xl font-bold text-red-800 mb-3">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600 font-semibold">📅 {event.date}</p>
                  <p className="text-gray-600">⏰ {event.time}</p>
                  <p className="text-gray-600">📍 {event.location}</p>
                </div>
                <p className="text-gray-700 mb-4 text-sm">{event.description}</p>
                <button className="bg-red-800 text-white px-6 py-2 rounded-full hover:bg-yellow-800 transition-colors duration-200">
                  RSVP Now
                </button>
              </motion.div>
            ))}
          </div>

          {/* Message if no events */}
          {EVENTS.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No upcoming events at the moment. Please check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}