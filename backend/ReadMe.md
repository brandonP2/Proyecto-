# **Backend - Documentación**

El backend es la parte lógica de la aplicación que maneja las solicitudes, la conexión con la base de datos y la seguridad mediante tokens JWT. Este proyecto utiliza **Node.js**, **Express** y **MongoDB** con **Mongoose** para la gestión de datos y la construcción de una API robusta.

## **Funcionamiento**

El servidor backend está configurado en el archivo `server.js`, donde se inicializa Express y se conecta con la base de datos mediante `db.js`. Las rutas de la API están divididas en dos grupos principales: `userRoutes.js` para la gestión de usuarios y `initiativesRoutes.js` para las iniciativas. Estas rutas delegan las tareas específicas a sus respectivos controladores.

### **Conexión con la Base de Datos**

La conexión con MongoDB se realiza a través del archivo `db.js`, utilizando **Mongoose**. Este archivo maneja los errores de conexión y asegura que el servidor no se inicie si no se logra conectar correctamente a la base de datos.

### **Rutas del Backend**

1. **`userRoutes.js`**:
   - Contiene las rutas relacionadas con los usuarios, como el registro (`/signup`) y el inicio de sesión (`/login`).
   - Las solicitudes son procesadas por el controlador `userController.js`.

2. **`initiativesRoutes.js`**:
   - Maneja las rutas para crear, obtener, actualizar y eliminar iniciativas.
   - Estas rutas están protegidas por el middleware `authenticateUser.js`, que verifica el token JWT.

### **Controladores**

1. **`userController.js`**:
   - Gestiona el registro de nuevos usuarios mediante el cifrado de contraseñas con **bcrypt** y la creación de tokens JWT.
   - También maneja el inicio de sesión, validando las credenciales proporcionadas y generando un nuevo token JWT.

2. **`initiativesController.js`**:
   - Maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para las iniciativas de los usuarios.
   - Solo se accede a estas funciones si el usuario está autenticado.

### **Middleware**

1. **`authenticateUser.js`**:
   - Verifica la autenticación del usuario validando el token JWT en las solicitudes protegidas.
   - Si el token es válido, permite el acceso; de lo contrario, devuelve un error de autenticación.

2. **`errorHandler.js`**:
   - Se encarga de capturar y manejar errores globalmente, asegurándose de que las respuestas sean consistentes.

### **Modelos**

1. **`user.js`**:
   - Define el esquema de usuario en la base de datos con campos como `name`, `email` y `password`.
   - También incluye validaciones y la encriptación de contraseñas.

2. **`initiatives.js`**:
   - Define el esquema de las iniciativas, asociándolas con un usuario y permitiendo campos como `title` y `description`.

---
