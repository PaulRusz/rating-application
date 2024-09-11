import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/homepage.module.scss";

export default function HomePage() {
  const [ratedItems, setRatedItems] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRatedItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/ratings");
        if (!response.ok) {
          throw new Error("Failed to fetch recent ratings.");
        }
        const data = await response.json();
        setRatedItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchTopItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/top20");
        if (!response.ok) {
          throw new Error("Failed to fetch top items.");
        }
        const data = await response.json();
        setTopItems(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRatedItems();
    fetchTopItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.homepageContainer}>
      <h1>Welcome to the RateThis!</h1>
      <p>
        This is a react project where you'll be able to rate miscellaneous
        products such as books, movies, restaurants, etc and add them to your
        favorite categories
      </p>

      <section className={styles.cta}>
        <h2>Ready to Rate?</h2>
        <Link to="/addRating" className={styles.ctaButton}>
          Add a new product & rating here!
        </Link>
      </section>

      <div className={styles.homepageRatingContainer}>
        <section className={styles.ratedItemsContainer}>
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
            <Link to="/category/other" className={styles.categoryItem}>
              Other
            </Link>
          </div>
        </section>

        {/* Recently Rated Items */}
        <section className={styles.ratedItemsContainer}>
          <h2>Most Recent Items</h2>
          <div className={styles.itemList}>
            {ratedItems.length > 0 ? (
              ratedItems.map((item) => (
                <div key={item._id} className={styles.item}>
                  <h3>{item.itemName}</h3> <p>Category: {item.category}</p>
                  <p>Rating: {item.rating}/5</p>
                  {item.comment && <p>Comment: {item.comment}</p>}
                </div>
              ))
            ) : (
              <p>No recent ratings available yet.</p>
            )}
          </div>
        </section>

        {/* Top Rated Items */}
        <section className={styles.ratedItemsContainer}>
          <h2>Top 5 Rated Items</h2>
          <div className={styles.itemList}>
            {topItems.slice(0, 5).map((item) => (
              <div key={item._id} className={styles.item}>
                <h3>{item.itemName}</h3>
                <p>Category: {item.category}</p>
                <p>Rating: {item.rating}/5</p>
                {item.comment && <p>Comment: {item.comment}</p>}
              </div>
            ))}
          </div>

          <Link to="/top20Page" className={styles.viewMoreButton}>
            See Top 20 Rated Items
          </Link>
        </section>
      </div>
    </div>
  );
}
