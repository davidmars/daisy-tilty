# Animations au scroll (Lenis + Motion)

Trois effets indépendants pilotés par des variables d'environnement : scroll fluide, parallaxe et apparitions au défilement. Chaque effet peut être activé ou désactivé sans toucher au code.

---

## 🟢 Mise en service rapide

### 1. Activer les effets dans `.env.local`

Créez ou éditez le fichier `.env.local` à la racine du projet et ajoutez les lignes souhaitées :

```dotenv
# Scroll fluide (Lenis)
VITE_SMOOTH_SCROLL=true

# Effet parallaxe sur les images
VITE_PARALLAX=true

# Apparitions au défilement (reveal)
VITE_AOS=true
```

Relancez le serveur de développement (`npm run dev`) après toute modification de `.env.local`.

---

### 2. Parallaxe — `data-speed`

Posez `data-speed` sur un élément pour qu'il se déplace à une vitesse différente du scroll.

Pour dissocier l'effet parallaxe d'un éventuel hover sur l'image, utilisez un `<div>` intermédiaire :

```html
<div class="relative overflow-hidden rounded-2xl aspect-[3/4]">

  <!-- div parallaxe : porte data-speed et le débordement -->
  <div data-speed="0.5" class="absolute inset-0 w-full h-[130%] -top-[15%]">

    <!-- img hover : transform CSS indépendant du parallaxe -->
    <img src="…" class="w-full h-full object-cover hover:scale-105 transition duration-500" />

  </div>
</div>
```

**Valeurs de `data-speed` :**

| Valeur | Effet | Débattement |
|---|---|---|
| `0.1` – `0.3` | Subtil | ±15 – ±45 px |
| `0.4` – `0.6` | Visible | ±60 – ±90 px |
| `0.7` – `1.0` | Prononcé | ±105 – ±150 px |
| Négatif | Sens inverse | Idem en négatif |

> ⚠️ Le conteneur doit avoir `overflow-hidden`. L'élément `data-speed` doit être **plus grand que son conteneur** (`h-[130%] -top-[15%]`) pour éviter les zones vides lors du déplacement.

---

### 3. Apparitions au défilement — `data-reveal`

Ajoutez `data-reveal="<preset>"` sur n'importe quel élément pour le faire apparaître avec l'animation choisie lorsqu'il entre dans la vue.

#### Presets disponibles

| Preset              | Effet                                              |
|---------------------|----------------------------------------------------|
| `fade`              | Fondu simple (opacité seule)                       |
| `fadeBlur`          | Fondu + dissolution du flou                        |
| `fadeUp` *(défaut)* | Fondu + glissement vers le haut                    |
| `fadeDown`          | Fondu + glissement vers le bas                     |
| `fadeLeft`          | Fondu + glissement depuis la droite                |
| `fadeRight`         | Fondu + glissement depuis la gauche                |
| `maskUp`            | Révélation masquée (clip-path) du bas vers le haut |
| `maskDown`          | Révélation masquée du haut vers le bas             |
| `maskLeft`          | Révélation masquée de droite à gauche              |
| `maskRight`         | Révélation masquée de gauche à droite              |
| `zoomIn`            | Fondu + léger zoom avant                           |
| `zoomOut`           | Fondu + léger zoom arrière                         |

```html
<!-- Fondu simple -->
<p data-reveal="fade" class="p">Texte</p>

<!-- Fondu avec flou -->
<h2 data-reveal="fadeBlur" class="h2">Titre</h2>

<!-- Révélation masquée vers le haut -->
<p data-reveal="maskUp" class="p">Un texte qui se dévoile.</p>

<!-- Délai et durée personnalisés (en secondes) -->
<div data-reveal="zoomIn" data-reveal-delay="0.15" data-reveal-duration="1.2" class="card bg-base-200">…</div>
```

#### Cascade automatique (Stagger)

Pour animer une liste d'éléments l'un après l'autre : utilisez `data-reveal="stagger[.mode]"` sur le **conteneur parent**.

| Mode                       | Ordre d'animation                            |
|----------------------------|----------------------------------------------|
| `stagger` ou `stagger.asc` | Premier → dernier *(défaut)*                 |
| `stagger.desc`             | Dernier → premier                            |
| `stagger.random`           | Aléatoire — différent à chaque déclenchement |

```html
<!-- Cascade ascendante (défaut) -->
<ul data-reveal="stagger" data-reveal-preset="maskDown" data-reveal-stagger="0.08">
  <li>Élément 1</li>
  <li>Élément 2</li>
  <li>Élément 3</li>
</ul>

<!-- Cascade descendante -->
<ul data-reveal="stagger.desc" data-reveal-preset="fadeLeft" data-reveal-stagger="0.1">
  …
</ul>

<!-- Ordre aléatoire avec délai initial -->
<ul data-reveal="stagger.random" data-reveal-preset="fadeBlur" data-reveal-stagger="0.07" data-reveal-delay="0.3">
  …
</ul>

<!-- Sélecteur personnalisé -->
<div data-reveal="stagger" data-reveal-preset="fadeUp" data-reveal-selector="> .card" data-reveal-stagger="0.1">
  <div class="card">…</div>
  <div class="card">…</div>
</div>
```

**Attributs disponibles :**

| Attribut               | Valeurs                                   | Défaut   | Description                                                        |
|------------------------|-------------------------------------------|----------|--------------------------------------------------------------------|
| `data-reveal`          | preset ou `stagger[.asc\|.desc\|.random]` | —        | Preset d'animation ou mode cascade.                                |
| `data-reveal-preset`   | nom d'un preset                           | `fadeUp` | Preset pour le mode stagger.                                       |
| `data-reveal-delay`    | nombre (s)                                | `0`      | Délai avant le démarrage (ou avant le premier élément du stagger). |
| `data-reveal-duration` | nombre (s)                                | `0.7`    | Durée de l'animation.                                              |
| `data-reveal-stagger`  | nombre (s)                                | `0.05`   | Intervalle entre chaque enfant (stagger uniquement).               |
| `data-reveal-selector` | sélecteur CSS                             | `> *`    | Filtre les enfants à animer (stagger uniquement).                  |

---

### ✅ Checklist

- [ ] `.env.local` créé avec les variables souhaitées à `true`
- [ ] Serveur de développement relancé après modification de `.env.local`
- [ ] Conteneur avec `overflow-hidden` autour de chaque élément `data-speed`
- [ ] Élément `data-speed` plus grand que son conteneur (`h-[130%] -top-[15%]`)
- [ ] Hover sur `<img>` placé dans un enfant séparé du `div[data-speed]` pour éviter les conflits de transform

---

## 🔧 Détail technique

### Fichiers impliqués

```
src/components/scroll/
  ScrollManager.js     ← init Lenis + RAF loop (VITE_SMOOTH_SCROLL)
  ParallaxManager.js   ← scan [data-speed] + scroll(animate()) de Motion (VITE_PARALLAX)
  RevealManager.js     ← scan [data-reveal] + inView() + animate() de Motion (VITE_AOS)
src/styles/
  data-reveal.scss     ← masquage CSS initial par preset [data-reveal="*"]
main.js                ← instanciation des 3 managers dans DOMContentLoaded
.env                   ← valeurs par défaut (toutes à false)
```

### Pages de démo

| Page | Contenu |
|---|---|
| `demo-reveal.html` | Tous les presets et modes stagger en démo vivante |
| `demo-parallax.html` | Comparaison de vitesses, duo d'images, référence des valeurs |

### Variables d'environnement

| Variable             | Défaut (`.env`) | Description                                |
|----------------------|-----------------|--------------------------------------------|
| `VITE_SMOOTH_SCROLL` | `false`         | Active Lenis (scroll fluide)               |
| `VITE_PARALLAX`      | `false`         | Active le parallaxe sur `[data-speed]`     |
| `VITE_AOS`           | `false`         | Active les révélations sur `[data-reveal]` |

Les valeurs par défaut sont `false` dans `.env` (versionné) — le projet fonctionne sans aucun effet sur une installation fraîche. Les effets sont activés localement via `.env.local` (ignoré par git).

### Dépendances

| Package | Rôle | Import |
|---|---|---|
| [`lenis`](https://github.com/darkroomengineering/lenis) | Scroll fluide RAF-based | `ScrollManager.js` |
| [`motion`](https://motion.dev) | `animate()`, `scroll()`, `inView()`, `stagger()` | `ParallaxManager.js`, `RevealManager.js` |

> `animate` et `scroll` doivent être importés depuis le même package `motion` — ne jamais mixer `motion` et `motion/mini` dans le même fichier, les builds sont incompatibles.

### `ScrollManager` — scroll fluide

`ScrollManager` initialise Lenis et le connecte au `requestAnimationFrame` natif. Il est exposé dans le store Alpine (`Alpine.store('scroll')`) pour permettre un scroll programmatique depuis le HTML :

```html
<button x-on:click="$store.scroll.scrollTo('#section-contact')">Aller au contact</button>
```

Lenis ajoute les classes `lenis` et `lenis-smooth` sur `<html>` durant son cycle de vie. Les règles CSS correspondantes sont déclarées dans `main.scss`.

### `ParallaxManager` — parallaxe

Au `DOMContentLoaded`, `ParallaxManager` scanne tous les `[data-speed]` via `$('[data-speed]').each()` (cash-dom) et câble sur chacun un `scroll(animate(...))` de Motion. La valeur de `data-speed` est multipliée par `150` pour obtenir le déplacement en pixels (`±speed × 150`). L'animation couvre toute la durée de visibilité de l'élément (`"start end"` → `"end start"`).

`data-speed` peut être posé sur n'importe quel élément (`<div>`, `<img>`, `<section>`…). Placer le hover CSS sur un enfant séparé évite les conflits de `transform`.

**`prefers-reduced-motion` :** si l'utilisateur a activé la réduction des mouvements dans son système, `ParallaxManager` ne s'initialise pas même si `VITE_PARALLAX=true`.

### `RevealManager` — apparitions

`RevealManager` scanne tous les `[data-reveal]` et appelle `inView()` de Motion sur chacun. L'animation est entièrement déterminée par l'objet `PRESETS` dans `RevealManager.js`.

Le mode stagger lit la valeur après le point (`stagger.asc` → `asc`, `stagger.desc` → `desc`, `stagger.random` → `random`). Le réordonnancement des cibles se fait en **réorganisant le tableau** avant de le passer à `animate()` — Motion applique ensuite le stagger séquentiellement sur l'ordre résultant. Pour `random`, le tableau est mélangé (Fisher-Yates) **à chaque déclenchement** de `inView`, donnant un ordre différent à chaque ouverture.

**Masquage initial (FOUC) :**
- Presets `fade*` et `zoom*` : une règle CSS dans `data-reveal.scss` applique `opacity: 0` dès le rendu, avant tout JS.
- Preset `fadeBlur` : `opacity: 0` + `filter: blur(12px)` via CSS.
- Presets `mask*` : une règle CSS applique le `clip-path` de départ. L'opacité reste à `1`.
- Mode `stagger[.*]` : le pré-masquage des enfants est fait en JavaScript au moment de l'init. Le sélecteur CSS utilise `[data-reveal^="stagger"]` pour couvrir tous les modes.

**`prefers-reduced-motion` :** si l'utilisateur a activé la réduction des mouvements, `RevealManager` rend tous les éléments `[data-reveal]` visibles immédiatement sans déclencher d'animation.

### Ajouter un preset

1. Éditez l'objet `PRESETS` dans `RevealManager.js` :

```js
const PRESETS = {
    // ...presets existants...
    monPreset: {
        keyframes: { opacity: [0, 1], rotate: [-5, 0] },
        reset:     { opacity: 0, rotate: -5 },
    },
};
```

2. Ajoutez la règle de masquage CSS dans `data-reveal.scss` :

```scss
[data-reveal="monPreset"] { opacity: 0; }
```

### Compatibilité avec les composants existants

`NavScrolled.js` écoute `window.scrollY` via un listener `scroll` passif. Lenis dispatche les événements `scroll` natifs sur `window` — `NavScrolled` continue à fonctionner sans aucune modification.
