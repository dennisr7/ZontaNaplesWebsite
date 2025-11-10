// src/pages/FGCUApply.jsx
export default function FGCUApply() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-yellow-800 mb-4">
        FGCU Memorial Scholarship Endowment Fund Application
      </h1>
      <p className="text-gray-700 mb-6">
        This scholarship honors Helen “Honey” Koenig Gardiner and Sally Sitta,
        supporting students at Florida Gulf Coast University who exemplify Zonta’s
        mission of advancing the status of women.
      </p>
      <form className="space-y-4 bg-white shadow p-6 rounded-lg">
        <input type="text" placeholder="Full Name" className="w-full border rounded px-3 py-2" />
        <input type="email" placeholder="Email" className="w-full border rounded px-3 py-2" />
        <input type="text" placeholder="Student ID / FGCU ID" className="w-full border rounded px-3 py-2" />
        <textarea placeholder="Why are you applying for this scholarship?" className="w-full border rounded px-3 py-2 h-32" />
        <button className="bg-yellow-700 text-white py-2 px-5 rounded hover:bg-yellow-800 transition">
          Submit Application
        </button>
      </form>
    </div>
  );
}
