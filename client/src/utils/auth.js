import { decode as jwtDecode } from "jwt-decode";

// Define the AuthService
class AuthService {
  GetProfile() {
    return jwtDecode(this.GetToken());
  }

  LoggedIn() {
    const token = this.GetToken();
    return token && !this.IsTokenExpired(token);
  }

  IsTokenExpired(token) {
    if (!token) return true; // If no token, consider it expired
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  }

  GetToken() {
    return localStorage.getItem("userToken"); // Use userToken here
  }

  Login(idToken) {
    localStorage.setItem("userToken", idToken); // Use userToken here
  }

  Logout() {
    localStorage.removeItem("userToken"); // Use userToken here
    window.location.reload();
  }

  // Fetch data with the token included in the Authorization header
  async fetchWithAuth(url, options = {}) {
    const token = this.GetToken();

    // Add the token to the request headers
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers, // Merge any additional headers
    };

    // Send the request with the token
    const response = await fetch(url, { ...options, headers });

    // If unauthorized, log the user out and throw an error
    if (response.status === 401) {
      this.Logout();
      throw new Error("Unauthorized: Invalid or expired token.");
    }

    return response; // Return the fetch response to handle in the calling function
  }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;
