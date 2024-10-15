import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/navbar.module.scss";
import axios from "axios";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    console.log("User token:", userToken);
    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]);

  // Function to handle search
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${apiUrl}/api/ratings/search?name=${searchTerm}`
      );

      console.log("Search response:", response.data);

      // Find exact match in the response array
      const exactMatch = response.data.find(
        (rating) => rating.itemName.toLowerCase() === searchTerm.toLowerCase()
      );

      if (exactMatch) {
        // If an exact match is found, navigate to the detail page
        navigate(`/rating/${exactMatch._id}`);
      } else {
        setSearchError("No ratings found for that name.");
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchError("An error occurred while searching. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    navigate("/welcomePage");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <ul>
          <li>
            <Link to="/welcomePage" className={styles.navLink}>
              RateThis
            </Link>
          </li>
        </ul>
      </div>
      <ul className={styles.navList}>
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/" className={styles.links}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        )}
        <li className={styles.searchContainer}>
          <form onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              className={styles.searchInputBox}
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>
        </li>
        {searchError && <p className={styles.error}>{searchError}</p>}
        {isLoggedIn && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
