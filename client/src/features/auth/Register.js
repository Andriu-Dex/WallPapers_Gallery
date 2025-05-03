import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError("");

    dispatch(registerUser(form))
      .unwrap()
      .then(() => {
        console.log("✅ Registro exitoso");
      })
      .catch((err) => {
        console.error("❌ Error al registrarse:", err);
        const msg = typeof err === "string" ? err : err?.message;
        setError(msg || "Error al registrarse");
      });
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 8,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Typography variant="h5">Crear una cuenta</Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 16 }}>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          name="name"
          label="Nombre completo"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Correo electrónico"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Registrarse
        </Button>
      </form>
    </Paper>
  );
};

export default Register;
