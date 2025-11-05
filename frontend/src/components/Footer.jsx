// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer({ backgroundColor = 'default' }) {
  const getBackgroundStyles = () => {
    switch(backgroundColor) {
      case 'blue':
        return 'bg-[#6EC1E4]';
      case 'red':
        return 'bg-red-900/90 backdrop-blur-md m-0 border-0';
      default: // yellow
        return 'bg-yellow-600/90 backdrop-blur-md m-0 border-0';
    }
  };

  return (
    <footer 
      id="contact" 
      className={`text-gray-300 py-10 ${getBackgroundStyles()}`}
      style={{ margin: 0, border: 'none' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Organization Info */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h4 className="text-xl font-bold text-white mb-2">Zonta Club of Naples</h4>
            <p className="mb-2">Empowering Women Through Service & Advocacy</p>
            <p>© {new Date().getFullYear()} Zonta Club of Naples. All Rights Reserved.</p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col items-center md:items-end space-y-2">
            <Link 
              to="/faq" 
              className="text-white hover:text-yellow-300 transition-colors duration-200 font-medium"
            >
              FAQ
            </Link>
            <Link 
              to="/login" 
              className="text-white hover:text-yellow-300 transition-colors duration-200 font-medium"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}