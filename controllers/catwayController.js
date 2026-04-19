// // On importe le service qu'on vient de créer
// const catwayService = require('../services/catwayService');

// exports.getAllCatways = async (req, res) => {
//     try {
//         // Le controller demande au service de récupérer les données
//         const catways = await catwayService.getAllCatways();
//         // Il renvoie la réponse au format JSON avec un code 200 (Succès)
//         res.status(200).json(catways);
//     } catch (error) {
//         // En cas de problème, on renvoie une erreur 500
//         res.status(500).json({ message: "Erreur lors de la récupération des catways", error: error.message });
//     }
// };

const catwayService = require('../services/catwayService');

exports.getAllCatways = async (req, res) => {
    try {
        const catways = await catwayService.getAllCatways();
        res.status(200).json(catways);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
    }
};

exports.getCatwayById = async (req, res) => {
    try {
        const catway = await catwayService.getCatwayById(req.params.id);
        if (!catway) return res.status(404).json({ message: "Catway introuvable" });
        res.status(200).json(catway);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la recherche", error: error.message });
    }
};

exports.createCatway = async (req, res) => {
    try {
        const newCatway = await catwayService.createCatway(req.body);
        res.status(201).json(newCatway);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création", error: error.message });
    }
};

exports.updateCatway = async (req, res) => {
    try {
        // On récupère le "catwayState" envoyé dans la requête
        const { catwayState } = req.body;
        const updatedCatway = await catwayService.updateCatwayState(req.params.id, catwayState);
        if (!updatedCatway) return res.status(404).json({ message: "Catway introuvable" });
        res.status(200).json(updatedCatway);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
    }
};

exports.deleteCatway = async (req, res) => {
    try {
        const deletedCatway = await catwayService.deleteCatway(req.params.id);
        if (!deletedCatway) return res.status(404).json({ message: "Catway introuvable" });
        res.status(204).send(); // 204 = Succès, mais pas de contenu à renvoyer
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
    }
};