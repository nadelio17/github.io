import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// ============================================================================
// CONFIGURATION DU JEU
// ============================================================================
const CONFIG = {
    // Vaisseau
    ship: {
        speed: 0.3,
        maxSpeed: 0.8,
        acceleration: 0.01,
        deceleration: 0.005,
        turnSpeed: 0.2,
        rollSpeed: 0.04,
        boostMultiplier: 2.5,
        brakeMultiplier: 0.3
    },
    // Caméra
    camera: {
        distance: 15,
        height: 5,
        smoothness: 0.1
    },
    // Astéroïdes
    asteroids: {
        spawnDistance: 200,
        despawnDistance: -50,
        baseSpawnRate: 0.02,
        maxSpawnRate: 0.15,
        minSize: 1,
        maxSize: 4,
        speed: 0.2,
        spreadRadius: 60
    },
    // Gameplay
    game: {
        startHealth: 100,
        asteroidDamage: 25,
        scorePerAsteroid: 10,
        difficultyIncrease: 0.00005
    }
};

// ============================================================================
// VARIABLES GLOBALES
// ============================================================================
let scene, camera, renderer;
let ship, shipGroup, shipContainer;
let asteroids = [];
let stars = [];
let engineParticles = [];
let trailPositions = [];

// État du jeu
const gameState = {
    isRunning: false,
    isPaused: false,
    score: 0,
    distance: 0,
    health: CONFIG.game.startHealth,
    asteroidsAvoided: 0,
    currentSpeed: 0,
    difficulty: 1,
    combo: 0,
    comboTimer: 0,
    maxCombo: 0
};

// Contrôles
const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    rollLeft: false,
    rollRight: false,
    boost: false,
    brake: false
};

// ============================================================================
// INITIALISATION
// ============================================================================
function init() {
    // Créer la scène
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0015);

    // Créer la caméra
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // Créer le renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Lumières
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 50, 50);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x4488ff, 1, 100);
    scene.add(pointLight);

    // Créer l'environnement spatial
    createStarfield();
    createNebula();

    // Créer le vaisseau
    createShip();

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    
    // Boutons UI
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('restart-btn').addEventListener('click', restartGame);

    console.log('Jeu initialisé !');
}

// ============================================================================
// CRÉATION DU VAISSEAU chasseur-tie
// ============================================================================
function createShip() {
    shipGroup = new THREE.Group();
    
    // Corps principal du chasseur-tie
    const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.7, 4, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xcccccc,
        shininess: 80
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.x = Math.PI / 2;
    shipGroup.add(body);

    // Cockpit
    const cockpitGeometry = new THREE.SphereGeometry(0.6, 16, 16);
    const cockpitMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x3366ff,
        transparent: true,
        opacity: 0.7,
        shininess: 100
    });
    const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
    cockpit.position.z = 1;
    cockpit.scale.set(1, 0.8, 1.2);
    shipGroup.add(cockpit);

    // Ailes en X (4 ailes)
    const wingMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xdddddd,
        side: THREE.DoubleSide
    });

    // Configuration des ailes
    const wingConfigs = [
        { x: 2, y: 1.5, rotation: 0.3 },    // Haut droite
        { x: -2, y: 1.5, rotation: -0.3 },  // Haut gauche
        { x: 2, y: -1.5, rotation: -0.3 },  // Bas droite
        { x: -2, y: -1.5, rotation: 0.3 }   // Bas gauche
    ];

    wingConfigs.forEach(config => {
        const wingGeometry = new THREE.BoxGeometry(0.3, 4, 2);
        const wing = new THREE.Mesh(wingGeometry, wingMaterial);
        wing.position.set(config.x, config.y, -0.5);
        wing.rotation.x = config.rotation;
        shipGroup.add(wing);

        // Canons laser sur les ailes
        const cannonGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.5, 8);
        const cannonMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
        const cannon = new THREE.Mesh(cannonGeometry, cannonMaterial);
        cannon.rotation.x = Math.PI / 2;
        cannon.position.set(config.x, config.y, 1.5);
        shipGroup.add(cannon);
    });

    // Moteurs (4 réacteurs)
    const enginePositions = [
        { x: 1.8, y: 1.3 },
        { x: -1.8, y: 1.3 },
        { x: 1.8, y: -1.3 },
        { x: -1.8, y: -1.3 }
    ];

    enginePositions.forEach(pos => {
        const engineGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.8, 8);
        const engineMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x111111,
            emissive: 0x330000
        });
        const engine = new THREE.Mesh(engineGeometry, engineMaterial);
        engine.rotation.x = Math.PI / 2;
        engine.position.set(pos.x, pos.y, -2);
        shipGroup.add(engine);

        // Flamme du réacteur
        const flameGeometry = new THREE.ConeGeometry(0.35, 1.5, 8);
        const flameMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00aaff,
            transparent: true,
            opacity: 0.8
        });
        const flame = new THREE.Mesh(flameGeometry, flameMaterial);
        flame.rotation.x = -Math.PI / 2;
        flame.position.set(pos.x, pos.y, -3.2);
        shipGroup.add(flame);
    });

    // Nez pointu
    const noseGeometry = new THREE.ConeGeometry(0.5, 1.5, 8);
    const noseMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.rotation.x = Math.PI / 2;
    nose.position.z = 3;
    shipGroup.add(nose);

    // Créer un conteneur pour séparer déplacement et rotation de roulis
    shipContainer = new THREE.Group();
    shipContainer.add(shipGroup);
    
    ship = shipContainer;
    scene.add(ship);
}

// ============================================================================
// ENVIRONNEMENT SPATIAL
// ============================================================================
function createStarfield() {
    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    
    for (let i = 0; i < 3000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
    }
    
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.5,
        transparent: true,
        opacity: 0.8
    });
    
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);
}

function createNebula() {
    // Créer plusieurs sphères de brouillard coloré pour simuler une nébuleuse
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.SphereGeometry(50, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.5, 0.1),
            transparent: true,
            opacity: 0.05,
            side: THREE.BackSide
        });
        const nebula = new THREE.Mesh(geometry, material);
        nebula.position.set(
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 200
        );
        scene.add(nebula);
    }
}

// ============================================================================
// GESTION DES ASTÉROÏDES
// ============================================================================
function createAsteroid() {
    const size = THREE.MathUtils.randFloat(
        CONFIG.asteroids.minSize,
        CONFIG.asteroids.maxSize
    );
    
    // Géométrie irrégulière pour l'astéroïde
    const geometry = new THREE.DodecahedronGeometry(size, 0);
    
    // Déformer pour rendre unique
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        
        positions.setXYZ(
            i,
            x * (1 + (Math.random() - 0.5) * 0.3),
            y * (1 + (Math.random() - 0.5) * 0.3),
            z * (1 + (Math.random() - 0.5) * 0.3)
        );
    }
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
    
    const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(0.1, 0.3, Math.random() * 0.3 + 0.3),
        flatShading: true
    });
    
    const asteroid = new THREE.Mesh(geometry, material);
    
    // Position de spawn devant le vaisseau
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * CONFIG.asteroids.spreadRadius;
    
    asteroid.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        ship.position.z + CONFIG.asteroids.spawnDistance
    );
    
    // Rotation aléatoire
    asteroid.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    
    // Vitesse de rotation
    asteroid.userData.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
    };
    
    asteroid.userData.size = size;
    asteroid.userData.passed = false;
    
    scene.add(asteroid);
    asteroids.push(asteroid);
}

function updateAsteroids() {
    // Spawn de nouveaux astéroïdes
    const spawnRate = Math.min(
        CONFIG.asteroids.maxSpawnRate,
        CONFIG.asteroids.baseSpawnRate * gameState.difficulty
    );
    
    if (Math.random() < spawnRate) {
        createAsteroid();
    }
    
    // Mettre à jour les astéroïdes existants
    for (let i = asteroids.length - 1; i >= 0; i--) {
        const asteroid = asteroids[i];
        
        // Rotation
        asteroid.rotation.x += asteroid.userData.rotationSpeed.x;
        asteroid.rotation.y += asteroid.userData.rotationSpeed.y;
        asteroid.rotation.z += asteroid.userData.rotationSpeed.z;
        
        // L'astéroïde ne bouge pas, c'est le vaisseau qui avance
        // Mais on vérifie si le vaisseau l'a dépassé
        if (!asteroid.userData.passed && asteroid.position.z < ship.position.z - 10) {
            asteroid.userData.passed = true;
            gameState.asteroidsAvoided++;
            
            // Système de combo
            gameState.combo++;
            gameState.comboTimer = 180; // 3 secondes à 60fps
            if (gameState.combo > gameState.maxCombo) {
                gameState.maxCombo = gameState.combo;
            }
            
            // Score avec bonus de combo
            const comboMultiplier = Math.min(gameState.combo, 10);
            gameState.score += CONFIG.game.scorePerAsteroid * comboMultiplier;
            
            // Message de combo
            if (gameState.combo > 1) {
                showMessage(`COMBO x${gameState.combo}!`);
            }
            
            updateHUD();
        }
        
        // Supprimer si trop loin derrière
        if (asteroid.position.z < ship.position.z + CONFIG.asteroids.despawnDistance) {
            scene.remove(asteroid);
            asteroids.splice(i, 1);
        }
    }
}

// ============================================================================
// DÉTECTION DE COLLISIONS
// ============================================================================
function checkCollisions() {
    const shipBox = new THREE.Box3().setFromObject(ship);
    
    for (let asteroid of asteroids) {
        const asteroidBox = new THREE.Box3().setFromObject(asteroid);
        
        if (shipBox.intersectsBox(asteroidBox)) {
            handleCollision(asteroid);
        }
    }
}

function handleCollision(asteroid) {
    // Dégâts
    gameState.health -= CONFIG.game.asteroidDamage;
    
    // Réinitialiser le combo
    gameState.combo = 0;
    gameState.comboTimer = 0;
    
    updateHUD();
    
    // Effet visuel
    createExplosion(asteroid.position);
    
    // Supprimer l'astéroïde
    scene.remove(asteroid);
    const index = asteroids.indexOf(asteroid);
    if (index > -1) {
        asteroids.splice(index, 1);
    }
    
    // Vibration de l'écran
    shakeCamera();
    
    // Afficher message
    showMessage('COLLISION !');
    
    // Game over si santé à 0
    if (gameState.health <= 0) {
        gameOver();
    }
}

function createExplosion(position) {
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const geometry = new THREE.SphereGeometry(0.1, 4, 4);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(0.1, 1, 0.5)
        });
        const particle = new THREE.Mesh(geometry, material);
        
        particle.position.copy(position);
        
        particle.userData.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5
        );
        
        particle.userData.lifetime = 60;
        
        scene.add(particle);
        particles.push(particle);
    }
    
    // Nettoyer les particules après un moment
    setTimeout(() => {
        particles.forEach(p => {
            scene.remove(p);
            p.geometry.dispose();
            p.material.dispose();
        });
    }, 1000);
    
    return particles;
}

function shakeCamera() {
    const originalPos = camera.position.clone();
    let shakeTime = 0;
    const shakeDuration = 20;
    
    function shake() {
        if (shakeTime < shakeDuration) {
            camera.position.x = originalPos.x + (Math.random() - 0.5) * 0.5;
            camera.position.y = originalPos.y + (Math.random() - 0.5) * 0.5;
            shakeTime++;
            requestAnimationFrame(shake);
        } else {
            camera.position.copy(originalPos);
        }
    }
    shake();
}

// ============================================================================
// CONTRÔLES DU VAISSEAU
// ============================================================================
function updateShipMovement() {
    let targetSpeed = CONFIG.ship.speed;
    
    // Boost et freinage
    if (keys.boost) {
        targetSpeed *= CONFIG.ship.boostMultiplier;
    }
    if (keys.brake) {
        targetSpeed *= CONFIG.ship.brakeMultiplier;
    }
    
    // Accélération progressive
    if (gameState.currentSpeed < targetSpeed) {
        gameState.currentSpeed = Math.min(
            targetSpeed,
            gameState.currentSpeed + CONFIG.ship.acceleration
        );
    } else {
        gameState.currentSpeed = Math.max(
            targetSpeed,
            gameState.currentSpeed - CONFIG.ship.deceleration
        );
    }
    
    // Déplacement latéral (gauche/droite Q/D)
    if (keys.left) {
        ship.position.x += CONFIG.ship.turnSpeed;
        ship.rotation.y = Math.min(0.3, ship.rotation.y + 0.02);
    } else if (keys.right) {
        ship.position.x -= CONFIG.ship.turnSpeed;
        ship.rotation.y = Math.max(-0.3, ship.rotation.y - 0.02);
    } else {
        // Retour à la position neutre
        ship.rotation.y *= 0.9;
    }
    
    // Déplacement vertical (haut/bas Z/S)
    if (keys.forward) {
        ship.position.y += CONFIG.ship.turnSpeed;
        ship.rotation.x = Math.max(-0.3, ship.rotation.x - 0.02);
    } else if (keys.backward) {
        ship.position.y -= CONFIG.ship.turnSpeed;
        ship.rotation.x = Math.min(0.3, ship.rotation.x + 0.02);
    } else {
        // Retour à la position neutre
        ship.rotation.x *= 0.9;
    }
    
    // Roulis (tonneaux A/E) - rotation continue autour de l'axe Z
    // Appliqué au shipGroup interne pour tourner sur place
    if (keys.rollLeft) {
        shipGroup.rotation.z -= CONFIG.ship.rollSpeed;
    }
    if (keys.rollRight) {
        shipGroup.rotation.z += CONFIG.ship.rollSpeed;
    }
    
    // Limiter la position du vaisseau
    ship.position.x = THREE.MathUtils.clamp(ship.position.x, -50, 50);
    ship.position.y = THREE.MathUtils.clamp(ship.position.y, -50, 50);
    
    // Avancer
    ship.position.z += gameState.currentSpeed;
    
    // Mettre à jour la distance
    gameState.distance += gameState.currentSpeed;
    
    // Augmenter la difficulté
    gameState.difficulty += CONFIG.game.difficultyIncrease;
}

function updateCamera() {
    // Position cible de la caméra (derrière et au-dessus du vaisseau)
    const idealOffset = new THREE.Vector3(
        0,
        CONFIG.camera.height,
        -CONFIG.camera.distance
    );
    
    // Appliquer la rotation du vaisseau à l'offset
    idealOffset.applyQuaternion(ship.quaternion);
    
    const idealPosition = ship.position.clone().add(idealOffset);
    
    // Interpolation lisse
    camera.position.lerp(idealPosition, CONFIG.camera.smoothness);
    
    // Regarder légèrement devant le vaisseau
    const lookAtOffset = new THREE.Vector3(0, 0, 10);
    lookAtOffset.applyQuaternion(ship.quaternion);
    const lookAtPosition = ship.position.clone().add(lookAtOffset);
    
    camera.lookAt(lookAtPosition);
}

// ============================================================================
// EFFETS VISUELS
// ============================================================================
function updateEngineParticles() {
    // Positions des moteurs
    const enginePositions = [
        new THREE.Vector3(1.8, 1.3, -3),
        new THREE.Vector3(-1.8, 1.3, -3),
        new THREE.Vector3(1.8, -1.3, -3),
        new THREE.Vector3(-1.8, -1.3, -3)
    ];
    
    // Créer des particules pour chaque moteur
    if (Math.random() < 0.3) {
        enginePositions.forEach(localPos => {
            const worldPos = localPos.clone();
            worldPos.applyQuaternion(ship.quaternion);
            worldPos.add(ship.position);
            
            const geometry = new THREE.SphereGeometry(0.2, 8, 8);
            const intensity = keys.boost ? 1.5 : 1;
            const material = new THREE.MeshBasicMaterial({
                color: keys.boost ? 0xff6600 : 0x00aaff,
                transparent: true,
                opacity: 0.8 * intensity
            });
            
            const particle = new THREE.Mesh(geometry, material);
            particle.position.copy(worldPos);
            particle.userData.lifetime = 30;
            
            scene.add(particle);
            engineParticles.push(particle);
        });
    }
    
    // Mettre à jour et supprimer les anciennes particules
    for (let i = engineParticles.length - 1; i >= 0; i--) {
        const particle = engineParticles[i];
        particle.userData.lifetime--;
        particle.material.opacity *= 0.95;
        particle.scale.multiplyScalar(0.95);
        
        if (particle.userData.lifetime <= 0) {
            scene.remove(particle);
            particle.geometry.dispose();
            particle.material.dispose();
            engineParticles.splice(i, 1);
        }
    }
}

// ============================================================================
// INTERFACE UTILISATEUR
// ============================================================================
function updateHUD() {
    document.getElementById('score').textContent = Math.floor(gameState.score);
    document.getElementById('distance').textContent = Math.floor(gameState.distance / 10);
    document.getElementById('speed').textContent = (gameState.currentSpeed * 100).toFixed(0);
    document.getElementById('asteroids').textContent = gameState.asteroidsAvoided;
    
    // Afficher le combo si actif
    const comboDisplay = document.getElementById('combo-display');
    if (gameState.combo > 1) {
        comboDisplay.style.display = 'block';
        document.getElementById('combo').textContent = gameState.combo;
    } else {
        comboDisplay.style.display = 'none';
    }
    
    const healthPercent = Math.max(0, gameState.health);
    document.getElementById('health-fill').style.width = healthPercent + '%';
}

function showMessage(text) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.classList.add('show');
    
    setTimeout(() => {
        messageEl.classList.remove('show');
    }, 1500);
}

// ============================================================================
// GESTION DU JEU
// ============================================================================
function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    gameState.isRunning = true;
    gameState.score = 0;
    gameState.distance = 0;
    gameState.health = CONFIG.game.startHealth;
    gameState.asteroidsAvoided = 0;
    gameState.currentSpeed = 0;
    gameState.difficulty = 1;
    gameState.combo = 0;
    gameState.comboTimer = 0;
    gameState.maxCombo = 0;
    
    updateHUD();
    animate();
}

function gameOver() {
    gameState.isRunning = false;
    
    document.getElementById('final-score').textContent = Math.floor(gameState.score);
    document.getElementById('final-distance').textContent = Math.floor(gameState.distance / 10);
    document.getElementById('final-combo').textContent = gameState.maxCombo;
    document.getElementById('gameover-screen').classList.remove('hidden');
}

function restartGame() {
    // Nettoyer les astéroïdes
    asteroids.forEach(asteroid => scene.remove(asteroid));
    asteroids = [];
    
    // Réinitialiser la position et rotation du vaisseau
    ship.position.set(0, 0, 0);
    ship.rotation.set(0, 0, 0);
    shipGroup.rotation.set(0, 0, 0);
    
    // Cacher l'écran game over
    document.getElementById('gameover-screen').classList.add('hidden');
    
    // Redémarrer
    startGame();
}

// ============================================================================
// ÉVÉNEMENTS
// ============================================================================
function onKeyDown(event) {
    switch(event.key.toLowerCase()) {
        // === MOUVEMENT (ZQSD) ===
        case 'z':
        case 'arrowup':
            keys.forward = true;
            break;
        case 's':
        case 'arrowdown':
            keys.backward = true;
            break;
        case 'q':
        case 'arrowleft':
            keys.left = true;
            break;
        case 'd':
        case 'arrowright':
            keys.right = true;
            break;
            
        // === ROULIS (A/E) ===
        case 'a':
            keys.rollLeft = true;
            break;
        case 'e':
            keys.rollRight = true;
            break;
            
        // === MODIFICATEURS ===
        case 'shift':
            keys.boost = true;
            break;
        case ' ':
            keys.brake = true;
            event.preventDefault();
            break;
    }
}

function onKeyUp(event) {
    switch(event.key.toLowerCase()) {
        // === MOUVEMENT (ZQSD) ===
        case 'z':
        case 'arrowup':
            keys.forward = false;
            break;
        case 's':
        case 'arrowdown':
            keys.backward = false;
            break;
        case 'q':
        case 'arrowleft':
            keys.left = false;
            break;
        case 'd':
        case 'arrowright':
            keys.right = false;
            break;
            
        // === ROULIS (A/E) ===
        case 'a':
            keys.rollLeft = false;
            break;
        case 'e':
            keys.rollRight = false;
            break;
            
        // === MODIFICATEURS ===
        case 'shift':
            keys.boost = false;
            break;
        case ' ':
            keys.brake = false;
            break;
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ============================================================================
// BOUCLE D'ANIMATION
// ============================================================================
function animate() {
    if (!gameState.isRunning) return;
    
    requestAnimationFrame(animate);
    
    // Mettre à jour le vaisseau
    updateShipMovement();
    
    // Mettre à jour la caméra
    updateCamera();
    
    // Mettre à jour les astéroïdes
    updateAsteroids();
    
    // Vérifier les collisions
    checkCollisions();
    
    // Effets visuels
    updateEngineParticles();
    
    // Gestion du combo timer
    if (gameState.comboTimer > 0) {
        gameState.comboTimer--;
        if (gameState.comboTimer === 0) {
            gameState.combo = 0;
        }
    }
    
    // Mettre à jour le HUD
    updateHUD();
    
    // Rendu
    renderer.render(scene, camera);
}

// ============================================================================
// DÉMARRAGE
// ============================================================================
init();

