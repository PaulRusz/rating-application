// IGNORE FOR NOW.  SUPPOSED TO ASSIST WITH REFRESHING THE PAGE/NAVBAR UPON LOGIN BUT
// IT DOESN'T SEEM TO BE WORKING AS EXPECTED.

import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../utils/auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.LoggedIn());

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(AuthService.LoggedIn());
    };

    checkAuth();
    const interval = setInterval(checkAuth, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const login = (token) => {
    AuthService.Login(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    AuthService.Logout();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
