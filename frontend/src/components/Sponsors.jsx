// src/components/Sponsor.jsx
export default function Sponsor() {
  return (
    <section className="bg-red-800/90 py-16 text-center">
      <h3 className="text-3xl font-bold text-white mb-10">
        Zonta Club of Naples supports these proud sponsors!
      </h3>

      <div className="flex flex-wrap justify-center items-center gap-10 px-6">
        <a
          href="https://www.cancer.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/src/assets/sponsor1.png"
            alt="American Cancer Society"
            className="w-48 h-auto hover:scale-105 transition-transform duration-300"
          />
        </a>

        <a
          href="https://www.habitat.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/src/assets/sponsor2.png"
            alt="Habitat for Humanity"
            className="w-48 h-auto hover:scale-105 transition-transform duration-300"
          />
        </a>

        <a
          href="https://naplesshelter.org/front/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/src/assets/sponsor3.png"
            alt="Naples Shelter"
            className="w-48 h-auto hover:scale-105 transition-transform duration-300"
          />
        </a>

        <a
          href="https://path2freedom.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/src/assets/sponsor4.png"
            alt="Path 2 Freedom"
            className="w-48 h-auto hover:scale-105 transition-transform duration-300"
          />
        </a>

        <a
          href="https://projecthelpnaples.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/src/assets/sponsor5.png"
            alt="Project Help Naples"
            className="w-48 h-auto hover:scale-105 transition-transform duration-300"
          />
        </a>

        <a
          href="https://www.pacecenter.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/src/assets/sponsor6.png"
            alt="PACE Center for Girls"
            className="w-48 h-auto hover:scale-105 transition-transform duration-300"
          />
        </a>
      </div>
    </section>
  );
}

