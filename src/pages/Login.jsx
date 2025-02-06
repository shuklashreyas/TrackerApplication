import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/calendar");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500">
      <div className="relative bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-96 border border-white/30 transition-all">
        <h1 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow-lg">
          Welcome Back
        </h1>

        {error && (
          <p className="text-red-300 text-sm text-center bg-red-800/80 p-2 rounded-md shadow-md">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-white/40 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-white/60 focus:outline-none shadow-md"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 p-3 border border-white/40 rounded-xl bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-white/60 focus:outline-none shadow-md"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white/20 text-white py-3 rounded-xl hover:bg-white/30 transition duration-300 font-semibold tracking-wide shadow-lg hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-white text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="underline font-semibold hover:text-gray-300">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
