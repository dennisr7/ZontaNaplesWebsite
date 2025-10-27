// src/components/Mission.jsx
export default function Mission() {
  return (
    <section id="about" className="py-20 max-w-6xl mx-auto text-center px-6">
      <h3 className="text-3xl font-bold text-yellow-800 mb-6">Our Mission</h3>
      <p className="text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto mb-12">
        Zonta Club of Naples is part of a global organization of professionals empowering women worldwide through service and advocacy.
        We envision a world in which women's rights are recognized as human rights and every woman is able to achieve her full potential.
      </p>

      {/* Icons Row */}
      <div className="flex justify-center space-x-20 mt-10">
        <img src="/src/assets/zonta-advocacy-scale.png" alt="Advocacy" className="w-32 h-32" />
        <img src="/src/assets/zonta-scholarship-books.png" alt="Scholarship" className="w-32 h-32" />
        <img src="/src/assets/zonta-service-hands.png" alt="Service" className="w-32 h-32" />
      </div>
    </section>
  );
}

  