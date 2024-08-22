import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import Homepage from "./pages/homepage.jsx";
import Login from "./pages/login.jsx";
import Profile from "./pages/profile.jsx";
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
