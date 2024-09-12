import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/welcomePage.module.scss";

export default function WelcomePage() {
  return (
    <div className={styles.welcomeContainer}>
      <h1>Welcome to RateThis !</h1>
      <p>
        We're glad you're here. Please <Link to="/login">log in</Link> or{" "}
        <Link to="/signup">sign up</Link> to continue and explore all the
        RateThis features.
      </p>
      {/* <p>
        If you need help, feel free to <Link to="/contact">contact us</Link>.
      </p> */}
    </div>
  );
}
