# Guía de Contribución

¡Gracias por tu interés en contribuir a **SocialMemories - Red Social MERN Stack**! Este documento establece las directrices necesarias para colaborar en el proyecto de manera efectiva, clara y organizada.

---

## Índice

1. [Cómo Contribuir](#cómo-contribuir)
2. [Pautas de Contribución](#pautas-de-contribución)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Historial de Contribuciones y Problemas Resueltos](#historial-de-contribuciones-y-problemas-resueltos)
5. [Restricciones y Decisiones Técnicas](#restricciones-y-decisiones-técnicas)
6. [Reportar Problemas](#reportar-problemas)
7. [Código de Conducta](#código-de-conducta)
8. [Recursos Útiles](#recursos-útiles)
9. [Equipo del Proyecto](#equipo-del-proyecto)

---

## Cómo Contribuir

1. **Haz un fork del repositorio**
   [Fork el proyecto](https://github.com/Andriu-Dex/SocialMemories) a tu cuenta personal de GitHub.

2. **Clona el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/SocialMemories.git
   cd SocialMemories
   ```

3. **Crea una nueva rama**
   Usa una convención descriptiva para nombrar ramas:

   ```bash
   git checkout -b fix/editar-error-form
   ```

4. **Haz los cambios necesarios**
   Asegúrate de seguir las convenciones de estilo, incluir comentarios claros y que tu código sea reutilizable.

5. **Prueba tus cambios**
   Valida que la funcionalidad siga operando correctamente. Usa pruebas manuales o unitarias según sea necesario.

6. **Haz commit y push**

   ```bash
   git commit -m "Fix: corregido error de redirección en formulario de edición"
   git push origin fix/editar-error-form
   ```

7. **Abre un Pull Request**
   Explica detalladamente qué has cambiado, por qué y si se relaciona con algún issue.

---

## Pautas de Contribución

### Estilo de Código

- Sigue las buenas prácticas de React y Node.js.
- Usa nombres claros, evita abreviaciones ambiguas.
- Mantén consistencia en la indentación y formato.
- Documenta tu código donde sea necesario.

### Documentación

- Toda nueva funcionalidad debe ir acompañada de comentarios y, si aplica, ser reflejada en el README.

### Pruebas

- Verifica que el proyecto se ejecuta sin errores.
- Prueba las rutas API desde Postman o similar si afecta al backend.
- Para el frontend, asegúrate de que la experiencia de usuario no se vea afectada.

---

## Estructura del Proyecto

El proyecto sigue una arquitectura típica MERN dividida así:

```
SocialMemories/
│
├── client/               # Aplicación React
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── pages/        # Páginas como Home, Auth, EditPost
│   │   ├── redux/        # Configuración y slices de Redux
│   │   └── assets/       # Iconos, imágenes
│
├── server/               # API con Express + MongoDB
│   ├── controllers/      # Lógica de negocio
│   ├── models/           # Modelos de datos Mongoose
│   ├── routes/           # Definición de endpoints
│   └── middleware/       # Middlewares como auth.js
│
└── .env                  # Variables de entorno
```

---

## Historial de Contribuciones y Problemas Resueltos

Durante el desarrollo del proyecto **SocialMemories** se presentaron diversos problemas técnicos que fueron resueltos de forma progresiva a través de ramas `hotfix/*` y `feature/*`, las cuales fueron correctamente documentadas mediante commits y pull requests. A continuación, se detallan los incidentes más relevantes y las contribuciones asociadas:

### Correcciones y mejoras técnicas

- ✅ **Redirección inmediata no deseada al intentar editar una publicación**, provocada por un condicional incorrecto en la vista `EditPost`. Se resolvió implementando una verificación estricta: `user?.result?._id === post.creator`.

- ✅ **Error HTTP 403 al eliminar publicaciones**, causado por la comparación de tipos incompatibles entre `post.creator` (ObjectId) y `req.userId` (string). Se solucionó forzando la conversión con `String()`.

- ✅ **Fallo crítico por uso de `post.creator.equals()`**, generando un `TypeError` al intentar eliminar publicaciones. Se corrigió reemplazando el uso de `.equals()` por `String(post.creator) === String(req.userId)`.

- ✅ **Token JWT inválido o expirado** provocaba errores 403 incluso con sesión iniciada. Se implementó verificación explícita y un flujo de cierre de sesión automático si el token falla.

- ✅ **Formulario de creación de publicaciones permitía acceso sin sesión**, se añadió redirección a `/login` si el usuario no estaba autenticado, tanto en rutas como en interfaz.

- ✅ **Problemas de carga lenta de publicaciones** debido al renderizado masivo con imágenes grandes. Se incorporó **paginación**, limitando la carga a 10 publicaciones por página desde el backend y frontend.

- ✅ **Error silencioso al editar publicaciones** por no coincidir el `creator` en el frontend con el `req.userId` en el backend. Se ajustaron ambos lados para mantener coherencia en la autenticación.

- ✅ **Confusión entre rutas protegidas y públicas**, se centralizó la lógica de autenticación en el archivo `App.js` y se añadió un `isLoadingAuth` con `CircularProgress` durante la verificación del usuario.

- ✅ **Advertencias ESLint por variables no utilizadas** como `handleFileChange`. Se refactorizó el código eliminando funciones no invocadas.

- ✅ **Archivos innecesarios (`package.json`, `package-lock.json`) en raíz del proyecto**, generados por error al usar `npm install` en el nivel incorrecto.

## Restricciones y Decisiones Técnicas

- El proyecto usa **React 18.2.0** y **Material UI v5**, tras corregir conflictos de hooks generados por React 19 no estable.
- Se optó por **Redux Toolkit** para la gestión de estado.
- El atributo `creator` de cada publicación debe coincidir con `user.result._id` del JWT para permitir edición o eliminación.
- La autenticación usa **JWT**, y se almacena en `localStorage`.
- Las imágenes se cargan como cadenas base64 (data URI), lo que puede afectar el rendimiento con imágenes grandes; por ello, se habilitó paginación.

---

## Reportar Problemas

Antes de abrir un nuevo issue:

1. Revisa los issues existentes.
2. Si no existe, abre uno nuevo incluyendo:

   - Descripción detallada.
   - Pasos para reproducirlo.
   - Capturas o logs relevantes.

---

## Código de Conducta

Este proyecto sigue el [Código de Conducta de Contributor Covenant](https://www.contributor-covenant.org/es/version/2/1/code_of_conduct/). Se espera respeto, inclusión y colaboración.

---

## Recursos Útiles

- [Documentación de GitHub](https://docs.github.com/)
- [Guía para Pull Requests](https://opensource.guide/how-to-contribute/#opening-a-pull-request)
- [Material UI](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

---

## Equipo del Proyecto

- **Andriu Dex**

---
