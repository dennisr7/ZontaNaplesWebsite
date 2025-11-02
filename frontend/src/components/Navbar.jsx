// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar({ backgroundColor = 'default' }) {
  // Function to handle scroll to top
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Function to handle home link with hash
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      // Already on home page, scroll to top
      window.scrollTo(0, 0);
    } else {
      // Navigate to home and scroll to top
      window.scrollTo(0, 0);
      window.location.href = '/#home';
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full border-b border-white z-50 ${
      backgroundColor === 'blue' 
        ? 'bg-[#6EC1E4]' 
        : 'bg-yellow-600'
    }`}>
      <div className="w-full flex justify-between items-center px-20 py-4">
        {/* Logo -> Home route */}
        <Link 
          to="/" 
          onClick={scrollToTop}
        >
          <img
            src="/src/assets/zonta-logo.png"
            alt="Zonta Club of Naples logo"
            className="h-12"
          />
        </Link>

        <ul className="hidden md:flex space-x-8 text-[18px] font-[Playfair_Display] font-medium text-white">
          {/* Home link with scroll to top */}
          <li>
            <a 
              href="/#home" 
              className="hover:text-yellow-700"
              onClick={handleHomeClick}
            >
              HOME
            </a>
          </li>
          
          {/* Service link - placeholder for now */}
          <li>
            <a 
              className="hover:text-yellow-700 cursor-pointer"
              onClick={scrollToTop}
            >
              SERVICE
            </a>
          </li>
          
          {/* Advocacy link - placeholder for now */}
          <li>
            <a 
              className="hover:text-yellow-700 cursor-pointer"
              onClick={scrollToTop}
            >
              ADVOCACY
            </a>
          </li>

          {/* FAQ page link */}
          <li>
            <Link
              to="/faq"
              onClick={scrollToTop}
              className="hover:text-yellow-700 transition"
            >
              FAQ
            </Link>
          </li>

          {/* Contact page link */}
          <li>
            <Link
              to="/contact"
              onClick={scrollToTop}
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