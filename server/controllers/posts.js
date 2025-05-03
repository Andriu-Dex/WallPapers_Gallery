import mongoose from "mongoose"; // Se importa Mongoose para validaciones con ObjectId
import Post from "../models/postMessage.js"; // Se importa el modelo Post

// Obtener todas las publicaciones ordenadas por fecha descendente
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener publicaciones." });
  }
};

// Crear una nueva publicación (solo si el usuario está autenticado)
export const createPost = async (req, res) => {
  console.log("🔐 req.userId:", req.userId);
  console.log("🧑 req.userName:", req.userName);

  const { title, message, tags, selectedFile } = req.body;

  // Verifica si el usuario está autenticado
  if (!req.userId) {
    return res.status(401).json({ message: "No autenticado" });
  }

  // Validación de campos obligatorios
  if (!title || !message) {
    return res
      .status(400)
      .json({ message: "El título y el mensaje son obligatorios." });
  }

  // Crea una nueva instancia del modelo con los datos del cuerpo
  const newPost = new Post({
    title,
    message,
    tags,
    selectedFile,
    creator: req.userId,
    creatorName: req.userName,
  });

  try {
    await newPost.save(); // Guarda la publicación
    res.status(201).json(newPost); // Retorna con éxito
  } catch (error) {
    console.error("❌ Error interno al crear publicación:", error.message);
    res.status(500).json({ message: "Error al crear publicación." });
  }
};

// Actualizar una publicación (solo el autor puede hacerlo)
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, selectedFile, tags } = req.body;

  // Verifica si el usuario está autenticado
  if (!req.userId) {
    return res.status(401).json({ message: "No autenticado" });
  }

  // Valida que el ID sea correcto
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No post with id: ${id}`);
  }

  // Se busca la publicación original
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).send("Publicación no encontrada");
  }

  // Verifica que el usuario autenticado sea el creador
  if (post.creator !== req.userId) {
    return res
      .status(403)
      .json({ message: "No tienes permiso para editar esta publicación" });
  }

  // Construye el objeto actualizado
  const updatedPost = {
    creator: req.userId, // Asegura que el creador no sea modificado
    title,
    message,
    tags,
    selectedFile,
    _id: id,
  };

  // Se actualiza en la base de datos
  const savedPost = await Post.findByIdAndUpdate(id, updatedPost, {
    new: true,
  });
  res.json(savedPost); // Se devuelve la versión actualizada
};

// Eliminar una publicación (solo el autor puede hacerlo)
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({ message: "No autenticado" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No existe publicación con ID: ${id}`);
  }

  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).send("Publicación no encontrada");
  }

  if (post.creator !== req.userId) {
    return res
      .status(403)
      .send("No tienes permiso para eliminar esta publicación");
  }

  await Post.findByIdAndRemove(id);
  res.json({ message: "Publicación eliminada correctamente" });
};

// Dar "me gusta" a una publicación (sin permitir duplicados)
export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({ message: "No autenticado" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No existe publicación con ID: ${id}`);
  }

  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).send("Publicación no encontrada");
  }

  const alreadyLiked = post.likedBy.includes(req.userId);

  if (alreadyLiked) {
    return res
      .status(400)
      .json({ message: "Ya diste like a esta publicación" });
  }

  post.likeCount += 1;
  post.likedBy.push(req.userId);

  const updatedPost = await post.save();
  res.json(updatedPost);
};
