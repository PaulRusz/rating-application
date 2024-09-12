import { useState, useEffect } from "react";
import AuthService from "./auth"; // Adjust the path as needed

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.LoggedIn());

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(AuthService.LoggedIn());
    };

    checkAuth();
    const interval = setInterval(checkAuth, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return { isLoggedIn };
};

export default useAuth;
