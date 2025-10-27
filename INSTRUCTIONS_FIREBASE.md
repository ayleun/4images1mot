# 🔥 Configuration Firebase pour 4 Images 1 Mot

## 📋 Étapes pour configurer Firebase

### 1️⃣ Créer un projet Firebase

1. Allez sur **[Firebase Console](https://console.firebase.google.com/)**
2. Cliquez sur **"Ajouter un projet"**
3. Nom du projet : `4image1mot` (ou votre choix)
4. Désactivez Google Analytics si vous ne voulez pas (optionnel)
5. Cliquez sur **"Créer le projet"**

### 2️⃣ Configurer l'authentification

1. Dans votre projet Firebase, allez dans **"Authentication"**
2. Cliquez sur **"Commencer"**
3. Activez le **mode de connexion "E-mail/Mot de passe"**
4. Cliquez sur **"Activer"** puis **"Enregistrer"**

### 3️⃣ Configurer Firestore Database

1. Allez dans **"Firestore Database"**
2. Cliquez sur **"Créer une base de données"**
3. Sélectionnez **"Démarrer en mode test"** (pour le développement)
4. Choisissez une région proche de vous (ex: `europe-west1`)
5. Cliquez sur **"Activer"**

### 4️⃣ Récupérer la configuration

1. Allez dans **"Paramètres du projet"** (⚙️ en haut à gauche)
2. Descendez jusqu'à **"Vos applications"**
3. Cliquez sur l'icône **Web** (`</>`)
4. Donnez un nom à l'app : `4image1mot-web`
5. **NE COCHEZ PAS** Firebase Hosting
6. Cliquez sur **"Enregistrer l'application"**
7. **Copiez la configuration** qui ressemble à ceci :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAaAbBbCcCcDdDdEeEeFfFf...",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123..."
};
```

### 5️⃣ Mettre à jour votre application

1. Ouvrez le fichier **`src/config/firebase.js`**
2. **Remplacez** la configuration par celle que vous avez copiée :

```javascript
const firebaseConfig = {
  apiKey: "VOTRE_VRAIE_API_KEY",
  authDomain: "VOTRE_PROJECT_ID.firebaseapp.com",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_PROJECT_ID.appspot.com",
  messagingSenderId: "VOTRE_MESSAGING_SENDER_ID",
  appId: "VOTRE_APP_ID"
}
```

### 6️⃣ Règles de sécurité Firestore (IMPORTANT)

Pour la production, configurez les règles de sécurité :

1. Allez dans **Firestore Database** → **Règles**
2. Remplacez par ces règles :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Règles pour la collection users
    match /users/{userId} {
      // Permettre la lecture et l'écriture seulement si l'utilisateur est authentifié
      // et qu'il accède à ses propres données
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Cliquez sur **"Publier"**

### 7️⃣ Tester l'application

1. Lancez l'application : `npm run dev`
2. Créez un compte avec un email et mot de passe
3. Vérifiez dans Firebase Console :
   - **Authentication** → Vous devriez voir l'utilisateur créé
   - **Firestore Database** → Collection `users` avec les données de progression

## 🎮 Fonctionnalités disponibles

✅ **Authentification** : Inscription / Connexion / Déconnexion  
✅ **Sauvegarde automatique** : Niveau et gemmes sauvegardés dans Firebase  
✅ **Multi-utilisateurs** : Chaque joueur a sa propre progression  
✅ **Temps réel** : Les données se synchronisent automatiquement  

## 🔒 Sécurité

- Les mots de passe sont **cryptés** par Firebase
- Chaque utilisateur peut **seulement** accéder à ses propres données
- Les règles Firestore empêchent l'accès non autorisé

## 🆘 Besoin d'aide ?

Si vous rencontrez des erreurs :

1. **Vérifiez** que la configuration Firebase est correcte
2. **Vérifiez** que l'authentification Email/Password est activée
3. **Vérifiez** que Firestore est créé en mode test
4. **Regardez** la console du navigateur (F12) pour les erreurs

## 📞 Support

En cas de problème, vérifiez :
- La console Firebase pour les erreurs
- La console du navigateur pour les logs
- Que tous les services Firebase sont bien activés


