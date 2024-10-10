import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/notfound.module.scss";

export default function NotFoundPage() {
  return (
    <div className={styles.notFoundContainer}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <section className={styles.cta}>
        <h2>What would you like to do next?</h2>
        <Link to="/" className={styles.ctaButton}>
          Go to Homepage
        </Link>
      </section>
    </div>
  );
}
