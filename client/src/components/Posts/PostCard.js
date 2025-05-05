import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../redux/slices/postsSlice";
import { likePost } from "../../redux/slices/postsSlice";
import moment from "moment";
import "moment/locale/es";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Se obtiene el usuario autenticado desde Redux
  const { user } = useSelector((state) => state.auth);

  // Estado para controlar el diálogo de confirmación de eliminación
  const [openDialog, setOpenDialog] = useState(false);

  // Estado para mostrar el Snackbar tras eliminar
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Verifica si el usuario es el creador del post
  const isAuthor = user?.result?._id === post.creator;

  const alreadyLiked = post.likedBy.includes(user?.result?._id);

  // Función para confirmar y ejecutar la eliminación
  const handleDeleteConfirmed = async () => {
    try {
      await dispatch(deletePost(post._id)).unwrap();
      setOpenDialog(false);
      setShowSnackbar(true);
    } catch (err) {
      console.error("Error al eliminar publicación:", err);
      setOpenDialog(false);
      // Podrías mostrar un Snackbar de error también si deseas
    }
  };

  // Función que redirige al formulario de edición
  const handleEdit = () => {
    navigate(`/editar/${post._id}`);
  };

  return (
    <>
      {/* Tarjeta principal de la publicación */}
      <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
        {/* Imagen principal */}
        <CardMedia
          component="img"
          height="200"
          image={post.selectedFile}
          alt={post.title}
          sx={{ objectFit: "cover" }}
        />

        {/* Contenido textual */}
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
            {post.message}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Publicado por {post.creatorName} —{" "}
            {moment(post.createdAt).fromNow()}
          </Typography>
        </CardContent>

        {/* Acciones visibles solo para el autor */}
        {isAuthor && (
          //Version
          <CardActions>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Tooltip title={alreadyLiked ? "Ya te gusta" : "Me gusta"}>
                <IconButton
                  color={alreadyLiked ? "primary" : "default"}
                  onClick={() => dispatch(likePost(post._id))}
                  disabled={!user}
                >
                  <ThumbUpIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="body2">{post.likeCount}</Typography>

              {isAuthor && (
                <>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => setOpenDialog(true)}
                  >
                    Eliminar
                  </Button>
                </>
              )}
            </Box>
          </CardActions>
        )}
      </Card>

      {/* Diálogo de confirmación de eliminación */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Eliminar publicación?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción no se puede deshacer. ¿Deseas eliminar esta publicación?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteConfirmed}
            color="error"
            variant="contained"
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar de confirmación visual */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Publicación eliminada exitosamente.
        </Alert>
      </Snackbar>
    </>
  );
};

export default PostCard;
