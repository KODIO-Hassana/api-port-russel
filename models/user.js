const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    // Remplacement de fullname par username
    username: { 
        type: String, 
        required: true,
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true, // Convertit l'email en minuscules pour éviter les doublons
        match: [/^\S+@\S+\.\S+$/, 'Veuillez entrer une adresse email valide'] // Vérifie le format de l'email
    },
    password: { 
        type: String, 
        required: true,
        minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'] // Règle de contrôle ajoutée
    }
});

// Hashage du mot de passe avant sauvegarde
userSchema.pre('save', async function(next) { // Ajout de "next"
    // Si le mot de passe n'a pas été modifié, on ne fait rien
    if (!this.isModified('password')) return next();

    try {
        // On génère le sel et on hache le mot de passe
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error); // Remplacement du throw par next(error) pour Express
    }
});

module.exports = mongoose.model('User', userSchema);