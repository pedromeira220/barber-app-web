import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333"
})

api.interceptors.request.use(
  config => {
    // Busca o token no localStorage
    const token = localStorage.getItem('@barber-app-web:token-1.0.0');
    
    // Se o token existir, adiciona ao cabeçalho Authorization
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  error => {
    // Faz algo com erro de requisição
    return Promise.reject(error);
  }
);