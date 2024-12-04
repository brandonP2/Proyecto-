const express = require("express");
const cors = require("cors"); // Importar cors
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// Configurar CORS
app.use(cors()); // Permitir solicitudes desde cualquier origen

// Middleware para parsear JSON
app.use(express.json());


// Conectar a MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error conectando a MongoDB:", error);
        process.exit(1);
    }
};
connectDB();
// Importar las rutas de usuarios
const userRoutes = require("./routes/userRoutes.js");

// Usar las rutas de usuarios
app.use("/api/Users", userRoutes);


// Importar y usar rutas
const initiativesRoutes = require("./routes/InitiativesRoutes.js");
app.use("/api/initiatives", initiativesRoutes);
// Ruta de prueba para la raíz
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

