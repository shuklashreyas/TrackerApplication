import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/Users/shreyas/Desktop/TrackerProject/login.css"; // Adjust path if necessary

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Sending login request..."); // Debug log
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      console.log("Response received:", response); // Debug log
      const data = await response.json();
      console.log("Response data:", data); // Debug log
  
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error); // Debug log
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">TrackerHub</h1>
        <h2 className="login-subtitle">Login</h2>

        {error && <p className="login-error">{error}</p>} {/* Display error message */}

        <form onSubmit={handleLogin} className="login-form">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />

          <button type="submit">Login</button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <a href="/signup" className="signup-link">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;