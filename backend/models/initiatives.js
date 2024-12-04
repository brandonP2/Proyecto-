const mongoose = require("mongoose");

const initiativeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    startDate: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // Relación con usuario
});

module.exports = mongoose.model("Initiative", initiativeSchema);
