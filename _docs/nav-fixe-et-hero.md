# Navigation fixe et hero

## 🟢 Mise en service rapide

### Cas 1 — Page avec une navbar fixe, sans hero en haut

Rien à faire de spécial. Le système ajoute automatiquement un `padding-top` au `<body>` dès qu'une navbar fixe est détectée sur la page. Le contenu ne sera jamais masqué derrière la barre de navigation.

### Cas 2 — Page avec une navbar fixe ET un hero plein écran en haut de page

Il faut indiquer au système que la page commence par un hero, afin de désactiver le `padding-top` automatique (sinon un espace blanc apparaîtrait entre la navbar et le hero).

**Ajouter la classe `is-top-hero` sur la section hero :**

```html
<section class="relative flex h-svh items-center justify-center is-top-hero">
  <!-- contenu du hero -->
</section>
```

La navbar passera automatiquement en mode transparent/dégradé par-dessus le hero.

### Checklist

- [ ] La navbar utilisée possède bien la classe `is-fixed-nav` (déjà présente sur toutes les navbars du projet)
- [ ] Si la page a un hero plein écran tout en haut : ajouter `is-top-hero` sur la balise `<section>` du hero
- [ ] Si la page n'a pas de hero : ne rien faire, le `padding-top` est appliqué automatiquement

---

## 🔧 Détail technique

### Architecture

| Fichier | Rôle |
|---|---|
| `src/layout/is-fixed-nav-top-hero.scss` | Règles CSS `:has()` qui gèrent le `padding-top` du `<body>` |
| `src/components/nav-scrolled/NavScrolled.js` | Composant Alpine.js qui détecte `.is-top-hero` et expose `hasTopHero` |

### Fonctionnement CSS — `is-fixed-nav-top-hero.scss`

```scss
:root {
  --nav-height: 4rem; /* hauteur de référence de la navbar */
}

body {
  /* Dès qu'une navbar fixe est dans la page → padding-top automatique */
  &:has(.is-fixed-nav) {
    padding-top: var(--nav-height);

    /* Si un hero plein écran est aussi présent → on annule le padding */
    &:has(.is-top-hero) {
      padding-top: 0;
    }
  }
}
```

La logique repose sur le sélecteur CSS `:has()` — aucun JavaScript n'est nécessaire pour la gestion du `padding-top`.

Pour ajuster la hauteur de la navbar, modifier la variable `--nav-height` dans ce fichier.

### Fonctionnement JS — `NavScrolled.js`

Le composant Alpine.js `navScrolled` expose une propriété `hasTopHero` :

```js
this.hasTopHero = !!document.querySelector('.is-top-hero');
```

Cette prop est détectée une seule fois au `init()` et reste statique. Elle est utilisée dans le HTML des navbars pour conditionner leur apparence :

```html
<!-- Transparent + dégradé par-dessus un hero -->
x-bind:class="{
  'bg-base-100 text-base-content': !hasTopHero || scrolled || drawerOpen,
  'bg-gradient-to-b from-black/50 to-transparent text-white': hasTopHero && !scrolled && !drawerOpen
}"
```

### Classes sémantiques

| Classe | À placer sur | Effet |
|---|---|---|
| `is-fixed-nav` | Le wrapper de la navbar | Déclenche le `padding-top` du `<body>` via `:has()` |
| `is-top-hero` | La section hero en première position | Annule le `padding-top` + active le mode transparent de la nav |

### Navbars supportant `hasTopHero`

| Molécule | Comportement sans hero | Comportement avec hero |
|---|---|---|
| `nav-dead-leaves.html` | `bg-base-100` opaque | Transparent + dégradé + verre dépoli |
| `nav-fell-in-love.html` | `bg-base-100` + verre dépoli | Dégradé `from-black/50` + verre dépoli |
| `nav-seven-nation-army.html` | Dégradé permanent (toujours transparent) | Idem |

