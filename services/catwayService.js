// // On importe le modèle 
// const Catway = require('../models/catway'); 

// exports.getAllCatways = async () => {
//     // Le service fait la requête brute à la base de données
//     const catways = await Catway.find();
//     return catways;
// };

const Catway = require('../models/catway');

exports.getAllCatways = async () => {
    return await Catway.find();
};

exports.getCatwayById = async (id) => {
    return await Catway.findById(id); 
};

exports.createCatway = async (catwayData) => {
    const catway = new Catway(catwayData);
    return await catway.save();
};

exports.updateCatwayState = async (id, catwayState) => {
    // Le brief précise qu'on met à jour uniquement l'état du catway
    return await Catway.findByIdAndUpdate(id, { catwayState }, { new: true });
};

exports.deleteCatway = async (id) => {
    return await Catway.findByIdAndDelete(id);
};