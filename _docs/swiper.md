# Carrousel (Swiper)
Permet d intégrer un carrousel / diaporama d images ou de contenus.
Supporte le défilement libre, l autoplay infini, la pagination et la navigation native.
---
## Mise en service rapide
1. Ajoutez `x-data="swiper({…})"` **et** la classe `swiper` sur le même élément racine.
2. Placez un `.swiper-wrapper` à l intérieur contenant des `.swiper-slide`.
3. Pour les boutons de navigation, ajoutez `.swiper-button-prev` et `.swiper-button-next` dans le conteneur.
4. Pour la pagination par points, ajoutez `.swiper-pagination` et passez `pagination: { clickable: true }` dans les options.
**Structure minimale :**
```html
<div x-data="swiper({ loop: true })" class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img src="https://picsum.photos/800/400.webp" alt="Slide 1" />
    </div>
    <div class="swiper-slide">
      <img src="https://picsum.photos/seed/b/800/400.webp" alt="Slide 2" />
    </div>
  </div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>
```
### Checklist
- [ ] `x-data="swiper({…})"` et classe `swiper` présents sur le même élément racine
- [ ] `.swiper-wrapper` contenant des `.swiper-slide` présents
- [ ] Chaque `<img>` a un attribut `alt` renseigné
- [ ] Pour un défilement infini, `speed` élevé + `autoplay.delay: 0` + `transition-timing-function: linear` sur `.swiper-wrapper`
---
## Détail technique
### Fichiers impliqués
```
src/components/carousel/swiper/
  SwiperCarousel.js      ← classe ES6, pont Alpine/Swiper (images, logos, auto)
  SwiperVideoCarousel.js ← variante avec gestion lecture/pause des <video> embarquées
src/molecules/carousels/
  swiper-photos.html   ← galerie photos à défilement libre + lightbox
  swiper-slide.html    ← diaporama plein format, navigation + barre de progression
  swiper-video.html    ← diaporama mixte images + vidéos HTML5 embarquées
  swiper-auto.html     ← défilement automatique infini (pause au survol)
  swiper-logos.html    ← logos N&B -> couleur au hover
  _all-swiper.html     ← showcase de toutes les molécules
main.js                ← enregistrement via Alpine.data( swiper , ) et Alpine.data( swiperVideo , )
```
### Fonctionnement
`SwiperCarousel` est un pont minimal entre Alpine et Swiper. La classe
initialise Swiper sur `this.$el` (le noeud racine `x-data`) avec les modules
`FreeMode`, `Autoplay`, `Navigation` et `Pagination` disponibles.
Toutes les options natives Swiper sont acceptées directement en argument :
`x-data="swiper({ loop: true, freeMode: true, slidesPerView: auto })"`.
### Options fréquemment utilisées
| Option | Type | Description |
|---|---|---|
| `loop` | `boolean` | Défilement infini |
| `freeMode` | `boolean` | Défilement libre sans snap |
| `slidesPerView` | `number / auto` | Nombre de slides visibles |
| `spaceBetween` | `number` | Espace entre les slides (px) |
| `speed` | `number` | Durée de la transition (ms) |
| `grabCursor` | `boolean` | Curseur main au survol (activé par défaut) |
| `centeredSlides` | `boolean` | Centre la slide active |
| `autoplay.delay` | `number` | Délai avant la prochaine slide (ms). `0` = défilement continu |
| `autoplay.pauseOnMouseEnter` | `boolean` | Pause au survol |
| `autoplay.disableOnInteraction` | `boolean` | Reprend après interaction si `false` |
| `navigation` | `boolean` | Active les boutons prev/next natifs |
| `pagination.clickable` | `boolean` | Active la pagination par points cliquables |
### Défilement continu fluide
Pour un défilement sans interruption (logos, avatars…), combiner :
```html
<div x-data="swiper({ loop: true, freeMode: true, slidesPerView: auto, speed: 3000, autoplay: { delay: 0, disableOnInteraction: false } })" class="swiper">
  <div class="swiper-wrapper" style="transition-timing-function: linear;">
    ...slides...
  </div>
</div>
```
### Molécules disponibles
| Fichier | Usage |
|---|---|
| `swiper-photos.html` | Galerie photos + lightbox, défilement libre |
| `swiper-slide.html` | Diaporama plein format, navigation + barre de progression |
| `swiper-video.html` | Diaporama mixte images + vidéos HTML5 embarquées |
| `swiper-auto.html` | Défilement automatique infini, pause au survol |
| `swiper-logos.html` | Logos auto-infini, N&B -> couleur au hover |
### Page de démonstration
`test-molecules-swiper.html`

---

### Composant `swiperVideo` — slides vidéo HTML5 embarquées

Utiliser `x-data="swiperVideo({…})"` à la place de `swiper` pour un diaporama contenant des `<video>`. Il accepte les mêmes options que `swiper`.

**Comportements automatiques :**
- À chaque changement de slide, les `<video>` des slides inactives sont mises en pause et remises à zéro (`currentTime = 0`).
- Si la slide active contient une `<video>` et que l'autoplay Swiper est actif, celui-ci est suspendu pendant la lecture et reprend à la fin de la vidéo.

**Bonnes pratiques pour les slides vidéo :**
```html
<div class="swiper-slide relative bg-black">
  <video class="h-full w-full object-contain" controls playsinline preload="metadata"
         poster="https://picsum.photos/id/20/1600/900.webp">
    <source src="/videos/ma-video.mp4" type="video/mp4" />
  </video>
</div>
```

- `controls` — affiche les contrôles natifs du navigateur
- `playsinline` — évite le passage en plein écran automatique sur iOS
- `preload="metadata"` — charge uniquement la durée et le poster, pas la vidéo entière
- `poster` — image affichée avant lecture (recommandé)
- `object-contain` recommandé sur les slides vidéo pour éviter le recadrage

> **Vidéos self-hosted uniquement.** Ce composant gère les éléments `<video>` HTML5 natifs. Les iframes YouTube/Vimeo ne sont pas supportées.
