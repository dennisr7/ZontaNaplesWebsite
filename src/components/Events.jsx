// src/components/Events.jsx
import { motion } from "framer-motion";

const events = [
  { title: "Community Service Day", date: "Nov 12, 2025" },
  { title: "Fundraising Gala", date: "Dec 5, 2025" },
  { title: "Leadership Workshop", date: "Jan 20, 2026" },
];

export default function Events() {
  return (
    <section id="events" className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold text-yellow-800 mb-10">Upcoming Events</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <h4 className="text-xl font-semibold text-yellow-800 mb-2">{event.title}</h4>
              <p className="text-gray-600 mb-4">{event.date}</p>
              <button className="bg-yellow-700 text-white px-4 py-2 rounded-full hover:bg-yellow-800">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
