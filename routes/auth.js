const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes pointant vers le contrôleur
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// // 1. Route de Connexion (POST /login)
// router.post('/login', async (req, res) => {
//     try {
//         // On cherche l'utilisateur par son email
//         const user = await User.findOne({ email: req.body.email });
//         if (!user) {
//             return res.status(404).send("Utilisateur non trouvé. Vérifiez votre email."); 
//         }

//         // On compare les mots de passe
//         const isMatch = await bcrypt.compare(req.body.password, user.password);
//         if (!isMatch) {
//             return res.status(401).send("Mot de passe incorrect.");
//         }

//         // On crée le Token (le badge d'accès)
//         // SUPER IMPORTANT : On glisse le username et l'email dans le badge pour le Dashboard !
//         const token = jwt.sign(
//             { 
//                 id: user._id, 
//                 username: user.username, 
//                 email: user.email 
//             }, 
//             process.env.JWT_SECRET, 
//             { expiresIn: '24h' }
//         );

//         // On place le jeton dans un cookie sécurisé
//         res.cookie('token', token, { httpOnly: true });
        
//         // Si tout est bon, on redirige l'utilisateur vers le tableau de bord
//         res.redirect('/dashboard'); 

//     } catch (error) {
//         res.status(500).send("Erreur serveur : " + error.message);
//     }
// });

// // 2. Route de Déconnexion (GET /logout)
// router.get('/logout', (req, res) => {
//     // On détruit le cookie qui contient le badge d'accès
//     res.clearCookie('token');
//     // On renvoie l'utilisateur vers la page d'accueil
//     res.redirect('/');
// });

// module.exports = router;