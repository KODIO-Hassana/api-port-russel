const reservationService = require('../services/reservationService');

exports.getReservations = async (req, res) => {
    try {
        const reservations = await reservationService.getReservationsByCatway(req.params.id);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
    }
};

exports.getReservationById = async (req, res) => {
    try {
        const reservation = await reservationService.getReservationById(req.params.idReservation);
        if (!reservation) return res.status(404).json({ message: "Réservation introuvable" });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la recherche", error: error.message });
    }
};

exports.createReservation = async (req, res) => {
    try {
        // On force le numéro du catway depuis l'URL pour être sûr qu'il ne soit pas oublié
        const reservationData = { ...req.body, catwayNumber: req.params.id };
        const newReservation = await reservationService.createReservation(reservationData);
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création", error: error.message });
    }
};

exports.updateReservation = async (req, res) => {
    try {
        const updatedReservation = await reservationService.updateReservation(req.params.idReservation, req.body);
        if (!updatedReservation) return res.status(404).json({ message: "Réservation introuvable" });
        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await reservationService.deleteReservation(req.params.idReservation);
        if (!deletedReservation) return res.status(404).json({ message: "Réservation introuvable" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
    }
};