import mongoose from "mongoose";

// Se define el esquema de publicaciones que será usado por Mongoose
const postSchema = new mongoose.Schema(
  {
    // Título de la publicación (obligatorio en lógica de backend)
    title: String,

    // Contenido principal o cuerpo del post
    message: String,

    // Etiquetas como array de strings
    tags: [String],

    // Imagen en base64 o URL
    selectedFile: String,

    // ID del creador (autenticado)
    creator: {
      type: String,
      required: true,
    },

    // Nombre legible del creador
    creatorName: {
      type: String,
      required: true,
    },

    // Contador de "me gusta"
    likeCount: {
      type: Number,
      default: 0,
    },

    // IDs de usuarios que dieron like
    likedBy: {
      type: [String],
      default: [],
    },

    // Contador de "no me gusta"
    dislikeCount: {
      type: Number,
      default: 0,
    },

    // IDs de usuarios que dieron dislike
    dislikedBy: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // Crea automáticamente createdAt y updatedAt
  }
);

// Se exporta el modelo bajo el nombre 'Post'
export default mongoose.model("Post", postSchema);
