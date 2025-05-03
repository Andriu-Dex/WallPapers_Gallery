// Importaciones
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

// Rutas
import authRoutes from "./routes/auth.js";

// Configuración de entorno
dotenv.config();

// Inicializar Express
const app = express();

// Middleware
app.use(express.json({ limit: "30mb" }));
app.use(cors());

app.use("/posts", postRoutes);

// Rutas principales
app.use("/auth", authRoutes);

app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Conexión a la base de datos
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar con MongoDB:", error.message);
  });
