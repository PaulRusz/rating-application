import React, { useState } from "react";
import styles from "../styles/addRating.module.scss";
import { useNavigate } from "react-router-dom";

export default function AddRating() {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    rating: "",
    comment: "",
  });

  const username = localStorage.getItem("username");

  const categories = ["Books", "Movies", "Restaurants", "Games", "Other"];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      username,
    };

    try {
      const response = await fetch(`${process.env.VITE_API_URL}/api/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit rating.");
      }
      console.log("New rating submitted", data);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.addRatingPage}>
      <div className={styles.addRatingContainer}>
        <h1>Add a New Rating</h1>
        <form onSubmit={handleSubmit} className={styles.ratingForm}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="rating">Rating (1-5):</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            required
          />

          <label htmlFor="comment">Additional Comments:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Submit Rating</button>
        </form>
      </div>
    </div>
  );
}
