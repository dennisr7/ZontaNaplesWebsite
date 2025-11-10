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
      externalLink: "https://www.zonta.org/Web/Programs/Education/Women_in_STEM_Scholarship",
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
    <div className="bg-white text-gray-900 pt-24">
      {/* Hero Header */}
      <section className="bg-[#5C1E0D] text-white text-center py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold uppercase mb-4">
            Scholarships | Kim Artis, Chairperson
          </h1>
          <p className="italic text-xl mb-2">
            “We have proven over the years that by working together across political and social boundaries – we can make a difference!”
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src="/scholarships/fgcu-check2.jpg"
            alt="Zonta Club presenting check to FGCU"
            className="rounded-lg shadow-lg object-cover w-full h-auto mt-2 md:mt-6"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-yellow-800 mb-4">
            The Zonta Club of Naples Makes History!
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            On November 7, 2019, a Memorial Scholarship Endowed Fund was established at Florida Gulf Coast University in the names of two past Zontians, Helen “Honey” Koenig Gardiner and Sally Sitta, and The Zonta Club of Naples in the amount of <strong>$25,000</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We believe that investing in women’s education is investing in the future of our community, and the world. Explore our scholarship opportunities below and apply to join the impact.
          </p>
        </div>
      </section>

      {/* Scholarship Cards */}
      <section className="bg-yellow-50 py-12 px-4">
        <h3 className="text-3xl font-bold text-center text-yellow-800 mb-10">
          Explore Our Scholarship Opportunities
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {scholarships.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col h-full"
            >
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-48 object-cover"
              />

              {/* Flex column to push button to bottom */}
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-semibold text-yellow-700 mb-2">
                  {s.title}
                </h4>
                <p className="text-gray-700 mb-4 flex-grow">{s.desc}</p>

                {/* Button at the bottom */}
                {s.externalLink ? (
                  <a
                    href={s.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-block bg-gradient-to-r from-yellow-700 to-yellow-800 text-white px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:from-yellow-800 hover:to-yellow-900 transition-all duration-300 ease-in-out"
                  >
                    Learn More & Apply
                  </a>
                ) : (
                  <Link
                    to={s.link}
                    className="mt-auto inline-block bg-gradient-to-r from-yellow-700 to-yellow-800 text-white px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:from-yellow-800 hover:to-yellow-900 transition-all duration-300 ease-in-out"
                  >
                    Learn More & Apply
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-14 px-4 text-center">
        <p className="max-w-3xl mx-auto text-gray-700 mb-6">
          Have questions about eligibility, deadlines or the application process? Reach out to our Scholarship Chair – we’re here to help you navigate and succeed.
        </p>
        <Link
          to="/contact"
          className="bg-yellow-800 text-white px-6 py-3 rounded-full hover:bg-yellow-900 transition"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
