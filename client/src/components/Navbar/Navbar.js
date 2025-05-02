import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          color="inherit"
          sx={{ textDecoration: "none" }}
        >
          SocialMemories
        </Typography>

        {user ? (
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Typography variant="body1">
              {user.result?.name || "Usuario"}
            </Typography>
            <Button variant="outlined" color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="secondary"
            >
              Iniciar sesión
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              color="secondary"
            >
              Registrarse
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
