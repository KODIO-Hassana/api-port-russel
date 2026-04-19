const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // On utilise la variable d'environnement pour l'URI
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Base de données MongoDB connectée avec succès');
    } catch (error) {
        console.error('❌ Erreur de connexion à MongoDB:', error.message);
        // On arrête l'application si la base de données ne répond pas (très important en production)
        process.exit(1); 
    }
};

module.exports = connectDB;