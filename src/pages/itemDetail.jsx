import React from "react";

import styles from "../styles/itemDetail.module.scss";

export default function ItemDetail() {
  return (
    <div className={styles.itemDetailContainer}>
      <h1>Welcome to the item detail!</h1>
      <p>
        On this page a user will be able to look at the items ratings, comments,
        and category
      </p>
    </div>
  );
}
