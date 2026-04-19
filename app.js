// 1. Chargement des variables d'environnement (.env)
const User = require('./models/user');
const Catway = require('./models/catway'); 
const Reservation = require('./models/reservation'); // 
const connectDB = require('./config/database');

require('dotenv').config();

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// 2. Importation des modules
const express = require('express');
const mongoose = require('mongoose');

// 3. Initialisation de l'application
const app = express();

const path = require('path');

// Indique à Express qu'on utilise EJS pour générer le HTML
app.set('view engine', 'ejs');
// Indique que nos fichiers de vue se trouvent dans le dossier nommé "views"
app.set('views', path.join(__dirname, 'views'));

// Indispensable pour récupérer les données saisies dans les formulaires HTML
app.use(express.urlencoded({ extended: false }));

// Pour que ton site puisse charger des fichiers CSS ou des images (dossier "public")
app.use(express.static(path.join(__dirname, 'public')));

// Fonction de protection (Middleware)
// const verifierAuthentification = (req, res, next) => {
//     const token = req.cookies.token; // On récupère le badge dans le cookie

//     if (!token) {
//         // Pas de badge ? On renvoie vers une erreur ou la page de login
//         return res.status(401).send("Accès refusé : vous devez être connecté pour voir le dashboard.");
//     }

//     try {
//         // On vérifie si le badge est authentique avec ta phrase secrète du .env
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // On stocke les infos du user au cas où on en aurait besoin
//         next(); // Le badge est bon, on laisse passer à l'étape suivante !
//     } catch (error) {
//         // Badge truqué ou expiré
//         res.status(401).send("Session expirée ou invalide. Veuillez vous reconnecter.");
//     }
// };

const verifierAuthentification = require('./middlewares/auth');

const port = 3001;

// 4. MIDDLEWARE (Le "décodeur" de données)
// Cette ligne doit impérativement être AVANT les routes pour que Postman fonctionne
app.use(express.json());
app.use(cookieParser());

// 5. IMPORTATION DES ROUTES
const catwaysRoutes = require('./routes/catways');
// const reservationsRoutes = require('./routes/reservations');
const authRoutes = require('./routes/auth');

const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

// 6. DÉFINITION DES ROUTES DE L'API
// 6. DÉFINITION DES ROUTES DE L'API

// La route d'authentification reste ouverte (sinon on ne pourrait pas se connecter !)
app.use('/auth', authRoutes); 

// On place le videur devant les catways et les utilisateurs !
app.use('/catways', verifierAuthentification, catwaysRoutes);
app.use('/users', verifierAuthentification, usersRoutes);

// app.use('/catways', catwaysRoutes);
// // app.use('/', reservationsRoutes);
// app.use('/auth', authRoutes);

// // 7. CONNEXION À LA BASE DE DONNÉES MONGODB
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log('✅ Connexion à MongoDB réussie !');
//     })
//     .catch((error) => {
//         console.error('❌ Erreur de connexion à MongoDB :', error);
//     });

// // Remplace 'ma_base' par 'test' à la fin de l'URL avant le '?'
// mongoose.connect('mongodb+srv://hassana:ikIzMAMmd5Kig2oy@cluster0.lk0mclq.mongodb.net/test')
//   .then(() => {
//     console.log("Connecté avec succès à la base :", mongoose.connection.name);
//   })
//   .catch(err => console.error("Erreur de connexion :", err));

// 8. ROUTE D'ACCUEIL (Pour tester si le serveur vit)
// app.get('/', (req, res) => {
//     res.send('Bienvenue sur l\'API du Port de Russell !');
// });

app.get('/', (req, res) => {
    res.render('index'); // Express va chercher le fichier views/index.ejs
});

// // Route pour afficher le tableau de bord avec les catways
// app.get('/dashboard', async (req, res) => {
//     // const Catway = require('./models/catway');
//     try {
//         // 1. On va chercher tous les catways dans la base de données
//         const catwaysList = await Catway.find().lean(); 

//         // On affiche brutalement le premier catway de la liste sur la page Web !
//         res.send(catwaysList[0]);

//         // // --- L'ENQUÊTE EST ICI ---
//         // console.log("--- DÉBUT DU TEST ---");
//         // console.log("Voici les infos brutes lues par le serveur :");
//         // console.log(catwaysList[0]);
//         // console.log("--- FIN DU TEST ---");
//         // // -------------------------

//         // 2. On affiche la page 'dashboard' ET on lui envoie la liste sous le nom "catways"
//         res.render('dashboard', { catways: catwaysList }); 
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Erreur lors de la récupération des données.");
//     }
// });


// app.get('/dashboard', async (req, res) => {
//     try {
//         // Teste en envoyant une liste vide pour voir si la page s'affiche
//         res.render('dashboard', { catways: [] }); 
//     } catch (error) {
//         res.send("Erreur de rendu : " + error.message);
//     }
// });

// app.get('/dashboard', async (req, res) => {
//     try {
//         // 1. On récupère les vraies données
//         const catwayList = await Catway.find().lean();
        
//         // 2. On vérifie dans la console si MongoDB renvoie bien quelque chose
//         console.log("Données trouvées dans la base :", catwayList);

//         // 3. On renvoie la vue avec les données
//         res.render('dashboard', { catways: catwayList }); 
//     } catch (error) {
//         console.error("Erreur MongoDB :", error);
//         res.status(500).send("Erreur de base de données.");
//     }
// });

// app.get('/dashboard', async (req, res) => {
//     try {
//         // 1. On récupère les catways depuis la base de données
//         const catwayList = await Catway.find().lean();
        
//         // 2. On les envoie à la page EJS sous le nom 'catways'
//         res.render('dashboard', { catways: catwayList }); 
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Erreur de récupération des données.");
//     }
// });

// app.get('/dashboard', async (req, res) => {
//     try {
//         const catwayList = await Catway.find().lean();
        
//         // --- LES TESTS À REGARDER DANS LE TERMINAL ---
//         console.log("--- TEST DE DONNÉES ---");
//         console.log("Nombre de catways trouvés :", catwayList.length);
//         console.log("Détails :", catwayList);
//         // ---------------------------------------------

//         res.render('dashboard', { catways: catwayList });
//     } catch (error) {
//         console.error("ERREUR :", error);
//         res.status(500).send("Erreur");
//     }
// });

// app.get('/dashboard', async (req, res) => {
//     try {
//         const catwaysList = await Catway.find().lean();
//         console.log(`Données récupérées : ${catways.length} catways.`);
//         res.render('dashboard', { catways: catwaysList });
//     } catch (error) {
//         console.error("Erreur d'affichage :", error);
//         res.status(500).send("Erreur serveur");
//     }
// });

// app.get('/dashboard', async (req, res) => {
//     // 1. ON FORCE L'IMPORT ICI POUR ÉVITER LE "ReferenceError"
//     const Catway = require('./models/catway'); 
    
//     try {
//         const catways = await Catway.find().lean();
//         console.log(`Données récupérées : ${catways.length} catways.`);
//         res.render('dashboard', { catways: catways });
//     } catch (error) {
//         console.error("Erreur d'affichage :", error);
//         res.status(500).send("Erreur serveur");
//     }
// });

// AFFICHER LA PAGE DE GESTION DES UTILISATEURS
app.get('/dashboard/users', verifierAuthentification, async (req, res) => {
    // const User = require('./models/user');
    try {
        // On récupère les utilisateurs sans leur mot de passe
        const usersList = await User.find().select('-password').lean();
        res.render('users', { users: usersList });
    } catch (error) {
        res.status(500).send("Erreur lors du chargement de la page des utilisateurs.");
    }
});

// // LA NOUVELLE ROUTE SÉCURISÉE
// app.get('/dashboard', verifierAuthentification, async (req, res) => {
//     const Catway = require('./models/catway'); 
//     try {
//         const catways = await Catway.find().lean();
//         res.render('dashboard', { catways: catways });
//     } catch (error) {
//         console.error("Erreur serveur :", error);
//         res.status(500).send("Erreur lors du chargement du dashboard.");
//     }
// });

// LA NOUVELLE ROUTE SÉCURISÉE DU DASHBOARD
app.get('/dashboard', verifierAuthentification, async (req, res) => {
    // const Catway = require('./models/catway'); 
    // const Reservation = require('./models/reservation'); // On a besoin des réservations ici aussi !
    
    try {
        const catways = await Catway.find().lean();
        const reservations = await Reservation.find({}).sort({ startDate: 1 }).lean(); // On récupère les réservations
        
        // On rend la page en lui passant les catways, les réservations, ET l'utilisateur connecté (req.user)
        res.render('dashboard', { 
            catways: catways,
            reservations: reservations,
            user: req.user // Ces infos viennent de ton token (via verifierAuthentification) !
        });
    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).send("Erreur lors du chargement du dashboard.");
    }
});

//Récupérer l'intégralité de la collection de la reservation
app.get('/dashboard/reservations/all', verifierAuthentification, async (req, res) => {
    // const Reservation = require('./models/reservation');
    try {
        // .find({}) sans rien dedans récupère TOUT
        const allReservations = await Reservation.find({}).sort({startDate: 1 }).lean();
        
        res.render('all-reservations', { 
            reservations: allReservations 
        });
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération globale.");
    }
});

// ==========================================
// ROUTES POUR LES RÉSERVATIONS
// ==========================================

// 1. AFFICHER la liste et le formulaire (Le GET)
app.get('/dashboard/catways/:id/reservations', verifierAuthentification, async (req, res) => {
    // const Reservation = require('./models/reservation');
    try {
        const catwayNumber = req.params.id;
        // On cherche toutes les réservations liées à ce numéro de catway
        const reservations = await Reservation.find({ catwayNumber: catwayNumber }).lean();
        
        // --- AJOUTE CETTE LIGNE DE TEST ---
        console.log("Données reçues de la base :", reservations);
        // ----------------------------------

        // On rend la vue 'reservations.ejs' en lui passant les données
        res.render('reservations', { 
            reservations: reservations, 
            catwayNumber: catwayNumber 
        });
    } catch (error) {
        console.error("Erreur GET réservations:", error);
        res.status(500).send("Erreur lors de la récupération des réservations.");
    }
});

// 2. ENREGISTRER une nouvelle réservation (Le POST)
app.post('/dashboard/catways/:id/reservations/add', verifierAuthentification, async (req, res) => {
    // const Reservation = require('./models/reservation');
    try {
        const nouvelleResa = new Reservation({
            catwayNumber: req.params.id,
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });

        await nouvelleResa.save();
        
        // Après l'ajout, on redirige vers la liste pour voir le résultat
        res.redirect('/dashboard/catways/' + req.params.id + '/reservations');
    } catch (error) {
        console.error("Erreur POST réservation:", error);
        res.status(500).send("Erreur lors de l'enregistrement de la réservation.");
    }
});

// Route pour AJOUTER un nouveau catway (protégée par le videur)
app.post('/dashboard/add', verifierAuthentification, async (req, res) => {
    // const Catway = require('./models/catway'); 
    
    try {
        // 1. On rassemble les infos tapées dans le formulaire
        const nouveauCatway = new Catway({
            catwayNumber: parseInt(req.body.catwayNumber), //On force en chiffre
            catwayType: req.body.type || req.body.catwayType, // On teste les deux noms
            catwayState: req.body.catwayState
        });

        // 2. On demande à MongoDB de le sauvegarder
        await nouveauCatway.save();
        console.log("Nouveau catway ajouté !");
        
        // 3. On recharge la page pour voir la liste avec le nouveau venu
        res.redirect('/dashboard'); 
        
    // } catch (error) {
    //     console.error("Erreur lors de l'ajout :", error);
    //     res.status(500).send("Impossible d'ajouter le catway.");
    // }
    } catch (error) {
        console.log("--- DÉTAIL DE L'ERREUR ---");
        console.error("Erreur technique :", error.message); // Ceci va afficher l'erreur précise dans ton terminal VS Code
        res.status(500).send("Une erreur est survenue lors de l'opération.");
    }
});

//  Afficher le formulaire de modification
app.get('/dashboard/edit/:id', verifierAuthentification, async (req, res) => {
    // const Catway = require('./models/catway');
    try {
        const catway = await Catway.findById(req.params.id).lean();
        res.render('edit-catway', { catway });
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération du catway.");
    }
});

//  Traiter la mise à jour (Action du formulaire)
app.post('/dashboard/update/:id', verifierAuthentification, async (req, res) => {
    // const Catway = require('./models/catway');
    try {
        await Catway.findByIdAndUpdate(req.params.id, {
            catwayState: req.body.catwayState
        });
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send("Erreur lors de la mise à jour : " + error.message);
    }
});

// Route pour supprimer un catway spécifique (Sécurisée et adaptée pour Fetch)
app.delete('/dashboard/delete/:id', verifierAuthentification, async (req, res) => {
    // const Catway = require('./models/catway'); 
    
    try {
        await Catway.findByIdAndDelete(req.params.id);
        console.log("Catway supprimé avec succès !");
        
        // On renvoie un signal "OK" (status 200) au script de la page EJS
        res.status(200).send("Suppression réussie"); 
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        res.status(500).send("Erreur lors de la suppression du catway.");
    }
});

// // Route pour supprimer un catway spécifique
// app.post('/dashboard/delete/:id', async (req, res) => {
//     // Sécurité : on s'assure que le modèle est bien chargé
//     const Catway = require('./models/catway'); 
    
//     try {
//         // Demande à MongoDB de trouver et supprimer le document via son ID
//         await Catway.findByIdAndDelete(req.params.id);
//         console.log("Catway supprimé avec succès !");
        
//         // Redirige vers la liste pour voir le changement en direct
//         res.redirect('/dashboard'); 
//     } catch (error) {
//         console.error("Erreur lors de la suppression :", error);
//         res.status(500).send("Erreur lors de la suppression du catway.");
//     }
// });

// // Route pour supprimer un catway via son ID
// app.post('/dashboard/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id; // On récupère l'ID dans l'URL
//         await Catway.findByIdAndDelete(id); // On le supprime de MongoDB
        
//         console.log("Catway supprimé avec succès");
//         res.redirect('/dashboard'); // On recharge la page pour voir la liste à jour
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Erreur lors de la suppression.");
//     }
// });

// Route pour SUPPRIMER une réservation spécifique
app.delete('/dashboard/reservations/delete/:id', verifierAuthentification, async (req, res) => {
    // const Reservation = require('./models/reservation');
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        console.log("Réservation annulée avec succès !");
        res.status(200).send("Suppression réussie"); 
    } catch (error) {
        console.error("Erreur lors de la suppression de la réservation :", error);
        res.status(500).send("Erreur lors de la suppression.");
    }
});



// 9. GESTIONNAIRE D'ERREURS GLOBAL
app.use((err, req, res, next) => {
    console.error("Détail de l'erreur :", err.stack);
    res.status(500).json({ 
        message: "Oups, une erreur serveur est survenue", 
        error: err.message 
    });
});


// 10. DÉMARRAGE DU SERVEUR

connectDB();
app.listen(port, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
});

// Route pour afficher la documentation
app.get('/docs', (req, res) => {
    res.render('docs');
});