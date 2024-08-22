import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/homepage.module.scss";

export default function HomePage() {
  return (
    <div className={styles.homepageContainer}>
      <h1>Welcome to the RateThis!</h1>
      <p>
        This is a react project where you'll be able to rate miscellaneous
        products such as books, movies, restaraunts, etc and add them to your
        favorite categories
      </p>

      <section className={styles.featuredCategories}>
        <h2>Featured Categories</h2>
        <div className={styles.categoryList}>
          <Link to="/category/books" className={styles.categoryItem}>
            Books
          </Link>
          <Link to="/category/movies" className={styles.categoryItem}>
            Movies
          </Link>
          <Link to="/category/restaurants" className={styles.categoryItem}>
            Restaurants
          </Link>
          <Link to="/category/games" className={styles.categoryItem}>
            Games
          </Link>
        </div>
      </section>

      <section className={styles.recentRatings}>
        <h2>Most Recent Items</h2>
        <div className={styles.itemList}>
          <div className={styles.item}>
            <h3>Item 1</h3>
            <p>Rating: 4/5</p>
            <p>Category: Books</p>
          </div>
          <div className={styles.item}>
            <h3>Item 2</h3>
            <p>Rating: 5/5</p>
            <p>Category: Movies</p>
          </div>
          <div className={styles.item}>
            <h3>Item 3</h3>
            <p>Rating: 3/5</p>
            <p>Category: Restaurants</p>
          </div>
        </div>
      </section>

      {/* Top Rated Items */}
      <section className={styles.topRated}>
        <h2>Top Rated Items</h2>
        <div className={styles.itemList}>
          <div className={styles.item}>
            <h3>Top Item 1</h3>
            <p>Rating: 5/5</p>
            <p>Category: Movies</p>
          </div>
          <div className={styles.item}>
            <h3>Top Item 2</h3>
            <p>Rating: 5/5</p>
            <p>Category: Books</p>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Ready to Rate?</h2>
        <Link to="/addRating" className={styles.ctaButton}>
          Add a new product & rating here!
        </Link>
      </section>
    </div>
  );
}
