import { env } from "@/env/env";
import axios from "axios";

export const api = axios.create({
  baseURL: env.VITE_API_URL
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