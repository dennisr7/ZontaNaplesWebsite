// src/components/Sponsor.jsx
export default function Sponsor() {
  return (
    <section className="bg-red-800 py-16 text-center">
      <h3 className="text-3xl font-bold text-white mb-10">
        Zonta Club of Naples supports these proud sponsors!
      </h3>

      <div className="flex flex-wrap justify-center items-center gap-10 px-6">
        <img
          src="/src/assets/sponsor1.png"
          alt="Sponsor 1"
          className="w-48 h-auto hover:scale-105 transition-transform duration-300"
        />
        <img
          src="/src/assets/sponsor2.png"
          alt="Sponsor 2"
          className="w-48 h-auto hover:scale-105 transition-transform duration-300"
        />
        <img
          src="/src/assets/sponsor3.png"
          alt="Sponsor 3"
          className="w-48 h-auto hover:scale-105 transition-transform duration-300"
        />
        <img
          src="/src/assets/sponsor4.png"
          alt="Sponsor 4"
          className="w-48 h-auto hover:scale-105 transition-transform duration-300"
        />
        <img
          src="/src/assets/sponsor5.png"
          alt="Sponsor 5"
          className="w-48 h-auto hover:scale-105 transition-transform duration-300"
        />
        <img
          src="/src/assets/sponsor6.png"
          alt="Sponsor 6"
          className="w-48 h-auto hover:scale-105 transition-transform duration-300"
        />
      </div>
    </section>
  );
}
