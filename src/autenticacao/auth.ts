// src/api/auth.ts
import axios from "axios";

const API_URL = "http://192.168.3.128:8000/autenticacao/api/login/";

export async function login(email: string, password: string) {
  const response = await axios.post(API_URL, { email, password });
  const { access, refresh, user } = response.data;

  // salva tokens e dados do usuário no localStorage
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
}

export function logout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
}

export function getUser() {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
}

export function isAuthenticated() {
  return !!localStorage.getItem("access");
}
