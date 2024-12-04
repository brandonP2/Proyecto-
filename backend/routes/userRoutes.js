const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Generar token JWT
        const token = jwt.sign({ id: newUser._id }, "secretKey", { expiresIn: "1h" });

        // Responder con el usuario creado y el token
        res.status(201).json({ message: "Usuario creado correctamente", token });
    } catch (error) {
        console.error("Error al registrar usuario:", error.message);
        res.status(400).json({ message: error.message });
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        // Generar token JWT
        const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });
        res.status(200).json({ message: "Inicio de sesión exitoso", token }); // Incluye el token en la respuesta
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
