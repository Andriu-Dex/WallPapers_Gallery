// Se importa la función principal para configurar el store de Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Se importan los reducers creados para la autenticación y publicaciones
import authReducer from "./slices/authSlice";
import postsReducer from "./slices/postsSlice";

// Se crea y exporta el store centralizado de Redux
// Aquí se combinan todos los reducers que gestionan distintas partes del estado global
export const store = configureStore({
  reducer: {
    // 'auth' manejará todo el estado relacionado con autenticación de usuarios
    auth: authReducer,

    // 'posts' manejará el estado relacionado con publicaciones del sistema
    posts: postsReducer,
  },
});
