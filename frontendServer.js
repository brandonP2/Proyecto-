const express = require("express");
const path = require("path");

const app = express();
const PORT = 5500;

// Ruta para servir tu archivo HTML en la raíz "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Front", "signup.html"));
});

// Servir archivos estáticos como CSS, imágenes, JS
app.use(express.static(path.join(__dirname, "Front")));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor frontend corriendo en http://localhost:${PORT}`);
});
