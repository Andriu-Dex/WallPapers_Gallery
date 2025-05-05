import axios from "axios";

// Se crea una instancia de Axios apuntando a la API backend
const API = axios.create({ baseURL: "http://localhost:5000" });

/**
 * Interceptor de solicitudes:
 * Si hay un perfil guardado en localStorage (con token incluido),
 * se agrega automáticamente el encabezado Authorization a cada petición saliente.
 */
API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");

  if (profile) {
    const { token } = JSON.parse(profile);
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ============================
// AUTENTICACIÓN DE USUARIOS
// ============================

// Enviar datos de login
export const login = (formData) => API.post("/auth/login", formData);

// Enviar datos de registro
export const register = (formData) => API.post("/auth/register", formData);

// ============================
// OPERACIONES CON PUBLICACIONES
// ============================

// Obtener todas las publicaciones
export const getPosts = (page = 1, limit = 10) =>
  API.get(`/posts?page=${page}&limit=${limit}`);

// Crear una nueva publicación (requiere token)
export const createPost = (postData) => API.post("/posts", postData);

// Actualizar una publicación (requiere token)
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

// Eliminar una publicación (requiere token)
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
