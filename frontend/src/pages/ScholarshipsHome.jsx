// src/pages/ScholarshipsHome.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ScholarshipsHome() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/scholarship-listings`);
      const data = await response.json();
      
      if (data.success) {
        setScholarships(data.data);
      }
    } catch (err) {
      console.error('Failed to load scholarships:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    const localDate = new Date(year, month, day);
    return localDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownloadAttachment = async (doc) => {
    try {
      // Cloudinary URLs can be downloaded directly
      const response = await fetch(doc.cloudinaryUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = doc.originalName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      console.log('Downloaded:', doc.originalName);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please try again.');
    }
  };

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
            "We have proven over the years that by working together across political
            and social boundaries – we can make a difference!"
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
                past Zontians, Helen "Honey" Koenig Gardiner and Sally Sitta, and
                The Zonta Club of Naples in the amount of{" "}
                <strong>$25,000</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe that investing in women's education is investing in the
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

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4"></div>
                <p className="text-white">Loading scholarships...</p>
              </div>
            </div>
          ) : scholarships.length === 0 ? (
            <div className="bg-white/95 backdrop-blur rounded-2xl p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Active Scholarships</h3>
              <p className="text-gray-600">Check back later for new scholarship opportunities!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {scholarships.map((s) => (
                <div
                  key={s._id}
                  className="bg-white/95 backdrop-blur rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                  <img
                    src={s.image.url}
                    alt={s.image.alt || s.title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-xl font-semibold text-zonta-burgundy flex-1">
                        {s.title}
                      </h4>
                      <span className="bg-zonta-burgundy text-white px-3 py-1 rounded-lg font-bold text-sm whitespace-nowrap">
                        {formatCurrency(s.amount)}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4 flex-grow line-clamp-3">
                      {s.shortDescription || s.description}
                    </p>

                    {/* Deadline */}
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">Deadline: {formatDate(s.deadline)}</span>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3 mt-auto">
                      {s.learnMoreUrl && (
                        <a
                          href={s.learnMoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-gray-100 text-zonta-burgundy px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300 text-sm font-semibold text-center"
                        >
                          Learn More
                        </a>
                      )}
                      
                      <Link
                        to={`/scholarship-apply?id=${s._id}`}
                        className="inline-block bg-gradient-to-r from-yellow-700 to-yellow-800 text-white px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:from-yellow-800 hover:to-yellow-900 transition-all duration-300 text-sm font-semibold text-center"
                      >
                        Apply Now
                      </Link>

                      {/* Download Attachment */}
                      {s.attachmentFile && (
                        <button
                          onClick={() => handleDownloadAttachment(s.attachmentFile)}
                          className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300 text-xs font-semibold text-center flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Footer CTA */}
        <section className="text-center">
          <p className="max-w-3xl mx-auto text-white/90 mb-6">
            Have questions about eligibility, deadlines, or the application
            process? Reach out to our Scholarship Chair – we're here to help you
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
