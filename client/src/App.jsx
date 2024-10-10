import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar.jsx";
// import Footer from "./components/footer.jsx";
import Homepage from "./pages/homepage.jsx";
import Login from "./pages/login.jsx";
import Logout from "./pages/logout.jsx";
import SignUp from "./pages/signup.jsx";
import Profile from "./pages/profile.jsx";
import AddRating from "./pages/addRating.jsx";
import CategoryPage from "./components/categoryPage.jsx";
import Top20Page from "./pages/top20Page.jsx";
import RatingDetail from "./components/ratingDetail.jsx";
import WelcomePage from "./pages/welcomePage.jsx";
import NotFoundPage from "./pages/notfound.jsx";

import styles from "./styles/global.module.scss";

const ProtectedRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <Login />; // Redirect to login if not logged in
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("id_token");
    setIsLoggedIn(!!userToken);
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className={styles.App}>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/welcomePage" />} /> */}

          <Route path="/welcomePage" element={<WelcomePage />} />

          <Route path="/homepage" element={<Homepage />} />
          <Route
            path="/addRating"
            element={
              <ProtectedRoute element={<AddRating />} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/logout"
            element={<Logout setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute element={<Profile />} isLoggedIn={isLoggedIn} />
            }
          />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/top20Page" element={<Top20Page />} />
          <Route path="/rating/:id" element={<RatingDetail />} />
          <Route path="/rating/:id/edit" element={<RatingDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}
