import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar.js";
import Footer from "./components/footer.js";
import Homepage from "./pages/homepage.js";
import Login from "./pages/login.js";
import Profile from "./pages/profile.js";
import styles from "./styles/global.module.scss";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className={styles.App}>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}
