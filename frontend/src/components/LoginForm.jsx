// src/components/LoginForm.jsx
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", email, password);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700"
      />

      <button
        type="submit"
        className="w-full bg-yellow-700 text-white py-2 rounded-md hover:bg-yellow-800"
      >
        Login
      </button>
    </form>
  );
}
