# Formulaires de contact

Cette documentation décrit l'intégration des formulaires de contact dans le projet.

---

## 🟢 Mise en service rapide

*Cette section s'adresse à toute personne qui reprend le projet et veut simplement faire fonctionner le formulaire.*

### Étapes

1. **Créer un compte Web3Forms** sur [https://web3forms.com](https://web3forms.com) et récupérer une clé d'accès.

2. **Renseigner la clé** dans les fichiers d'environnement locaux (créés automatiquement au `npm install`) :

   `.env.development.local` — pour le développement local :
   ```dotenv
   VITE_WEB3FORMS_ACCESS_KEY=votre-clé-web3forms
   ```

   `.env.production.local` — pour la mise en production :
   ```dotenv
   VITE_WEB3FORMS_ACCESS_KEY=votre-clé-web3forms
   ```

3. **Redémarrer le serveur** :
   ```powershell
   npm run dev
   ```

4. **Tester** en soumettant le formulaire et en vérifiant la réception de l'e-mail.

> [!NOTE]
> Si une alerte rouge apparaît sur le formulaire avec un code d'erreur, consulter `_docs/codes-erreur.md`.

### Checklist

- [ ] Créer un compte et une clé d'accès sur https://web3forms.com
- [ ] Lancer `npm install` — les fichiers `.env.*.local` sont créés automatiquement
- [ ] Renseigner `VITE_WEB3FORMS_ACCESS_KEY` dans `.env.development.local`
- [ ] Renseigner `VITE_WEB3FORMS_ACCESS_KEY` dans `.env.production.local`
- [ ] Tester une soumission et vérifier la réception de l'e-mail
- [ ] Personnaliser l'adresse de destination dans l'interface Web3Forms

---

## 🔧 Détail technique

*Cette section s'adresse aux développeurs qui souhaitent comprendre l'implémentation ou faire évoluer le formulaire.*

### Service de soumission : Web3Forms

Les formulaires sont soumis directement depuis le navigateur vers l'API **Web3Forms** :

```
POST https://api.web3forms.com/submit
```

Web3Forms est un service sans backend qui reçoit les soumissions et les transmet par e-mail. Il nécessite une **clé d'accès publique** (`access_key`) dans chaque requête.

> [!NOTE]
> La clé Web3Forms est publique par nature : elle reste visible dans le navigateur et les requêtes réseau. Le passage par variable d'environnement vise la **maintenabilité** (pas de clé en dur dans le HTML), pas la confidentialité.

### Fichiers impliqués

| Fichier | Rôle |
|---|---|
| `test-form-contact.html` | Page de test du formulaire |
| `src/components/web3-form/Web3Form.js` | Composant Alpine.js : injection de clé, validation, soumission |
| `main.js` | Enregistrement du composant via `Alpine.data('web3Forms', ...)` |
| `scripts/setup-env.js` | Script `postinstall` qui génère les fichiers `.env.*.local` |
| `.env.development` | Modèle versionné pour le mode `dev` |
| `.env.production` | Modèle versionné pour le mode `build` |
| `.env.development.local` | Clé réelle en développement — **non versionné** |
| `.env.production.local` | Clé réelle en production — **non versionné** |

### Composant Alpine.js : `Web3Form`

#### Architecture

```
src/components/web3-form/
└── Web3Form.js   ← classe ES6 montée via Alpine.data()
```

#### Enregistrement dans `main.js`

```js
import { Web3Form } from '@comp/web3-form/Web3Form.js';

document.addEventListener('alpine:init', () => {
    Alpine.data('web3Forms', () => new Web3Form());
});
```

#### Utilisation dans le HTML

```html
<form x-data="web3Forms"
      action="https://api.web3forms.com/submit"
      method="POST"
      novalidate
      x-on:submit="handleSubmit">

    <input type="hidden" name="access_key" x-bind:value="accessKey">

    <!-- champs du formulaire... -->
</form>
```

#### Comportement

- Au montage (`init()`) : si la clé est absente, `keyMissing` passe à `true` et une alerte `ERR-xWF01` s'affiche dans le formulaire.
- À la soumission (`handleSubmit`) : la validation des champs est déclenchée. Si des erreurs sont présentes ou si la clé manque, l'envoi est bloqué.
- Si tout est valide : le formulaire est soumis normalement vers Web3Forms.

#### Validation des champs

Le composant valide les champs via la méthode `validate(form)` au moment de la soumission :

| Champ | Règle |
|---|---|
| Prénom, Nom, Sujet, Message | Obligatoire (non vide) |
| E-mail | Obligatoire + format valide |
| Consentement | Case cochée obligatoire |
| Téléphone | Optionnel, aucune validation |

Les erreurs sont stockées dans `this.errors` et affichées sous chaque champ via `x-show` + `x-bind:class` DaisyUI (`input-error`, `select-error`, etc.).

### Variables d'environnement

La clé est lue depuis `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY`.

| Fichier | Versionné | Priorité Vite |
|---|---|---|
| `.env` | ✅ | la plus basse |
| `.env.development` / `.env.production` | ✅ | moyenne |
| `.env.development.local` / `.env.production.local` | ❌ | **la plus haute** |

Le fichier `.local` écrase toujours le fichier versionné correspondant.

### Génération automatique des fichiers locaux

Le script `scripts/setup-env.js` est exécuté automatiquement après chaque `npm install` (`postinstall`).

Il copie `.env.development` → `.env.development.local` et `.env.production` → `.env.production.local` **uniquement si ces fichiers n'existent pas encore**. Les fichiers existants ne sont jamais écrasés.

Cela garantit que tout nouveau contributeur dispose d'un fichier prêt à renseigner dès le premier `npm install`.
