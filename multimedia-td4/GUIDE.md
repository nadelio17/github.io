# Guide de développement - chasseur-tie Space Flight

Ce guide vous aidera à comprendre, personnaliser et étendre le jeu.

## 📚 Table des matières

1. [Architecture du code](#architecture-du-code)
2. [Personnalisation](#personnalisation)
3. [Ajouter de nouvelles fonctionnalités](#ajouter-de-nouvelles-fonctionnalités)
4. [Optimisation](#optimisation)
5. [Débogage](#débogage)

---

## 🏗️ Architecture du code

### Structure des fichiers

```
multimedia-td4/
├── index.html        # Interface utilisateur et styles
├── game.js          # Logique principale du jeu
├── config.js        # Configuration et paramètres
├── README.md        # Documentation générale
└── GUIDE.md         # Ce fichier
```

### Organisation de game.js

Le fichier `game.js` est organisé en sections claires :

1. **Configuration** : Paramètres du jeu (peut être remplacé par `config.js`)
2. **Variables globales** : État du jeu et objets Three.js
3. **Initialisation** : Setup de la scène, caméra, lumières
4. **Création d'objets** : Vaisseau, environnement
5. **Gameplay** : Gestion des astéroïdes et collisions
6. **Contrôles** : Input et mouvement du vaisseau
7. **Effets visuels** : Particules, explosions
8. **Interface** : Mise à jour du HUD
9. **Boucle de jeu** : Animation principale

### Flux d'exécution

```
init()
  └─> Créer la scène, caméra, renderer
  └─> Ajouter les lumières
  └─> createStarfield()
  └─> createNebula()
  └─> createShip()
  └─> Configurer les événements
  
User clicks "Start"
  └─> startGame()
      └─> animate() [boucle]
          ├─> updateShipMovement()
          ├─> updateCamera()
          ├─> updateAsteroids()
          │   ├─> createAsteroid() [si nécessaire]
          │   └─> Vérifier si passés
          ├─> checkCollisions()
          │   └─> handleCollision() [si collision]
          ├─> updateEngineParticles()
          ├─> Gérer le combo timer
          ├─> updateHUD()
          └─> renderer.render()
```

---

## 🎨 Personnalisation

### 1. Modifier les paramètres de base

Le fichier `config.js` contient tous les paramètres du jeu. Pour personnaliser :

```javascript
// Dans config.js
export const GAME_CONFIG = {
    ship: {
        speed: 0.5,  // Augmenter la vitesse
        turnSpeed: 0.05,  // Rendre plus maniable
    },
    game: {
        asteroidDamage: 15,  // Réduire les dégâts
    }
};
```

### 2. Changer les couleurs

```javascript
// Dans config.js
colors: {
    shipBody: 0xff0000,  // Vaisseau rouge
    engineFlame: 0xff00ff,  // Flammes roses
}
```

### 3. Ajuster la difficulté

Utilisez les préconfigurations :

```javascript
// Dans game.js, remplacer CONFIG par:
import { applyPreset } from './config.js';
const CONFIG = applyPreset('hard');  // easy, normal, hard, extreme
```

### 4. Modifier l'apparence du vaisseau

Dans `game.js`, fonction `createShip()` :

```javascript
// Exemple : Ajouter une antenne
const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2, 8);
const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
antenna.position.set(0, 0, 2);
shipGroup.add(antenna);
```

---

## 🚀 Ajouter de nouvelles fonctionnalités

### 1. Système de tir laser

#### Étape 1 : Créer la géométrie du laser

```javascript
function createLaser(position, direction) {
    const geometry = new THREE.CylinderGeometry(0.1, 0.1, 5, 8);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xff0000,
        emissive: 0xff0000
    });
    const laser = new THREE.Mesh(geometry, material);
    
    laser.position.copy(position);
    laser.rotation.x = Math.PI / 2;
    laser.userData.velocity = direction.multiplyScalar(2);
    laser.userData.lifetime = 180; // 3 secondes
    
    scene.add(laser);
    lasers.push(laser);
}
```

#### Étape 2 : Ajouter le contrôle

```javascript
// Dans onKeyDown
case ' ':  // Espace
    fireLaser();
    event.preventDefault();
    break;

function fireLaser() {
    const position = ship.position.clone();
    position.z += 2; // Devant le vaisseau
    
    const direction = new THREE.Vector3(0, 0, 1);
    direction.applyQuaternion(ship.quaternion);
    
    createLaser(position, direction);
}
```

#### Étape 3 : Mettre à jour dans animate()

```javascript
function updateLasers() {
    for (let i = lasers.length - 1; i >= 0; i--) {
        const laser = lasers[i];
        
        // Déplacer
        laser.position.add(laser.userData.velocity);
        
        // Vérifier collision avec astéroïdes
        const laserBox = new THREE.Box3().setFromObject(laser);
        for (let asteroid of asteroids) {
            const asteroidBox = new THREE.Box3().setFromObject(asteroid);
            if (laserBox.intersectsBox(asteroidBox)) {
                // Détruire l'astéroïde
                scene.remove(asteroid);
                asteroids.splice(asteroids.indexOf(asteroid), 1);
                createExplosion(asteroid.position);
                gameState.score += 50;
                
                // Détruire le laser
                scene.remove(laser);
                lasers.splice(i, 1);
                break;
            }
        }
        
        // Supprimer si expiré
        laser.userData.lifetime--;
        if (laser.userData.lifetime <= 0) {
            scene.remove(laser);
            lasers.splice(i, 1);
        }
    }
}

// Dans animate()
updateLasers();
```

### 2. Power-ups

#### Créer un power-up

```javascript
function createPowerUp(type) {
    const geometry = new THREE.OctahedronGeometry(0.8);
    const material = new THREE.MeshBasicMaterial({
        color: type === 'health' ? 0x00ff00 : 0xffff00,
        transparent: true,
        opacity: 0.8
    });
    
    const powerUp = new THREE.Mesh(geometry, material);
    powerUp.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        ship.position.z + 150
    );
    
    powerUp.userData.type = type;
    powerUp.userData.rotation = 0.02;
    
    scene.add(powerUp);
    powerUps.push(powerUp);
}

// Spawn aléatoire
if (Math.random() < 0.001) {
    createPowerUp(Math.random() < 0.5 ? 'health' : 'shield');
}

// Collision avec power-up
function checkPowerUpCollisions() {
    const shipBox = new THREE.Box3().setFromObject(ship);
    
    for (let i = powerUps.length - 1; i >= 0; i--) {
        const powerUp = powerUps[i];
        const powerUpBox = new THREE.Box3().setFromObject(powerUp);
        
        if (shipBox.intersectsBox(powerUpBox)) {
            applyPowerUp(powerUp.userData.type);
            scene.remove(powerUp);
            powerUps.splice(i, 1);
        }
    }
}

function applyPowerUp(type) {
    switch(type) {
        case 'health':
            gameState.health = Math.min(100, gameState.health + 25);
            showMessage('SANTÉ +25');
            break;
        case 'shield':
            // Implémenter un bouclier temporaire
            break;
    }
}
```

### 3. Mini-map radar

```javascript
// Dans le HTML, ajouter un canvas
<canvas id="radar" width="150" height="150" 
        style="position:absolute;bottom:20px;left:20px;border:2px solid #0ff"></canvas>

// Dans game.js
function updateRadar() {
    const canvas = document.getElementById('radar');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 2;
    
    // Effacer
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, width, height);
    
    // Vaisseau au centre
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(centerX - 2, centerY - 2, 4, 4);
    
    // Astéroïdes
    ctx.fillStyle = '#ff0000';
    asteroids.forEach(asteroid => {
        const relativeX = (asteroid.position.x - ship.position.x) * scale;
        const relativeZ = (asteroid.position.z - ship.position.z) * scale;
        
        const x = centerX + relativeX;
        const y = centerY - relativeZ;
        
        if (x >= 0 && x < width && y >= 0 && y < height) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    });
}

// Dans animate()
updateRadar();
```

### 4. Système de sons

```javascript
// Créer des sons avec Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency, duration, type = 'sine') {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Utilisation
// Son d'explosion
function createExplosion(position) {
    playSound(100, 0.5, 'sawtooth');
    // ... reste du code
}

// Son de collision
function handleCollision(asteroid) {
    playSound(50, 0.3, 'square');
    // ... reste du code
}
```

---

## ⚡ Optimisation

### 1. Object Pooling pour les astéroïdes

Au lieu de créer et détruire constamment des objets :

```javascript
const asteroidPool = [];
const maxPoolSize = 50;

function getAsteroidFromPool() {
    if (asteroidPool.length > 0) {
        return asteroidPool.pop();
    }
    return createNewAsteroid();
}

function returnAsteroidToPool(asteroid) {
    asteroid.visible = false;
    if (asteroidPool.length < maxPoolSize) {
        asteroidPool.push(asteroid);
    } else {
        scene.remove(asteroid);
        asteroid.geometry.dispose();
        asteroid.material.dispose();
    }
}
```

### 2. Limiter les particules

```javascript
const MAX_PARTICLES = 100;

function addParticle(particle) {
    if (engineParticles.length >= MAX_PARTICLES) {
        const old = engineParticles.shift();
        scene.remove(old);
        old.geometry.dispose();
        old.material.dispose();
    }
    engineParticles.push(particle);
}
```

### 3. Frustum Culling manuel

```javascript
const frustum = new THREE.Frustum();
const cameraViewProjectionMatrix = new THREE.Matrix4();

function isInView(object) {
    camera.updateMatrixWorld();
    camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
    cameraViewProjectionMatrix.multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
    );
    frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);
    
    return frustum.intersectsObject(object);
}
```

---

## 🐛 Débogage

### 1. Afficher les hitboxes

```javascript
import { BoxHelper } from 'three/addons/helpers/BoxHelper.js';

// Pour chaque objet avec collision
const helper = new BoxHelper(asteroid, 0xff0000);
scene.add(helper);

// Mettre à jour dans animate()
helper.update();
```

### 2. Stats de performance

```javascript
import Stats from 'three/addons/libs/stats.module.js';

const stats = new Stats();
document.body.appendChild(stats.dom);

// Dans animate()
stats.update();
```

### 3. Console de débogage

```javascript
// Ajouter dans le HTML
<div id="debug" style="position:absolute;top:0;left:0;background:rgba(0,0,0,0.7);
     color:#0f0;padding:10px;font-family:monospace;font-size:12px"></div>

// Mettre à jour
function updateDebug() {
    const debug = document.getElementById('debug');
    debug.innerHTML = `
        FPS: ${Math.round(1000 / deltaTime)}
        Asteroids: ${asteroids.length}
        Particles: ${engineParticles.length}
        Ship Pos: ${ship.position.x.toFixed(2)}, ${ship.position.y.toFixed(2)}, ${ship.position.z.toFixed(2)}
        Speed: ${gameState.currentSpeed.toFixed(3)}
        Difficulty: ${gameState.difficulty.toFixed(3)}
    `;
}
```

### 4. Mode de test

```javascript
// Touches de débogage
case 'g':  // God mode
    CONFIG.debug.godMode = !CONFIG.debug.godMode;
    console.log('God mode:', CONFIG.debug.godMode);
    break;
case 'h':  // Afficher hitboxes
    CONFIG.debug.showHitboxes = !CONFIG.debug.showHitboxes;
    break;

// Dans checkCollisions()
if (CONFIG.debug.godMode || CONFIG.debug.disableCollisions) {
    return;
}
```

---

## 📝 Bonnes pratiques

1. **Commentez votre code** : Expliquez le "pourquoi", pas le "quoi"
2. **Utilisez des constantes** : Évitez les nombres magiques
3. **Testez progressivement** : Ajoutez une fonctionnalité à la fois
4. **Optimisez après** : Faites fonctionner avant d'optimiser
5. **Nettoyez les ressources** : Appelez `.dispose()` sur les geometries/materials
6. **Utilisez git** : Commitez souvent, testez les branches

---

## 🎓 Pour aller plus loin

### Concepts avancés à explorer

- **Post-processing** : Bloom, motion blur, depth of field
- **Shaders personnalisés** : GLSL pour effets visuels uniques
- **Physics engine** : Cannon.js ou Ammo.js pour physique réaliste
- **Modèles 3D** : Importer de vrais modèles GLB/GLTF
- **Multijoueur** : WebSockets pour jeu en ligne
- **Progressive Web App** : Rendre le jeu installable
- **Mobile** : Contrôles tactiles et gyroscope

### Ressources utiles

- [Three.js Documentation](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [Game Programming Patterns](https://gameprogrammingpatterns.com/)

---

**Bon développement ! 🚀**

