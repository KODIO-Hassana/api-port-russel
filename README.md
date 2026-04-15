# ⚓ Port de Russell - API de Gestion de la Capitainerie

Ce projet est une application web fullstack (Node.js / Express / MongoDB) développée pour gérer les quais (catways) et les réservations du port de plaisance de Russell.

## 🛠️ Technologies Utilisées
* **Backend :** Node.js avec le framework Express.js
* **Base de données :** MongoDB (avec Mongoose pour la modélisation)
* **Frontend :** EJS (Embedded JavaScript templates), HTML/CSS
* **Sécurité :** JSON Web Tokens (JWT) et Cookie-Parser pour l'authentification

## ✨ Fonctionnalités Principales
* **Authentification sécurisée :** Connexion requise pour accéder au tableau de bord via JWT.
* **Gestion des Catways (CRUD) :** * Consulter la liste des catways.
  * Ajouter un nouveau catway (avec vérification des doublons).
  * Modifier l'état d'un catway existant.
  * Supprimer un catway.
* **Gestion des Réservations :**
  * Ajouter une réservation (Nom du client, bateau, date d'arrivée et de départ) pour un catway spécifique.
  * Visualiser les réservations par catway.
  * Vue globale de toutes les réservations du port.
  * Supprimer une réservation.

## 🚀 Installation et Démarrage

### 1. Prérequis
Assurez-vous d'avoir installé sur votre machine :
* [Node.js](https://nodejs.org/)
* Un accès à une base de données MongoDB (locale ou via MongoDB Atlas)

### 2. Installation
Ouvrez un terminal dans le dossier du projet et installez les dépendances :
\`\`\`bash
npm install
\`\`\`

### 3. Configuration de l'environnement
Créez un fichier nommé `.env` à la racine du projet et ajoutez-y vos propres variables de configuration :
\`\`\`env
MONGO_URI=votre_lien_de_connexion_mongodb_ici
JWT_SECRET=votre_phrase_secrete_super_complexe
\`\`\`
*(Note : Remplacez les valeurs par votre propre chaîne de connexion MongoDB et une clé secrète de votre choix).*

### 4. Lancer l'application
Démarrez le serveur avec la commande suivante :
\`\`\`bash
node app.js
\`\`\`
Le serveur démarrera sur le port 3001. Ouvrez votre navigateur et allez à l'adresse :
**http://localhost:3001**

## 📂 Structure du projet
* `/models` : Schémas de base de données (Catway, Reservation, User).
* `/routes` : Logique de routage de l'API.
* `/views` : Fichiers EJS pour l'interface utilisateur.
* `/public` : Fichiers statiques (CSS, images).
* `app.js` : Point d'entrée de l'application et configuration du serveur.