const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

// 1. LIRE TOUTES les réservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. CRÉER une réservation (POST)
router.post('/', async (req, res) => {
    const reservation = new Reservation({
        catwayNumber: req.body.catwayNumber,
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut
    });

    try {
        const newRes = await reservation.save();
        res.status(201).json(newRes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 3. SUPPRIMER une réservation
router.delete('/:id', async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Réservation annulée" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;