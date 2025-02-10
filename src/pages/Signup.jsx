import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/Users/shreyas/Desktop/TrackerProject/signup.css"; // Adjust path if necessary

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Signup successful! Please log in."); // Notify user of success
        navigate("/login"); // Redirect to login page
      } else {
        setError(data.error || "Signup failed"); // Set error message
      }
    } catch (error) {
      setError("An error occurred. Please try again."); // Handle network errors
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">TrackerHub</h1>
        <h2 className="signup-subtitle">Sign Up</h2>

        {error && <p className="signup-error">{error}</p>} {/* Display error message */}

        <form onSubmit={handleSignup} className="signup-form">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />

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

          <button type="submit">Sign Up</button>
        </form>

        <p className="signup-footer">
          Already have an account?{" "}
          <a href="/login" className="login-link">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;