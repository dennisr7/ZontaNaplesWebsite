// src/components/Facebook.jsx
import { useState } from "react";

export default function Facebook() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: "/src/assets/zonta1.png", alt: "Zonta Event 1" },
    { src: "/src/assets/zonta2.png", alt: "Zonta Event 2" },
    { src: "/src/assets/zonta3.png", alt: "Zonta Event 3" },
  ];

  return (
    <section id="about" className="py-20 max-w-6xl mx-auto text-center px-6">
      {/* Header section (text + logo side by side) */}
      <div className="flex justify-center items-center gap-3 mb-6">
        <h3 className="text-4xl font-bold" style={{ color: "#1877F2" }}>
          Follow us on social media
        </h3>

        <a
          href="https://www.facebook.com/ZontaNaples/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/src/assets/facebook-logo.png"
            alt="Facebook Logo"
            className="w-20 h-20 hover:scale-110 transition-transform duration-200"
          />
        </a>
      </div>

      {/* Gallery Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {images.map((image) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 h-80 object-cover cursor-pointer"
            onClick={() => setSelectedImage(image.src)}
          />
        ))}
      </div>

      {/* Fullscreen Overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Fullscreen View"
            className="max-h-[90%] max-w-[90%] rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
