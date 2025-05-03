import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../redux/slices/postsSlice";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import FileBase from "react-file-base64";

const EditPost = () => {
  const { id } = useParams(); // Obtiene el ID de la publicación desde la URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Se accede al usuario autenticado y a las publicaciones almacenadas en Redux
  const { user } = useSelector((state) => state.auth);
  const { posts, loading } = useSelector((state) => state.posts);

  // Estado local para el formulario
  const [form, setForm] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  // Control de notificación y errores
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");

  // Efecto para cargar datos de la publicación en el formulario
  useEffect(() => {
    const postToEdit = posts.find((post) => post._id === id);

    if (!postToEdit) return;

    // Se restringe la edición a publicaciones del autor actual
    if (user?.result?.name !== postToEdit.creator) {
      navigate("/");
      return;
    }

    setForm({
      title: postToEdit.title,
      message: postToEdit.message,
      tags: postToEdit.tags.join(", "),
      selectedFile: postToEdit.selectedFile,
    });
  }, [id, posts, navigate, user]);

  // Manejador de cambios en los inputs del formulario
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...form,
      tags: form.tags.split(",").map((tag) => tag.trim()),
    };

    dispatch(updatePost({ id, updatedPost: updatedData }))
      .unwrap()
      .then(() => {
        setOpenSnackbar(true);
        setTimeout(() => navigate("/"), 1800);
      })
      .catch((err) => {
        const msg =
          err?.response?.status === 403
            ? "No tienes permiso para editar esta publicación."
            : "Ocurrió un error al actualizar.";
        console.error("Error al actualizar:", msg);
        setError(msg);
      });
  };

  if (loading) {
    return <CircularProgress sx={{ mt: 8, display: "block", mx: "auto" }} />;
  }

  return (
    <>
      <Paper
        sx={{
          p: 4,
          mt: 4,
          maxWidth: 500,
          mx: "auto",
          fontFamily: "'Tagesschrift', sans-serif",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Editar publicación
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Título"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mensaje"
            name="message"
            value={form.message}
            onChange={handleChange}
            fullWidth
            multiline
            margin="normal"
          />
          <TextField
            label="Etiquetas (separadas por coma)"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box sx={{ my: 2 }}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setForm({ ...form, selectedFile: base64 })
              }
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              mt: 1,
              boxShadow: 2,
            }}
          >
            Actualizar
          </Button>
        </form>
      </Paper>

      {/* Snackbar de confirmación */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          ¡Publicación actualizada con éxito!
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditPost;
