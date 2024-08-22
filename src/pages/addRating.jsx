import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/addRating.module.scss";

export default function AddRating() {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    rating: "",
    comments: "",
  });

  const categories = ["Books", "Movies", "Restaurants", "Games", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New rating submitted", formData);
  };

  return (
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

        <label htmlFor="comments">Additional Comments:</label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Submit Rating</button>
      </form>
      <p>
        Here is where a user can add a product/rate the product. Or should I
        make it so a new container appears when the button is clicked on the
        homepage?
      </p>
    </div>
  );
}
