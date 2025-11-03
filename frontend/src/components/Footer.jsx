// src/components/Footer.jsx
export default function Footer({ backgroundColor = 'default' }) {
  const getBackgroundStyles = () => {
    switch(backgroundColor) {
      case 'blue':
        return 'bg-[#6EC1E4]';
      case 'red':
        // Exact glassy red from donation page bottom (red-900/90)
        return 'bg-red-900/90 backdrop-blur-md m-0 border-0';
      default: // yellow
        return 'bg-yellow-600/90 backdrop-blur-md m-0 border-0'; // Added /90 and backdrop-blur
    }
  };

  return (
    <footer 
      id="contact" 
      className={`text-gray-300 py-10 text-center ${getBackgroundStyles()}`}
      style={{ margin: 0, border: 'none' }}
    >
      <div className="m-0 p-0">
        <h4 className="text-xl font-bold text-white mb-2">Zonta Club of Naples</h4>
        <p>Empowering Women Through Service & Advocacy</p>
        <p className="mt-4">© {new Date().getFullYear()} Zonta Club of Naples. All Rights Reserved.</p>
      </div>
    </footer>
  );
}