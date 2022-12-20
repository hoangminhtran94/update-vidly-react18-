import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndPoint = "/auth";
const tokenKey = "token";
// http.setJwt(getJwt());
export function login(email, password) {
return http.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4o04Aw3jc1I0w0_iwu4wYOqdMMiSKBbI",
    { email, password, returnSecureToken: true }
  );
 ;
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  loginWithJwt,
  getCurrentUser,
  getJwt,
};
