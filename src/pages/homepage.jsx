import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/homepage.module.scss";

export default function HomePage() {
  return (
    <div className={styles.homepageContainer}>
      <h1>Welcome to the homepage!</h1>
      <p>
        This is a react project where you'll be able to rate miscellaneous
        products such as books, movies, restaraunts, etc and add them to your
        favorite categories
      </p>
      <Link to="/addRating">Add a new product & rating here!</Link>
    </div>
  );
}
