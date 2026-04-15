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

// // Hashage du mot de passe avant sauvegarde
// userSchema.pre('save', async function(next) { // Ajout de "next"
//     // Si le mot de passe n'a pas été modifié, on ne fait rien
//     if (!this.isModified('password')) return next();

//     try {
//         // On génère  et on hache le mot de passe
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (error) {
//         next(error); // Remplacement du throw par next(error) pour Express
//     }
// });


// userSchema.pre('save', async function(next) {
//     const user = this;

//     // Si le mot de passe n'est pas modifié, on passe à la suite
//     if (!user.isModified('password')) {
//         return next();
//     }

//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(user.password, salt);
//         user.password = hash;
//         next();
//     } catch (err) {
//         return next(err);
//     }
// });

// Nouvelle syntaxe simplifiée pour models/user.js
userSchema.pre('save', async function() {
    // Si le mot de passe n'est pas modifié, on s'arrête là
    if (!this.isModified('password')) return;

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        // Pas besoin de next(), Mongoose comprend que c'est fini quand la fonction async se termine
    } catch (error) {
        throw error; // Mongoose attrapera l'erreur tout seul
    }
});

module.exports = mongoose.model('User', userSchema);