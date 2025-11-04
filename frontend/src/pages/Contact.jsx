// src/pages/Contact.jsx
export default function Contact() {
  return (
    <main className="relative min-h-screen pt-32 px-6 flex flex-col items-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/80 via-yellow-700/70 to-red-900/90" />

      <div className="relative z-10 w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-white">Contact Zonta Club of Naples</h1>
        <p className="text-lg mb-12 text-white/90">
          Have questions or want to get involved? We'd love to hear from you. <br />You can also reach us at info@zonta-naples.org
        </p>

        <form className="w-full bg-white shadow-lg rounded-2xl p-8 space-y-6 text-left">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">Name</label>
            <input type="text" placeholder="Your full name"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">Email</label>
            <input type="email" placeholder="you@example.com"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">Subject</label>
            <input type="text" placeholder="What is this regarding?"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">Message</label>
            <textarea rows="5" placeholder="Write your message here..."
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            Send Message
          </button>
        </form>

        <img
          src="/src/assets/zonta-full-logo.png"
          alt="Zonta Club Full Logo"
          className="mx-auto mt-10 w-48 opacity-90 hover:opacity-100 transition duration-300"
        />
      </div>
    </main>
  );
}