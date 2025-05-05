import jwt from "jsonwebtoken";

// Middleware para verificar el token JWT y autenticar al usuario
const auth = async (req, res, next) => {
  try {
    // Obtener el token desde el encabezado Authorization
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Acceso denegado" });
    }

    // Verificar y decodificar el token con tu clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extraer ID y nombre del usuario autenticado
    req.userId = decoded.id;
    req.userName = decoded.name;

    // Log para depuración
    console.log("🔐 req.userId:", req.userId);
    console.log("🧑 req.userName:", req.userName);

    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido" });
  }
};

export default auth;
