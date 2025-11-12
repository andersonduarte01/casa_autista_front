import axios from "axios";

// cria uma instância do axios
const api = axios.create({
  baseURL: "http://192.168.3.128:8000/",
});

// adiciona o token JWT automaticamente em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
