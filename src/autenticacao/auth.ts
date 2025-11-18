// auth.ts
import api from "./axios";

const LOGIN_URL = "autenticacao/api/login/";

export async function login(email: string, password: string) {
  // limpa tokens antigos
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");

  const response = await api.post(LOGIN_URL, { email, password });

  const { access, refresh, user } = response.data;

  // salva tokens e usuário
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
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
}

export function isAuthenticated() {
  return !!localStorage.getItem("access");
}
