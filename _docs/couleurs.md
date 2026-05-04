# Couleurs — Système sémantique DaisyUI

## 🟢 Mise en service rapide

### Modifier une couleur du thème

1. Ouvrir `src/styles/custom-daisy-ui-theme.css`
2. Modifier la valeur de la variable souhaitée (ex. `--color-primary`)
3. Le navigateur se recharge automatiquement — la couleur est répercutée sur toute l'interface

Pour trouver une couleur, utiliser le générateur officiel :
👉 **https://daisyui.com/theme-generator/**

### Checklist

- [ ] Identifier la couleur à modifier dans le thème (`primary`, `secondary`, `accent`…)
- [ ] Éditer `src/styles/custom-daisy-ui-theme.css`
- [ ] Vérifier le rendu sur `test-couleurs.html`

---

## 🔧 Détail technique

### Fichier du thème

Toutes les couleurs sont centralisées dans un seul fichier :

```
src/styles/custom-daisy-ui-theme.css
```

Ce fichier déclare un thème DaisyUI nommé `light` via `@plugin "daisyui/theme"`. Chaque couleur est une variable CSS de la forme `--color-{nom}`.

### Couleurs disponibles

| Groupe | Variables |
|---|---|
| **Base** | `--color-base-100`, `--color-base-200`, `--color-base-300`, `--color-base-content` |
| **Marque** | `--color-primary`, `--color-primary-content`, `--color-secondary`, `--color-secondary-content`, `--color-accent`, `--color-accent-content`, `--color-neutral`, `--color-neutral-content` |
| **États** | `--color-info`, `--color-info-content`, `--color-success`, `--color-success-content`, `--color-warning`, `--color-warning-content`, `--color-error`, `--color-error-content` |

### Système paire couleur / contenu

Chaque couleur sémantique a une contrepartie `*-content` : c'est la couleur garantie lisible **par-dessus** la couleur principale. Ce principe est systématique et obligatoire.

```html
<!-- ✅ Correct : texte lisible sur fond coloré -->
<div class="bg-primary">
    <p class="text-primary-content">Texte lisible</p>
</div>

<!-- ❌ Interdit : couleur brute non garantie lisible -->
<div class="bg-primary">
    <p class="text-white">Texte peut-être illisible</p>
</div>
```

### Règles d'utilisation

**Ne jamais utiliser de couleurs Tailwind brutes** (`text-red-500`, `bg-blue-200`, `text-gray-700`, etc.) ni de valeurs hexadécimales inline dans le HTML ou le CSS du projet.

**Toujours utiliser les classes sémantiques DaisyUI :**

| Besoin | Classe à utiliser |
|---|---|
| Fond principal | `bg-primary` |
| Texte sur fond primary | `text-primary-content` |
| Fond de surface neutre | `bg-base-100`, `bg-base-200` |
| Texte courant | `text-base-content` |
| Alerte d'erreur | `bg-error` + `text-error-content` |
| Texte coloré (inline) | `text-primary`, `text-accent`, `text-error`… |

### Utilisation en CSS personnalisé

Les variables CSS sont disponibles partout sous la forme `var(--color-{nom})` :

```css
.mon-element {
    background-color: var(--color-primary);
    color: var(--color-primary-content);
}
```

### Page de référence

La page `test-couleurs.html` affiche toutes les couleurs du thème en temps réel (valeurs hex calculées dynamiquement depuis les variables CSS). Elle se met à jour automatiquement si le thème est modifié.

