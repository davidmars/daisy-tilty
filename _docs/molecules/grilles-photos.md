# Molécules — Grilles photos

Molécules `<include>`-ready pour afficher des galeries photos/vidéos avec lightbox.

---

## 🟢 Mise en service rapide

### Prérequis

Le composant `lightbox` doit être actif (il l'est par défaut dans ce projet).  
Toutes les molécules utilisent la classe `.lightbox` — aucune configuration supplémentaire n'est nécessaire.

### Choisir sa grille

| Molécule | Type | Nb images | Quand l'utiliser |
|---|---|---|---|
| `media-grids/grille-uniforme.html` | colonnes égales | illimité | flux d'articles, portfolio |
| `media-grids/grille-mosaic-A.html` | fixe 4 slots | **4** | grand carré + portrait + 2 carrés |
| `media-grids/grille-mosaic-B.html` | fixe 3 slots | **3** | grand carré + 2 paysages empilés |
| `media-grids/grille-mosaic-C.html` | fixe 4 slots | **4** | grand carré + paysage + 2 carrés |
| `media-grids/grille-mosaic-D.html` | fixe 4 slots | **4** | miroir de C (grand carré à droite) |

### Items à placer dans les slots

| Molécule | Chemin | Quand l'utiliser |
|---|---|---|
| `photo-lightbox.html` | `@mol/media-grids/items/photo-lightbox.html` | item photo standard |
| `video-lightbox.html` | `@mol/media-grids/items/video-lightbox.html` | item vidéo avec overlay ▶ |

### Checklist

- [ ] Choisir la molécule de grille adaptée
- [ ] Utiliser `photo-lightbox.html` ou `video-lightbox.html` pour chaque image
- [ ] Attribuer le même `$gallery="nom-galerie"` à tous les items d'une même grille (navigation lightbox entre images)
- [ ] Pour les grilles à slots nommés (A, B, C, D) : utiliser `<template slot="imgX">…</template>`

---

## 🔧 Détail technique

### Alias Vite

```
@mol  →  src/molecules/
```

### Items (`photo-lightbox.html`, `video-lightbox.html`)

Ces molécules produisent une balise `<a class="lightbox …">` prête à l'emploi.

**`photo-lightbox.html`** — variables :

| Variable | Défaut | Description |
|---|---|---|
| `$href` | picsum placeholder | URL de la grande image (lightbox) |
| `$src` | picsum placeholder | URL de la vignette |
| `$alt` | `Photo` | Texte alternatif |
| `$gallery` | *(vide)* | Nom du groupe — même valeur pour toute la galerie |
| `$class` | `rounded-lg` | Classes supplémentaires sur `<a>` (span, arrondi…) |

Un `<slot />` est disponible pour ajouter une légende ou un overlay.

**`video-lightbox.html`** — variables identiques + :

| Variable | Défaut | Description |
|---|---|---|
| `$label` | `Vidéo` | Libellé sous l'icône ▶ |

### Grilles à slot libre

`grille-uniforme.html`, `grille-edito-1.html`, `grille-edito-2.html`, `grille-mosaic-libre.html`

→ Acceptent un `<slot />` par défaut : les items y sont placés directement.

**`grille-uniforme.html`** — variables :

| Variable | Défaut |
|---|---|
| `$cols` | `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4` |
| `$gap` | `gap-4` |

Pour `grille-edito-1.html` et `grille-edito-2.html`, les items **doivent porter leurs classes de span** (ex. `sm:col-span-2 lg:row-span-2`).

Pour `grille-mosaic-libre.html`, chaque item doit avoir `bg-base-100 overflow-hidden` en plus des classes de span.

### Grilles à slots nommés (mosaïques fixes)

`grille-mosaic-A.html`, `grille-mosaic-B.html`, `grille-mosaic-C.html`, `grille-mosaic-D.html`

Le positionnement CSS est géré par la molécule. L'item dans chaque slot doit juste s'étirer sur toute la cellule :

```html
<a href="…" class="lightbox group block h-full w-full" data-gallery="ma-galerie">
  <img src="…" alt="…" class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
       loading="lazy" decoding="async" />
</a>
```

### Exemple complet — mosaïque B (3 images)

```html
<include file="@mol/grille-mosaic-B.html">

  <template slot="img1">
    <a href="https://picsum.photos/id/151/1200/1200.webp"
       class="lightbox group block h-full w-full"
       data-gallery="galerie-accueil">
      <img src="https://picsum.photos/id/151/600/600.webp"
           alt="Grand format éditorial"
           class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
           loading="lazy" decoding="async" />
    </a>
  </template>

  <template slot="img2">
    <a href="https://picsum.photos/id/152/1200/600.webp"
       class="lightbox group block h-full w-full"
       data-gallery="galerie-accueil">
      <img src="https://picsum.photos/id/152/600/300.webp"
           alt="Paysage haut"
           class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
           loading="lazy" decoding="async" />
    </a>
  </template>

  <template slot="img3">
    <a href="https://picsum.photos/id/153/1200/600.webp"
       class="lightbox group block h-full w-full"
       data-gallery="galerie-accueil">
      <img src="https://picsum.photos/id/153/600/300.webp"
           alt="Paysage bas"
           class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
           loading="lazy" decoding="async" />
    </a>
  </template>

</include>
```

### Exemple complet — grille uniforme

```html
<include file="@mol/media-grids/grille-uniforme.html" $cols="grid-cols-2 md:grid-cols-4" $gap="gap-3">
  <include file="@mol/media-grids/items/photo-lightbox.html"
    $href="https://picsum.photos/id/10/1600/1000.webp"
    $src="https://picsum.photos/id/10/400/300.webp"
    $alt="Paysage de montagne"
    $gallery="galerie-1"
    $class="rounded-lg h-48" />
  <include file="@mol/media-grids/items/video-lightbox.html"
    $href="https://www.youtube.com/watch?v=ScMzIvxBSi4"
    $src="https://picsum.photos/id/20/400/300.webp"
    $alt="Vignette YouTube"
    $gallery="galerie-1"
    $label="Vidéo YouTube"
    $class="rounded-lg h-48" />
</include>
```





