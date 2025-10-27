# 🎮 4 Images 1 Mot - Application Web

Une version web moderne et professionnelle du célèbre jeu "4 Images 1 Mot" avec authentification Firebase et vraies images !

![Version](https://img.shields.io/badge/version-2.0.0-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![Firebase](https://img.shields.io/badge/Firebase-11.1.0-orange.svg)

## ✨ Fonctionnalités

### 🎯 Gameplay
- **10 niveaux** avec de vraies images (Pexels)
- **12 lettres** mélangées aléatoirement par niveau
- **Système de gemmes** pour acheter des indices
- **3 types d'indices** :
  - 💡 Révéler une lettre (30 gemmes)
  - 🗑️ Retirer les lettres incorrectes (25 gemmes)
  - ✅ Résoudre le niveau (50 gemmes)
- **Progression sauvegardée** automatiquement

### 🔐 Authentification
- Inscription avec email/mot de passe
- Connexion sécurisée
- Menu utilisateur avec déconnexion
- Chaque utilisateur a sa propre progression

### 🎨 Design
- **Thème sombre** élégant
- **Animations fluides** et modernes
- **Responsive** - fonctionne sur mobile et desktop
- **Thème vert foncé** sophistiqué (#00b366)
- Interface identique au jeu original

### 💾 Base de données
- **Firebase Firestore** pour la sauvegarde
- **Synchronisation en temps réel**
- **Sécurité** : chaque utilisateur accède uniquement à ses données

## 🚀 Installation

### Prérequis
- Node.js 18+ (recommandé : Node.js 20+)
- npm ou yarn

### Étapes

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd 4image1mots
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer Firebase**
   - Suivez les instructions dans `INSTRUCTIONS_FIREBASE.md`
   - Mettez à jour `src/config/firebase.js` avec votre configuration

4. **Lancer l'application**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3009`

## 📁 Structure du projet

```
4image1mots/
├── src/
│   ├── components/
│   │   ├── Auth/              # Composants d'authentification
│   │   │   ├── AuthWrapper.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Auth.css
│   │   ├── AnswerSlots.jsx    # Cases de réponse
│   │   ├── Header.jsx         # En-tête avec niveau et gemmes
│   │   ├── HintButtons.jsx    # Boutons d'indices
│   │   ├── ImageGrid.jsx      # Grille 2x2 des images
│   │   ├── LetterBank.jsx     # Banque de lettres
│   │   ├── LevelComplete.jsx  # Écran de victoire
│   │   └── UserMenu.jsx       # Menu utilisateur
│   ├── config/
│   │   └── firebase.js        # Configuration Firebase
│   ├── context/
│   │   └── AuthContext.jsx    # Contexte d'authentification
│   ├── data/
│   │   └── levels.js          # Données des niveaux
│   ├── App.jsx                # Composant principal
│   ├── App.css                # Styles globaux
│   ├── main.jsx               # Point d'entrée
│   └── index.css              # Styles de base
├── public/
├── vite.config.js             # Configuration Vite
├── package.json
├── README.md
└── INSTRUCTIONS_FIREBASE.md   # Guide Firebase
```

## 🎮 Comment jouer

1. **Créez un compte** ou **connectez-vous**
2. **Observez les 4 images** qui ont un point commun
3. **Trouvez le mot** en cliquant sur les lettres
4. **Utilisez les indices** si vous êtes bloqué
5. **Gagnez des gemmes** en complétant les niveaux
6. **Progressez** à travers les 10 niveaux

## 🛠️ Technologies utilisées

- **React 18** - Framework frontend
- **Vite** - Build tool ultra-rapide
- **Firebase** - Backend as a Service
  - Authentication (Email/Password)
  - Firestore Database (NoSQL)
- **Lucide React** - Icônes modernes
- **Pexels API** - Images de haute qualité
- **CSS3** - Animations et gradients

## 🎨 Thème de couleurs

- **Vert principal** : `#00b366`
- **Vert secondaire** : `#008f4f`
- **Fond sombre** : `#1a1a2e`, `#16213e`, `#0f3460`
- **Accent rouge** : `#ff6b6b`, `#ee5a52`

## 📊 Fonctionnalités Firebase

### Collections Firestore

**Collection `users`**
```javascript
{
  uid: "user_id",
  displayName: "Nom d'utilisateur",
  email: "email@example.com",
  currentLevel: 0,           // Niveau actuel (0-9)
  coins: 100,                // Nombre de gemmes
  createdAt: "2025-01-01",   // Date de création
  lastPlayed: "2025-01-01"   // Dernière connexion
}
```

## 🔒 Sécurité

- Mots de passe cryptés par Firebase Auth
- Règles Firestore pour protéger les données
- Validation côté client et serveur
- HTTPS obligatoire en production

## 📝 Licence

Ce projet est à usage éducatif. Les images proviennent de Pexels (licence gratuite).

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Améliorer le code

## 📧 Contact

Pour toute question ou suggestion, contactez l'équipe de développement.

---

**Développé avec ❤️ et React**
