const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    initiatives: [{ type: mongoose.Schema.Types.ObjectId, ref: "Initiative" }] // Relación con iniciativas
});

module.exports = mongoose.model("User", userSchema);
