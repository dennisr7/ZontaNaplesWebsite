// src/components/Footer.jsx
export default function Footer() {
    return (
      <footer id="contact" className="bg-red-900 text-gray-300 py-10 text-center">
        <h4 className="text-xl font-bold text-white mb-2">Zonta Club of Naples</h4>
        <p>Empowering Women Through Service & Advocacy</p>
        <p className="mt-4">© {new Date().getFullYear()} Zonta Club of Naples. All Rights Reserved.</p>
      </footer>
    );
  }
  