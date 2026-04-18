const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

// 1. LIRE TOUTES les réservations d'un catway précis
// Route exigée : GET /catways/:id/reservations
router.get('/catways/:id/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find({ catwayNumber: req.params.id });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. LIRE UNE SEULE réservation (Détails)
// Route exigée : GET /catways/:id/reservations/:idReservation
router.get('/catways/:id/reservations/:idReservation', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.idReservation);
        if (!reservation) {
            return res.status(404).json({ message: "Réservation introuvable" });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. CRÉER une réservation via l'API
// Route exigée : POST /catways/:id/reservations
router.post('/catways/:id/reservations', async (req, res) => {
    const reservation = new Reservation({
        catwayNumber: req.params.id, // On récupère l'ID du catway directement dans l'URL !
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        startDate: req.body.startDate, // Corrigé : on remet startDate
        endDate: req.body.endDate      // Corrigé : on remet endDate
    });

    try {
        const newRes = await reservation.save();
        res.status(201).json(newRes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 4. SUPPRIMER une réservation via l'API
// Route exigée : DELETE /catways/:id/reservations/:idReservation
router.delete('/catways/:id/reservations/:idReservation', async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.idReservation);
        res.status(200).json({ message: "Réservation annulée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Reservation = require('../models/reservation');

// // 1. LIRE TOUTES les réservations
// router.get('/', async (req, res) => {
//     try {
//         const reservations = await Reservation.find();
//         res.status(200).json(reservations);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // 2. CRÉER une réservation (POST)
// router.post('/', async (req, res) => {
//     const reservation = new Reservation({
//         catwayNumber: req.body.catwayNumber,
//         clientName: req.body.clientName,
//         boatName: req.body.boatName,
//         checkIn: req.body.checkIn,
//         checkOut: req.body.checkOut
//     });

//     try {
//         const newRes = await reservation.save();
//         res.status(201).json(newRes);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

// // 3. SUPPRIMER une réservation
// router.delete('/:id', async (req, res) => {
//     try {
//         await Reservation.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: "Réservation annulée" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// module.exports = router;