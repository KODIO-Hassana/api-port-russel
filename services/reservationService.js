const Reservation = require('../models/reservation'); // Vérifie bien le nom de ton modèle

exports.getReservationsByCatway = async (catwayNumber) => {
    // On cherche les réservations liées à un catway spécifique
    return await Reservation.find({ catwayNumber: catwayNumber });
};

exports.getReservationById = async (id) => {
    return await Reservation.findById(id);
};

exports.createReservation = async (reservationData) => {
    const reservation = new Reservation(reservationData);
    return await reservation.save();
};

// La fonctionnalité manquante demandée par le correcteur !
exports.updateReservation = async (id, updateData) => {
    return await Reservation.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteReservation = async (id) => {
    return await Reservation.findByIdAndDelete(id);
};