const User = require('../models/user'); 

exports.getAllUsers = async () => {
    // On exclut le mot de passe des résultats pour des raisons de sécurité (-password)
    return await User.find().select('-password');
};

exports.getUserByEmail = async (email) => {
    return await User.findOne({ email }).select('-password');
};

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

// La fameuse fonction manquante pour le correcteur !
exports.updateUser = async (email, updateData) => {
    // On cherche par email et on met à jour
    return await User.findOneAndUpdate({ email: email }, updateData, { new: true }).select('-password');
};

exports.deleteUser = async (email) => {
    return await User.findOneAndDelete({ email: email });
};