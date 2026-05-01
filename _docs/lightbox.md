# Lightbox (GLightbox)

Permet d'afficher n'importe quelle image (ou vidéo) en plein écran avec navigation, zoom et swipe tactile. La lightbox est initialisée **une seule fois au démarrage** et s'applique automatiquement à tous les éléments du sélecteur présents dans la page.

---

## 🟢 Mise en service rapide

Ajoutez la classe `lightbox` (ou `glightbox`) sur une balise `<a>` qui pointe vers l'image en pleine résolution.

```html
<a href="https://picsum.photos/1600/900.webp" class="lightbox">
  <img src="https://picsum.photos/400/300.webp" alt="Description de l'image" />
</a>
```

Pour regrouper plusieurs images dans une galerie navigable, ajoutez le même attribut `data-gallery` sur chaque lien :

```html
<a href="https://picsum.photos/seed/a/1600/900.webp" class="lightbox" data-gallery="mon-album">
  <img src="https://picsum.photos/seed/a/400/300.webp" alt="Image 1" />
</a>
<a href="https://picsum.photos/seed/b/1600/900.webp" class="lightbox" data-gallery="mon-album">
  <img src="https://picsum.photos/seed/b/400/300.webp" alt="Image 2" />
</a>
```

### ✅ Checklist

- [ ] La balise `<a>` porte la classe `lightbox` ou `glightbox`
- [ ] L'attribut `href` pointe vers l'image en pleine résolution
- [ ] L'attribut `alt` est renseigné sur le `<img>` imbriqué
- [ ] Pour une galerie, `data-gallery="nom-unique"` est identique sur tous les liens du groupe

---

## 🔧 Détail technique

### Fichiers impliqués

```
src/components/light-box/
  LightBox.js        ← classe ES6, encapsule GLightbox
  light-box.scss     ← surcharge de style des boutons (couleur primaire du thème)
main.js              ← instanciation globale via Alpine.store('lightbox', …)
```

### Fonctionnement

La lightbox est instanciée **une seule fois** dans `main.js` et enregistrée dans le store Alpine (`Alpine.store('lightbox')`). Elle utilise la **délégation d'événements** via `cash-dom` : les clics sont interceptés sur le document, ce qui permet de supporter automatiquement les éléments ajoutés dynamiquement.

> **Note :** contrairement aux versions précédentes, il n'est plus nécessaire de réinitialiser la lightbox après une injection de contenu dynamique.

### Options actives

| Option | Valeur | Description |
|---|---|---|
| `selector` | `.lightbox, .glightbox` | Sélecteur CSS des éléments déclencheurs |
| `touchNavigation` | `true` | Swipe tactile activé |
| `loop` | `true` | Navigation en boucle dans la galerie |

### Personnalisation du style

Les surcharges CSS sont dans `src/components/light-box/light-box.scss` :

```scss
.glightbox-container {
  .gbtn {
    border-radius: 0 !important;
    background-color: rgba(var(--p), 0.2) !important; // couleur primaire DaisyUI
  }
}
```

### Accès programmatique depuis Alpine.js

```js
// Fermer la lightbox depuis un composant Alpine
this.$store.lightbox.instance.close();
```

### Dépendance

La lightbox repose sur la bibliothèque [GLightbox](https://biati-digital.github.io/glightbox/). Son CSS est importé directement dans `LightBox.js` via :

```js
import 'glightbox/dist/css/glightbox.min.css';
```
