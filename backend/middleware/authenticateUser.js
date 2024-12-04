const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extrae el token del encabezado
    if (!token) return res.status(401).json({ message: "No autorizado" });

    try {
        const decoded = jwt.verify(token, "secretKey"); // Verifica el token
        req.userId = decoded.id; // Extrae el ID del usuario del token y lo asigna a `req.userId`
        next();
    } catch (error) {
        res.status(403).json({ message: "Token inválido o expirado" });
    }
};

module.exports = authenticateUser;
