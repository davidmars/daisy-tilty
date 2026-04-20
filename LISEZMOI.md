# Raw HTML Starter

> English documentation available in [README.md](https://github.com/Tilty-io/raw-html-starter/blob/main/README.md)

Un starter kit moderne pour le développement de sites web en **HTML brut** (pas de React, pas de Vue, pas de framework JS complexe : ici, c'est du bon vieux HTML, simple, rapide et efficace). Idéal pour ceux qui veulent garder le contrôle, aller à l'essentiel, ou simplement profiter de la puissance des outils modernes (Vite, SCSS, includes, composants) sans la lourdeur d'un framework.

## Fonctionnalités

- Développement ultra-rapide avec Vite
- SCSS natif et auto-import des composants
- Système de composants HTML réutilisables
- Prêt pour le multi-pages
- Hot Module Replacement (HMR)
- Support TypeScript
- [Documentation complète](https://github.com/Tilty-io/raw-html-starter/blob/main/LISEZMOI.md)
- [Galerie interactive d'icônes](https://tilty-io.github.io/raw-html-starter/icons-gallery.html)

> **Astuce** : Vous pouvez cloner rapidement ce projet en un seul clic en utilisant le bouton disponible sur la page du [dépôt GitHub](https://github.com/new?template_name=raw-html-starter&template_owner=Tilty-io). C'est la façon la plus simple de commencer sans avoir à taper de commandes.

## Installation

Si vous préférez les lignes de commandes :

```bash
# Cloner le projet
git clone https://github.com/Tilty-io/raw-html-starter.git

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Crée une version de production
- `npm run watch:build` : Build en mode watch

## Structure du projet

```
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── button.html      # Bouton avec styles associés
│   │   ├── button.scss
│   │   ├── card.html        # Carte avec styles associés
│   │   ├── card.scss
│   │   ├── heading.html     # Titre avec styles associés
│   │   ├── heading.scss
│   │   └── icon.html        # Composant générique pour les icônes SVG
│   │
│   ├── layout/              # Layouts et structure
│   │   ├── common.html      # Layout principal (structure globale du site)
│   │   ├── footer.html      # Pied de page
│   │   ├── nav.html         # Navigation
│   │   └── raw-layout.html  # Layout brut
│   │
│   ├── styles/              # Styles globaux
│   └── icons/               # Dossiers d'icônes SVG (par famille)
│        ├── mdi/
│        ├── lucide/
│        ├── lucide-thin/
│        └── phosphor/
│
├── public/                  # Assets statiques
│   ├── images/              # Images du site
│   └── fonts/               # Polices de caractères
│
├── vite/                     # Configuration et plugins Vite
│   ├── getHtmlEntryPoints.ts # Points d'entrée HTML
│   ├── viteAutoImportScss.ts # Plugin d'auto-import SCSS
│   ├── iconsGalleryPlugin.ts # Plugin de génération de galerie d'icônes
│   └── icons-gallery.css     
│
└── dist/                    # Dossier de build
```

## Alias disponibles

Pour simplifier l'import des composants et ressources, le projet utilise plusieurs alias :

- `@comp` : Pointe vers `src/components/`
  ```html
  <include file="@comp/button.html" />
  ```

- `@layout` : Pointe vers `src/layout/`
  ```html
  <include file="@layout/common.html" />
  ```

- `@icons` : Pointe vers `src/icons/`
  ```html
  <include file="@comp/icon.html" $icon="@icons/lucide/heart.svg" />
  ```

Ces alias permettent d'éviter les chemins relatifs complexes et rendent le code plus maintenable. Ils sont configurés dans le fichier `vite.config.ts` et fonctionnent aussi bien dans les fichiers HTML que SCSS.

## Layout principal

Le layout principal (`src/layout/common.html`) définit la structure globale de toutes les pages du site : balise `<html>`, `<head>`, `<body>`, header, navigation, footer, etc.

- Il centralise les éléments communs (meta, liens CSS, scripts, navigation…)
- Il utilise des slots ou des includes pour injecter le contenu spécifique à chaque page
- C'est le point d'entrée recommandé pour toutes les pages HTML du projet

**Exemple d'utilisation dans une page** :

```html
<include file="@layout/common.html" $title="Accueil">
  <include file="@comp/heading.html">Bienvenue !</include>
  <p>Contenu de la page d'accueil…</p>
</include>
```

Pour modifier l'apparence globale, ajouter des scripts, des polices, etc., il suffit d'éditer `common.html`.

## Utilisation des composants

Le projet utilise un système de composants basé sur des includes HTML. Exemple :

```html
<include file="@comp/card.html">
  <template slot="title">Titre de la carte</template>
  <template slot="content">
    Contenu de la carte
  </template>
</include>
```

Pour plus d'informations sur le plugin vite-plugin-html-include, consultez la [documentation officielle](https://github.com/Tilty-io/vite-plugin-html-include).

## Styles

Les styles sont organisés en modules SCSS dans le dossier `styles/`. Les fichiers SCSS des composants sont automatiquement importés grâce au plugin `viteAutoImportScss`.

## Gestion des icônes SVG

- Les icônes sont organisées par familles dans `src/icons/` (ex : `mdi`, `lucide`, `phosphor`...)
- Un composant générique `icon.html` permet d'inclure n'importe quelle icône avec une API uniforme
- Exemple d'utilisation du composant :

```html
<include file="@comp/icon.html" $icon="@icons/lucide/heart-pulse.svg" $size="48" $color="#ff3399" />
```