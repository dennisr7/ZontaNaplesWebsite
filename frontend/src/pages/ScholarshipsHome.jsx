// src/pages/ScholarshipsHome.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ScholarshipsHome() {
  const scholarships = [
    {
      title: "Young Women in Public Affairs (YWPA) Scholarship",
      desc:
        "Recognizes young women ages 16–19 who demonstrate leadership in public policy, the volunteer sector, and advocacy for women's rights.",
      img: "/scholarships/ywpa.jpg",
      externalLink:
        "https://www.zonta.org/Web/Programs/Education/Zonta_Young_Women_in_Leadership_Award.aspx?hkey=95bdfa33-5efe-457e-b3bb-9e9e59500161&WebsiteKey=fa59e7e8-9db0-4736-b8df-7a6476fb9063",
    },
    {
      title: "Women in STEM Scholarship",
      desc:
        "Supports women pursuing degrees or careers in science, technology, engineering, or mathematics — fields where women remain underrepresented.",
      img: "/scholarships/stem.jpg",
      externalLink:
        "https://www.zonta.org/Web/Programs/Education/Women_in_STEM_Scholarship",
    },
    {
      title: "FGCU Memorial Scholarship Endowment Fund",
      desc:
        "Established November 7, 2019 at Florida Gulf Coast University in honor of Helen “Honey” Koenig Gardiner & Sally Sitta. A $25,000 fund to empower women students.",
      img: "/scholarships/fgcu-check1.jpg",
      link: "/scholarships/fgcu-apply",
    },
  ];

  return (
    <main className="relative min-h-screen pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Global gradient background to match other pages */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/80 via-yellow-700/70 to-red-900/90" />

      <div className="relative z-10 max-w-6xl mx-auto pb-16">
        {/* Hero Header */}
        <section className="text-center mb-10">
          {/* Zonta Logo */}
          <img
            src="/src/assets/zonta-full-logo.png"
            alt="Zonta Club Full Logo"
            className="mx-auto mb-6 w-40 sm:w-48 opacity-90"
          />

          <h1 className="text-4xl font-bold text-white font-[Montserrat] mb-3">
            Scholarships
          </h1>
          <p className="text-sm uppercase tracking-wide text-yellow-200 mb-4">
            Kim Artis, Scholarship Chair
          </p>

          <p className="italic text-lg text-white/90 max-w-3xl mx-auto">
            “We have proven over the years that by working together across political
            and social boundaries – we can make a difference!”
          </p>
        </section>

        {/* Story / FGCU section */}
        <section className="mb-12">
          <div className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6 sm:p-8 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="/scholarships/fgcu-check2.jpg"
                alt="Zonta Club presenting check to FGCU"
                className="rounded-xl shadow-lg object-cover w-full h-auto mt-2 md:mt-0"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-zonta-burgundy mb-4">
                The Zonta Club of Naples Makes History
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                On November 7, 2019, a Memorial Scholarship Endowed Fund was
                established at Florida Gulf Coast University in the names of two
                past Zontians, Helen “Honey” Koenig Gardiner and Sally Sitta, and
                The Zonta Club of Naples in the amount of{" "}
                <strong>$25,000</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe that investing in women’s education is investing in the
                future of our community, and the world. Explore our scholarship
                opportunities below and apply to join the impact.
              </p>
            </div>
          </div>
        </section>

        {/* Scholarship Cards */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center text-white mb-6">
            Explore Our Scholarship Opportunities
          </h3>
          <div className="w-24 h-1 bg-zonta-gold mx-auto mb-8 rounded-full" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {scholarships.map((s, i) => (
              <div
                key={i}
                className="bg-white/95 backdrop-blur rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-semibold text-zonta-burgundy mb-2">
                    {s.title}
                  </h4>
                  <p className="text-gray-700 mb-4 flex-grow">{s.desc}</p>

                  {s.externalLink ? (
                    <a
                      href={s.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-block bg-gradient-to-r from-yellow-700 to-yellow-800 text-white px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:from-yellow-800 hover:to-yellow-900 transition-all duration-300 text-sm font-semibold text-center"
                    >
                      Learn More &amp; Apply
                    </a>
                  ) : (
                    <Link
                      to={s.link}
                      className="mt-auto inline-block bg-gradient-to-r from-yellow-700 to-yellow-800 text-white px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:from-yellow-800 hover:to-yellow-900 transition-all duration-300 text-sm font-semibold text-center"
                    >
                      Learn More &amp; Apply
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="text-center">
          <p className="max-w-3xl mx-auto text-white/90 mb-6">
            Have questions about eligibility, deadlines, or the application
            process? Reach out to our Scholarship Chair – we’re here to help you
            navigate and succeed.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </main>
  );
}
