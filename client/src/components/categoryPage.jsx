import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../styles/categoryPage.module.scss";
import { useNavigate } from "react-router-dom";

export default function CategoryPage() {
  const { category } = useParams();
  const upperCaseCategory = category.toUpperCase();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/ratings/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      console.log(`Rating with id {id} deleted!`);
    } catch (error) {
      console.error("Error deleting rating", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/rating/${id}/edit`);
  };

  const handleViewDetails = (id) => {
    navigate(`/rating/${id}`);
  };

  return (
    <div className={styles.categoryPageContainer}>
      <h1>{category}</h1>
      <div className={styles.gridContainer}>
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item._id}
              className={styles.item}
              onClick={() => handleViewDetails(item._id)}
            >
              <div key={item._id} className={styles.itemCard}>
                <h3>{item.itemName}</h3>
                <p>Category: {item.category}</p>
                <p>Rating: {item.rating}/5</p>
                {item.comment && <p>Comment: {item.comment}</p>}

                <div className={styles.actions}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(item._id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No items found for this category.</p>
        )}
      </div>
    </div>
  );
}
