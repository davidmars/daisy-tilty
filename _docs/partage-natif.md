# Partage natif (Web Share API)

Permet d'ajouter un bouton « Partager » sur n'importe quelle page. Sur mobile et les navigateurs compatibles, le menu de partage natif du système s'ouvre. Sur les autres navigateurs, l'URL de la page est copiée automatiquement dans le presse-papiers, avec un toast de confirmation.

---

## 🟢 Mise en service rapide

1. Sur la page où vous souhaitez un bouton de partage, ajoutez l'attribut `x-data="share"` sur le conteneur du bouton.
2. Sur le bouton lui-même, ajoutez `x-on:click="shareArticle"`.
3. Ajoutez un toast de confirmation (optionnel mais recommandé) avec `x-show="copied"`.

**Exemple minimal :**

```html
<div x-data="share">
  <button class="btn btn-ghost btn-sm" x-on:click="shareArticle">
    Partager
  </button>
  <div role="alert" class="alert alert-success" x-show="copied" x-cloak>
    Lien copié !
  </div>
</div>
```

### ✅ Checklist

- [ ] `x-data="share"` présent sur le conteneur
- [ ] `x-on:click="shareArticle"` sur le bouton
- [ ] Toast `x-show="copied"` ajouté si retour visuel souhaité
- [ ] La page est servie en **HTTPS** (requis par `navigator.clipboard` et `navigator.share`)
- [ ] Tester sur **Firefox desktop** : vérifier que le toast « Lien copié ! » s'affiche bien (fallback clipboard)

---

## 🔧 Détail technique

### Fichiers impliqués

```
src/components/share/
  Share.js        ← classe ES6 du composant Alpine.js
main.js           ← enregistrement via Alpine.data('share', ...)
```

### Comportement

| Contexte                                     | Comportement                                                          |
|----------------------------------------------|-----------------------------------------------------------------------|
| Mobile / navigateur compatible Web Share API | Menu de partage natif du système (`navigator.share`)                  |
| Desktop ou navigateur sans Web Share API     | Copie de l'URL dans le presse-papiers (`navigator.clipboard`) + toast |
| Annulation par l'utilisateur (`AbortError`)  | Rien — pas de fallback, pas d'erreur                                  |
| Clipboard indisponible (HTTP non sécurisé)   | Echec silencieux — aucun affichage d'erreur                           |

### Propriétés du composant

| Propriété  | Type      | Description                                       |
|------------|-----------|---------------------------------------------------|
| `title`    | `string`  | Titre de l'article — lu depuis `document.title`   |
| `url`      | `string`  | URL de la page courante — `window.location.href`  |
| `canShare` | `boolean` | `true` si `navigator.share` est disponible        |
| `copied`   | `boolean` | `true` pendant 2 secondes après une copie réussie |

### Méthodes publiques

| Méthode          | Description                                                   |
|------------------|---------------------------------------------------------------|
| `shareArticle()` | Point d'entrée — appelle `navigator.share` ou `_copyFallback` |

### Enregistrement Alpine.js

```js
// main.js
import { Share } from "@comp/share/Share.js";

document.addEventListener('alpine:init', () => {
    Alpine.data('share', () => new Share());
});
```

### Utilisation complète dans le HTML

```html
<div class="flex items-center gap-2" x-data="share">
  <button class="btn btn-ghost btn-sm gap-1" x-on:click="shareArticle">
    <include file="@comp/icon.html" $icon="lucide/share.svg" $size="16" $color="currentColor" />
    Partager
  </button>
  <div role="alert" class="alert alert-success py-1 px-3 text-sm" x-show="copied" x-cloak>
    <include file="@comp/icon.html" $icon="lucide/circle-check-big.svg" $size="16" $color="currentColor" />
    Lien copié !
  </div>
</div>
```

### Compatibilité Web Share API

- ✅ Safari iOS / macOS
- ✅ Chrome Android / Chrome desktop (depuis v89)
- ⚠️ Firefox desktop — fallback clipboard automatique
- ⚠️ Requiert HTTPS — en local, fonctionne sur `localhost`


