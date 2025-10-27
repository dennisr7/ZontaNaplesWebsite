// src/components/Zonta100Years.jsx
export default function Zonta100Years() {
  return (
    <section
      id="zonta100"
      className="relative overflow-hidden py-10 text-center px-6"
      style={{ backgroundColor: '#6EC1E4' }}
    >

      {/* Center Logo */}
      <img
        src="/src/assets/Zonta100years.png"
        alt="Zonta 100 Years Logo"
        className="mx-auto mb-1 w-80 h-auto"
      />

      <h3 className="text-5xl font-bold text-yellow-400 mb-6 font-[Montserrat]">
        Celebrating 100 Years
      </h3>
      <p className="text-lg leading-relaxed text-white max-w-3xl mx-auto mb-12">
        For a century, Zonta International has worked to advance the status of
        women through service and advocacy. The Zonta Club of Naples proudly
        continues this legacy, striving for equality, education, and
        empowerment worldwide.
      </p>
    </section>
  );
}




