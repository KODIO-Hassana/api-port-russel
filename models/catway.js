const mongoose = require('mongoose');

// On définit le "moule" pour un Catway
const catwaySchema = new mongoose.Schema({
    catwayNumber: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    catwayType: { 
        type: String, 
        // enum: ['long', 'short'], 
        required: true 
    },
    catwayState: { 
        type: String, 
        required: true 
    }
}, { 
    collection: 'catways',
    strict: false } );

// On exporte le modèle pour pouvoir l'utiliser ailleurs dans le code
module.exports = mongoose.model('Catway', catwaySchema, 'catways');