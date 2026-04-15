const express = require('express');
const router = express.Router();
const Catway = require('../models/catway');

// 1. LIRE TOUS les catways (GET)
router.get('/', async (req, res) => {
    try {
        const catways = await Catway.find();
        res.status(200).json(catways);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. LIRE UN SEUL catway par son numéro (GET)
router.get('/:id', async (req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });
        if (catway) {
            res.status(200).json(catway);
        } else {
            res.status(404).json({ message: "Catway non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. CRÉER un nouveau catway (POST)
router.post('/', async (req, res) => {
    const catway = new Catway({
        catwayNumber: req.body.catwayNumber,
        type: req.body.type,
        catwayState: req.body.catwayState
    });

    try {
        const newCatway = await catway.save();
        res.status(201).json(newCatway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 4. MODIFIER l'état d'un catway (PUT)
router.put('/:id', async (req, res) => {
    try {
        const updatedCatway = await Catway.findOneAndUpdate(
            { catwayNumber: req.params.id },
            { catwayState: req.body.catwayState },
            { new: true } // Pour renvoyer l'objet modifié
        );
        res.status(200).json(updatedCatway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 5. SUPPRIMER un catway (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        await Catway.deleteOne({ catwayNumber: req.params.id });
        res.status(200).json({ message: "Catway supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;