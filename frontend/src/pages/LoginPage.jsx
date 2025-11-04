import { useState } from "react";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Simulate sending reset email
    setEmailSent(true);
    setTimeout(() => {
      setShowResetForm(false);
      setEmailSent(false);
      setResetEmail("");
    }, 2000);
  };

  return (
    <main className="relative min-h-screen pt-32 px-6 flex flex-col items-center text-center overflow-hidden">
      {/* Background gradient matching Contact page */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/80 via-yellow-700/70 to-red-900/90" />

      <div className="relative z-10 w-full max-w-md">
        {/* Zonta Logo moved to top */}
        <img
          src="/src/assets/zonta-full-logo.png"
          alt="Zonta Club Full Logo"
          className="mx-auto mb-8 w-48 opacity-90 hover:opacity-100 transition duration-300"
        />

        <h1 className="text-4xl font-bold mb-4 text-white">Member Login</h1>
        <p className="text-lg mb-8 text-white/90">
          Access your Zonta Club member account
        </p>

        <div className="w-full bg-white shadow-lg rounded-2xl p-8 space-y-6 text-left">
          {!showResetForm ? (
            <>
              <LoginForm />

              {/* Forgot Password Link */}
              <p className="text-center mt-4 text-sm">
                <button
                  onClick={() => setShowResetForm(true)}
                  className="text-yellow-700 hover:text-yellow-800 hover:underline font-medium transition-colors duration-200"
                >
                  Forgot your password?
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Reset Password
              </h2>

              {!emailSent ? (
                <form onSubmit={handlePasswordReset} className="space-y-6">
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-600 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                  >
                    Send Reset Link
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowResetForm(false)}
                    className="w-full border border-yellow-600 text-yellow-600 hover:bg-yellow-50 font-semibold py-3 rounded-lg transition-all duration-200"
                  >
                    Back to Login
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <p className="text-green-600 font-medium mb-4">
                    If this email exists, a password reset link has been sent.
                  </p>
                  <button
                    onClick={() => setShowResetForm(false)}
                    className="text-yellow-700 hover:text-yellow-800 hover:underline font-medium transition-colors duration-200"
                  >
                    Return to login
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}