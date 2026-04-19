const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // 1. On place toujours le jeton dans le cookie pour le navigateur
        res.cookie('token', token, { httpOnly: true });

        // 2. Test pour différencier Postman du navigateur
        if (req.headers['accept'] && req.headers['accept'].includes('application/json')) {
            // Pour Postman : on envoie le JSON
            return res.status(200).json({
                message: "Connexion réussie",
                token: token,
                user: { username: user.username, email: user.email }
            });
        } else {
            // Pour le site web : on redirige vers le dashboard
            return res.redirect('/dashboard');
        }

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    
    // Test pour le logout
    if (req.headers['accept'] && req.headers['accept'].includes('application/json')) {
        return res.status(200).json({ message: "Déconnexion réussie" });
    } else {
        return res.redirect('/');
    }
};

// const User = require('../models/user');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// exports.login = async (req, res) => {
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         if (!user) {
//             return res.status(404).json({ message: "Utilisateur non trouvé." }); 
//         }

//         const isMatch = await bcrypt.compare(req.body.password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Mot de passe incorrect." });
//         }

//         const token = jwt.sign(
//             { id: user._id, username: user.username, email: user.email }, 
//             process.env.JWT_SECRET, 
//             { expiresIn: '24h' }
//         );

//         // On garde le cookie pour le Dashboard
//         res.cookie('token', token, { httpOnly: true });
        
//         // MAIS on envoie aussi le token en JSON pour Postman !
//         // On ne fait plus de redirect ici, c'est le client (front ou Postman) qui décidera
//     //     res.status(200).json({
//     //         message: "Connexion réussie",
//     //         token: token,
//     //         user: { username: user.username, email: user.email }
//     //     });

//     // } catch (error) {
//     //     res.status(500).json({ message: "Erreur serveur", error: error.message });
//     // }

//     // ... (ton code précédent : recherche user, bcrypt, jwt.sign)

//         // 1. On place toujours le jeton dans le cookie pour le navigateur
//         res.cookie('token', token, { httpOnly: true });

//         // 2. LE TEST MAGIQUE :
//         // On vérifie si la requête attend du JSON (Postman) ou pas (Navigateur)
//         if (req.headers['accept'] && req.headers['accept'].includes('application/json')) {
//             // C'est Postman : on envoie le JSON avec le token
//             return res.status(200).json({
//                 message: "Connexion réussie",
//                 token: token,
//                 user: { username: user.username, email: user.email }
//             });
//         } else {
//             // C'est ton site web (le navigateur) : on le redirige vers le dashboard
//             return res.redirect('/dashboard');
//         }
// };

// exports.logout = (req, res) => {
//     res.clearCookie('token');
//     // res.status(200).json({ message: "Déconnexion réussie" });
//     // À la place du res.status(200).json(...)
// if (req.headers['user-agent'].includes('Postman') || req.headers['content-type'] === 'application/json') {
//     // Si c'est Postman ou une requête API, on envoie le JSON
//     return res.status(200).json({ message: "Connexion réussie", token: token });
// } else {
//     // Si c'est un navigateur classique, on redirige vers le dashboard
//     return res.redirect('/dashboard');
// }
// };