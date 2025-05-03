import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Home from "./pages/Home";
import PostForm from "./components/Posts/PostForm";
import EditPost from "./pages/EditPost";
import { CircularProgress, Box } from "@mui/material";

const App = () => {
  const { user } = useSelector((state) => state.auth);

  // Estado local para simular carga de autenticación
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Simulamos una verificación de sesión
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoadingAuth(false);
    }, 800); // simula retardo de validación

    return () => clearTimeout(timeout);
  }, []);

  // Muestra una pantalla de carga mientras se "valida" el usuario
  if (isLoadingAuth) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/crear"
          element={user ? <PostForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/editar/:id"
          element={user ? <EditPost /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </>
  );
};

export default App;
