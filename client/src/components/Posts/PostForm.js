import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/slices/postsSlice";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  // Estado local del formulario
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
    fileName: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Usuario autenticado (extraído desde Redux)
  const { user } = useSelector((state) => state.auth);

  // Manejador de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!postData.title || !postData.message) return;

    const finalData = {
      ...postData,
      tags: postData.tags.split(",").map((tag) => tag.trim()),
      creator: user?.result?.name || "Anónimo",
    };

    dispatch(createPost(finalData))
      .unwrap()
      .then(() => {
        setPostData({
          title: "",
          message: "",
          tags: "",
          selectedFile: "",
          fileName: "",
        });
        navigate("/");
      })
      .catch((err) => {
        console.error("Error al crear publicación:", err);
      });
  };

  // Manejador del archivo para convertirlo en base64 y guardar el nombre
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData((prev) => ({
          ...prev,
          selectedFile: reader.result,
          fileName: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Si no hay usuario autenticado, se bloquea el formulario
  if (!user) {
    return (
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" align="center" color="text.secondary">
          Debes iniciar sesión para crear una publicación.
        </Typography>
      </Paper>
    );
  }

  // Render del formulario
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Crear nueva memoria
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Título"
          fullWidth
          margin="normal"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          label="Mensaje"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          label="Etiquetas (separadas por coma)"
          fullWidth
          margin="normal"
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <Button component="label" fullWidth sx={{ mt: 1 }}>
          Subir imagen
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        {postData.fileName && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Archivo seleccionado: <strong>{postData.fileName}</strong>
          </Typography>
        )}

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Publicar
        </Button>
      </form>
    </Paper>
  );
};

export default PostForm;
