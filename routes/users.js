const express = require('express');
const router = express.Router(); // C'est cette ligne qui crée le fameux "router" !

const userController = require('../controllers/userController');

// Définition des routes qui pointent vers le controller
router.get('/', userController.getAllUsers);
router.get('/:email', userController.getUserByEmail);
router.post('/', userController.createUser);
router.put('/:email', userController.updateUser);
router.delete('/:email', userController.deleteUser);

// Exportation du router pour que app.js puisse l'utiliser
module.exports = router;

// const userService = require('../services/userService');

// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await userService.getAllUsers();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error: error.message });
//     }
// };

// exports.getUserByEmail = async (req, res) => {
//     try {
//         const user = await userService.getUserByEmail(req.params.email);
//         if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la recherche", error: error.message });
//     }
// };

// exports.createUser = async (req, res) => {
//     try {
//         const newUser = await userService.createUser(req.body);
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error: error.message });
//     }
// };

// exports.updateUser = async (req, res) => {
//     try {
//         const updatedUser = await userService.updateUser(req.params.email, req.body);
//         if (!updatedUser) return res.status(404).json({ message: "Utilisateur introuvable" });
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
//     }
// };

// exports.deleteUser = async (req, res) => {
//     try {
//         const deletedUser = await userService.deleteUser(req.params.email);
//         if (!deletedUser) return res.status(404).json({ message: "Utilisateur introuvable" });
//         res.status(204).send();
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
//     }
// };

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');

// // 1. LIRE TOUS LES UTILISATEURS (GET /users/)
// router.get('/', async (req, res) => {
//     try {
//         // On récupère tous les utilisateurs en cachant les mots de passe pour la sécurité
//         const users = await User.find().select('-password').lean(); 
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error: error.message });
//     }
// });

// // 2. LIRE UN SEUL UTILISATEUR PAR SON EMAIL (GET /users/:email)
// router.get('/:email', async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.params.email }).select('-password').lean();
//         if (!user) {
//             return res.status(404).json({ message: "Utilisateur introuvable" });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la recherche de l'utilisateur", error: error.message });
//     }
// });

// // 3. CRÉER UN UTILISATEUR (POST /users/)
// router.post('/', async (req, res) => {
//     try {
//         const nouvelUtilisateur = new User({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password
//         });
        
//         // La sauvegarde va automatiquement hacher le mot de passe grâce à ton modèle user.js !
//         await nouvelUtilisateur.save();
//         res.status(201).json({ message: "Utilisateur créé avec succès" });
//     } catch (error) {
//         if (error.code === 11000) {
//             return res.status(400).json({ message: "Cette adresse email est déjà utilisée." });
//         }
//         res.status(500).json({ message: "Erreur lors de la création", error: error.message });
//     }
// });

// // 4. MODIFIER UN UTILISATEUR (PUT /users/:email)
// router.put('/:email', async (req, res) => {
//     try {
//         // On cherche l'utilisateur d'abord
//         const user = await User.findOne({ email: req.params.email });
//         if (!user) {
//             return res.status(404).json({ message: "Utilisateur introuvable" });
//         }

//         // On met à jour les champs si de nouvelles valeurs sont envoyées
//         if (req.body.username) user.username = req.body.username;
//         if (req.body.email) user.email = req.body.email;
//         if (req.body.password) user.password = req.body.password; // Le hachage se fera tout seul grâce au pre('save')

//         await user.save();
//         res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
//     }
// });

// // 5. SUPPRIMER UN UTILISATEUR (DELETE /users/:email)
// router.delete('/:email', async (req, res) => {
//     try {
//         const resultat = await User.findOneAndDelete({ email: req.params.email });
//         if (!resultat) {
//             return res.status(404).json({ message: "Utilisateur introuvable" });
//         }
//         res.status(200).json({ message: "Utilisateur supprimé avec succès" });
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
//     }
// });

// module.exports = router;