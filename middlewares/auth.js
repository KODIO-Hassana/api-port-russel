const jwt = require('jsonwebtoken');

const verifierAuthentification = (req, res, next) => {
    // On cherche le token dans les cookies (dashboard) OU dans l'en-tête (Postman)
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Accès refusé : Authentification requise." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Session expirée ou token invalide." });
    }
};

module.exports = verifierAuthentification;