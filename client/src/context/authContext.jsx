// IGNORE FOR NOW.  SUPPOSED TO ASSIST WITH REFRESHING THE PAGE/NAVBAR UPON LOGIN BUT
// IT DOESN'T SEEM TO BE WORKING AS EXPECTED.

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    console.log("User token on load:", userToken);
    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("userToken", token);
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
