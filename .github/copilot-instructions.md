Rédige TOUJOURS les messages de commit en français, sans aucune exception.

Pour les messages de commit, suis les instructions définies dans #file:git-commit-instructions.md

# Instructions GitHub Copilot

## Langue et accents
Respecte toujours les accents en français dans les exemples et dans les commentaires de code. N'écris pas de texte français sans accents.

## Messages de commit

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
Quand tu fais référence à des fichiers dans `@icons/*/*`, vérifie que le fichier SVG existe réellement. Ne pas inventer de noms de fichiers SVG.

## HTML et typographie
Quand tu écris du code HTML, priorise l'utilisation des classes typographiques définies dans `#file:typography.css` (`.h1`, `.h2`, `.p`, `.lead`, `.caption`, etc.).
Utilise des utilitaires Tailwind bruts uniquement si aucune classe typographique dédiée n'existe pour le besoin.

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

