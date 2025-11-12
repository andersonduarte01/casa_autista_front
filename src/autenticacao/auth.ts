import api from "./axios"; // 👉 importa a instância configurada

const LOGIN_URL = "autenticacao/api/login/";

export async function login(email: string, password: string) {
  const response = await api.post(LOGIN_URL, { email, password });
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
