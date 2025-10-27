# ✅ Vérification Configuration Firebase - sunu4image1mot

## 🎯 Configuration appliquée

Votre projet Firebase **sunu4image1mot** est maintenant configuré dans l'application !

```javascript
Project ID: sunu4image1mot
Auth Domain: sunu4image1mot.firebaseapp.com
```

---

## 📋 ÉTAPES DE VÉRIFICATION OBLIGATOIRES

### ✅ **1. Vérifier l'Authentification Email/Password**

1. Allez sur : https://console.firebase.google.com/project/sunu4image1mot/authentication
2. Cliquez sur l'onglet **"Sign-in method"**
3. Vérifiez que **"E-mail/Mot de passe"** est **ACTIVÉ** ✅

**Si ce n'est pas activé :**
- Cliquez sur "E-mail/Mot de passe"
- Activez l'option
- Cliquez sur "Enregistrer"

---

### ✅ **2. Vérifier Firestore Database**

1. Allez sur : https://console.firebase.google.com/project/sunu4image1mot/firestore
2. Vérifiez que la base de données est créée

**Si la base n'existe pas :**
- Cliquez sur "Créer une base de données"
- Choisissez **"Démarrer en mode test"**
- Sélectionnez la région : **europe-west (Belgique)** ou proche
- Cliquez sur "Activer"

---

### ✅ **3. Configurer les règles de sécurité Firestore**

1. Dans Firestore, allez sur l'onglet **"Règles"**
2. Remplacez le contenu par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Collection users - chaque utilisateur peut lire/écrire ses propres données
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Cliquez sur **"Publier"**

---

## 🚀 TESTER L'APPLICATION

### Lancez l'application :

```bash
npm run dev
```

L'application s'ouvrira sur **http://localhost:3009**

### Scénario de test :

1. ✅ **Page de connexion s'affiche**
2. ✅ **Cliquez sur "S'inscrire"**
3. ✅ **Créez un compte :**
   - Nom : Votre nom
   - Email : test@example.com
   - Mot de passe : test123456 (min. 6 caractères)
4. ✅ **Vous devriez être connecté et voir le jeu**
5. ✅ **Jouez au niveau 1 (CHAT)**
6. ✅ **Vérifiez que les images réelles s'affichent**
7. ✅ **Déconnectez-vous** (menu utilisateur en haut à droite)
8. ✅ **Reconnectez-vous** avec le même email/mot de passe
9. ✅ **Vérifiez que votre progression est sauvegardée**

---

## 🔍 VÉRIFIER DANS FIREBASE CONSOLE

### Après avoir créé un compte, vérifiez :

**1. Authentication :**
https://console.firebase.google.com/project/sunu4image1mot/authentication/users

→ Vous devriez voir votre utilisateur créé

**2. Firestore :**
https://console.firebase.google.com/project/sunu4image1mot/firestore/data

→ Vous devriez voir :
```
Collection: users
  └── Document: {votre_uid}
        ├── displayName: "Votre nom"
        ├── email: "test@example.com"
        ├── currentLevel: 0
        ├── coins: 100
        ├── createdAt: "2025-10-21..."
        └── lastPlayed: "2025-10-21..."
```

---

## ❌ ERREURS POSSIBLES

### Erreur : "Firebase: Error (auth/operation-not-allowed)"
→ **L'authentification Email/Password n'est pas activée**
→ Allez dans Authentication → Sign-in method → Activez Email/Password

### Erreur : "Missing or insufficient permissions"
→ **Firestore n'est pas créé OU les règles sont trop restrictives**
→ Créez Firestore en mode test
→ Vérifiez les règles de sécurité

### Erreur : "Network request failed"
→ **Problème de connexion Internet ou proxy**
→ Vérifiez votre connexion
→ Désactivez le proxy temporairement

### Images ne chargent pas
→ **Votre proxy bloque Pexels**
→ C'est OK, les images chargeront quand même (peut être lent)
→ Alternative : Utiliser des images locales

---

## ✅ CHECKLIST FINALE

Avant de lancer l'app, assurez-vous que :

- [ ] Projet Firebase créé : **sunu4image1mot** ✅
- [ ] Configuration ajoutée dans `src/config/firebase.js` ✅
- [ ] Authentication Email/Password **activée**
- [ ] Firestore Database **créée**
- [ ] Règles Firestore **configurées**
- [ ] `npm install` exécuté
- [ ] Prêt à lancer avec `npm run dev`

---

## 🎉 C'EST PRÊT !

Une fois que vous avez vérifié tous ces points, lancez :

```bash
npm run dev
```

Et testez l'application ! 🚀

---

**Besoin d'aide ? Vérifiez les logs dans la console du navigateur (F12) et dans Firebase Console.**


