import React from "react";

import styles from "../styles/login.module.scss";

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <h1>Welcome to the login page!</h1>
      <p>On this page a user will be able to login</p>
    </div>
  );
}
