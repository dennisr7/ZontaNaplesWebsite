// src/pages/Membership.jsx
export default function Membership() {
  return (
    <main className="relative min-h-screen pt-32 px-6 flex flex-col items-center text-center overflow-hidden">
      {/* Gradient background matching other pages */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/80 via-yellow-700/70 to-red-900/90" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Zonta Logo at top */}
        <img
          src="/src/assets/zonta-full-logo.png"
          alt="Zonta Club Full Logo"
          className="mx-auto mb-8 w-48 opacity-90"
        />

        {/* Added Montserrat font to title */}
        <h1 className="text-4xl font-bold mb-4 text-white font-[Montserrat]">Join Zonta Club of Naples</h1>
        <p className="text-lg mb-12 text-white/90">
          Become part of a global network of professionals empowering women and girls through service and advocacy.
        </p>

        {/* Membership Benefits */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Join Zonta?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                  <span className="text-yellow-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Professional Networking</h3>
                  <p className="text-gray-600 text-sm">Connect with like-minded professionals in your community</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                  <span className="text-yellow-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Leadership Development</h3>
                  <p className="text-gray-600 text-sm">Grow your skills through committee work and leadership roles</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                  <span className="text-yellow-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Service Projects</h3>
                  <p className="text-gray-600 text-sm">Make a direct impact through local and international service</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                  <span className="text-yellow-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Advocacy Work</h3>
                  <p className="text-gray-600 text-sm">Advocate for women's rights and gender equality</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                  <span className="text-yellow-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Global Community</h3>
                  <p className="text-gray-600 text-sm">Join 28,000+ members in 61 countries worldwide</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                  <span className="text-yellow-600 font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Scholarship Support</h3>
                  <p className="text-gray-600 text-sm">Help provide educational opportunities for women and girls</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Membership Application Form */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Membership Application</h2>
          <p className="text-gray-600 mb-6">Please complete all sections of this application</p>

          <form className="space-y-8 text-left">
            {/* Personal Information */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
                </div>
              </div>
            </div>

            {/* Membership Information */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Membership Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Membership Level *</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" required>
                    <option value="">Select membership level</option>
                    <option value="active">Active Member - $150/year</option>
                    <option value="young">Young Professional (under 35) - $75/year</option>
                    <option value="student">Student Member - $25/year</option>
                    <option value="retired">Retired Member - $75/year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">How did you hear about Zonta Club of Naples?</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600">
                    <option value="">Select an option</option>
                    <option value="friend">Friend/Colleague</option>
                    <option value="event">Community Event</option>
                    <option value="website">Website/Social Media</option>
                    <option value="news">News Article</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Previous Zonta Membership?</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name="previous_member" value="yes" className="mr-2" />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="previous_member" value="no" className="mr-2" />
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Why are you interested in joining Zonta? *</label>
                  <textarea rows="4" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" required></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Are you interested in serving on any specific committees?</label>
                  <div className="space-y-2">
                    {['Service', 'Advocacy', 'Membership', 'Fundraising', 'Scholarship', 'Public Relations'].map(committee => (
                      <label key={committee} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        {committee}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div>
              <label className="flex items-start">
                <input type="checkbox" className="mr-2 mt-1" required />
                <span className="text-sm text-gray-700">
                  I understand that membership requires payment of dues and active participation in club activities. 
                  I agree to abide by the bylaws and policies of Zonta International and Zonta Club of Naples. *
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
            >
              Submit Membership Application
            </button>

            <p className="text-center text-sm text-gray-600">
              After submitting, our membership chair will contact you within 3-5 business days to discuss next steps.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}