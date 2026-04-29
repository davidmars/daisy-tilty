# Référentiel des codes d'erreur

Ce document liste tous les codes d'erreur affichés dans l'interface du projet.
Ces codes sont intentionnellement opaques pour l'utilisateur final. Seul l'auteur du projet peut les interpréter via ce référentiel.

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

