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
  SwiperCarousel.js    ← classe ES6, pont Alpine/Swiper
src/molecules/carousels/
  swiper-photos.html   ← galerie photos à défilement libre + lightbox
  swiper-auto.html     ← défilement automatique infini (pause au survol)
  swiper-logos.html    ← logos N&B -> couleur au hover
  _all-swiper.html     ← showcase de toutes les molécules
main.js                ← enregistrement via Alpine.data( swiper ,  )
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
| `swiper-auto.html` | Défilement automatique infini, pause au survol |
| `swiper-logos.html` | Logos auto-infini, N&B -> couleur au hover |
### Page de démonstration
`test-molecules-swiper.html`
