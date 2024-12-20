# **Frontend - Documentación**

El frontend está diseñado para manejar la interacción del usuario con la aplicación a través de una interfaz web. Utiliza **HTML**, **CSS**, y **JavaScript** para estructurar las páginas, aplicar estilos y añadir funcionalidad dinámica. Además, un servidor básico basado en **Express** sirve los archivos necesarios para que el navegador acceda al contenido.

### **Funcionamiento**

El servidor del frontend está configurado en el archivo `frontendServer.js`. Este utiliza Express para servir los archivos estáticos como CSS, imágenes y scripts, además de manejar las páginas HTML. Por ejemplo, la ruta raíz (`/`) sirve la página principal de registro (`signup.html`), mientras que otras páginas como `login.html` y `initiatives.html` se encuentran dentro de la carpeta `pages` y se acceden a través de rutas configuradas. Todos los recursos como estilos, imágenes e íconos se distribuyen desde sus respectivas carpetas dentro de `assets`, `styles`, y `components`.

Las páginas HTML son las siguientes:
- **`signup.html`**: Diseñada para registrar usuarios. Esta página incluye un formulario que envía una solicitud `POST` al backend para registrar la información del usuario. Al completarse el registro con éxito, el usuario es redirigido a `login.html`.
- **`login.html`**: Se encarga de gestionar el inicio de sesión. Envía una solicitud `POST` al backend con las credenciales del usuario. Si el inicio de sesión es exitoso, redirige al usuario a `initiatives.html`.
- **`initiatives.html`**: Una página protegida que muestra y permite administrar las iniciativas asociadas al usuario autenticado. Depende de datos obtenidos del backend.

El frontend utiliza varios scripts en JavaScript para manejar funcionalidad específica:
- **`validation.js`**: Realiza validaciones de formularios en el cliente para asegurarse de que los campos contengan valores válidos antes de enviarlos al servidor.
- **`login.js`**: Maneja la lógica relacionada con el inicio de sesión, como la comunicación con el backend y la gestión de redirecciones.
- **`initiatives.js`**: Carga y gestiona las iniciativas del usuario mediante solicitudes al backend.

El archivo `style.css` se encarga de todos los estilos visuales de las páginas, asegurando una experiencia de usuario consistente y agradable.

### **Cómo Ejecutar el Frontend**

1. Asegúrate de que las dependencias están instaladas ejecutando:
   ```bash
   npm install
