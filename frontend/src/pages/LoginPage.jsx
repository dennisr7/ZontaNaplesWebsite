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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-24">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {!showResetForm ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-yellow-800">
              Member Login
            </h2>
            <LoginForm />

            {/* Forgot Password Link */}
            <p className="text-center mt-4 text-sm">
              <button
                onClick={() => setShowResetForm(true)}
                className="text-yellow-700 hover:underline"
              >
                Forgot your password?
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-yellow-800">
              Reset Password
            </h2>

            {!emailSent ? (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700"
                />
                <button
                  type="submit"
                  className="w-full bg-yellow-700 text-white py-2 rounded-md hover:bg-yellow-800"
                >
                  Send Reset Link
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetForm(false)}
                  className="w-full border border-yellow-700 text-yellow-700 py-2 rounded-md hover:bg-gray-100"
                >
                  Back to Login
                </button>
              </form>
            ) : (
              <p className="text-center text-green-600 font-medium">
                 If this email exists, a password reset link has been sent.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
