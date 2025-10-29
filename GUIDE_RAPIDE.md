# 🚀 Guide Rapide - Démarrage en 5 minutes

## ⚡ Démarrage Ultra-Rapide

### 1️⃣ Installer les dépendances (si pas déjà fait)
```bash
npm install
```

### 2️⃣ Configurer Firebase

**Option A : Configuration rapide (5 minutes)**

1. Allez sur https://console.firebase.google.com/
2. Cliquez sur "Ajouter un projet" → Nom: `4image1mot`
3. Désactivez Google Analytics → "Créer le projet"
4. Dans le menu, allez dans **Authentication** → "Commencer" → Activez **E-mail/Mot de passe**
5. Dans le menu, allez dans **Firestore Database** → "Créer une base de données" → **Mode test** → Région proche
6. Paramètres (⚙️) → Vos applications → Icône Web (`</>`) → Nom: `4image1mot-web`
7. **Copiez** la configuration `firebaseConfig`
8. Ouvrez `src/config/firebase.js` et **remplacez** les valeurs

**Option B : Guide détaillé**

Consultez `INSTRUCTIONS_FIREBASE.md` pour un guide complet avec captures d'écran.

### 3️⃣ Lancer l'application
```bash
npm run dev
```

✅ Votre app est maintenant sur **http://localhost:3009**

## 🎮 Premier lancement

1. **Créez votre compte**
   - Email : `test@example.com`
   - Mot de passe : `test123` (min. 6 caractères)
   - Nom : `Votre nom`

2. **Commencez à jouer !**
   - Niveau 1 : CHAT 🐱
   - Vous avez 100 gemmes de départ
   - Trouvez le mot en cliquant sur les lettres

3. **Utilisez les indices**
   - 💡 Révéler une lettre (30 gemmes)
   - 🗑️ Retirer lettres fausses (25 gemmes)
   - ✅ Résoudre (50 gemmes)

## 🔧 Problèmes courants

### ❌ "Firebase config error"
→ Vous n'avez pas mis votre vraie configuration Firebase dans `src/config/firebase.js`

### ❌ "Auth not enabled"
→ Activez l'authentification Email/Password dans Firebase Console

### ❌ "Firestore error"
→ Créez la base de données Firestore en mode test

### ❌ Images ne chargent pas
→ C'est normal si votre proxy bloque Pexels. Les images locales SVG peuvent être utilisées en backup.

## 📱 Tester sur mobile

1. Trouvez votre IP locale :
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Ouvrez sur votre téléphone :
   ```
   http://VOTRE_IP:3009
   ```
   Exemple : `http://192.168.1.10:3009`

3. Assurez-vous que votre téléphone est sur le **même Wi-Fi**

## 🎨 Personnalisation rapide

### Changer les couleurs
Éditez les couleurs dans `src/components/*.css` :
- Vert actuel : `#00b366` et `#008f4f`
- Rouge : `#ff6b6b` et `#ee5a52`

### Ajouter des niveaux
Éditez `src/data/levels.js` et ajoutez :
```javascript
{
  id: 11,
  word: "VOTRE_MOT",
  images: [
    "URL_IMAGE_1",
    "URL_IMAGE_2",
    "URL_IMAGE_3",
    "URL_IMAGE_4"
  ],
  extraLetters: "ABCDEFGHIJ" // 12 - longueur du mot
}
```

### Images gratuites
- **Pexels** : https://www.pexels.com/fr-fr/
- **Unsplash** : https://unsplash.com/
- **Pixabay** : https://pixabay.com/

## 🚀 Déploiement

### Firebase Hosting (Gratuit)

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter
firebase login

# Initialiser
firebase init hosting

# Build
npm run build

# Déployer
firebase deploy
```

Votre app sera sur `https://votre-projet.web.app`

### Autres options
- **Vercel** : Connectez votre repo GitHub
- **Netlify** : Drag & drop du dossier `dist`
- **GitHub Pages** : Configuration dans `vite.config.js`

## 📊 Vérifier que tout fonctionne

✅ **Checklist**
- [ ] L'app se lance sur localhost:3009
- [ ] Page d'inscription s'affiche
- [ ] Création de compte fonctionne
- [ ] Connexion fonctionne
- [ ] Images s'affichent (chats pour niveau 1)
- [ ] Lettres sont mélangées (12 lettres)
- [ ] Cliquer sur lettre la place dans réponse
- [ ] Cliquer sur réponse renvoie la lettre
- [ ] Niveau se complète quand mot correct
- [ ] Gemmes augmentent après victoire
- [ ] Progression sauvegardée (rafraîchir la page)
- [ ] Déconnexion fonctionne
- [ ] Re-connexion charge la progression

## 🆘 Support

Si rien ne fonctionne :

1. **Vérifiez la console du navigateur** (F12 → Console)
2. **Vérifiez Firebase Console** → Authentication + Firestore
3. **Redémarrez** le serveur (`Ctrl+C` puis `npm run dev`)
4. **Supprimez** `node_modules` et relancez `npm install`

---

**Bon jeu ! 🎮**





