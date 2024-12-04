const express = require("express");
const Initiative = require("../models/initiatives");
const authenticateUser = require("../middleware/authenticateUser"); // Importar el middleware


const router = express.Router();


router.post("/", async (req, res) => {
    const { userId, title, description, category, startDate } = req.body;

    try {
        const initiative = new Initiative({ title, description, category, startDate, user: userId });
        await initiative.save();

        // Agregar la iniciativa al usuario
        const user = await User.findById(userId);
        user.initiatives.push(initiative._id);
        await user.save();

        res.status(201).json(initiative);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Crear iniciativa
router.post("/", async (req, res) => {
    try {
        const initiative = new Initiative(req.body);
        await initiative.save();
        res.status(201).json(initiative);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Obtener todas las iniciativas
router.get("/", async (req, res) => {
    try {
        const initiatives = await Initiative.find();
        res.status(200).json(initiatives);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Eliminar una iniciativa
router.delete("/:id", async (req, res) => {
    try {
        await Initiative.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Iniciativa eliminada" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


