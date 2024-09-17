import React, { useEffect, useState } from "react";
import styles from "../styles/top20Page.module.scss"; // Make sure the file name matches

export default function Top20Page() {
  const [topItems, setTopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTopItems = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/top20`);
        if (!response.ok) {
          throw new Error("Failed to fetch top items.");
        }
        const data = await response.json();
        setTopItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.top20PageContainer}>
      <h1>Top 20 Rated Items</h1>
      <div className={styles.gridContainer}>
        {topItems.map((item) => (
          <div key={item._id} className={styles.itemCard}>
            <h3>{item.itemName}</h3>
            <p>Category: {item.category}</p>
            <p>Rating: {item.rating}/5</p>
            {item.comment && <p>Comment: {item.comment}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
