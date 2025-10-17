# chasseur-tie Space Flight - TD4

Un jeu 3D interactif développé avec Three.js où vous pilotez un chasseur-tie à travers un champ d'astéroïdes dans l'espace.

![chasseur-tie Space Flight](preview.png)

## 🎮 Gameplay

Pilotez votre chasseur-tie à travers un champ d'astéroïdes dangereux. Évitez les collisions et parcourez la plus grande distance possible ! La difficulté augmente progressivement avec le temps.

### Objectifs
- Éviter les astéroïdes
- Maximiser votre score
- Parcourir la plus grande distance
- Survivre le plus longtemps possible

### Mécaniques de jeu
- **Santé** : Vous commencez avec 100% de santé. Chaque collision avec un astéroïde vous inflige 25 points de dégâts
- **Score** : Gagnez 10 points pour chaque astéroïde évité
- **Difficulté progressive** : Le nombre d'astéroïdes augmente avec le temps
- **Boost** : Utilisez le boost pour accélérer temporairement

## 🎯 Contrôles

| Touche | Action |
|--------|--------|
| **Z** / ↑ | Piquer (descendre) |
| **S** / ↓ | Cabrer (monter) |
| **Q** / ← | Tourner à gauche |
| **D** / → | Tourner à droite |
| **A** | Roulis gauche ↺ |
| **E** | Roulis droite ↻ |
| **Shift** | Boost (vitesse x2.5) |
| **Space** | Frein |

> Schéma de contrôle classique des jeux : **ZQSD** pour le mouvement, **A/E** pour le roulis

## 🚀 Fonctionnalités techniques

### Graphismes 3D
- **Vaisseau chasseur-tie** : Modèle 3D procédural avec 4 ailes en configuration X
- **Astéroïdes procéduraux** : Chaque astéroïde est unique avec géométrie déformée
- **Effets de particules** : Réacteurs du vaisseau et explosions
- **Environnement spatial** : 
  - 3000+ étoiles en arrière-plan
  - Nébuleuses colorées
  - Brouillard spatial

### Gameplay
- **Caméra 3ème personne** : Suit le vaisseau avec interpolation lisse
- **Système de collision** : Détection précise avec Box3
- **Génération procédurale** : Astéroïdes générés de manière aléatoire
- **Physique de vol** : 
  - Accélération/décélération progressive
  - Inertie réaliste
  - Contrôles sur 6 axes (pitch, yaw, roll)

### Interface utilisateur
- **HUD immersif** : 
  - Score en temps réel
  - Distance parcourue
  - Vitesse actuelle
  - Nombre d'astéroïdes évités
  - Barre de santé visuelle
- **Écran de démarrage** : Menu principal avec instructions
- **Écran Game Over** : Statistiques finales
- **Viseur central** : Crosshair pour l'immersion
- **Messages dynamiques** : Alertes de collision

### Effets visuels
- **Particules de moteur** : 4 réacteurs avec traînées lumineuses
- **Explosions** : Effet de particules lors des collisions
- **Shake de caméra** : Vibration lors des impacts
- **Lighting dynamique** : Lumières ambiantes et directionnelles
- **Anti-aliasing** : Rendu lisse et de haute qualité

## 🛠️ Technologies utilisées

- **Three.js** (v0.160.0) - Moteur 3D WebGL
- **JavaScript ES6+** - Modules, classes, async/await
- **HTML5** - Structure sémantique
- **CSS3** - Interface utilisateur moderne avec effets

## 📁 Structure du projet

```
multimedia-td4/
├── index.html          # Page principale avec structure HTML et styles
├── game.js            # Logique du jeu et moteur 3D
└── README.md          # Documentation (ce fichier)
```

## 🎨 Concepts du cours utilisés

### Three.js
- ✅ Scène, caméra, renderer
- ✅ Géométries (Box, Sphere, Cylinder, Cone, Dodecahedron)
- ✅ Matériaux (MeshPhongMaterial, MeshBasicMaterial)
- ✅ Lumières (Ambient, Directional, Point)
- ✅ Groups et hiérarchie d'objets
- ✅ Transformations (position, rotation, scale)
- ✅ BufferGeometry et attributs personnalisés

### Programmation 3D avancée
- ✅ Caméra suivie (third-person)
- ✅ Détection de collisions (AABB avec Box3)
- ✅ Génération procédurale
- ✅ Systèmes de particules
- ✅ Interpolation (lerp) pour mouvements fluides
- ✅ Quaternions pour rotations complexes

### Game Design
- ✅ Boucle de jeu (game loop)
- ✅ Gestion d'états
- ✅ Input handling (clavier)
- ✅ HUD et interface
- ✅ Difficulté progressive
- ✅ Score et statistiques

### Performance
- ✅ Object pooling (destruction/création d'objets)
- ✅ Culling (suppression d'objets hors écran)
- ✅ RequestAnimationFrame pour animation fluide
- ✅ Dispose des ressources (geometries, materials)

## 🚀 Comment lancer le jeu

1. Ouvrez simplement `index.html` dans un navigateur moderne
2. Cliquez sur "Démarrer Mission"
3. Utilisez les contrôles pour piloter votre chasseur-tie
4. Évitez les astéroïdes et battez votre record !

> **Note** : Le jeu nécessite une connexion internet pour charger Three.js depuis le CDN.

## 🎯 Améliorations possibles

### Gameplay
- [ ] Système de tir (lasers)
- [ ] Power-ups (bouclier, santé, armes)
- [ ] Différents types d'ennemis
- [ ] Boss fights
- [ ] Niveaux avec objectifs variés
- [ ] Mode histoire

### Technique
- [ ] Son et musique
- [ ] Modèles 3D externes (GLB/GLTF)
- [ ] Post-processing (bloom, motion blur)
- [ ] Ombres dynamiques
- [ ] Skybox 360°
- [ ] Optimisation avec LOD (Level of Detail)

### Multijoueur
- [ ] Leaderboard en ligne
- [ ] Mode multijoueur coopératif
- [ ] Replay des meilleures parties

### Mobile
- [ ] Contrôles tactiles
- [ ] Gyroscope pour pilotage
- [ ] UI responsive

## 📝 Notes de développement

### Configuration
Le fichier `game.js` contient un objet `CONFIG` en début de fichier permettant d'ajuster facilement :
- Vitesse et maniabilité du vaisseau
- Distance et comportement de la caméra
- Fréquence et taille des astéroïdes
- Paramètres de gameplay (dégâts, score, difficulté)

### Architecture
Le code est organisé en sections claires :
1. **Configuration** : Constantes et paramètres
2. **Variables globales** : État du jeu
3. **Initialisation** : Setup de Three.js
4. **Création d'objets** : Vaisseau, environnement
5. **Gameplay** : Astéroïdes, collisions
6. **Contrôles** : Input et mouvement
7. **Effets** : Particules, explosions
8. **UI** : HUD et menus
9. **Boucle de jeu** : Animation et mise à jour

## 🏆 Crédits

Développé dans le cadre du TD4 - R5.06 Sensibilisation à la programmation multimédia.

Inspiré par la franchise Star Wars et les jeux de vol spatial arcade.

## 📄 Licence

Ce projet est développé à des fins éducatives.

