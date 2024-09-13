import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "../styles/welcomePage.module.scss";

export default function WelcomePage() {
  return (
    <div className={styles.welcomeContainer}>
      <p> Welcome to </p>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {" "}
        RateThis!
      </motion.h1>
      <p>
        We're glad you're here. Please <Link to="/login">log in</Link> or{" "}
        <Link to="/signup">sign up</Link> to continue and explore all the
        RateThis features.
      </p>
      <section className={styles.about}>
        <h2>About RateThis</h2>
        <p>
          RateThis is a comprehensive platform that allows users to rate and
          review any object they encounter. Whether it's a movie, book,
          restaurant, or place, RateThis provides an easy way to keep track of
          your preferences and share your opinions. With everything in one
          place, you can effortlessly manage and reflect on your experiences.
        </p>
      </section>
    </div>
  );
}
