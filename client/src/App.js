import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Home from "./pages/Home"; // Puedes cambiar el nombre si usas otro

const App = () => {
  const { user } = useSelector((state) => state.auth);

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
        {/* Ruta protegida de ejemplo */}
        <Route
          path="/crear"
          element={user ? <h1>Página privada</h1> : <Navigate to="/login" />}
        />
        {/* Ruta no encontrada */}
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </>
  );
};

export default App;
