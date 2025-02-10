import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/Users/shreyas/Desktop/TrackerProject/signup.css"; // Adjust path if necessary

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username, "Email:", email, "Password:", password);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">TrackerHub</h1>
        <h2 className="signup-subtitle">Sign Up</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

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
