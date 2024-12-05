const express = require("express");
const Initiative = require("../models/initiatives");
const authenticateUser = require("../middleware/authenticateUser");

const router = express.Router();

// Modificar la ruta POST para usar autenticación y agregar el userId
router.post("/", authenticateUser, async (req, res) => {
    try {
        const initiative = new Initiative({
            ...req.body,
            user: req.userId // Este viene del middleware de autenticación
        });
        await initiative.save();
        res.status(201).json(initiative);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// También proteger las otras rutas
router.get("/", authenticateUser, async (req, res) => {
    try {
        const initiatives = await Initiative.find();
        res.status(200).json(initiatives);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Agregar ruta GET para obtener una iniciativa específica
router.get("/:id", authenticateUser, async (req, res) => {
    try {
        const initiative = await Initiative.findById(req.params.id);
        if (!initiative) {
            return res.status(404).json({ message: "Iniciativa no encontrada" });
        }
        res.status(200).json(initiative);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", authenticateUser, async (req, res) => {
    try {
        await Initiative.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Iniciativa eliminada" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar una iniciativa (agregando authenticateUser)
router.put("/:id", authenticateUser, async (req, res) => {
    try {
        const initiative = await Initiative.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!initiative) {
            return res.status(404).json({ message: "Iniciativa no encontrada" });
        }
        res.status(200).json(initiative);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;