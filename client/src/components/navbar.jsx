import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link to="/" className={styles.links}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" className={styles.links}>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/logout" className={styles.links}>
            Logout
          </Link>
        </li>
        <li>
          <Link to="/login" className={styles.links}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/signup" className={styles.links}>
            Sign Up
          </Link>
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
