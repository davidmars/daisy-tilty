# Référentiel des codes d'erreur

Ce document liste tous les codes d'erreur affichés dans l'interface du projet.
Ces codes sont intentionnellement opaques pour l'utilisateur final. Seul l'auteur du projet peut les interpréter via ce référentiel.

> [!IMPORTANT]
> **Périmètre de ce référentiel : erreurs de configuration uniquement.**
> Les codes `ERR-x...` ne concernent que des problèmes d'environnement, de configuration ou d'infrastructure (clé manquante, service indisponible, etc.).
> Les erreurs de saisie utilisateur — comme *"cet e-mail n'est pas valide"* ou *"ce champ est obligatoire"* — sont des **messages de validation** gérés directement dans l'interface, en clair, à côté du champ concerné. Elles n'ont pas de code `ERR-x` et ne figurent pas dans ce document.

## Sommaire des codes

| Code                                              | Module    | Description                                     |
|---------------------------------------------------|-----------|-------------------------------------------------|
| [`ERR-xWF01`](#err-xwf01--clé-daccès-absente)     | Web3Forms | Clé d'accès `VITE_WEB3FORMS_ACCESS_KEY` absente |
| [`ERR-xWF02`](#err-xwf02--échec-de-la-soumission) | Web3Forms | Échec de la requête `fetch` vers l'API          |

---

## Format des codes

```
ERR-x[MODULE][NUMÉRO]
```

| Partie     | Signification                                 |
|------------|-----------------------------------------------|
| `ERR`      | Préfixe commun à toutes les erreurs           |
| `x`        | Marqueur visuel de code technique             |
| `[MODULE]` | Identifiant à deux lettres du module concerné |
| `[NUMÉRO]` | Numéro séquentiel à deux chiffres             |

### Modules définis

| Préfixe | Module                             |
|---------|------------------------------------|
| `WF`    | Web3Forms — formulaires de contact |

---

## Codes Web3Forms (`WF`)

### `ERR-xWF01` — Clé d'accès absente

| Propriété          | Valeur                                 |
|--------------------|----------------------------------------|
| **Code**           | `ERR-xWF01`                            |
| **Module**         | Web3Forms                              |
| **Fichier source** | `src/components/web3-form/Web3Form.js` |
| **Constante**      | `WEB3FORM_ERRORS.MISSING_KEY`          |

**Cause** : La variable d'environnement `VITE_WEB3FORMS_ACCESS_KEY` est vide ou absente au moment du chargement du formulaire.

**Symptôme** : Une alerte rouge apparaît en haut du formulaire. La soumission est bloquée.

**Résolution** :
1. Créer ou ouvrir le fichier `.env.development.local` à la racine du projet.
2. Renseigner la valeur :
   ```dotenv
   VITE_WEB3FORMS_ACCESS_KEY=votre-clé-web3forms
   ```
3. Obtenir une clé sur [https://web3forms.com](https://web3forms.com) si nécessaire.
4. Redémarrer le serveur de développement (`npm run dev`).

> [!NOTE]
> Ce code s'affiche uniquement si la clé est absente au build ou en développement. En production, s'assurer que `.env.production.local` est bien renseigné sur le serveur de déploiement.

---

### `ERR-xWF02` — Échec de la soumission

| Propriété          | Valeur                                 |
|--------------------|----------------------------------------|
| **Code**           | `ERR-xWF02`                            |
| **Module**         | Web3Forms                              |
| **Fichier source** | `src/components/web3-form/Web3Form.js` |
| **Constante**      | `WEB3FORM_ERRORS.SUBMIT_ERROR`         |

**Cause** : La requête `fetch` vers `https://api.web3forms.com/submit` a échoué, soit à cause d'une erreur réseau (pas de connexion, timeout), soit parce que l'API a retourné une réponse non-ok (`response.ok === false`).

**Symptôme** : Une alerte rouge apparaît sous le formulaire après la tentative d'envoi. Le formulaire n'est pas réinitialisé.

**Résolution** :
1. Vérifier la connexion réseau du navigateur.
2. Ouvrir les outils de développement → onglet **Réseau** et inspecter la requête vers `api.web3forms.com`.
3. Vérifier que la clé `VITE_WEB3FORMS_ACCESS_KEY` est valide et active dans l'interface Web3Forms.
4. Consulter le statut du service sur [https://web3forms.com](https://web3forms.com) en cas d'incident.

---

## Ajouter un nouveau code

1. Choisir ou créer un préfixe de module dans le tableau ci-dessus.
2. Incrémenter le numéro séquentiel pour ce module.
3. Déclarer la constante dans le fichier source concerné :
   ```js
   const MON_MODULE_ERRORS = {
       MA_NOUVELLE_ERREUR: 'ERR-xXX02',
   };
   ```
4. Documenter le nouveau code dans ce fichier en suivant le format existant.

