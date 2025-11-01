// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar({ backgroundColor = 'default' }) {
  return (
    <nav className={`fixed top-0 left-0 w-full border-b border-white z-50 ${
      backgroundColor === 'blue' 
        ? 'bg-[#6EC1E4]' 
        : 'bg-yellow-600'
    }`}>
      <div className="w-full flex justify-between items-center px-20 py-4">
        {/* Logo -> Home route */}
        <Link to="/">
          <img
            src="/src/assets/zonta-logo.png"
            alt="Zonta Club of Naples logo"
            className="h-12"
          />
        </Link>

        <ul className="hidden md:flex space-x-8 text-[18px] font-[Playfair_Display] font-medium text-white">
          {/* Anchors into the Home page sections */}
          <li><a href="/#home" className="hover:text-yellow-700">HOME</a></li>
          <li><a className="hover:text-yellow-700">SERVICE</a></li>
          <li><a className="hover:text-yellow-700">ADVOCACY</a></li>

          {/* Real page route */}
          <li>
            <Link
              to="/contact"
              className="border border-white px-4 py-3 rounded-sm hover:bg-white hover:text-yellow-700 transition"
            >
              CONTACT
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}