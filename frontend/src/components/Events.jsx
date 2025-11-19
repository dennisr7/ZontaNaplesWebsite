// src/components/Events.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventAPI } from '../utils/apiService';

export default function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const result = await eventAPI.getAllEvents();
        // Filter out past events, sort by date, and get first 3
        const now = new Date();
        const upcoming = (result.data || [])
          .filter(event => new Date(event.date) >= now)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);
        setUpcomingEvents(upcoming);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUpcomingEvents();
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <section id="events" className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-red-800 mb-10">Upcoming Events</h3>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold text-red-800 mb-10">Upcoming Events</h3>
        {upcomingEvents.length === 0 ? (
          <p className="text-gray-600">No upcoming events at this time.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <h4 className="text-xl font-semibold text-red-800 mb-2">{event.title}</h4>
                <p className="text-gray-600 mb-4">{formatDate(event.date)}</p>
                <Link to="/events">
                  <button className="bg-red-800 text-white px-4 py-2 rounded-full hover:bg-yellow-800 transition-colors duration-200">
                    Learn More
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
