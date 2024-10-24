import { jwtDecode } from "jwt-decode";

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
}

const authServiceInstance = new AuthService();

export default authServiceInstance;
