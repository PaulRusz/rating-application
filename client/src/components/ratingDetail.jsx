import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/ratingDetail.module.scss";

export default function RatingDetail() {
  const { id } = useParams();
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/ratings/${id}`
        );
        setRating(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/ratings/${id}`);
      navigate("/");
    } catch (err) {
      console.error("Error deleting rating.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRating((prevRating) => ({
      ...prevRating,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/ratings/${id}`, rating);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving rating.", error);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.ratingDetailContainer}>
      {rating && (
        <>
          {!isEditing ? (
            <>
              <h1>{rating.itemName}</h1>
              <p>Category: {rating.category}</p>
              <p>Rating: {rating.rating}/5</p>
              <p>Comment: {rating.comment}</p>
              <div className={styles.actions}>
                <button onClick={toggleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSave}>
              <div>
                <label>Item Name:</label>
                <input
                  type="text"
                  name="itemName"
                  value={rating.itemName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Category:</label>
                <input
                  type="text"
                  name="category"
                  value={rating.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Rating:</label>
                <input
                  type="number"
                  name="rating"
                  value={rating.rating}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                  required
                />
              </div>
              <div>
                <label>Comment:</label>
                <textarea
                  name="comment"
                  value={rating.comment}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.actions}>
                <button type="submit">Save</button>
                <button type="button" onClick={toggleEdit}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
