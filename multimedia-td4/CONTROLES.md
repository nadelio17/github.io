# 🎮 Guide des contrôles - chasseur-tie Space Flight

## ⌨️ Configuration AZERTY (Français)

```
     [Z]          ↑ Piquer (descendre)
      ↑
      
[Q] ← → [D]     ← Gauche  /  Droite →
      
      ↓
     [S]          ↓ Cabrer (monter)
```

### Roulis (rotation sur l'axe Z)
```
[W] ←→ [X]      Roulis gauche ↺  /  Roulis droite ↻
    ou [E] pour roulis droite aussi
```

### Modificateurs
```
[Shift]         🚀 BOOST (vitesse x2.5)
[Space]         🛑 FREIN (vitesse x0.3)
```

### Flèches directionnelles
```
    [↑]         Aussi disponible pour piquer
[←] [↓] [→]     Contrôles alternatifs
```

---

## 🌍 Configuration QWERTY (International)

Le jeu détecte **automatiquement** votre type de clavier !

```
     [W]          ↑ Piquer
      ↑
      
[A] ← → [D]     ← Gauche  /  Droite →
      
      ↓
     [S]          ↓ Cabrer
```

### Roulis
```
[Q] ←→ [E]      Roulis gauche  /  Roulis droite
```

---

## 🎯 Schéma visuel complet (AZERTY)

```
┌─────────────────────────────────────────┐
│  CLAVIER AZERTY - VUE D'ENSEMBLE        │
└─────────────────────────────────────────┘

   [1][2][3][4][5][6][7][8][9][0]
    [A] [Z] [E][R][T][Y][U][I][O][P]
     [Q] [S] [D][F][G][H][J][K][L][M]
      [W][X][C][V][B][N][?][.][/]

┌─────────────────────────────────────────┐
│  CONTRÔLES DE VOL                       │
└─────────────────────────────────────────┘

   [W]         [Z]         [X/E]
  Roulis     Piquer      Roulis
  gauche        ↓         droite
    ↺                       ↻
    
         [Q]  [S]  [D]
        ←  Cabrer  →
        Gauche ↑  Droite

┌─────────────────────────────────────────┐
│  MODIFICATEURS                          │
└─────────────────────────────────────────┘

         [Shift]              [Space]
     🚀 BOOST x2.5        🛑 FREIN x0.3
   (vitesse élevée)    (contrôle fin)
```

---

## 📝 Mémo rapide

### Débutants
```
Z/S   →  Haut/Bas (comme les flèches)
Q/D   →  Gauche/Droite
Shift →  Plus vite !
```

### Avancé
```
A/E     →  Inclinaison (esquive diagonale)
Shift+D →  Boost + virage = drift spatial
Space   →  Ralentir pour manœuvre précise
```

---

## 🎓 Conseils d'utilisation

### 1. Mouvement de base
- Utilisez **Z/Q/S/D** pour le mouvement principal
- Les **flèches ↑←↓→** fonctionnent aussi (pratique à une main)

### 2. Roulis (W/X)
- **Inclinez** votre vaisseau pour des esquives diagonales
- Très utile dans les champs denses d'astéroïdes
- Combinez avec Q/D pour des manœuvres complexes

### 3. Boost (Shift)
- Double la vitesse mais rend le contrôle plus difficile
- Utilisez dans les sections dégagées
- Parfait pour battre des records de distance

### 4. Frein (Space)
- Réduit la vitesse de 70%
- Idéal pour naviguer dans des passages étroits
- Permet des manœuvres précises

---

## 💡 Techniques avancées

### La spirale
```
Z + Q + W (maintenir)
= Montée en spirale vers la gauche
```

### Le drift spatial
```
D (droite) + Shift (boost) puis relâcher D
= Glissade vers la droite à haute vitesse
```

### L'esquive en roulis
```
W ou X (roulis) + Z ou S
= Esquive diagonale (très efficace!)
```

### Le freinage d'urgence
```
Space + S (cabrer)
= Arrêt quasi-complet
```

---

## ❓ FAQ

### Mes touches ne répondent pas ?
✅ Cliquez sur la zone de jeu pour donner le focus  
✅ Vérifiez que vous avez cliqué sur "Démarrer Mission"

### Le vaisseau continue à tourner ?
✅ C'est l'inertie ! Relâchez les touches doucement  
✅ Utilisez le frein (Space) pour stabiliser

### Je n'arrive pas à esquiver ?
✅ Anticipez ! Regardez loin devant  
✅ Utilisez le roulis (W/X) pour plus de mobilité  
✅ Pratiquez avec le frein activé au début

### Le jeu est trop rapide ?
✅ N'utilisez pas le Shift (boost) au début  
✅ Utilisez Space (frein) pour ralentir  
✅ Modifiez la vitesse dans `config.js`

---

## 🔧 Personnalisation

Vous pouvez modifier les touches dans `game.js`, fonctions `onKeyDown()` et `onKeyUp()`.

Exemple pour inverser Z et S :
```javascript
case 'z':  // Au lieu de forward
    keys.backward = true;  // Maintenant Z fait cabrer
    break;
```

---

## 🎮 Test des contrôles (AZERTY)

Avant de jouer, testez chaque touche :

1. **Z** - Le vaisseau doit descendre ✓
2. **S** - Le vaisseau doit monter ✓
3. **Q** - Le vaisseau va à gauche ✓
4. **D** - Le vaisseau va à droite ✓
5. **W** - Le vaisseau s'incline à gauche ↺ ✓
6. **X** - Le vaisseau s'incline à droite ↻ ✓
7. **Shift** - Flammes des moteurs deviennent orange ✓
8. **Space** - Le vaisseau ralentit ✓

---

## 🌟 Profils de jeu recommandés

### Mode Débutant
```
Touches : Z/Q/S/D uniquement
Boost   : NON
Frein   : OUI (Space souvent)
Roulis  : Optionnel
```

### Mode Normal
```
Touches : Z/Q/S/D + W/X
Boost   : Occasionnel
Frein   : Pour manœuvres
Roulis  : Pour esquives
```

### Mode Expert
```
Touches : Toutes combinées
Boost   : Fréquent
Frein   : Manœuvres précises
Roulis  : En permanence
```

---

**Bon vol pilote ! 🚀**

*Les contrôles AZERTY/QWERTY sont détectés automatiquement.*

