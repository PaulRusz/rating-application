import React from "react";

import styles from "../styles/logout.module.scss";

export default function Logout() {
  return (
    <div className={styles.logoutContainer}>
      <h1>Welcome to the logout page!</h1>
      <p>On this page a user will be able to logout</p>
    </div>
  );
}
