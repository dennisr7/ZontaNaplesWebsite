export default function STEMApply() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-yellow-800 mb-4">
        Women in STEM Scholarship Application
      </h1>
      <p className="text-gray-700 mb-6">
        This scholarship supports women pursuing degrees or careers in science,
        technology, engineering, and mathematics — fields where women remain
        underrepresented.
      </p>
      <form className="space-y-4 bg-white shadow p-6 rounded-lg">
        <input type="text" placeholder="Full Name" className="w-full border rounded px-3 py-2" />
        <input type="email" placeholder="Email" className="w-full border rounded px-3 py-2" />
        <input type="text" placeholder="STEM Major" className="w-full border rounded px-3 py-2" />
        <textarea placeholder="Describe your career goals in STEM..." className="w-full border rounded px-3 py-2 h-32" />
        <button className="bg-yellow-700 text-white py-2 px-5 rounded hover:bg-yellow-800 transition">
          Submit Application
        </button>
      </form>
    </div>
  );
}
