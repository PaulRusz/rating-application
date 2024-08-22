import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
// import Footer from "./components/footer.jsx";
import Homepage from "./pages/homepage.jsx";
import Login from "./pages/login.jsx";
import SignUp from "./pages/signup.jsx";
import Profile from "./pages/profile.jsx";
import styles from "./styles/global.module.scss";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}
