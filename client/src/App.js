import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

import Navbar from "./components/Navbar/Navbar";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Home from "./pages/Home";
import PostForm from "./components/Posts/PostForm";
import EditPost from "./pages/EditPost";
import { logout } from "./redux/slices/authSlice"; // Asegúrate de tener esta acción
import { CircularProgress, Box } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Verifica expiración del token y cierra sesión si está vencido
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));

    if (profile?.token) {
      const decoded = jwtDecode(profile.token);
      if (decoded.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
      }
    }

    const timeout = setTimeout(() => {
      setIsLoadingAuth(false);
    }, 800); // simula carga

    return () => clearTimeout(timeout);
  }, [dispatch]);

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
