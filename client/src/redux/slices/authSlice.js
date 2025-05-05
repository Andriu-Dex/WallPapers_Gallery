// Se importan herramientas de Redux Toolkit:
// - createSlice: para definir reducers y acciones automáticamente
// - createAsyncThunk: para manejar operaciones asincrónicas (thunks)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Se importa el módulo con funciones que realizan peticiones HTTP (login y register)
import * as api from "../../api";

// ==============================
// Thunk asíncrono: iniciar sesión
// ==============================
export const loginUser = createAsyncThunk(
  "auth/login", // Nombre del tipo de acción
  async (formData, thunkAPI) => {
    try {
      // Se envían las credenciales al backend
      const res = await api.login(formData);

      // Se guarda la respuesta (usuario + token) en el localStorage
      localStorage.setItem("profile", JSON.stringify(res.data));

      // Se retorna la respuesta como payload
      return res.data;
    } catch (err) {
      // Si ocurre un error, se envía al reducer como payload de error
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Error al iniciar sesión"
      );
    }
  }
);

// ==============================
// Thunk asíncrono: registrarse
// ==============================
export const registerUser = createAsyncThunk(
  "auth/register", // Nombre del tipo de acción
  async (formData, thunkAPI) => {
    try {
      // Se envían los datos al backend para crear el usuario
      const res = await api.register(formData);

      // Se guarda el nuevo usuario y token en localStorage
      localStorage.setItem("profile", JSON.stringify(res.data));

      // Se retorna la respuesta como payload
      return res.data;
    } catch (err) {
      // En caso de error, se captura y retorna como mensaje de error
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Error al registrarse"
      );
    }
  }
);

// ==============================
// Slice de autenticación
// ==============================
const authSlice = createSlice({
  name: "auth", // Nombre del slice

  // Estado inicial del slice
  initialState: {
    user: JSON.parse(localStorage.getItem("profile")) || null, // Usuario autenticado o null
    loading: false, // Estado de carga
    error: null, // Mensaje de error (si existe)
  },

  // Reducers síncronos
  reducers: {
    // Acción para cerrar sesión
    logout: (state) => {
      localStorage.removeItem("profile"); // Elimina datos del localStorage
      state.user = null; // Limpia el estado del usuario
    },
  },

  // Reducers adicionales para manejar thunks (acciones asincrónicas)
  extraReducers: (builder) => {
    builder
      // ======== LOGIN ========
      .addCase(loginUser.pending, (state) => {
        state.loading = true; // Muestra spinner de carga
        state.error = null; // Limpia errores anteriores
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false; // Oculta spinner
        state.user = action.payload; // Guarda usuario autenticado
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false; // Oculta spinner
        state.error = action.payload; // Muestra mensaje de error
      })

      // ======== REGISTRO ========
      .addCase(registerUser.pending, (state) => {
        state.loading = true; // Muestra spinner
        state.error = null; // Limpia errores anteriores
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false; // Oculta spinner
        state.user = action.payload; // Guarda el nuevo usuario autenticado
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false; // Oculta spinner
        state.error = action.payload; // Muestra mensaje de error
      });
  },
});

// Exporta la acción logout para poder llamarla desde los componentes
export const { logout } = authSlice.actions;

// Exporta el reducer para ser usado en el store
export default authSlice.reducer;
