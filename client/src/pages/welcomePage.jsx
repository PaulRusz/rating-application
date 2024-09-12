import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div>
      <h1>Welcome to Our Website</h1>
      <p>
        Please <Link to="/login">log in</Link> or{" "}
        <Link to="/signup">sign up</Link> to continue.
      </p>
    </div>
  );
};

export default WelcomePage;
