import React from "react";

import styles from "../styles/signup.module.scss";

export default function SignUp() {
  return (
    <div className={styles.signUpContainer}>
      <h1>Welcome to the signup page!</h1>
      <p>On this page a user will be able to sign up for the service</p>
    </div>
  );
}
