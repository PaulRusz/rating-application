import { jwtDecode } from "jwt-decode";

// Define the AuthService
class AuthService {
  GetProfile() {
    return jwtDecode(this.GetToken());
  }

  LoggedIn() {
    const Token = this.GetToken();
    return Token && !this.IsTokenExpired(Token);
  }

  IsTokenExpired(Token) {
    const Decoded = jwtDecode(Token);
    return Decoded.exp < Date.now() / 1000;
  }

  GetToken() {
    return localStorage.getItem("id_token");
  }

  Login(IdToken) {
    localStorage.setItem("id_token", IdToken);
  }

  Logout() {
    localStorage.removeItem("id_token");
    window.location.reload();
  }
}

const authServiceInstance = new AuthService();

export default authServiceInstance;
