import React, { useEffect, useState } from "react";

import styles from "../styles/profile.module.scss";

export default function Profile() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userData, setUserData] = useState({
    firstName: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    const firstName = localStorage.getItem("firstName");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    setUserData({
      firstName: firstName || "Guest", // Fallback in case the first name is missing
      username: username || "Not available", // Fallback in case the username is missing
      email: email || "Not available", // Fallback in case the email is missing
    });
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.profileContainer}>
      <h1>Welcome, {userData.firstName} to the profile page!</h1>
      <p>On this page a user will be able to see their profile.</p>

      <div className={styles.dateTimeContainer}>
        <h2>Current Date & Time:</h2>
        <p>Current Time: {currentTime.toLocaleTimeString()}</p>
      </div>

      <div className={styles.userInfoContainer}>
        <h2>Your Profile Information:</h2>
        <p>
          <strong>Username: </strong>
          {userData.username}
        </p>
        <p>
          <strong>Email: </strong>
          {userData.email}
        </p>
      </div>

      <div className={styles.userActivityContainer}>
        <h2>Your Activity:</h2>
        <ul>
          <li> Last Rated: Example Movie or whatever - 5/5 Stars</li>
          <li> Recently Added: Example Movie or whatever - 2 hours ago</li>
        </ul>
        <p>Activity: {localStorage.getItem("activity")}</p>
      </div>
    </div>
  );
}
