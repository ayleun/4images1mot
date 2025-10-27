# 🚀 Guide : Déployer sur GitHub

Votre projet est maintenant prêt à être déployé sur GitHub !

## ✅ Étape complétée

- ✅ Repository Git initialisé
- ✅ Tous les fichiers ajoutés
- ✅ Commit initial créé (93 fichiers)

---

## 📝 Prochaines étapes

### 1️⃣ Créer le dépôt sur GitHub

**Option A : Via le site web GitHub (Recommandé)**

1. Allez sur https://github.com/new
2. **Repository name** : `4image1mots` ou `4images1mots`
3. **Description** : "Jeu 4 Images 1 Mot avec React et Firebase"
4. ✅ Choisissez **Public** ou **Private**
5. ⚠️ **NE COCHEZ PAS** "Initialize this repository with a README" (on a déjà un README)
6. Cliquez sur **"Create repository"**

**Option B : Via GitHub CLI (si installé)**

```bash
gh repo create 4image1mots --public --source=. --remote=origin
```

---

### 2️⃣ Connecter votre repo local à GitHub

**Après avoir créé le dépôt sur GitHub, copiez l'URL SSH ou HTTPS**

GitHub vous donnera les commandes, mais voici ce qu'il faut faire :

```bash
# Connecter le repo local à GitHub
git remote add origin https://github.com/VOTRE_USERNAME/4image1mots.git

# Vérifier que c'est bien connecté
git remote -v

# Renommer la branche main (si nécessaire)
git branch -M main

# Pousser le code vers GitHub
git push -u origin main
```

**Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub !**

---

### 3️⃣ Authentification GitHub

**Vous devrez peut-être vous authentifier** :

#### Si vous utilisez HTTPS :
- GitHub vous demandera un Personal Access Token
- Créez-en un ici : https://github.com/settings/tokens
- Scope : `repo` (pour accéder aux dépôts)

#### Si vous utilisez SSH :
- Configurez votre clé SSH GitHub
- Guide : https://docs.github.com/en/authentication/connecting-to-github-with-ssh

---

### 4️⃣ Pousser le code

Une fois le remote configuré, poussez votre code :

```bash
git push -u origin main
```

Si vous êtes sur la branche `master`, utilisez :

```bash
git push -u origin master
```

---

## 🎯 Commandes complètes (copier-coller)

Voici la séquence complète à exécuter :

```bash
# 1. Créer le dépôt sur GitHub.com (manuellement)

# 2. Connecter le repo
git remote add origin https://github.com/VOTRE_USERNAME/4image1mots.git

# 3. Vérifier la connexion
git remote -v

# 4. Pousser le code
git push -u origin master

# (Si master ne fonctionne pas, essayez main)
git branch -M main
git push -u origin main
```

---

## ✅ Vérification

Après le push, votre code devrait être visible sur :

**https://github.com/VOTRE_USERNAME/4image1mots**

---

## 🚀 Déploiement automatique (Optionnel)

Une fois sur GitHub, vous pouvez activer le déploiement automatique :

### **Netlify**
1. Connectez votre compte GitHub sur https://netlify.com
2. Importer le dépôt `4image1mots`
3. Netlify déploie automatiquement à chaque push !

### **Vercel**
1. Connectez votre compte GitHub sur https://vercel.com
2. Importer le dépôt `4image1mots`
3. Déploiement automatique !

### **GitHub Pages**
1. Settings → Pages
2. Source : `main` branch
3. Votre app sera sur : `https://VOTRE_USERNAME.github.io/4image1mots`

---

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes :

1. **Erreur "repository not found"** → Vérifiez l'URL du remote
2. **Erreur "authentication failed"** → Configurez votre token GitHub
3. **Erreur "already exists"** → Supprimez l'ancien remote : `git remote remove origin`

---

**Dites-moi quand vous avez créé le dépôt sur GitHub, et je vous aiderai à pousser votre code !** 🚀

