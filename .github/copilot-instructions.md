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

