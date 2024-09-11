import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../styles/categoryPage.module.scss";

export default function CategoryPage() {
  const { category } = useParams();
  const upperCaseCategory = category.toUpperCase();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/items?category=${upperCaseCategory}`
        );
        console.log("Response data:", response.data);
        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          console.error("Expected array but got:", response.data);
          setItems([]);
        }
      } catch (err) {
        console.error("Error fetching data.", err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [category]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.categoryPageContainer}>
      <h1>{category}</h1>
      <div className={styles.gridContainer}>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className={styles.itemCard}>
              <h3>{item.itemName}</h3>
              <p>Category: {item.category}</p>
              <p>Rating: {item.rating}/5</p>
              {item.comment && <p>Comment: {item.comment}</p>}
            </div>
          ))
        ) : (
          <p>No items found for this category.</p>
        )}
      </div>
    </div>
  );
}
