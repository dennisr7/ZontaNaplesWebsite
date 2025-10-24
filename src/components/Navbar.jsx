// src/components/Navbar.jsx
export default function Navbar() {
    return (
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-yellow-700">Zonta Club of Naples</h1>
          <ul className="hidden md:flex space-x-6 text-lg">
            <li><a href="#home" className="hover:text-yellow-700">Home</a></li>
            <li><a href="#about" className="hover:text-yellow-700">About</a></li>
            <li><a href="#events" className="hover:text-yellow-700">Events</a></li>
            <li><a href="#contact" className="hover:text-yellow-700">Contact</a></li>
          </ul>
        </div>
      </nav>
    );
  }
  