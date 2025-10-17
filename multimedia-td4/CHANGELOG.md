# Changelog - chasseur-tie Space Flight

Toutes les modifications notables de ce projet sont documentées dans ce fichier.

## [1.2.0] - 2025-10-17

### 🔧 Simplifié
- **Contrôles simplifiés et fixes** : Un seul schéma de contrôle clair et sans conflit
  - **ZQSD** pour le mouvement (haut, gauche, bas, droite)
  - **A/E** pour le roulis (gauche ↺, droite ↻)
  - **Shift** pour boost, **Space** pour frein
  - Flèches directionnelles fonctionnent aussi
  - Plus aucun conflit de touches
- Suppression de la tentative de support multi-layout qui causait des bugs
- Mise à jour de toute la documentation pour refléter le schéma simplifié

## [1.1.2] - 2025-10-17

### 🔧 Amélioré
- **Tentative de support AZERTY/QWERTY** (révoquée dans v1.2.0 car trop complexe)
  - Causait des conflits entre les touches A et Q
  - Remplacé par un schéma unique et clair

## [1.1.1] - 2025-10-17

### 🔧 Amélioré
- **Support clavier AZERTY** : Première tentative de support AZERTY/QWERTY automatique
  - Les flèches directionnelles fonctionnent sur les deux layouts
- Mise à jour de la documentation

## [1.1.0] - 2025-10-17

### ✨ Ajouté
- **Système de combo** : Multiplie le score pour les astéroïdes évités consécutivement
  - Timer de 3 secondes pour maintenir le combo
  - Affichage dynamique dans le HUD quand combo > 1
  - Messages visuels "COMBO x2!", "COMBO x3!", etc.
  - Statistique de combo maximum dans l'écran game over
- **Fichier config.js** : Configuration centralisée et modulaire
  - Tous les paramètres du jeu dans un seul fichier
  - Préconfigurations de difficulté (Easy, Normal, Hard, Extreme)
  - Fonction pour appliquer des presets facilement
- **GUIDE.md** : Documentation complète pour développeurs
  - Architecture détaillée du code
  - Tutoriels pour ajouter de nouvelles fonctionnalités
  - Exemples de code pour lasers, power-ups, radar, sons
  - Section optimisation et débogage
  - Bonnes pratiques

### 🔧 Amélioré
- Réinitialisation du combo lors des collisions pour plus de challenge
- Messages de feedback plus informatifs
- Organisation du code avec sections clairement définies
- Documentation enrichie avec exemples concrets

### 🎮 Gameplay
- Le score augmente maintenant avec le combo (x2, x3... jusqu'à x10)
- Récompense les joueurs qui évitent plusieurs astéroïdes sans collision
- Difficulté mieux équilibrée avec les presets

## [1.0.0] - 2025-10-17

### 🎉 Version initiale

#### 🛸 Vaisseau chasseur-tie
- Modèle 3D procédural complet
  - Corps principal cylindrique
  - Cockpit sphérique transparent
  - 4 ailes en configuration X
  - 4 canons laser
  - 4 réacteurs avec flammes
  - Nez pointu
- Contrôles sur 6 axes (pitch, yaw, roll)
- Boost et freinage
- Limites de déplacement pour rester dans la zone de jeu

#### 🌌 Environnement spatial
- Skybox avec 3000+ étoiles
- 5 nébuleuses colorées
- Brouillard spatial pour profondeur
- Éclairage dynamique (ambient, directional, point lights)

#### ☄️ Système d'astéroïdes
- Génération procédurale infinie
- Géométrie unique pour chaque astéroïde (déformation aléatoire)
- Rotation individuelle
- Tailles variables (1 à 4 unités)
- Spawn devant le vaisseau
- Despawn derrière pour optimisation
- Difficulté progressive (spawn rate augmente)

#### 💥 Système de collision
- Détection précise avec AABB (Box3)
- Dégâts par collision (25 HP)
- Effets visuels :
  - Explosion avec 50 particules
  - Shake de caméra
  - Messages d'alerte
- Game over à 0 HP

#### 🎮 Gameplay
- Système de score (10 points par astéroïde)
- Compteur de distance parcourue
- Barre de santé visuelle
- Compteur d'astéroïdes évités
- Difficulté adaptative

#### 🎨 Effets visuels
- Particules de réacteurs
  - 4 moteurs avec traînées
  - Couleur différente en boost
  - Fade out progressif
- Explosions avec particules
- Matériaux Phong pour reflets réalistes
- Anti-aliasing pour rendu haute qualité

#### 📹 Caméra 3ème personne
- Suit le vaisseau avec interpolation lisse (lerp)
- Positionnement dynamique derrière et au-dessus
- Rotation synchronisée avec le vaisseau
- Vue cinématique

#### 🖥️ Interface utilisateur
- **HUD immersif** :
  - Panneau de statistiques (score, distance, vitesse, astéroïdes)
  - Barre de santé avec gradient de couleur
  - Panneau de contrôles
  - Viseur central (crosshair)
- **Écran de démarrage** :
  - Titre stylisé
  - Description du jeu
  - Bouton de démarrage
- **Écran game over** :
  - Statistiques finales
  - Bouton de redémarrage
- **Messages dynamiques** :
  - Affichage temporaire au centre
  - Animations de fade
  - Feedback visuel pour événements

#### ⌨️ Contrôles
- W/↑ : Piquer (descendre)
- S/↓ : Cabrer (monter)
- A/← : Gauche
- D/→ : Droite
- Q : Roulis gauche
- E : Roulis droite
- Shift : Boost (x2.5 vitesse)
- Space : Frein (x0.3 vitesse)

#### 🛠️ Technique
- Three.js r160
- JavaScript ES6+ modules
- Import maps pour dépendances
- Architecture modulaire et extensible
- Code commenté et organisé
- Gestion de la mémoire (dispose des objets)
- Responsive (adaptation à la taille de fenêtre)

#### 📚 Documentation
- README.md complet avec :
  - Description du gameplay
  - Liste des contrôles
  - Fonctionnalités techniques
  - Technologies utilisées
  - Concepts du cours appliqués
  - Instructions de lancement
  - Suggestions d'améliorations
- Page landing.html pour présentation
- Commentaires dans le code

---

## 🔮 Roadmap - Fonctionnalités futures

### Version 2.0 (Planifiée)
- [ ] Système de tir laser
- [ ] Power-ups (santé, bouclier, armes)
- [ ] Mini-map / radar
- [ ] Système de sons et musique
- [ ] Différents types d'ennemis
- [ ] Boss fights
- [ ] Système de vagues
- [ ] Achievements / succès

### Version 3.0 (En réflexion)
- [ ] Mode histoire avec niveaux
- [ ] Différents vaisseaux jouables
- [ ] Customisation du vaisseau
- [ ] Modèles 3D externes (GLB/GLTF)
- [ ] Post-processing (bloom, motion blur)
- [ ] Shaders personnalisés
- [ ] Physics engine intégré

### Version 4.0 (Vision long terme)
- [ ] Multijoueur en ligne
- [ ] Leaderboard global
- [ ] Support mobile avec contrôles tactiles
- [ ] Progressive Web App
- [ ] Mode VR
- [ ] Génération procédurale de niveaux
- [ ] Système de quêtes

---

## 📊 Statistiques du projet

- **Lignes de code** : ~850 (game.js) + ~360 (index.html) + ~270 (config.js)
- **Fichiers** : 6 (HTML, JS, MD)
- **Fonctions** : 20+
- **Classes Three.js utilisées** : 15+
- **Temps de développement** : 1 jour

---

## 🙏 Remerciements

- **Three.js** pour le moteur 3D incroyable
- **Star Wars** pour l'inspiration du chasseur-tie
- **IUT** pour le cadre d'apprentissage

---

## 📝 Notes de version

### Format du changelog
- ✨ Ajouté : Nouvelles fonctionnalités
- 🔧 Modifié : Changements dans fonctionnalités existantes
- 🐛 Corrigé : Corrections de bugs
- 🗑️ Supprimé : Fonctionnalités retirées
- 🔒 Sécurité : Corrections de sécurité
- ⚡ Performance : Améliorations de performance
- 🎨 Style : Changements qui n'affectent pas le code
- 📚 Documentation : Changements dans la documentation

### Versionnement sémantique
Format : MAJOR.MINOR.PATCH
- MAJOR : Changements incompatibles avec versions précédentes
- MINOR : Nouvelles fonctionnalités compatibles
- PATCH : Corrections de bugs compatibles

