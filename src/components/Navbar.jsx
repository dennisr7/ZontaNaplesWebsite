// src/components/Navbar.jsx
export default function Navbar() {
    return (
      <nav className="fixed top-0 left-0 w-full bg-yellow-600 border-b border-white z-50">
        <div className="w-full flex justify-between items-center px-20 py-4">
          <img src="/src/assets/zonta-logo.png" alt="Zonta Club of Naples logo" className="h-12" />
          <ul className="hidden md:flex space-x-8 text-[18px] font-[Playfair_Display] font-medium text-white">
            <li><a href="#home" className="hover:text-yellow-700">HOME</a></li>
            <li><a href="#about" className="hover:text-yellow-700">ABOUT</a></li>
            <li><a href="#events" className="hover:text-yellow-700">EVENTS</a></li>
            <li><a href="#contact" className="border border-white px-4 py-3 rounded-sm hover:bg-white hover:text-yellow-700 transition">CONTACT</a></li>
          </ul>
        </div>
      </nav>
    );
  }
  