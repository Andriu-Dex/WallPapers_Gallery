import React, { useEffect, useRef, useCallback } from "react";
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
import { getPosts, resetPosts } from "../redux/slices/postsSlice";
import PostCard from "../components/Posts/PostCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, loading, error, page, limit, hasMore } = useSelector(
    (state) => state.posts
  );

  // Ref para el observer
  const observer = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(getPosts({ page: page + 1, limit }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page, limit, dispatch]
  );

  // Carga inicial
  useEffect(() => {
    dispatch(resetPosts());
    dispatch(getPosts({ page: 1, limit }));
  }, [dispatch, limit]);

  return (
    <Container sx={{ mt: 4, fontFamily: "'Tagesschrift', Roboto, sans-serif" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 600, color: "primary.main" }}
      >
        Publicaciones recientes
      </Typography>

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

      {/* 1. Indicador de carga */}
      {loading && page === 1 && (
        <CircularProgress sx={{ my: 3, mx: "auto", display: "block" }} />
      )}

      {/* 2. Error */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* 3. No hay posts */}
      {!loading && posts.length === 0 && (
        <Typography sx={{ color: "text.secondary" }}>
          No hay publicaciones aún.
        </Typography>
      )}

      {/* 4. Grid render solo cuando haya posts */}
      {posts.length > 0 && (
        <Grid container spacing={2}>
          {posts.map((post, idx) => {
            // Para el último elemento ponemos la ref
            if (posts.length === idx + 1) {
              return (
                <Grid
                  key={post._id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  ref={lastPostRef}
                >
                  <Fade in timeout={400}>
                    <Box>
                      <PostCard post={post} />
                    </Box>
                  </Fade>
                </Grid>
              );
            }
            return (
              <Grid key={post._id} item xs={12} sm={6} md={4}>
                <Fade in timeout={400}>
                  <Box>
                    <PostCard post={post} />
                  </Box>
                </Fade>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* 5. Indicador al cargar más */}
      {loading && page > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default Home;
