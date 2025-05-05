import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js"; // Se importan todos los controladores

import auth from "../middleware/auth.js"; // Se importa el middleware de autenticación

const router = express.Router();

// Obtener todas las publicaciones (ruta pública)
router.get("/", getPosts);

// Crear una nueva publicación (solo usuarios autenticados)
router.post("/", auth, createPost);

// Actualizar una publicación existente (solo autor autenticado)
router.patch("/:id", auth, updatePost);

// Eliminar una publicación por ID (solo autor autenticado)
router.delete("/:id", auth, deletePost);

// Dar "me gusta" a una publicación (usuario autenticado, sin duplicados)
router.patch("/:id/likePost", auth, likePost);

export default router;
