// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "../styles/categoryPage.module.scss";

export default function CategoryPage() {
  const { category } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data based on category
    axios
      .get(`/api/items?category=${category}`)
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [category]);

  return (
    <div className={styles.categoryPageContainer}>
      <h1>{category}</h1>
      <div className={styles.itemList}>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className={styles.item}>
              <h3>{item.name}</h3>
              <p>Rating: {item.rating}/5</p>
              <p>Comments: {item.comments}</p>
            </div>
          ))
        ) : (
          <p>No items found for this category.</p>
        )}
      </div>
    </div>
  );
}
