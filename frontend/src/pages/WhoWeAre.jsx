// src/pages/WhoWeAre.jsx
import React from "react";

export default function WhoWeAre() {
  return (
    <main className="relative min-h-screen pt-32 px-6 flex flex-col items-center text-center overflow-hidden">
      {/* Background gradient (same as Contact/Membership/Events) */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/80 via-yellow-700/70 to-red-900/90" />

      {/* Transparent content wrapper */}
      <section className="relative z-10 w-full max-w-3xl bg-transparent shadow-none px-4 py-12 mb-20">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide uppercase mb-4 font-[Montserrat]">
          Officers and Board of Directors
        </h1>
        <div className="w-24 h-1 bg-zonta-gold mx-auto mb-8" />

        {/* Officers */}
        <div className="space-y-2 mb-12 text-sm md:text-lg">
          <p className="font-semibold text-white">
            Jane Kolczun <span className="text-white/80">| President</span>
          </p>
          <p className="font-semibold text-white">
            Adele Hunter <span className="text-white/80">| Vice President</span>
          </p>
          <p className="font-semibold text-white">
            Adele Hunter <span className="text-white/80">| Secretary</span>
          </p>
          <p className="font-semibold text-white">
            Norine Carlson Weber <span className="text-white/80">| Treasurer</span>
          </p>
          <p className="font-semibold text-white">
            Marianne Kearns <span className="text-white/80">| Director</span>
          </p>
          <p className="font-semibold text-white">
            Susie Mehas <span className="text-white/80">| Director</span>
          </p>
        </div>

        {/* Committee Chairs */}
        <h2 className="text-2xl md:text-3xl font-bold text-white uppercase mb-4 font-[Montserrat]">
          Committee Chairs
        </h2>
        <div className="w-24 h-1 bg-zonta-gold mx-auto mb-8" />

        <div className="space-y-2 text-sm md:text-lg">
          <p className="font-semibold text-white">
            Advocacy <span className="text-white/80">| Susan Housel</span>
          </p>
          <p className="font-semibold text-white">
            Fellowship <span className="text-white/80">| Marianne Kearns</span>
          </p>
          <p className="font-semibold text-white">
            Fundraising <span className="text-white/80">| Susie Mehas</span>
          </p>
          <p className="font-semibold text-white">
            Membership{" "}
            <span className="text-white/80">| Pastor Mary Stockton</span>
          </p>
          <p className="font-semibold text-white">
            Service <span className="text-white/80">| Adele Hunter</span>
          </p>
          <p className="font-semibold text-white">
            Meeting Coordinator{" "}
            <span className="text-white/80">| Barbara Haman</span>
          </p>
          <p className="font-semibold text-white">
            Facebook Administrator <span className="text-white/80">| TBD</span>
          </p>
          <p className="font-semibold text-white">
            50 Year Club Anniversary Chairperson{" "}
            <span className="text-white/80">| Jean Sloan</span>
          </p>
          <p className="font-semibold text-white">
            Club Historian{" "}
            <span className="text-white/80">| Lori Carpenter</span>
          </p>
        </div>
      </section>
    </main>
  );
}
