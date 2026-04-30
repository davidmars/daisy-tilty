Rédige TOUJOURS les messages de commit en français, sans aucune exception.

Pour les messages de commit, suis les instructions définies dans #file:git-commit-instructions.md

# Instructions GitHub Copilot

## Langue et accents
Respecte toujours les accents en français dans les exemples et dans les commentaires de code. N'écris pas de texte français sans accents.

## Composants Alpine.js existants à réutiliser

Avant d'implémenter une fonctionnalité en JavaScript, **vérifier si un composant existe déjà** dans `src/components/`. Ne jamais recréer un composant déjà disponible.

### Composants disponibles

| Composant Alpine (`x-data`) | Fichier                                | Usage                                                        |
|-----------------------------|----------------------------------------|--------------------------------------------------------------|
| `web3Forms`                 | `src/components/web3-form/Web3Form.js` | Formulaire de contact avec soumission AJAX                   |
| `embla`                     | `src/components/embla/embla.js`        | Carrousel / diaporama d'images                               |
| `share`                     | `src/components/share/Share.js`        | Bouton de partage natif (Web Share API + fallback clipboard) |
| *(store)* `lightbox`        | `src/components/light-box/LightBox.js` | Lightbox plein écran sur les images (classe `.lightbox`)     |

### Utilisation du composant `share`

Pour tout bouton de partage de page ou d'article, utiliser **obligatoirement** le composant `share` — ne jamais implémenter le partage manuellement. Voir `_docs/partage-natif.md`.

### Utilisation du composant `lightbox`

Pour toute image à afficher en plein écran au clic, utiliser **obligatoirement** la classe `lightbox` sur la balise `<a>` — ne jamais implémenter une lightbox custom. Voir `_docs/lightbox.md`.

### Utilisation du composant `embla`

Pour tout carrousel ou diaporama, utiliser **obligatoirement** le composant `embla` — ne jamais implémenter un carrousel custom. Voir `_docs/embla.md`.

---



**TOUJOURS en français.** Même si le code, les variables ou les commentaires sont en anglais, le message de commit est obligatoirement en français.

Format obligatoire :

```
type(scope): description courte en français

- détail en français
- autre détail en français
```

Types autorisés : `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `test`

Exemples corrects :
- `feat(stage): ajout du champ heure dans le formulaire d'acte`
- `fix(overlay): correction du scroll parasite à l'ouverture du layer`
- `refactor(utils): extraction de nowHHmm dans utils/date/`

## Icônes

### Famille principale : Lucide

**Lucide est la bibliothèque d'icônes quasi-exclusive du projet.** Avant de chercher une icône dans une autre famille (`mdi/`, `phosphor/`…), toujours vérifier qu'une icône Lucide couvre le besoin.

Le catalogue complet (~1 952 icônes) est disponible dans `node_modules/lucide-static/icons/`. Les noms de fichiers sont en kebab-case (ex. `trash-2.svg`, `chevron-down.svg`).

### Structure des fichiers

Les icônes sont des fichiers SVG organisés par famille dans `src/icons/` :

```
src/icons/
  lucide/          ← sous-ensemble curatif des icônes Lucide utilisées dans le projet
    chevron-down.svg
    heart.svg
    ...
  lucide-thin/     ← variante fine de Lucide
    squirrel.svg
  mdi/             ← Material Design Icons (usage exceptionnel)
    material-design.svg
  phosphor/        ← Phosphor Icons (usage exceptionnel)
    phosphor-logo-duotone.svg
```

`src/icons/lucide/` ne contient que les icônes **réellement utilisées** dans le projet. Le catalogue source complet est dans `node_modules/lucide-static/icons/`.

### Ajouter une icône Lucide

Lorsqu'une icône Lucide est nécessaire et absente de `src/icons/lucide/` :

1. **Vérifier l'existence** dans `node_modules/lucide-static/icons/{nom}.svg`.
2. **Copier le fichier** vers `src/icons/lucide/{nom}.svg` (en lisant le contenu et en créant le fichier).
3. **Référencer l'icône** via `<include>` dans le HTML.

Ne jamais référencer un fichier absent de `src/icons/lucide/`. Ne jamais inventer un nom : le vérifier d'abord dans `node_modules/lucide-static/icons/`.

### Utilisation dans le HTML

**Ne jamais écrire de SVG inline dans le HTML.** Toute icône doit passer exclusivement par le système d'inclusion décrit ci-dessous. Même pour une icône simple ou temporaire, l'écriture directe de balises `<svg>` dans le HTML est interdite.

Deux façons d'inclure une icône :

**1. Inclusion directe du SVG** (taille et couleur gérées par CSS uniquement) :
```html
<include file="@icons/lucide/heart.svg" />
```

**2. Via le composant `icon.html`** (recommandé — taille et couleur configurables via props) :
```html
<include file="@comp/icon.html" $icon="lucide/heart.svg" $size="24" $color="currentColor" />
```

Les props disponibles du composant `icon.html` :
- `$icon` — chemin relatif depuis `src/icons/` (ex. `lucide/heart.svg`)
- `$size` — taille en pixels (défaut : `24`)
- `$color` — couleur CSS (défaut : `currentColor`, hérite de la couleur du texte parent)

### Alias Vite

- `@icons` → `src/icons/` (accès direct aux SVG du projet)
- `@comp` → `src/components/` (accès au composant `icon.html`)

### Galerie des icônes

Le fichier `icons-gallery.html` est **généré automatiquement** par le plugin Vite `iconsGalleryPlugin` à chaque démarrage du serveur de développement (`npm run dev`) et à chaque build.

- La galerie est regénérée en temps réel si un fichier SVG est ajouté, modifié ou supprimé dans `src/icons/`.
- Chaque icône affiche son snippet `<include>` cliquable pour copier le code.
- Ne jamais modifier `icons-gallery.html` manuellement : ce fichier est écrasé à chaque build.

Pour ajouter une nouvelle famille d'icônes, créer un sous-dossier dans `src/icons/` et y placer les fichiers `.svg`. La galerie se met à jour automatiquement.

## DaisyUI en priorité

**Avant d'écrire du JavaScript ou d'utiliser des utilitaires Tailwind bruts, vérifier systématiquement si DaisyUI couvre déjà le besoin.**

### Ordre de priorité obligatoire

1. **DaisyUI** — composants (`.btn`, `.modal`, `.alert`, `.badge`, `.tabs`, `.collapse`, etc.) et utilitaires sémantiques.
2. **Classes typographiques du projet** — définis dans `#file:typography.css` (`.h1`, `.h2`, `.p`, `.lead`, `.caption`, etc.).
3. **Tailwind brut** — uniquement si ni DaisyUI ni les classes typographiques du projet ne couvrent le besoin.
4. **JavaScript personnalisé** — uniquement si le comportement ne peut pas être obtenu avec DaisyUI + Alpine.js seuls.

### Règles

- Ne pas recréer en JavaScript un comportement déjà géré par un composant DaisyUI (ex. : ouverture d'un modal via `.modal`, état actif d'un onglet via `.tabs`, etc.).
- Ne pas écrire de CSS ou de classes Tailwind brutes pour styliser un élément qu'un composant DaisyUI pourrait couvrir.
- En cas de doute, consulter la documentation DaisyUI avant d'écrire du code personnalisé.

Exemples corrects :
```html
<!-- ✅ Correct : composant DaisyUI -->
<div role="alert" class="alert alert-success">…</div>
<button class="btn btn-primary">Envoyer</button>

<!-- ❌ Interdit si DaisyUI couvre le besoin -->
<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">…</div>
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Envoyer</button>
```

## HTML et typographie
Quand tu écris du code HTML, priorise l'utilisation des classes typographiques définies dans `#file:typography.css` (`.h1`, `.h2`, `.p`, `.lead`, `.caption`, etc.).
Utilise des utilitaires Tailwind bruts uniquement si aucune classe typographique dédiée n'existe pour le besoin.

### Citations et blockquotes

Pour toute citation mise en valeur dans un article ou une page, utilise **obligatoirement** la classe `.quote` (et non `.blockquote`).

- `.quote` → police Britney, `text-3xl md:text-5xl` — à utiliser pour les citations éditoriales visuellement marquantes.
- `.blockquote` → taille `text-xl md:text-3xl`, sans changement de police — réservé aux usages plus sobres si nécessaire.

Exemple correct :
```html
<!-- ✅ Citation éditoriale -->
<figure class="border-l-4 border-primary pl-6">
  <blockquote class="quote text-primary">
    « Le repos est la mère de la créativité. »
  </blockquote>
  <figcaption class="caption mt-2">— Auteur inconnu</figcaption>
</figure>

<!-- ❌ Interdit pour une citation mise en avant -->
<blockquote class="blockquote text-primary">…</blockquote>
```

## HTML et images
Quand tu génères du code HTML contenant des images d'exemple, de démonstration ou temporaires, utilise `https://picsum.photos/` pour les URLs d'images placeholder.
Les URLs d'images `picsum.photos` doivent toujours se terminer par l'extension `.webp`.

## Alpine.js

### Rôle central d'Alpine.js
Alpine.js est le système de liaison entre le HTML et les modules JavaScript du projet. Tout ajout de fonctionnalité impliquant du JavaScript **doit passer par Alpine.js**. Il ne faut jamais manipuler le DOM directement depuis un script global sans passer par Alpine.

### Composants Alpine.js : classes ES6
Les composants Alpine.js sont **toujours** montés via des classes ES6 placées dans des fichiers distincts sous `src/components/`. L'enregistrement se fait dans `main.js` via `Alpine.data()` ou `Alpine.store()` à l'intérieur de l'événement `alpine:init`.

Exemple correct :
```js
// src/components/mon-composant/MonComposant.js
export class MonComposant {
    init() { /* ... */ }
}

// main.js
Alpine.data('monComposant', () => new MonComposant());
```

### x-show, x-if et x-cloak

**`x-show` par défaut.** Réserver `x-if` aux cas où l'élément ne doit vraiment pas exister dans le DOM (composant lourd rarement affiché, contenu sensible non inspectable).

**`x-cloak` uniquement là où c'est utile**, c'est-à-dire sur les éléments qui seraient *visibles à tort* avant l'initialisation d'Alpine — typiquement un élément avec `x-show="condition"` où la condition est `false` au démarrage.

La règle CSS `[x-cloak] { display: none !important; }` est déclarée dans `src/styles/main.scss`.

```html
<!-- ✅ x-cloak utile : l'alerte serait visible avant qu'Alpine la cache -->
<div role="alert" class="alert alert-error" x-show="keyMissing" x-cloak>…</div>

<!-- ✅ x-cloak utile : le spinner flasherait avant init -->
<span class="loading" x-show="loading" x-cloak></span>

<!-- ❌ x-cloak inutile : rien n'est caché au chargement initial -->
<div x-data="monComposant" x-cloak>
    <button x-on:click="toggle">Ouvrir</button>
</div>
```

### Syntaxe Alpine.js : x-on et x-bind obligatoires
**Ne jamais utiliser** les raccourcis `@event` et `:attribute`. Ces syntaxes ne fonctionnent **pas au moment du build** dans ce projet.

**Toujours utiliser** les formes longues :
- `x-on:submit` et non `@submit`
- `x-bind:value` et non `:value`
- `x-bind:class` et non `:class`
- `x-bind:href` et non `:href`
- etc.

Exemples corrects :
```html
<!-- ✅ Correct -->
<form x-on:submit="handleSubmit">
<input x-bind:value="accessKey">

<!-- ❌ Interdit -->
<form @submit="handleSubmit">
<input :value="accessKey">
```

### Alerte non-conformité Alpine.js
Si l'agent constate du code utilisant `@event` ou `:attribute` dans les fichiers HTML, il **doit le signaler à l'utilisateur** et proposer la correction avec `x-on:` et `x-bind:`.

## Codes d'erreur

Quand du code JavaScript doit signaler une erreur à l'interface (alerte, message, état d'erreur visible), **ne jamais écrire le message en clair**. Utiliser un code d'erreur opaque référencé dans `_docs/codes-erreur.md`.

### Format obligatoire

```
ERR-x[MODULE][NUMÉRO]
```

Exemple : `ERR-xWF01`

### Règles

- Déclarer le code dans une constante JSDoc `@enum {string}` dans le fichier source concerné.
- Référencer le code dans `_docs/codes-erreur.md` avec : cause, symptôme, résolution.
- Ne jamais exposer de message technique lisible dans l'interface utilisateur.

### Diagnostic d'un code d'erreur

Quand l'utilisateur mentionne un code du format `ERR-x...`, l'agent doit **obligatoirement** :

1. Consulter `_docs/codes-erreur.md` pour retrouver la fiche correspondante.
2. Expliquer la **cause** du problème.
3. Décrire le **symptôme** visible.
4. Détailler les **étapes de résolution**.

Ne jamais répondre "je ne connais pas ce code" sans avoir lu `_docs/codes-erreur.md` au préalable.

Exemple correct :
```js
/** @enum {string} */
const MON_MODULE_ERRORS = {
    MA_NOUVELLE_ERREUR: 'ERR-xXX01',
};
```

```html
<!-- ✅ Correct : code opaque -->
<span x-text="errorCode"></span>

<!-- ❌ Interdit : message technique lisible -->
<span>La clé API est absente, ajoutez VITE_MA_CLE dans .env</span>
```

## Documentation et typage JSDoc

Tout le code JavaScript produit doit être **documenté avec JSDoc**. Les types doivent être précisés autant que possible via les annotations JSDoc.

Règles obligatoires :
- Chaque classe doit avoir un commentaire `/** ... */` décrivant son rôle.
- Chaque méthode publique doit documenter ses paramètres (`@param`) et sa valeur de retour (`@returns`) si applicable.
- Les propriétés d'instance doivent être typées avec `@type` ou déclarées dans le constructeur avec un commentaire JSDoc.
- Utiliser les types natifs (`string`, `number`, `boolean`, `HTMLElement`, etc.) ou des types personnalisés via `@typedef` si nécessaire.

Exemple correct :
```js
/**
 * Gère la soumission du formulaire de contact.
 */
export class MonComposant {
    constructor() {
        /** @type {string} */
        this.valeur = '';
    }

    /**
     * Initialise le composant (appelé automatiquement par Alpine.js).
     * @returns {void}
     */
    init() { /* ... */ }

    /**
     * Traite l'événement de soumission.
     * @param {Event} event
     * @returns {void}
     */
    handleSubmit(event) { /* ... */ }
}
```

## Documentation dans `_docs/`

Tout fichier de documentation créé dans `_docs/` doit respecter **deux niveaux de lecture distincts**, dans cet ordre :

### 1. 🟢 Mise en service rapide — pour l'utilisateur du repo

Cette section s'adresse à toute personne qui reprend le projet sans en connaître les détails techniques. Elle doit :

- Expliquer **quoi faire** pour que la fonctionnalité marche, pas comment elle est faite.
- Lister uniquement les **étapes concrètes** (créer un fichier, renseigner une valeur, relancer un serveur…).
- Ne **pas mentionner** Alpine.js, les composants, le build, les imports ou toute autre notion d'implémentation.
- Se terminer par une **checklist** des actions à effectuer.

### 2. 🔧 Détail technique — pour le développeur

Cette section vient **après** la mise en service rapide. Elle s'adresse aux développeurs qui veulent comprendre ou faire évoluer le code. Elle peut contenir :

- L'architecture des fichiers impliqués.
- Les explications sur les composants, classes, variables d'environnement.
- Les exemples de code.
- Les décisions techniques et leurs justifications.

### Exemple de structure

```markdown
## 🟢 Mise en service rapide

...étapes, checklist...

---

## 🔧 Détail technique

...architecture, composants, exemples de code...
```
