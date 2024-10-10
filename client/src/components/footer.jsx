import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>
          &copy; 2024 RateThis. All rights reserved. Created by Paul Ruszkay
        </p>
        <ul className={styles.footerLinks}>
          {/* <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li> */}
        </ul>
      </div>
    </footer>
  );
}
