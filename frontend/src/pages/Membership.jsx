// src/pages/Membership.jsx
import { useState } from 'react';
import { memberAPI } from '../utils/apiService';

export default function Membership() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    reason: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await memberAPI.submitApplication(formData);
      console.log('Success:', result);
      setSuccess(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        reason: ''
      });

      // Scroll to success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error:', err);
      setError(
        err.response?.data?.error || 
        err.response?.data?.errors?.join(', ') ||
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

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

        {/* Membership Pricing Section */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Membership Investment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
              <h3 className="font-semibold text-gray-800 mb-2">First Year Membership</h3>
              <p className="text-3xl font-bold text-yellow-700">$170</p>
              <p className="text-gray-600 text-sm mt-2">Includes initiation and first year dues</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h3 className="font-semibold text-gray-800 mb-2">Annual Renewal</h3>
              <p className="text-3xl font-bold text-green-700">$148</p>
              <p className="text-gray-600 text-sm mt-2">For returning members each year</p>
            </div>
          </div>
          <p className="text-gray-600 mt-4 text-sm">
            Your investment supports our local service projects, advocacy work, and global Zonta initiatives.
          </p>
        </div>

        {/* Simplified Membership Application Form */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Membership Application</h2>
          <p className="text-gray-600 mb-6">Tell us about yourself — we'd love to get to know you!</p>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded text-left">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold">Application Submitted Successfully!</p>
                  <p className="text-sm mt-1">Thank you for your interest in Zonta Club of Naples. Our membership chair will contact you within 3-5 business days to discuss next steps.</p>
                </div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-left">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p>{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input 
                  type="text" 
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  minLength={2}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" 
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input 
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  minLength={2}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" 
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input 
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600" 
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Why are you interested in joining Zonta? *</label>
              <textarea 
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                minLength={20}
                rows={5}
                placeholder="Please tell us about your interest in Zonta and what you hope to contribute to our mission (minimum 20 characters)"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">
                {formData.reason.length}/20 characters minimum
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {loading ? 'Submitting...' : 'Submit Membership Application'}
            </button>

            <p className="text-center text-sm text-gray-600">
              After submitting, our membership chair will contact you within 3-5 business days to discuss next steps and payment options.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
