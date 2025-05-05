import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  Box,
  Grid,
  Fade,
} from "@mui/material";
import { getPosts } from "../redux/slices/postsSlice";
import PostCard from "../components/Posts/PostCard";
import PostForm from "../components/Posts/PostForm";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container
      sx={{
        mt: 4,
        fontFamily: "'Tagesschrift', Roboto, sans-serif", // ✅ Fuente moderna
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Título principal */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 600, color: "primary.main" }}
      >
        Publicaciones recientes
      </Typography>

      {/* Botón para crear una nueva publicación */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/crear")}
          sx={{
            fontWeight: 500,
            textTransform: "none",
            boxShadow: 2,
            ":hover": { boxShadow: 4 },
          }}
        >
          + Crear publicación
        </Button>
      </Box>

      {/* Indicador de carga */}
      {loading && (
        <CircularProgress sx={{ my: 3, mx: "auto", display: "block" }} />
      )}

      {/* Mensaje de error */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Mensaje si no hay publicaciones */}
      {posts.length === 0 && !loading && (
        <Typography sx={{ color: "text.secondary" }}>
          No hay publicaciones aún.
        </Typography>
      )}

      {/* Grilla de publicaciones con efecto Fade */}
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid key={post._id} xs={12} sm={6} md={4}>
            <Fade in timeout={400}>
              <Box>
                <PostCard post={post} />
              </Box>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
