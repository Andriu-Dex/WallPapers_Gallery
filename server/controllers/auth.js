import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "12345";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "El usuario ya existe." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      // { id: newUser._id, email: newUser.email },
      { id: newUser._id, name: newUser.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario." });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "Usuario no encontrado." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Contraseña incorrecta." });

    const token = jwt.sign(
      // { id: existingUser._id, email: existingUser.email },
      { id: existingUser._id, name: existingUser.name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión." });
  }
};
