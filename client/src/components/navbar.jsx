import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.scss";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    console.log("User token:", userToken);
    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/" className={styles.links}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        )}
        <li className={styles.searchContainer}>
          <input
            type="search"
            placeholder="Search"
            className={styles.searchInputBox}
          />
          <button className={styles.searchButton}>Search</button>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}
