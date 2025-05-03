# Requisitos previos

Asegúrate de tener instalado en tu equipo:

- Node.js (versión 16 o superior)
- npm (se instala con Node)
- MongoDB local o Mongo Atlas
- Git
- Extensión React Developer Tools (opcional)

🚀 Pasos para ejecutar el proyecto

## 1. Clonar el repositorio

```bash
git clone https://github.com/Andriu-Dex/SocialMemories.git
cd SocialMemories
```

## 2. Configurar el Backend (/server)

### 2.1. Entrar a la carpeta del servidor

```bash
cd server
```

### 2.2. Instalar dependencias

```bash
npm install
```

### 2.3. Crear archivo .env con las siguientes variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/socialmemories  # O tu URI de Mongo Atlas
JWT_SECRET=12345
```

### 2.4. Ejecutar el servidor

```bash
npm start
```

Deberías ver:

```arduino
✅ Server running on http://localhost:5000
```

## 3. Configurar el Frontend (/client)

### 3.1. Entrar a la carpeta del cliente

```bash
cd ../client
```

### 3.2. Instalar dependencias

```bash
npm install
```

### 3.3. Ejecutar el cliente

```bash
npm start
```

Esto abrirá la aplicación en http://localhost:3000.

🔄 Comunicación entre frontend y backend

- El cliente se conecta al backend en http://localhost:5000.
- El backend está preparado para recibir tokens JWT desde el frontend.
- Las rutas protegidas usan el middleware auth.js.

📦 Paquetes instalados

### En el cliente:

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install react-redux @reduxjs/toolkit react-router-dom
npm install axios moment react-file-base64
```

### En el servidor:

```bash
npm install express mongoose dotenv cors jsonwebtoken bcryptjs
npm install --save-dev nodemon
```
