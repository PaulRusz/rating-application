import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
// import Footer from "./components/footer.jsx";
import Homepage from "./pages/homepage.jsx";
import Login from "./pages/login.jsx";
import Logout from "./pages/logout.jsx";
import SignUp from "./pages/signup.jsx";
import Profile from "./pages/profile.jsx";
import AddRating from "./pages/addRating.jsx";
import CategoryPage from "./components/categoryPage.jsx";

import styles from "./styles/global.module.scss";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/addRating" element={<AddRating />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}
