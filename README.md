# SocialMemories - Red Social MERN Stack

**SocialMemories** es una aplicación de red social desarrollada con el stack MERN (MongoDB, Express, React, Node.js). Permite a los usuarios compartir recuerdos mediante publicaciones con imágenes, dar "me gusta", autenticarse y gestionar sus contenidos de forma segura. Este proyecto fue desarrollado con fines educativos y colaborativos, simulando un entorno de desarrollo real.

---

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Características Principales](#características-principales)
3. [Funcionalidades Detalladas](#funcionalidades-detalladas)
4. [Tecnologías Utilizadas](#tecnologías-utilizadas)
5. [Requisitos Previos](#requisitos-previos)
6. [Instalación](#instalación)
7. [Uso](#uso)
8. [API REST](#api-rest)
9. [Control de Versiones y Contribución](#control-de-versiones-y-contribución)
10. [Integrantes del Equipo](#integrantes-del-equipo)
11. [Conclusión](#conclusión)
12. [Licencia](#licencia)
13. [Agradecimientos](#agradecimientos)

---

## Introducción

**SocialMemories** nace como una propuesta académica para poner en práctica los fundamentos de desarrollo fullstack utilizando la arquitectura MERN. El objetivo principal es aplicar conceptos como autenticación con JWT, operaciones CRUD, manejo de estado con Redux Toolkit, integración con MongoDB y despliegue local, todo en un entorno colaborativo.

---

## Características Principales

- Registro e inicio de sesión de usuarios mediante JWT.
- CRUD completo de publicaciones con imágenes.
- Sistema de "me gusta" sin duplicaciones.
- Control de acceso basado en el autor de la publicación.
- Paginación para mejorar el rendimiento.
- Interfaz intuitiva con Material UI.

---

## Funcionalidades Detalladas

- **Autenticación:** Registro e inicio de sesión con protección por token (JWT).
- **Publicaciones:** Crear, leer, actualizar y eliminar publicaciones. Solo el autor puede editar o borrar.
- **Imágenes:** Carga y previsualización de imágenes en las publicaciones.
- **Likes:** Sistema de likes individual por usuario autenticado.
- **Paginación:** Visualización de 10 publicaciones por página para optimizar rendimiento.
- **Protección de rutas:** Los botones de edición y eliminación solo se muestran al autor.

---

## Tecnologías Utilizadas

- **Frontend:** React 18.2, Material UI v5, Redux Toolkit, React Router.
- **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose.
- **Autenticación:** JSON Web Tokens (JWT), bcrypt.
- **Otros:** dotenv, concurrently, axios, cors, nodemon.

---

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB local o en la nube (MongoDB Atlas)
- npm o yarn
- Git

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Andriu-Dex/SocialMemories.git
cd SocialMemories

# Instalar dependencias del servidor
cd server
npm install

# Instalar dependencias del cliente
cd ../client
npm install
```

### Configuración del entorno

Crea un archivo `.env` en la carpeta `server/` con el siguiente contenido:

```env
PORT=5000
CONNECTION_URL=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/SocialMemories
JWT_SECRET=tu_clave_secreta
```

---

## Uso

```bash
# En terminal separada, iniciar el backend
cd server
npm start

# Iniciar el frontend
cd ../client
npm start
```

Accede a la aplicación desde:
[http://localhost:3000](http://localhost:3000)

---

## API REST

| Método | Ruta                 | Descripción                      |
| ------ | -------------------- | -------------------------------- |
| GET    | /posts               | Obtener publicaciones paginadas  |
| POST   | /posts               | Crear nueva publicación          |
| PATCH  | /posts/\:id          | Actualizar publicación           |
| DELETE | /posts/\:id          | Eliminar publicación             |
| PATCH  | /posts/\:id/likePost | Dar "me gusta" a una publicación |
| POST   | /user/signin         | Iniciar sesión                   |
| POST   | /user/signup         | Registrar nuevo usuario          |

---

## Control de Versiones y Contribución

Este proyecto utiliza **Git Flow** como modelo de ramificación. Las ramas principales son:

- `main`: Producción
- `develop`: Desarrollo
- `feature/*`: Nuevas funcionalidades
- `hotfix/*`: Correcciones urgentes

### Cómo contribuir

1. Realiza un fork del repositorio.
2. Crea una rama con tu cambio:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. Haz tus cambios y realiza commits descriptivos.
4. Abre un Pull Request con una buena descripción del cambio propuesto.

---

## Desarrolado por

- **Andriu Dex**

---

## Conclusión

SocialMemories es una prueba clara de cómo se puede desarrollar una red social funcional utilizando tecnologías modernas del stack MERN. La experiencia colaborativa, la autenticación, el control de acceso y las operaciones asincrónicas hacen de este proyecto una base sólida para desarrollos más complejos.

---

## Licencia

Distribuido bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información.

---

## Agradecimientos

Este proyecto fue inspirado en la aplicación _Memories_ de JavaScript Mastery, adaptado y reconstruido por el equipo con cambios estructurales, de diseño y funcionalidad para fortalecer la práctica del desarrollo profesional en equipo.

---
