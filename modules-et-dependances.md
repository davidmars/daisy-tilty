# Modules et dépendances

Ce document est destiné aux webdesigners qui clonent ce repo pour le personnaliser rapidement, sans devoir auditer tout le code avant de démarrer.

## 1) Stack de base (vue rapide)

Le projet repose sur une stack volontairement simple :

- `npm` pour installer les dépendances et lancer les scripts.
- `Vite` pour le serveur de dev, le build et le mode multi-pages HTML.
- `HTML/CSS/JS` vanille (pas de framework front lourd type React/Vue).
- `SCSS` pour structurer les styles custom.

Scripts principaux (`package.json`) :

- `npm run dev` : lance le serveur de développement.
- `npm run build` : génère le build de production.
- `npm run watch:build` : build en mode watch.

Docs :

- Vite : https://vite.dev/guide/
- npm scripts : https://docs.npmjs.com/cli/v10/using-npm/scripts
- Sass : https://sass-lang.com/documentation/

## 2) `vite-plugin-html-include` (composition HTML)

Ce plugin est la base du système de composants/layouts HTML du projet.

Concrètement, il permet d'utiliser des includes comme :

```html
<include file="@layout/common.html" $title="Ma page">
  <p>Contenu...</p>
</include>
```

Ce que ça apporte :

- mutualisation du layout (`head`, navigation, footer, scripts) ;
- composants HTML réutilisables (`src/components/*`) ;
- variables simples (`$title`, `$icon`, `$size`, etc.) ;
- maintenance plus rapide quand on duplique des pages.

Où c'est branché :

- `vite.config.js` (plugin `htmlInclude()`),
- `src/layout/common.html`, `src/layout/raw-layout.html`,
- pages racine (`index.html`, `article.html`, `product.html`, `test-*.html`).

Doc officielle :

- https://github.com/Tilty-io/vite-plugin-html-include

## 3) Alpine.js (orchestrateur des librairies)

En pratique, si tu personnalises surtout les pages, le HTML et les styles, tu n'as normalement pas besoin de te soucier d'Alpine.js.

Dans ce repo, Alpine.js sert surtout de couche d'orchestration légère pour connecter les modules fonctionnels au DOM en arrière-plan.

Rôle d'Alpine ici :

- déclarer une API composant dans le HTML via `x-data` ;
- instancier la logique JS au bon moment (`alpine:init`) ;
- exposer des états partagés via `Alpine.store(...)`.

Exemple concret dans `main.js` :

- `Alpine.data('embla', (args) => new Embla(args));` pour brancher le carrousel ;
- création d'une instance globale `LightBox` stockée dans `Alpine.store('lightbox', ...)`.

Pourquoi c'est utile pour la customisation :

- tu gardes du HTML lisible ;
- tu ajoutes de l'interactivité sans basculer vers un framework SPA ;
- les modules (Embla, GLightbox, futurs modules) restent découplés.

À retenir :

- si tu fais surtout de l'intégration, du theming ou de la mise en page, tu peux généralement laisser cette couche tranquille ;
- tu y touches surtout quand tu ajoutes ou modifies un module interactif.

Doc officielle :

- https://alpinejs.dev/start-here

## 4) DaisyUI + Tailwind (base CSS prête à l'emploi)

Le repo combine Tailwind CSS (utilitaires) et daisyUI (composants UI pré-stylés).

Répartition des rôles :

- Tailwind : spacing, layout, responsive, états, utilitaires globaux.
- daisyUI : composants UI prêts à l'emploi (`btn`, `navbar`, `drawer`, `card`, etc.).

Où c'est configuré :

- `src/styles/tailwind.css` : `@import "tailwindcss";` + `@plugin "daisyui";`
- `src/layout/raw-layout.html` : chargement de `tailwind.css`
- `src/layout/nav.html` : exemple clair de classes daisyUI

Pourquoi ce choix :

- aller vite sur les maquettes/pages,
- éviter de réinventer les composants CSS de base,
- garder la possibilité de surcharger avec `src/styles/main.scss`.

Docs officielles :

- Tailwind CSS : https://tailwindcss.com/docs
- Plugin Vite Tailwind : https://tailwindcss.com/docs/installation/using-vite
- daisyUI : https://daisyui.com/docs/install/

## 5) Modules fonctionnels (partie clé)

Cette section couvre les briques orientées usage métier/UI.

### 5.1 Swiper Carousel (`swiper`)

But : gérer des diaporamas/carrousels robustes (slides, navigation, autoplay, free mode).

Ce que le module fait dans ce repo :

- instancie Swiper via la classe `SwiperCarousel` (`src/components/carousel/swiper/SwiperCarousel.js`) ;
- charge d'office les modules `FreeMode`, `Autoplay`, `Navigation`, `Pagination` ;
- transfère directement toutes les options natives Swiper à l'instance.

Activation côté HTML :

- via Alpine : `<div x-data="swiper({ loop: true })" class="swiper">`
- composants d'exemple dans `src/molecules/carousels/swiper-*.html`.
- démo complète dans `test-molecules-swiper.html`.

Fichiers clés :

- `src/components/carousel/swiper/SwiperCarousel.js`
- `src/molecules/carousels/_all-swiper.html`
- `test-molecules-swiper.html`

Docs officielles :

- Swiper : https://swiperjs.com/
- API des options Swiper : https://swiperjs.com/swiper-api

### 5.2 GLightbox (`glightbox`)

But : ouvrir images et vidéos dans une lightbox élégante (galeries, navigation, médias mixtes).

Ce que le module fait dans ce repo :

- encapsule GLightbox dans une classe `LightBox` (`src/components/light-box/LightBox.js`) ;
- initialise la lightbox pour `.lightbox, .glightbox` ;
- supporte images, vidéos locales et providers externes (YouTube/Vimeo via GLightbox) ;
- prévoit une méthode `destroy()` pour nettoyage.

Activation côté HTML :

- un lien `<a class="lightbox" href="...">` suffit ;
- exemples variés dans `test-photo-grid.html`.

Fichiers clés :

- `src/components/light-box/LightBox.js`
- `src/components/light-box/light-box.scss`
- `test-photo-grid.html`

Doc officielle :

- https://biati-digital.github.io/glightbox/

### 5.3 Modules à venir (pattern d'intégration)

Le repo est déjà prêt pour accueillir d'autres modules UI/fonctionnels.

Pattern recommandé :

1. créer un dossier `src/components/<nom-module>/` ;
2. encapsuler la librairie dans une classe JS claire (`init`, `destroy`, options) ;
3. ajouter le style SCSS local au module ;
4. exposer l'initialisation via Alpine dans `main.js` si nécessaire ;
5. créer une page de démo `test-<module>.html` pour documenter l'usage.

Résultat :

- modules isolés,
- onboarding plus simple,
- dette technique limitée quand le projet grossit.

## 6) Dépendances utilisées (avec docs)

Source des versions : `package.json`.

### Dépendances principales

| Package | Version déclarée | Rôle dans le projet | Doc officielle |
|---|---:|---|---|
| `vite` | `^6.0.0` (devDependency) | Serveur dev + build | https://vite.dev/guide/ |
| `vite-plugin-html-include` | `^1.4.1` | Includes HTML et composants | https://github.com/Tilty-io/vite-plugin-html-include |
| `tailwindcss` | `^4.2.2` | Utilitaires CSS | https://tailwindcss.com/docs |
| `@tailwindcss/vite` | `^4.2.2` | Intégration Tailwind dans Vite | https://tailwindcss.com/docs/installation/using-vite |
| `daisyui` | `^5.5.19` | Composants UI Tailwind | https://daisyui.com/docs/install/ |
| `alpinejs` | `^3.15.11` | Orchestration front légère | https://alpinejs.dev/start-here |
| `swiper` | `^11.0.0` | Moteur de carrousel (slides, navigation, autoplay) | https://swiperjs.com/ |
| `glightbox` | `^3.3.1` | Lightbox images/vidéos | https://biati-digital.github.io/glightbox/ |

### Dépendances techniques de build

| Package | Version déclarée | Rôle dans le projet | Doc officielle |
|---|---:|---|---|
| `glob` | `^11.0.3` | Scan de fichiers SCSS (`viteAutoImportScss.ts`) | https://www.npmjs.com/package/glob |
| `fast-glob` | `^3.3.2` (devDependency) | Scan des SVG (`iconsGalleryPlugin.ts`) | https://github.com/mrmlnc/fast-glob |
| `sass` | `^1.75.0` (devDependency) | Compilation SCSS | https://sass-lang.com/documentation/ |
| `@types/node` | `^24.0.2` (devDependency) | Types Node.js pour scripts TS | https://www.npmjs.com/package/@types/node |
| `@types/alpinejs` | `^3.13.11` (devDependency) | Types Alpine.js | https://www.npmjs.com/package/@types/alpinejs |

## 7) Où customiser en priorité

- **Identité visuelle** : `src/styles/main.scss`, `src/styles/typography.scss`.
- **Composants UI globaux** : `src/layout/nav.html`, `src/layout/footer.html`.
- **Diaporamas** : `src/molecules/carousels/*-swiper.html` + markup direct (classes `.swiper`).
- **Galeries lightbox** : `src/components/light-box/*` + classes `.lightbox` dans les pages.
- **Icônes** : `src/icons/*/*` + aperçu dans `icons-gallery.html`.




