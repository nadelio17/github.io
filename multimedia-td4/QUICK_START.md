# 🚀 Démarrage rapide - chasseur-tie Space Flight

## ⚡ Lancement en 30 secondes

### Option 1 : Directement dans le navigateur
1. Ouvrez `index.html` dans votre navigateur
2. Cliquez sur "Démarrer Mission"
3. Jouez !

### Option 2 : Avec serveur local (recommandé)
```bash
# Si vous avez Python 3 installé
python3 -m http.server 8000

# Puis ouvrez : http://localhost:8000
```

### Option 3 : Avec Node.js
```bash
# Installer http-server globalement
npm install -g http-server

# Lancer le serveur
http-server

# Puis ouvrez : http://localhost:8080
```

---

## 🎮 Contrôles essentiels

```
Z / ↑    →  Piquer
S / ↓    →  Cabrer
Q / ←    →  Gauche
D / →    →  Droite
A / E    →  Roulis ↺↻
Shift    →  Boost
Space    →  Frein
```

> **Note** : Schéma classique des jeux - ZQSD + A/E

---

## 📁 Structure du projet

```
multimedia-td4/
│
├── 🎮 JOUER
│   ├── index.html         ← LE JEU (ouvrir ce fichier)
│   └── game.js            ← Logique du jeu
│
├── ⚙️ CONFIGURATION
│   └── config.js          ← Paramètres à modifier
│
├── 📖 DOCUMENTATION
│   ├── README.md          ← Vue d'ensemble
│   ├── GUIDE.md           ← Guide développeur
│   ├── CHANGELOG.md       ← Historique
│   └── QUICK_START.md     ← Ce fichier
│
├── 🧪 TEST
│   └── test.html          ← Page de test
│
└── 🎨 PRÉSENTATION
    └── landing.html       ← Page vitrine
```

---

## 🎯 Premier lancement

### Étape 1 : Vérifier que tout fonctionne
Ouvrez `test.html` pour vérifier que tous les fichiers sont présents et que Three.js se charge correctement.

### Étape 2 : Jouer !
Ouvrez `index.html` et commencez à piloter votre chasseur-tie !

### Étape 3 : Personnaliser (optionnel)
Modifiez `config.js` pour ajuster la difficulté, les couleurs, etc.

---

## 🎨 Personnalisation rapide

### Changer la difficulté

Dans `game.js`, ligne ~7, remplacez :
```javascript
const CONFIG = {
```

Par :
```javascript
import { applyPreset } from './config.js';
const CONFIG = applyPreset('easy');  // easy, normal, hard, extreme
```

### Changer les couleurs du vaisseau

Dans `config.js`, section `colors` :
```javascript
colors: {
    shipBody: 0xff0000,      // Rouge
    shipCockpit: 0x00ff00,   // Vert
    engineFlame: 0xff00ff,   // Rose
}
```

### Modifier la vitesse

Dans `config.js`, section `ship` :
```javascript
ship: {
    speed: 0.5,           // Augmenter pour aller plus vite
    turnSpeed: 0.05,      // Augmenter pour plus de maniabilité
}
```

---

## 🐛 Problèmes courants

### Le jeu ne se lance pas
- ✅ Vérifiez que vous avez une connexion internet (Three.js est chargé depuis un CDN)
- ✅ Ouvrez la console (F12) pour voir les erreurs
- ✅ Essayez avec un serveur local plutôt que `file://`

### Le jeu est trop lent
- ✅ Fermez les autres onglets du navigateur
- ✅ Réduisez le nombre de particules dans `config.js`
- ✅ Essayez un autre navigateur (Chrome/Firefox recommandés)

### Les contrôles ne fonctionnent pas
- ✅ Cliquez sur la zone de jeu pour donner le focus
- ✅ Vérifiez que vous avez bien cliqué sur "Démarrer Mission"

---

## 📚 Aller plus loin

### Je veux comprendre le code
👉 Lisez `GUIDE.md` - Il contient des explications détaillées sur l'architecture

### Je veux ajouter des fonctionnalités
👉 Consultez `GUIDE.md` section "Ajouter de nouvelles fonctionnalités"
   - Exemples de code pour lasers, power-ups, radar, sons

### Je veux voir l'historique du projet
👉 Lisez `CHANGELOG.md` pour voir toutes les versions et modifications

### Je veux partager le jeu
👉 Hébergez le dossier `multimedia-td4` sur GitHub Pages, Netlify, ou Vercel

---

## 🏆 Objectifs du jeu

### Débutant
- ✅ Survivre 1 minute
- ✅ Score de 500 points
- ✅ Éviter 50 astéroïdes

### Intermédiaire
- ✅ Survivre 3 minutes
- ✅ Score de 2000 points
- ✅ Combo de 10x

### Expert
- ✅ Survivre 5 minutes
- ✅ Score de 5000 points
- ✅ Combo de 20x

### Maître Jedi
- ✅ Survivre 10 minutes
- ✅ Score de 10000+ points
- ✅ Combo de 50x+

---

## 💡 Astuces de jeu

1. **Utilisez le boost avec parcimonie** - Il rend le jeu plus difficile
2. **Maintenez un combo** - Le score augmente exponentiellement
3. **Anticipez** - Regardez loin devant, pas juste devant le vaisseau
4. **Restez au centre** - Plus facile de manœuvrer
5. **Pratiquez le roulis** - W et X pour esquiver en diagonale (AZERTY)

---

## 🎓 Concepts Three.js utilisés

Si vous apprenez Three.js, ce projet démontre :
- ✅ Scene, Camera, Renderer
- ✅ Geometries (Box, Sphere, Cylinder, Cone, Dodecahedron)
- ✅ Materials (Phong, Basic)
- ✅ Lights (Ambient, Directional, Point)
- ✅ Groups et hiérarchies
- ✅ Transformations (position, rotation, scale)
- ✅ Quaternions pour rotations complexes
- ✅ Lerp pour interpolation
- ✅ Box3 pour collisions
- ✅ BufferGeometry pour optimisation
- ✅ Particules et systèmes de particules

---

## 📞 Support

### Questions sur le code ?
→ Consultez les commentaires dans `game.js`
→ Lisez le `GUIDE.md`

### Bugs trouvés ?
→ Notez-les pour les corriger vous-même (bon exercice !)

### Améliorations possibles ?
→ Consultez la Roadmap dans `CHANGELOG.md`

---

**Bon vol, et que la Force soit avec vous ! 🌟**

---

*Développé dans le cadre du TD4 - R5.06 Sensibilisation à la programmation multimédia*

