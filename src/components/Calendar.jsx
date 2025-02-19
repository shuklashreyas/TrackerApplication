import React from "react";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <h1>Calendar</h1>
      <button onClick={handleLogout}>Logout</button>
      {/* Your calendar UI */}
    </div>
  );
};

export default Calendar;