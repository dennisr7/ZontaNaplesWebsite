// src/pages/Events.jsx
import EventsList from "../components/EventsList";

function EventsPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-16 px-6 flex flex-col items-center overflow-hidden">
      {/* Gradient background matching all interior pages */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/80 via-yellow-700/70 to-red-900/90" />

      {/* Foreground content container */}
      <div className="relative z-10 w-full max-w-6xl">
        <EventsList />
      </div>
    </main>
  );
}

export default EventsPage;
