import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li className={styles.searchContainer}>
          <input
            type="search"
            placeholder="Search"
            className={styles.searchInputBox}
          />
          <button className={styles.searchButton}>Search</button>
        </li>
      </ul>
    </nav>
  );
}
