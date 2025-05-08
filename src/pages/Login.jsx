import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/Users/shreyas/Desktop/TrackerProject/login.css"; // Adjust if needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userEmail", data.email); // or token if added
        navigate("/dashboard");
      } else {
        setError(data.detail || "Login failed.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">TrackerHub</h1>
        <h2 className="login-subtitle">Login</h2>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleLogin} className="login-form">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />

          <button type="submit">Login</button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <a href="/signup" className="signup-link">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
