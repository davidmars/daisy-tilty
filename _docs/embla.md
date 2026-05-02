# Carrousel (Embla)

Permet d'intégrer un carrousel / diaporama d'images ou de contenus. Supporte l'autoplay, le défilement libre, l'effet parallaxe et le défilement automatique infini.

---

## 🟢 Mise en service rapide

1. Ajoutez `x-data="embla({…})"` sur le conteneur racine du carrousel.
2. À l'intérieur, respectez la structure HTML obligatoire : `.embla__viewport` → `.embla__container` → `.embla__slide`.
3. Pour les boutons de navigation, incluez le composant `indicator-prev-next.html`.

**Structure minimale :**

```html
<div x-data="embla({ loop: true, autoplay: true })">
  <div class="embla__viewport">
    <div class="embla__container">
      <div class="embla__slide">
        <img src="https://picsum.photos/800/400.webp" alt="Slide 1" />
      </div>
      <div class="embla__slide">
        <img src="https://picsum.photos/seed/b/800/400.webp" alt="Slide 2" />
      </div>
    </div>
  </div>
  <include file="@comp/carousel/nav/indicator-prev-next.html" />
</div>
```

### ✅ Checklist

- [ ] `x-data="embla({…})"` présent sur le conteneur racine
- [ ] Structure `.embla__viewport` > `.embla__container` > `.embla__slide` respectée
- [ ] Chaque `<img>` a un attribut `alt` renseigné
- [ ] Pour un défilement infini (`autoScroll`), ajouter les gestionnaires pause/reprise sur `mouseenter`/`mouseleave` (voir exemples ci-dessous)
- [ ] Vérifier le rendu sur mobile (swipe tactile activé par défaut)

---

## 🔧 Détail technique

### Fichiers impliqués

```
src/components/embla/
  embla.js                       ← classe ES6 du composant Alpine.js
  embla.scss                     ← classes CSS du carrousel et de la parallaxe
  EmblaOptions.d.ts              ← types TypeScript des options
  EmblaCarouselTweenParallax.js  ← plugin parallaxe interne
src/components/carousel/nav/
  indicator-prev-next.html       ← boutons précédent / suivant + compteur
main.js                          ← enregistrement via Alpine.data('embla', …)
```

### Options disponibles (`EmblaOptions`)

| Option | Type | Défaut | Description |
|---|---|---|---|
| `loop` | `boolean` | `false` | Navigation en boucle infinie |
| `autoplay` | `boolean` | `false` | Défilement automatique par slide (s'arrête au survol) |
| `dragFree` | `boolean` | `false` | Défilement libre (sans snap sur les slides) |
| `parallax` | `boolean` | `false` | Effet parallaxe sur les images (nécessite la structure `.embla__parallax`) |
| `parallaxFactor` | `number` | — | Intensité de la parallaxe (ex. `0.08`) |
| `autoScroll` | `boolean` | `false` | Défilement continu automatique (infini) |
| `autoScrollSpeed` | `number` | `0.6` | Vitesse du défilement automatique (négatif = sens inverse) |
| `autoScrollLerp` | `number` | `0.06` | Facteur de lissage de la vitesse (0–1, plus petit = plus doux) |

### Propriétés réactives Alpine

| Propriété | Description |
|---|---|
| `current` | Index de la slide courante (0-based) |
| `total` | Nombre total de slides |
| `autoScrollSpeed` | Vitesse courante du défilement — modifiable dynamiquement |
| `autoScrollInitialSpeed` | Vitesse initiale (pour restauration après interaction) |

### Classes CSS des slides

| Classe | Description |
|---|---|
| `embla__slide` | Slide pleine largeur (100%) |
| `` | Slide à largeur automatique (contenu) |
| `embla__slide--multi` | Slide multi-colonnes responsive (78% → 48% → 32%) |
| `embla__slide--parallax` | Slide avec effet parallaxe (86% → 58% → 42%) |

Pour espacer les slides, définir la variable CSS `--embla-slide-gap` sur `.embla__container` et ajouter la classe `embla__container--gap`.

### Modes d'utilisation

**1. Carrousel simple avec autoplay**
```html
<div x-data="embla({ loop: true, autoplay: true })">
  <div class="embla__viewport">
    <div class="embla__container">
      <div class="embla__slide">…</div>
    </div>
  </div>
  <include file="@comp/carousel/nav/indicator-prev-next.html" />
</div>
```

**2. Galerie photos à défilement libre**
```html
<div x-data="embla({ loop: true, dragFree: true })">
  <div class="embla__viewport h-[200px]">
    <div class="embla__container embla__container--gap h-full" style="--embla-slide-gap: 0.5rem;">
      <div class="embla__slide ">
        <img class="h-full w-auto rounded-xl object-cover" src="…" alt="…" />
      </div>
    </div>
  </div>
  <include file="@comp/carousel/nav/indicator-prev-next.html" />
</div>
```

**3. Carrousel avec parallaxe**
```html
<div x-data="embla({ loop: true, parallax: true, parallaxFactor: 0.08 })">
  <div class="embla__viewport h-[280px]">
    <div class="embla__container embla__container--gap h-full" style="--embla-slide-gap: 0.75rem;">
      <div class="embla__slide embla__slide--multi embla__slide--parallax">
        <a class="lightbox embla__parallax" href="image-full.webp" data-gallery="galerie">
          <span class="embla__parallax__layer">
            <img class="embla__parallax__img" src="image-thumb.webp" alt="…" loading="lazy" />
          </span>
        </a>
      </div>
    </div>
  </div>
  <include file="@comp/carousel/nav/indicator-prev-next.html" />
</div>
```

**4. Défilement automatique infini avec pause au survol**
```html
<div x-data="embla({ loop: true, autoScroll: true, autoScrollSpeed: -0.8, dragFree: true, autoScrollLerp: 0.02 })"
     x-on:mouseenter="autoScrollSpeed = 0"
     x-on:mouseleave="autoScrollSpeed = autoScrollInitialSpeed"
     x-on:pointerup="autoScrollSpeed = autoScrollInitialSpeed">
  <div class="embla__viewport h-[150px]">
    <div class="embla__container embla__container--gap h-full" style="--embla-slide-gap: 0.5rem;">
      <div class="embla__slide  w-[150px] h-[150px]">…</div>
    </div>
  </div>
</div>
```

> **Note :** pour le mode `autoScroll`, utilisez `x-on:` (forme longue) et non `@` — conformément aux conventions Alpine.js du projet.

### Page de démonstration

Tous les modes sont illustrés dans `test-diaporama.html`.

