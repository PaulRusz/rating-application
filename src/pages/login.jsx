import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import axios from "axios";
import styles from "../styles/login.module.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      if (response.data.success) {
        // Redirect to homepage on successful login
        navigate("/homepage"); // Use navigate instead of history.push
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login to Your Account</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>
    </div>
  );
}