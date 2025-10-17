/**
 * Fichier de configuration du jeu chasseur-tie Space Flight
 * 
 * Ce fichier permet de personnaliser facilement tous les aspects du jeu
 * sans modifier le code principal.
 */

export const GAME_CONFIG = {
    // ========================================================================
    // PARAMÈTRES DU VAISSEAU
    // ========================================================================
    ship: {
        // Vitesse normale du vaisseau
        speed: 0.3,
        
        // Vitesse maximale atteignable
        maxSpeed: 0.8,
        
        // Vitesse d'accélération
        acceleration: 0.01,
        
        // Vitesse de décélération
        deceleration: 0.005,
        
        // Vitesse de déplacement (haut/bas, gauche/droite)
        turnSpeed: 0.5,
        
        // Vitesse de roulis (rotation sur l'axe Z)
        rollSpeed: 0.04,
        
        // Multiplicateur de vitesse avec le boost
        boostMultiplier: 2.5,
        
        // Multiplicateur de vitesse avec le frein
        brakeMultiplier: 0.3
    },

    // ========================================================================
    // PARAMÈTRES DE LA CAMÉRA
    // ========================================================================
    camera: {
        // Distance derrière le vaisseau
        distance: 15,
        
        // Hauteur au-dessus du vaisseau
        height: 5,
        
        // Fluidité du suivi (0 = instantané, 1 = très lent)
        smoothness: 0.1,
        
        // Champ de vision (FOV)
        fov: 75
    },

    // ========================================================================
    // PARAMÈTRES DES ASTÉROÏDES
    // ========================================================================
    asteroids: {
        // Distance devant le vaisseau où spawner les astéroïdes
        spawnDistance: 200,
        
        // Distance derrière le vaisseau où supprimer les astéroïdes
        despawnDistance: -50,
        
        // Taux de spawn de base (probabilité par frame)
        baseSpawnRate: 0.02,
        
        // Taux de spawn maximum (difficulté max)
        maxSpawnRate: 0.15,
        
        // Taille minimale d'un astéroïde
        minSize: 1,
        
        // Taille maximale d'un astéroïde
        maxSize: 4,
        
        // Vitesse de déplacement des astéroïdes (non utilisé actuellement)
        speed: 0.2,
        
        // Rayon de dispersion autour de l'axe central
        spreadRadius: 60
    },

    // ========================================================================
    // PARAMÈTRES DE GAMEPLAY
    // ========================================================================
    game: {
        // Santé de départ du joueur
        startHealth: 100,
        
        // Dégâts infligés par collision avec un astéroïde
        asteroidDamage: 25,
        
        // Points gagnés par astéroïde évité (multiplié par le combo)
        scorePerAsteroid: 10,
        
        // Vitesse d'augmentation de la difficulté par frame
        difficultyIncrease: 0.00005,
        
        // Durée du combo en frames (60 frames = 1 seconde)
        comboDuration: 180,
        
        // Multiplicateur de combo maximum
        maxComboMultiplier: 10
    },

    // ========================================================================
    // PARAMÈTRES VISUELS
    // ========================================================================
    visuals: {
        // Densité du brouillard spatial
        fogDensity: 0.0015,
        
        // Nombre d'étoiles dans le skybox
        starCount: 3000,
        
        // Taille des étoiles
        starSize: 1.5,
        
        // Nombre de nébuleuses
        nebulaCount: 5,
        
        // Nombre de particules dans une explosion
        explosionParticles: 50,
        
        // Durée de vie des particules de moteur (en frames)
        engineParticleLifetime: 30,
        
        // Probabilité de spawn d'une particule de moteur par frame
        engineParticleSpawnRate: 0.3
    },

    // ========================================================================
    // COULEURS
    // ========================================================================
    colors: {
        // Couleur principale du vaisseau
        shipBody: 0xcccccc,
        
        // Couleur du cockpit
        shipCockpit: 0x3366ff,
        
        // Couleur des ailes
        shipWings: 0xdddddd,
        
        // Couleur des flammes des réacteurs (normal)
        engineFlame: 0x00aaff,
        
        // Couleur des flammes des réacteurs (boost)
        engineFlameBoost: 0xff6600,
        
        // Couleur des astéroïdes (teinte HSL)
        asteroidHue: 0.1,
        asteroidSaturation: 0.3,
        asteroidLightnessMin: 0.3,
        asteroidLightnessMax: 0.6,
        
        // Couleur du brouillard
        fog: 0x000000,
        
        // Couleur de fond
        background: 0x000000
    },

    // ========================================================================
    // PARAMÈTRES DE DÉBOGAGE
    // ========================================================================
    debug: {
        // Afficher les hitboxes
        showHitboxes: false,
        
        // Afficher les infos de performance
        showFPS: false,
        
        // Mode invincible
        godMode: false,
        
        // Désactiver les collisions
        disableCollisions: false,
        
        // Vitesse du jeu (1 = normal, 2 = double vitesse, 0.5 = ralenti)
        gameSpeed: 1
    }
};

/**
 * Préconfigurations pour différents niveaux de difficulté
 */
export const DIFFICULTY_PRESETS = {
    easy: {
        asteroids: {
            baseSpawnRate: 0.01,
            maxSpawnRate: 0.08,
            minSize: 1,
            maxSize: 3
        },
        game: {
            startHealth: 150,
            asteroidDamage: 15,
            difficultyIncrease: 0.00003
        }
    },
    
    normal: {
        // Utilise les valeurs par défaut de GAME_CONFIG
    },
    
    hard: {
        asteroids: {
            baseSpawnRate: 0.03,
            maxSpawnRate: 0.25,
            minSize: 1.5,
            maxSize: 5
        },
        game: {
            startHealth: 75,
            asteroidDamage: 33,
            difficultyIncrease: 0.0001
        }
    },
    
    extreme: {
        asteroids: {
            baseSpawnRate: 0.05,
            maxSpawnRate: 0.35,
            minSize: 2,
            maxSize: 6
        },
        game: {
            startHealth: 50,
            asteroidDamage: 50,
            difficultyIncrease: 0.00015
        },
        ship: {
            speed: 0.4,
            turnSpeed: 0.02
        }
    }
};

/**
 * Fonction utilitaire pour appliquer une préconfiguration
 */
export function applyPreset(presetName) {
    const preset = DIFFICULTY_PRESETS[presetName];
    if (!preset) {
        console.warn(`Preset "${presetName}" not found`);
        return GAME_CONFIG;
    }
    
    // Merge profond du preset avec la config par défaut
    return deepMerge(GAME_CONFIG, preset);
}

/**
 * Fonction utilitaire pour fusionner deux objets en profondeur
 */
function deepMerge(target, source) {
    const result = { ...target };
    
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(target[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }
    
    return result;
}

