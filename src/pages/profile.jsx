import React from "react";

import styles from "../styles/profile.module.scss";

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <h1>Welcome to the profile page!</h1>
      <p>On this page a user will be able to see their profile.</p>
    </div>
  );
}
