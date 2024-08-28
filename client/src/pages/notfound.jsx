import React from "react";

import styles from "../styles/notfound.module.scss";

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <h1>Welcome to the not found page!</h1>
      <p>
        On this page a user will be able to see that an item hasnt been found
        during a search.
      </p>
    </div>
  );
}
