
# SYSTEM CONTEXT: Tilty CMS Documentation
This document is a concatenation of the official documentation for Tilty CMS.
It is designed to provide comprehensive context for an AI Agent assisting with Tilty development.

## CRITICAL INSTRUCTIONS FOR AI AGENTS

### 0. MANDATORY PROTOCOL
- **ALWAYS START YOUR RESPONSE** with the following line on its own:
  > Tilty v0.26.2
  (This ensures the user knows which version of the documentation you are using).

### 1. SYNTAX REFERENCE (TypeScript)
The following interface defines the ONLY valid attributes you may use.
```typescript
/**
 * Tilty Template Attributes
 * These attributes govern how data is bound to the HTML.
 */
interface TiltyAttributes {
    /** Binds the innerHTML of the element to the variable */
    'ty-html'?: string;
    /** Binds the innerText of the element to the variable */
    'ty-text'?: string;

    /** Binds distinct attributes */
    'ty-title'?: string;
    'ty-src'?: string; // Automatically handles image resizing if function is used e.g. "img.resize(w,h)"
    'ty-alt'?: string;
    'ty-target'?: string;
    'ty-href'?: string;
    'ty-width'?: string;
    'ty-height'?: string;
    'ty-placeholder'?: string;
    'ty-value'?: string;
    'ty-content'?: string; // <meta content="...">
    'ty-id'?: string;

    /** Boolean attributes (removed if false/null) */
    'ty-checked'?: string;

    /** CSS Classes */
    'ty-class'?: string;      // Replaces the class attribute
    'ty-add-class'?: string;  // Appends to the class attribute

    /** Logic & Control Flow */
    'ty-if'?: string;         // Shows element only if truthy
    'ty-list'?: string;       // Iterates over a list
    'ty-list-item'?: 'ignore' | (string & {}); // "templateName" OR "ignore"
    'ty-scope'?: string;      // Scopes variables to an object

    /** 
     * Escape hatch for other attributes 
     * Syntax: "attribute:variable;attr2:var2"
     * Example: ty-attr="aria-label:myLabel;data-id:id"
     */
    'ty-attr'?: string;

    /** Developer utility to ignore an element during parsing */
    'ty-ignore'?: boolean;
}

```

### 2. STRICT SYNTAX ENFORCEMENT
- **NO HALLUCINATIONS**: If it's not in `TiltyAttributes` above, IT DOES NOT EXIST.
- **WHITELIST**:
   - binding: `ty-html`, `ty-text`
   - attributes: `ty-title`, `ty-src`, `ty-alt`, `ty-target`, `ty-href`, `ty-width`, `ty-height`, `ty-placeholder`, `ty-value`, `ty-content`, `ty-id`, `ty-checked`, `ty-class`, `ty-add-class`
   - logic: `ty-if`, `ty-list`, `ty-list-item`, `ty-scope`
   - special: `ty-attr` (use this for any other HTML attribute not listed above, e.g. `ty-attr="aria-label:myVar"`)
   - dev: `ty-ignore`
- **Fallback**: If you need to bind a standard HTML attribute that has no dedicated `ty-*` equivalent, YOU MUST USE `ty-attr`.

### 3. YOUR ROLE: "TILTYFICATION"
Your primary goal is often to transform static HTML into dynamic Tilty templates ("Tiltyfication").
- **Semantic Understanding**: Analyze the HTML to deduce the *meaning* (Is it a title? A list? A background image?).
- **Smart Naming**: Choose variable names that describe the content semantically (e.g., `articleTitle`, `featuresList`, `heroImage`).
- **Polymorphism**: If you see a section with mixed content types (like a Page Builder), use `ty-list` with multiple `ty-list-item` templates.
- **Strictness**: Channel your "imagination" through the strict rigor of the `ty-*` attributes. Do not deviate from the spec.

### 4. PRESERVE HTML STRUCTURE (CRITICAL)
- **DO NOT DELETE CODE**: You must NEVER delete tags from the user's HTML. The goal is to make the existing HTML dynamic, not to refactor or clean it up.
- **Use ty-ignore**: If a list in the HTML contains multiple examples (e.g. 3 lines of a list), keep ALL of them to preserve the visual mockup.
    - Tag the first one as the template (e.g., `ty-list-item="myTemplate"`).
    - Tag the others with `ty-list-item="ignore"` or `ty-ignore`.

(See "FEW-SHOT TRAINING" section at the end of this document for explicit examples).




 < !--SOURCE_FILE: README -->


# Index de l'aide

- [Index](see README)

## 🚀 Découverte
- [Tilty en résumé](see 01-decouverte/01-tilty-en-resume)
- [Tilty et l'Éco-conception](see 01-decouverte/14-eco-conception)

## ✏️ Guide Éditeur
- [Présentation de Tilty.app](see 02-guide-editeur/07-presentation-admin)
- [Présentation du Dashboard](see 02-guide-editeur/08-presentation-dashboard)
- [Tour d'horizon : Fenêtres](see 02-guide-editeur/07b-presentation-fenetres)
- [Mode Editeur](see 02-guide-editeur/06-mode-editeur)
- [Mode Lecteur](see 02-guide-editeur/06b-mode-lecteur)
- [La publication](see 02-guide-editeur/03-la-publication)
- [Le multilingue](see 02-guide-editeur/04-le-multilingue)
- [Les redirections](see 02-guide-editeur/13-les-redirections)
- [Raccourcis clavier](see 02-guide-editeur/10-hotkeys)
- [Tilty Kiosk](see 02-guide-editeur/09-tilty-kiosk)

## 🏗️ [Espace Architecte](see 03-espace-architecte/00-intro)
- [Mode Architecte](see 03-espace-architecte/05-mode-architecte)
  - [Valeurs par défaut](see 03-espace-architecte/05a-valeurs-par-defaut)
  - [Conventions de nommage](see 03-espace-architecte/05b-conventions-nommage)
  - [Suggestions de types](see 03-espace-architecte/05c-suggestions-champs)
  - [Le Workflow de l'Architecte](see 03-espace-architecte/05d-workflow-architecte)
- [Les Champs Miroirs](see 03-espace-architecte/06-champs-miroirs)
- [Système .tiltyignore](see 03-espace-architecte/11-tiltyignore)
- [Tilty Attributes (ty-*)](see 03-espace-architecte/02-tilty-attributes/README)
  - [Généralités](see 03-espace-architecte/02-tilty-attributes/01-ty-attr-generalites)
  - [Exemples Rapides](see 03-espace-architecte/02-tilty-attributes/99-exemples-rapides)
  - [Liste des attributs](see 03-espace-architecte/02-tilty-attributes/02-ty-attr-list)
  - [Accéder aux données](see 03-espace-architecte/02-tilty-attributes/03-ty-attr-syntaxe)
  - [Expressions et Opérateurs](see 03-espace-architecte/02-tilty-attributes/03b-ty-attr-expressions)
  - [Mots-clés et Fonctions](see 03-espace-architecte/02-tilty-attributes/03c-mots-cles-speciaux)
  - [Modèles de données](see 03-espace-architecte/02-tilty-attributes/04-ty-attr-modeles)
  - [Conditions (ty-if)](see 03-espace-architecte/02-tilty-attributes/05-ty-attr-conditions)
  - [Boucles (ty-list)](see 03-espace-architecte/02-tilty-attributes/06-ty-attr-boucles)
  - [Fonctionnalités avancées](see 03-espace-architecte/02-tilty-attributes/07-ty-attr-avance)
  - [Optimiser les images](see 03-espace-architecte/02-tilty-attributes/08-ty-attr-images)
  - [Fine-tuning WYSIWYG](see 03-espace-architecte/02-tilty-attributes/09-fine-tuning-wysiwyg)
  - [Rafraîchissement Partiel](see 03-espace-architecte/02-tilty-attributes/10-rafraichissement-partiel)

## 🤖 Avancé / Technique
- [Intégrations Agents IA](see 04-technique/12-agents-ia)
  - [AI Toolkit (Usage)](see 04-technique/ai-toolkit/README)
- Brouillons & Labo
  - [ty-json (Draft)](see 99-draft/draft-ty-json)
  - [Tilty Queries (Draft)](see 99-draft/draft-ty-list-query)

## Historique des versions
- [Historique des versions](see changelog)


---


 < !--SOURCE_FILE: 01-decouverte/01-tilty-en-resume -->


**Qu'est-ce que Tilty ?**

Tilty se définit avant tout comme un **outil**. Plus qu'un simple framework ou une solution SaaS, c'est un environnement de travail conçu pour la sobriété et l'efficacité. Il prône une approche minimaliste : aller à l'essentiel, avec élégance.

**Pour qui ?**

Si Tilty peut être utilisé par des agences, des webmasters ou des architectes du web, il a été pensé et conçu avant tout pour les **webdesigners**.

**Pour quoi faire ?**

L'objectif est limpide : **donner vie à un site statique**.
Tilty permet de transformer n'importe quelle maquette HTML en un site administrable (CMS) et dynamique. Il comble le fossé entre la création statique et la gestion de contenu, permettant de "rendre éditable" n'importe quelle page HTML existante.

**La philosophie**

La force de Tilty réside dans sa simplicité d'exécution. Il permet de réaliser ces transformations **sans écrire une seule ligne de code** de programmation complexe. Tout se fait rapidement, simplement, et "sans se prendre la tête". C'est la promesse d'un développement web économique, efficace et joyeux.

---

> "Tilty est un outil sobre et efficace à destination des webdesigners qui souhaitent donner vie à un site statique sans écrire une ligne de code."
> — **David**

> "Tilty est une solution à destination des webdesigners qui souhaitent rendre dynamique des pages statiques sans écrire une ligne de code."
> — **Juliette**


---


 < !--SOURCE_FILE: 01-decouverte/14-eco-conception -->


# Tilty et l'Éco-conception

Le numérique représente aujourd'hui une part significative des émissions de gaz à effet de serre mondiales (3 à 4%, soit plus que l'aviation civile).
Tilty a été conçu avec une conviction forte : **un site web performant est un site web sobre.**

Voici comment l'architecture de Tilty contribue mécaniquement à réduire l'empreinte carbone de vos projets.

## 1. Le Statique : Moins de calculs serveur

La plupart des CMS (WordPress, Drupal...) sont "dynamiques". À chaque fois qu'un visiteur demande une page :
1.  Le serveur reçoit la requête.
2.  Il réveille PHP (ou autre langage).
3.  Il interroge la base de données SQL.
4.  Il assemble le HTML.
5.  Il renvoie la page.

Ce processus consomme de l'énergie (CPU, RAM) **pour chaque visiteur**.

**Avec Tilty (Site Statique) :**
1.  Vous générez le site **une seule fois** lors de la publication.
2.  Le serveur ne fait que "servir" des fichiers existants (on passe directement à l'étape 5).

C'est l'équivalent de distribuer un journal déjà imprimé plutôt que de le réimprimer pour chaque lecteur. La charge serveur est quasi nulle, la consommation électrique est drastiquement réduite.

## 2. HTML Pur : La banquise vous remercie

La tendance actuelle du web (React, Vue, Angular en mode SPA) déporte souvent la charge de calcul vers l'utilisateur (Client-Side Rendering).
Le serveur envoie du code JavaScript vide, et c'est l'ordinateur ou le smartphone du visiteur qui doit travailler pour construire la page.

**Conséquence :**
- La batterie du téléphone se vide plus vite.
- Le processeur chauffe.
- Les vieux appareils rament.

**L'approche Tilty :**
Tilty génère du **HTML standard**, pré-rendu.
Le navigateur n'a rien à calculer, juste à afficher. C'est la méthode la plus légère et la plus inclusive qui soit. Votre site s'affiche instantanément, même sur un smartphone d'il y a 5 ans avec une connexion 3G.

> [!TIP]
> **Bonus SEO** : Cette légèreté se traduit par un excellent score **PageSpeed Insights**, ce qui favorise votre référencement naturel.

## 3. Optimisation des médias (`image.resize`)

Le poids des pages est l'ennemi n°1 de l'écologie numérique. Envoyer une image de 4Mo pour l'afficher dans une vignette de 300px est un gaspillage de bande passante colossal.

Tilty intègre nativement des fonctions de redimensionnement côté serveur :

```html
<!-- Tilty génère une image exactement à la bonne taille -->
<img ty-src="monImage.resize(300, 200, 'cover', 'webp')" alt="...">
```

- **Redimensionnement** : L'image est coupée aux dimensions exactes.
- **Compression** : Le poids est optimisé sans perte visible.
- **Format** : Conversion automatique en WebP (plus léger que JPG/PNG).

En utilisant ces fonctions, vous garantissez que chaque octet transféré est utile.

> [!TIP]
> **Score PageSpeed** : L'utilisation automatique du format **WebP** répond au critère "Diffuser des images aux formats nouvelle génération" de Google, boostant encore votre score de performance.

## 4. Hébergement "Green" facilité

Comme Tilty génère un site statique (un simple dossier de fichiers HTML/CSS/JS), vous n'êtes pas prisonnier d'un hébergeur spécifique supportant une base de données complexe.
Vous pouvez héberger votre site n'importe où, y compris sur des hébergeurs écologiques, des CDN verts, ou même des serveurs basse consommation alimentés aux énergies renouvelables.

---

## 5. Une responsabilité partagée

Tilty est un **facilitateur**. Nous vous donnons les outils pour créer des sites sobres, mais nous ne bridons pas votre créativité. L'éco-conception reste un choix d'architecture que vous devez faire.

Par exemple, si vous n'utilisez pas la fonction `.resize()` dans vos templates, Tilty servira l'image originale envoyée par l'éditeur (potentiellement très lourde). C'est à vous d'implémenter cette bonne pratique.

De même, Tilty génère du HTML pur, mais ne vous empêche pas d'y inclure de lourdes librairies JS, des frameworks complexes ou des trackers publicitaires si vous le souhaitez. Nous vous offrons simplement une alternative viable pour gérer du contenu dynamique sans eux.

Enfin, concernant l'hébergement, les offres incluses par défaut dans Tilty (Tilty Cloud) reposent sur des datacenters éco-responsables ("Green Hosting"). Cependant, si vous choisissez d'exporter votre site vers votre propre hébergeur (via FTP ou GitHub), la responsabilité de choisir un partenaire engagé écologiquement vous appartient.


---


 < !--SOURCE_FILE: 02-guide-editeur/07b-presentation-fenetres -->


# Tour d'horizon : Une preview & des fenêtres

L'interface de Tilty est pensée pour s'adapter à votre flux de travail : tout se passe dans des fenêtres flottantes que vous pouvez déplacer, redimensionner et organiser comme bon vous semble. C’est votre espace, faites-en ce que vous voulez !

Mais attention, le plus important se trouve **derrière** :
L'arrière-plan de l'interface, c'est votre site en **prévisualisation WYSIWYG** (What You See Is What You Get). Les fenêtres flottent par-dessus votre création, vous permettant de construire le site directement "sur" le site.

Voici un petit guide des outils accessibles depuis la barre de contrôle principale.

## Barre de contrôles
Toujours visible, c'est votre cockpit. Outre l'accès aux fenêtres et au profil, elle propose deux outils de prévisualisation essentiels :

- **Le sélecteur de vue (Responsive)** : Simulez l'affichage sur différents appareils (iPhone, iPad, Paysage...) pour tester votre design ou votre contenu.
- **Le sélecteur de rôle (View As)** : Basculez instantanément entre les modes **Lecteur**, **Éditeur** et **Architecte**. Cela vous permet de vérifier l'interface telle qu'elle sera perçue par vos clients que vous leur donniez accès au mode Éditeur ou Lecteur, en masquant les outils techniques.

**Astuce :** Vous pouvez personnaliser les raccourcis affichés en faisant un clic droit directement sur la barre.

*(Place pour screenshot de la barre de contrôle)*

**Raccourcis clavier :** 
- Pour fermer la fenêtre active appuyez sur <kbd>ESC</kbd>.
- Pour maximiser / minimiser la fenêtre active appuyez sur <kbd>M</kbd>. Vous pouvez aussi faire un double clic sur la barre de titre.

## Pages
**Visibilité :** Architecte, Éditeur, Lecteur


C'est la carte de votre site.
**Ce que vous pouvez faire :**
- Naviguer rapidement d'une page à l'autre.
- **En grand écran** : Profiter d'une vue tableau pour filtrer, trier et vérifier en un coup d'œil quelles pages sont en brouillon, en ligne, publiées ou non...
- Créer, dupliquer ou supprimer des pages en quelques clics.

*(Place pour screenshot de la fenêtre Pages)*

## Édition
**Visibilité :** Architecte, Éditeur


Le cœur du réacteur. C'est ici que vous donnez vie à vos contenus.

**Astuce :** Vous pouvez ouvrir cette fenêtre directement en cliquant sur un élément éditable (texte, image, liste, etc.) depuis la prévisualisation du site.

**L'interface est scindée en deux pour plus d'efficacité :**
- **À gauche** : L'arbre de données pour naviguer ultra-rapidement entre les différents blocs et champs de la page.
- **À droite** : Le formulaire d'édition où vous saisissez le texte, choisissez les images et configurez les blocs.

*(Place pour screenshot de la fenêtre Édition)*

## Médias
**Visibilité :** Architecte, Éditeur


Votre bibliothèque numérique.
**Ce que vous pouvez faire :**
- Importer vos images, vidéos, PDF et tout autre document via le bouton dédié.
- Supprimer les fichiers inutiles.
- Récupérer les liens des fichiers pour les partager ou les intégrer ailleurs.

*(Place pour screenshot de la fenêtre Médias)*

## Architecture
**Visibilité :** Architecte


C'est ici que la magie opère sous le capot. Vous définissez la structure des données (le schéma) de vos pages. En gros, c'est ici que vous décidez quels champs apparaîtront dans la fenêtre d'Édition.

*(Place pour screenshot de la fenêtre Architecture)*

## Code source / Templates HTML
**Visibilité :** Architecte


Le pont entre votre code et Tilty.
Cet outil gère vos fichiers sources statiques (HTML, CSS, JS) contenant les fameux attributs `ty-*`.
**Fonctionnalités clés :**
- Synchroniser vos fichiers locaux avec le serveur en temps réel.
- Visualiser les templates détectés par le système.

*(Place pour screenshot de la fenêtre Code source)*

## Redirections
**Visibilité :** Architecte, Éditeur


Indispensable pour le référencement (SEO).
Si vous refondez un site ou déplacez des pages, c'est ici que vous créez vos redirections (301, 302) pour ne perdre aucun visiteur en route.

*(Place pour screenshot de la fenêtre Redirections)*

## Publication
**Visibilité :** Architecte, Éditeur


Prêt à mettre en ligne ?
C'est l'outil de génération de votre site statique.
**Ce que vous pouvez faire :**
- Lancer la publication sur le serveur de votre choix.
- Suivre les logs en direct pour être sûr que tout se passe bien.
- Configurer des serveurs de publication externes (FTP, etc.).

*(Place pour screenshot de la fenêtre Publication)*

## Paramètres
**Visibilité :** Architecte, Éditeur, Lecteur


Les réglages globaux, rangés proprement pour s'y retrouver :

### 1. Projet (Impacte tout le monde)
*(Pour les Architectes)*
- **Propriétés** : Donnez une identité visuelle au projet dans le dashboard (vignette, icône).
- **Localisation** : Gérez les langues du site.
- **Informations** : Liste des URLs utiles (sitemap, robots.txt, accès au projet...)

### 2. Vos préférences (Juste pour vous)
- **Fenêtres** : Choisissez les raccourcis à afficher dans votre barre de navigation.
- **Thème** : Team Light ou Team Dark ? C'est vous qui voyez.
- **Rôle** : Basculez entre le mode "Éditeur" (focus contenu) et "Architecte" (focus structure). Accessible aussi directement depuis la barre de navigation.
- **Synchronisation** : Réglez vos préférences de synchro de fichiers.

*(Place pour screenshot de la fenêtre Paramètres)*

## Assistant
**Visibilité :** Architecte, Éditeur, Lecteur


Votre copilote. Il analyse votre projet en permanence pour détecter des configurations manquantes ou des petites erreurs dans vos attributs `ty-*`. Pratique pour debugger avant que ça ne devienne un problème.

*(Place pour screenshot de la fenêtre Assistant)*

## Aide
**Visibilité :** Architecte, Éditeur, Lecteur


Le manuel de bord. Retrouvez cette documentation et toutes les infos utiles pour maîtriser Tilty sur le bout des doigts.

*(Place pour screenshot de la fenêtre Aide)*


---


 < !--SOURCE_FILE: 02-guide-editeur/06b-mode-lecteur -->


# Mode Lecteur

Le **Mode Lecteur** est l'état le plus simple de l'interface Tilty.
Il correspond à la visualisation du site tel que le verront vos visiteurs finaux, mais à l'intérieur de l'interface d'administration.

## À quoi ça sert ?

Ce mode permet de :
- **Naviguer** sur le site comme un visiteur lambda.
- **Vérifier** le comportement des interactions (clics, survols, animations) sans être gêné par les surbrillances ou les outils d'édition.
- **Valider** le rendu final avant publication.

## Ce qui change par rapport aux autres modes

Contrairement au [Mode Éditeur](see 06-mode-editeur) ou au [Mode Architecte](see ../03-espace-architecte/05-mode-architecte) :
- Aucune zone n'est cliquable pour être éditée.
- Les barres d'outils contextuelles sont masquées.
- L'interface est épurée pour laisser toute la place au design.

> [!NOTE]
> Vous pouvez toujours accéder à la barre de navigation principale de Tilty (en haut ou sur le côté selon votre configuration) pour changer de page ou modifier les paramètres, mais le contenu de la page elle-même est "verrouillé" en lecture seule.


---


 < !--SOURCE_FILE: 02-guide-editeur/04-le-multilingue -->


# Implémentation du multilingue pour les architectes dans le code HTML.

## Le menu de choix de langue

![](../../02-guide-editeur/images/multilingual_menu.png)

### Enregistrer les préférences utilisateur

Quand l'utilisateur change de langue volontairement alors il est conseillé d'enregistrer sa préférence afin que le site sache le rediriger vers cette langue ultérieurement. On stocke la langue préférée de l'utilisateur dans le local storage "`chosen-lang`".   
Ainsi on aura selon les cas `chosen-lang="fr"` ou par exemple `chosen-lang="it".`

![](../../02-guide-editeur/images/multilingual_prefs.png)

# Détection de la langue de l'utilisateur

Plus d'informations sur [la page index dans le cadre de la publication](#index).

# Gestion des langues dans Tilty App

## Le menu de langue dans la barre de navigation

![](../../02-guide-editeur/images/multilingual_menu.png)  
Ce menu permet de sélectionner la langue utilisée dans la preview du site.

## Le menu de langue dans les préférences

![](../../02-guide-editeur/images/multilingual_prefs.png)  
A partir de ce menu vous pouvez:

* Ajouter une langue au projet

* 👀Choisir la langue affichée en preview

* 🚀 Sélectionner quelles langues seront publiées ou non au moment des publications

* ♥️ Choisir la langue par défaut du projet, par exemple quelle langue est affichée quand l'utilisateur va sur [mon-site.com](http://mon-site.com) au lieu d'aller du [mon-site.com/fr](http://mon-site.com/fr) ou [mon-site.com/en](http://mon-site.com/en)

* 🗑️ enfin vous pouvez supprimer une langue

## Le menu de langue dans les champs d'édition.

![](../../02-guide-editeur/images/multilingual_fields.png)  
Il permet de choisir quelles langues sont affichées ou non dans la fenêtre d'édition.  
Cette option est utile si vous souhaitez vous focaliser sur une seule langue ou à l'inverse si vous souhaitez avoir toutes les traductions à portée de main.


---


 < !--SOURCE_FILE: 02-guide-editeur/13-les-redirections -->


# Les redirections

Parce que personne n'aime les erreurs 404, surtout Google. La fenêtre **Redirections** est là pour dire "J'ai déménagé" proprement.

> [!IMPORTANT]
> **Patience** : Les redirections ne s'activent qu'après la **publication**. Ne cherchez pas à tester tant que vous n'avez pas cliqué sur le bouton qui fait peur.

## En bref
*   **301** (Défaut) : Déménagement définitif. La nouvelle adresse remplace l'ancienne dans l'historique de tout le monde.
*   **302** : "Je teste un truc". Temporaire. À utiliser seulement si vous savez pourquoi.

## Configuration
Sélectionnez une redirection ou créez-en une **(+)** pour ouvrir le panneau d'édition.

| Champ | Explication & Nuances |
| :--- | :--- |
| **Source** | L'URL d'origine qui ne doit plus exister.<br><br>• **Relative** (ex: `/vieux-truc`) : <br>Standard. Marche partout, tout le temps.<br><br>• **Absolue** (ex: `https://.../vieux-truc`) : <br>Strict. Ne marche que si le domaine correspond *exactement*. |
| **Cible** | Où est-ce qu'on va ?<br><br>• **Page interne** (Recommandé) : <br>Vous sélectionnez une page du site. Si vous la renommez demain, le lien suit. Magique.<br><br>• **URL Personnalisée** : <br>Pour renvoyer vers `.google.com`.<br>⚠️ **Attention** : Si vous mettez une URL relative ici (`/ma-page`), profitez bien de votre erreur 404 future quand vous changerez la structure du site. |
| **Locale** | *Uniquement pour cible "Page interne"*<br><br>• **Vide** (Recommandé) : Le système choisira la meilleure langue pour le visiteur.<br>• **Définie** : Force la redirection vers cette langue précise, qu'il pleuve ou qu'il vente. |
| **Code** | 301. Sauf si vous avez un doctorat en SEO qui vous dit le contraire. |

> [!TIP]
> **Source** : Le système se fiche que vous mettiez `/fr/vieux-truc` ou `/vieux-truc`. Il redirigera l'adresse exacte demandée. La prise en charge des redirection se fait avant même qu'on n'ait déterminé la langue du visiteur.

## Astuce de pro : URLs "Marketing" (Short links)
Vous pouvez utiliser les redirections pour créer des liens courts et faciles à retenir pour vos campagnes.
Exemple : Créez une redirection de `/promo` vers `/produits/collection-ete/promo-speciale-2024`.
C'est propre, c'est court, et ça marche parfaitement.

## Selon le serveur de publication
Selon votre hébergement, Tilty gère les redirections différemment :

**Serveur Tilty ou serveur avec prise en charge de PHP** : Pas de sujet, les redirections sont gérées avec de vrais en-têtes HTTP (Headers). C'est rapide, invisible et **parfait pour le SEO** (Google adore).

**Export Statique (HTML)** :
Pour assurer une compatibilité maximale (Apache, IIS, Statique pur, etc.), Tilty génère désormais une stratégie de redirection "ceinture et bretelles".
Pour chaque redirection, un dossier physique est créé contenant :
1.  `index.php` (Header 301) : Prioritaire si PHP est dispo.
2.  `.htaccess` (Apache) : Redirection native 301 si Apache est utilisé.
3.  `web.config` (IIS) : Redirection native pour les serveurs Windows.
4.  `index.html` (Meta Refresh + JS) : Fallback ultime si rien d'autre ne marche.

> [!NOTE]
> **SEO** : Grâce à cette stratégie hybride, même sur un export statique, vous bénéficiez le plus souvent d'une vraie redirection 301 (via `.htaccess` ou `web.config`), ce qui est optimal pour le SEO. Le fallback HTML/JS assure juste que l'utilisateur n'est jamais perdu.


---


 < !--SOURCE_FILE: 03-espace-architecte/00-intro -->


# 🏗️ Bienvenue dans l'Espace Architecte

Si Tilty était un bâtiment, vous en seriez l'Architecte, et les contributeurs en seraient les Décorateurs.

## Votre Rôle : La Structure

Le rôle d'Architecte est fondamental. C'est vous qui définissez **le cadre** dans lequel les éditeurs vont travailler.
Votre mission n'est pas de rédiger le contenu final, mais de préparer le terrain pour qu'il puisse être saisi, géré et publié efficacement.

Vous êtes le garant de :
*   La structure des données (Quels champs ? Quels types ?).
*   L'intégration HTML/CSS (Le look & feel).
*   La logique d'affichage (Conditions, Boucles...).
*   La performance, du SEO technique, de l'**accessibilité** et de l'**éco-conception**.

## Les Deux Piliers de l'Architecte

Pour accomplir votre mission, Tilty met à votre disposition deux univers complémentaires :

### 1. Le Mode Architecte (L'Interface)
Accessible directement dans Tilty.app, c'est votre tableau de bord visuel.
C'est ici que vous allez :
*   Configurer les **Valeurs par défaut** de vos composants.

*   Gérer les fichiers sources et les assets.
*   Utiliser l'assistant pour générer vos configurations.

👉 [Explorer le Mode Architecte](see 05-mode-architecte)

### 2. Tilty Attributes (Le Code)
C'est le cœur du réacteur. Directement dans votre code HTML, vous utilisez les attributs `ty-*` pour rendre vos pages dynamiques.
C'est avec ce langage déclaratif simple que vous allez :
*   Lier des textes et des images (`ty-text`, `ty-src`).
*   Créer des listes répétables (`ty-list`).
*   Ajouter de la logique conditionnelle (`ty-if`).

👉 [Maîtriser les Tilty Attributes](see 02-tilty-attributes/README)

---

> [!TIP]
> **Le Workflow Idéal**
> Tilty a été pensé pour un workflow fluide : Codez en local ➡️ Synchronisez en temps réel ➡️ Configurez dans l'app.
> Découvrez le guide complet du [Workflow de l'Architecte](see 05d-workflow-architecte).


---


 < !--SOURCE_FILE: 03-espace-architecte/05-mode-architecte -->


# 📏 Mode Architecte

#### 

## Les sources HTML 

Cette section de l'application n'est disponible que si vous êtes Architecte.

Cet outil vous permet de gérer les sources statiques de votre projet à savoir les fichiers HTML, CSS, Javascript et autres assets.   
Les pages html qui se trouvent dans cette section serviront de modèles pour générer les pages de votre site.

### Synchronisation des fichiers temps réel

Le workflow de Tilty se fait sans avoir à recourir à un FTP ou a des lignes de commandes.   
Tilty se charge de synchroniser automatiquement les fichiers sources sur votre ordinateur avec le serveur.  
![](../../03-espace-architecte/images/sync_status.png)  
Dans la navigation principale une iconographie affiche soit un dossier soit un zip en fonction de ce qui est synchronisé en local

Un point de couleur donne l'état global :  
- rouge si  il n'y a pas de dossier sur le serveur  
- gris si aucun dossier ou zip local n'est synchronisé mais qu'il y a bien des fichiers sur le serveur.  
- orange si des fichiers sont à synchroniser ou si la synchronisation est en cours  
- vert si tout est synchronisé entre votre ordinateur et le serveur.

Un clignotement (ou pas) nous informe sur la synchronisation  
- le clignotement est inexistant si la synchronisation automatique est désactivé  
- le clignotement est lent si la synchronisation automatique est activée et qu'il n'y a rien à synchroniser.  
- le clignotement est rapide si une synchronisation de fichiers est en cours

TODO rédiger

### Travailler avec des sources zippées

Si vous utilisez un builder html tel que webflow, vos sources sont téléchargées sous forme de zip.

TODO impression d'écran export webflow

Afin de vous éviter de dézipper manuellement votre export à chaque fois, Tilty vous offre la possibilité de sélectionner le fichier zip directement. Quand vous remplacerez le fichier zip par un autre (il faut donc qu'il conserve le même nom) le zip sera automatiquement uploadé sur Tilty puis décompressé.

### Certains fichiers sont ignorés

Tilty prend en charge les formats de fichiers statiques.   
Les fichiers `.php, .asp, .htaccess, .sh` etc... sont ignorés.  
Les dossiers tels que `node_modules, .git, .idea` etc qui sont connus pour être des répertoires de sources sont ignorés 

### Ignorer volontairement des fichiers

Si vous souhaitez ne pas synchroniser certains fichiers, faites un click droit dessus et choisissez "ignorer"

TODO rédiger

## Éditer la structure des données dans Tilty.app

### Ajouter, supprimer et réorganiser des champs.

TODO rédiger

### Les différents types de champs
> [!TIP]
> **Gagnez du temps !** Utilisez les **[Suggestions Automatiques](see 05c-suggestions-champs)** pour que Tilty crée vos champs intelligemment à partir de votre code HTML (plus rapide que la création manuelle).


![](../../03-espace-architecte/images/field_types.png)  
Chaque donnée est caractérisée par ce que l'on appelle un type.   
De la même manière que dans une page HTML une balise \<img\> n'a pas le même rôle qu'une balise \<h1\>, un champ "Fichier" dans Tilty n'aura pas la même utilité qu'un champ "Texte". Chaque type présente des caractéristiques différentes.

#### Les champs Texte

TODO rédiger

#### Les champs Nombre

TODO rédiger

#### Les champs Booléens (oui ou non)

TODO rédiger

#### Les champs Lien

TODO rédiger

#### Les champs Fichier

TODO rédiger

#### Les champs Objet

TODO rédiger

#### Les champs Liste (blocks)

TODO rédiger

### Des champs  traduits (ou pas)

#### Textes, nombres, liens, images, vidéos… To translate or not to translate, that is the question.

![](../../03-espace-architecte/images/translatable_fields.png)  
![](../../03-espace-architecte/images/translatable_fields_detail.png)

La plupart des types de champs peuvent être traduits dans les différentes langues de votre projet.  
Pour certains champs, comme les champs texte, la question ne se pose pas trop: généralement, ils doivent être traduits à moins qu'ils s'agissent de références produits ou de termes techniques qui sont identiques dans toutes les langues.  
Quand il s'agit de fichiers cela peut dépendre, une vidéo ou un audio peut avoir différentes versions linguistiques tout comme une image si elle contient du texte. Mais vous conviendrez que dans la plupart des cas, les images d'illustration n'ont pas à différer selon si le site est en français ou en anglais.

#### Les objet et les listes ne peuvent être traduits

Les objets sont là pour organiser les données et ils ne sont pas modifiables en soit, Il n'y a pas de sens à traduire des données qui n'existent pas.

Les listes par contre pourraient être traduites, c'est vrai. Selon la langue on pourrait ainsi construire des pages radicalement différentes ou encore des menus de navigation qui diffèrent d'une langue à l'autre . Si cette possibilité est séduisante sur le papier, en pratique elle s'avère complexifier l'édition et devenir ingérable. Un éditeur dans ce cas de figure devrait créer, réorganiser et modifier le contenu de chaque page dans chaque langue. C'est d'ailleurs le choix fait par la plupart des CMS et c'est une des raisons pour laquelle nous avons créé Tilty.

Dans 99% des cas, nous avons constaté qu'une page en anglais ou en français devait conserver la même structure. Quand on rajoute une image ou une section dans une page en anglais, il n'y a pas de raison que la modification ne se reporte pas sur la version française.

### Options ergonomiques

Quand vous éditez  les propriétés d'une donnée, vous pouvez lui conférer des options ergonomiques qui ne vont pas réellement changer son fonctionnement mais vont améliorer son utilisation pour les éditeurs

#### Afficher la valeur dans l'arborescence.

![](../../03-espace-architecte/images/tree_view_values.png)

Cette option à utiliser avec parcimonie permet d'afficher dans l'arborescence de données la valeur d'un champ au lieu de son nom. C'est parfois une bonne idée et parfois non, à vous de voir 🙂.   
Si la donnée est traduite, la valeur la plus adéquate sera affichée. Si la donnée n'est pas renseignée, l'option n'aura pas d'effet.   
Enfin, selon le type de donnée, la valeur affichée va différer. Pour un fichier c'est le nom du fichier qui sera affiché alors que pour un lien ce pourra être l'url, le nom de la page ou encore l' adresse email selon le cas.  
**Astuce**: Quand l'option est activée, le champ s'affiche en italique dans l'arborescence de données.

Concernant les Objets, ils n'ont pas de valeur à proprement parler. Si vous souhaitez  rendre leur nom dynamique dans l'arborescence, il vous faudra alors sélectionner un champ enfant qui servira de source.

Dans l'exemple ci-dessous l'objet ***Vidéo*** est configuré pour prendre le nom de son fichier vidéo.  
![](../../03-espace-architecte/images/video_object_config_1.png)  
![](../../03-espace-architecte/images/video_object_config_2.png)

# Titre

## ***Documentation Utilisateur 2025***

# Titre 1

## Titre2

### Titre 3

#### Titre 4


---


 < !--SOURCE_FILE: 03-espace-architecte/05a-valeurs-par-defaut -->


# Les valeurs par défaut

Dans le mode **Architecte** (accessible via la barre de navigation), il est possible de définir une **valeur par défaut** pour chaque champ de vos modèles de données.

## Intérêt pour l'intégrateur

L'objectif principal est de garantir que vos templates HTML ne se cassent pas ou n'affichent pas de zones vides disgracieuses lorsqu'un nouveau contenu est créé.

Une structure bien configurée permet d'avoir un rendu prévisible dès la création d'une page ou d'un bloc, sans obliger le contributeur à remplir 12 champs avant de voir un résultat correct.

### Cas concret : La liste de témoignages

Imaginez que vous intégrez un carrousel de témoignages clients. Votre HTML ressemble à ceci :

```html
<div class="testimonial-card">
    <!-- Si pas de photo, mon CSS va pleurer -->
    <img ty-src="photo" alt="Client photo" class="rounded-full w-32 h-32">
    
    <h3 ty-html="name" class="font-bold"></h3>
    <p ty-html="job_title" class="text-gray-500"></p>
    
    <blockquote ty-html="quote"></blockquote>
</div>
```

Si vous configurez des valeurs par défaut pertinentes dans l'architecte :
*   **Photo** : Une image générique de silhouette ou un placeholder adorable de chaton.
*   **Nom** : "Jean-Michel Default"
*   **Quote** : "Ce produit a changé ma vie, surtout le mardi."

Dès que l'éditeur cliquera sur "Ajouter un témoignage", le bloc apparaitra dans la liste pré-rempli avec ces valeurs. Le layout est préservé, et l'éditeur comprend immédiatement où il doit écrire quoi.

### Cas concret : Le booléen "Nouveau !"

Vous ajoutez un badge "Nouveau" sur vos produits, piloté par un booléen.

```html
<div class="product-card">
    <span ty-if="isNew" class="badge-new">NEW !</span>
    <h2 ty-html="title"></h2>
</div>
```

Si vous définissez la valeur par défaut à `true` (parce que bon, si on crée un produit, il est probablement nouveau), le badge s'affichera automatiquement sur tous les futurs produits créés, sans action supplémentaire.

## Modes de définition

Il existe deux façons de définir ces valeurs par défaut. Tilty les combine intelligemment.

### 1. Définition Implicite (HTML First)

C'est la méthode la plus naturelle. Tilty utilise le contenu de votre template HTML comme valeur par défaut.
Si votre code ressemble à ceci :

```html
<h1 ty-html="titre">Mon Super Titre</h1>
<div ty-list-item="paragraphe">Mon paragraphe d'exemple</div>
```

Tilty comprendra que le champ `titre` doit contenir "Mon Super Titre" par défaut. Votre maquette statique sert donc de "base de données initiale". Pas besoin de copier-coller vos "Lorem Ipsum" dans le CMS.

### 2. Définition Explicite (Architecte)

Parfois, le contenu du HTML n'est pas celui que vous voulez voir par défaut (par exemple, si votre HTML est vide ou contient des données techniques).
Vous pouvez alors forcer une valeur par défaut via l'interface :

1.  Sélectionnez le champ à configurer.
2.  Allez dans l'onglet **"Valeur par défaut"**.
3.  Remplissez le champ. Cette valeur sera prioritaire sur le contenu du HTML.

## Comportement technique

Lors de l'initialisation d'une nouvelle donnée (création d'une page ou ajout d'un item de liste), Tilty détermine la valeur initiale ainsi :

1.  **Valeur Architecte** : Tilty regarde d'abord si une valeur par défaut explicite est configurée dans le mode Architecte.
2.  **Valeur HTML** : Si rien n'est configuré dans l'Architecte, Tilty utilise le contenu présent dans votre fichier HTML.
3.  **Fallback** : En dernier recours, une valeur vide système est utilisée.

Une fois la donnée créée, elle est traitée comme une valeur standard "enregistrée".

> [!IMPORTANT]
> **Nuance importante sur la sauvegarde**
> Dès qu'une page est ouverte et **enregistrée** par un contributeur, tous les champs présents reçoivent une valeur (même vide).
> Les valeurs par défaut (HTML ou Architecte) ne servent donc que pour l'initialisation. Elles ne s'appliquent pas rétroactivement sur des pages déjà sauvegardées, sauf si vous ajoutez un tout nouveau champ à votre modèle après coup.


---


 < !--SOURCE_FILE: 03-espace-architecte/05b-conventions-nommage -->


# Conventions de Nommage

Dans Tilty, chaque champ de données (texte, image, objet...) est identifié par un **Nom de variable**. C'est ce nom que vous utiliserez dans votre code HTML pour afficher le contenu (ex: `ty-html="monTitre"`).

Pour garantir que tout fonctionne correctement entre le stockage (base de données) et l'affichage (HTML), certaines règles strictes s'appliquent.

Ces règles garantissent également la **compatibilité de vos données** avec d'autres systèmes, services externes ou APIs (JSON) qui pourraient consommer votre contenu à l'avenir.

## Le CamelCase

La convention utilisée est le **camelCase**.

> [!NOTE]
> **Qu'est-ce que le camelCase ?**
> C'est une façon d'écrire sans espaces où chaque nouveau mot commence par une majuscule, sauf le tout premier.
> *   ✅ Bon : `titrePage`, `imagePrincipale`, `datePublication`
> *   ❌ Mauvais : `TitrePage` (PascalCase), `titre_page` (snake_case), `titre-page` (kebab-case)

### Normalisation automatique
Lorsque vous créez un champ dans le mode Architecte, Tilty vous aide en "nettoyant" automatiquement votre saisie :
*   Les espaces sont supprimés.
*   Les accents sont retirés (`é` devient `e`).
*   Le tout est converti en camelCase.

*Exemple : Si vous tapez "Date de début", Tilty créera la variable `dateDeDebut`.*

## Règles techniques strictes

Si vous essayez de contourner la normalisation ou de renommer des variables manuellement, sachez que le moteur bloquera tout nom qui ne respecte pas ces critères :

1.  **Caractères autorisés** : Uniquement des lettres (a-z, A-Z), des chiffres (0-9) et l'underscore (`_`).
2.  **Premier caractère** : Doit obligatoirement être une lettre ou un underscore. **Interdit de commencer par un chiffre**.
3.  **Pas d'espaces**, pas de tirets `-`, pas de caractères spéciaux (`@`, `#`, `$`, etc.).

### Mots réservés
Certains mots sont utilisés par le système interne de Tilty et ne peuvent pas être utilisés comme noms de variables :
`value`, `global`, `$current`, `$root`, `meta`, `json`.

## Recommandations pour l'intégrateur

Pour vous y retrouver dans vos templates HTML, essayez de rester cohérent :

*   **Booléens** : Préfixez par `is` ou `has` (ex: `isVisible`, `hasLogo`). Cela rend les conditions `ty-if` très lisibles : `<div ty-if="hasLogo">`.
*   **Dates** : Préfixez par `date` (ex: `dateEvent`).
*   **Fichiers** : Soyez explicite (ex: `imageCover`, `pdfDoc`).

```html
<!-- Exemple de code lisible grâce au bon nommage -->
<div class="card" ty-if="isActive">
    <img ty-src="imageThumbnail">
    <h2 ty-html="titreProduit"></h2>
</div>
```


---


 < !--SOURCE_FILE: 03-espace-architecte/05c-suggestions-champs -->


# Suggestions automatiques de types de champs

Cette fonctionnalité, destinée aux **architectes**, permet à Tilty de *tenter* de déduire le type de champ à créer dans l'app en analysant votre code HTML et vos attributs `ty-*`.

> [!TIP]
> C'est la méthode recommandée pour construire votre structure de données : elle est **beaucoup plus rapide** (environ 10x) que de créer chaque champ manuellement dans l'interface d'administration.

## Fonctionnement général

Lorsque vous intégrez de nouveaux champs dans vos templates HTML sans les avoir créés au préalable, Tilty détecte ces champs manquants.

Dans l'interface d'édition, un **Assistant** (une boîte d'alerte) apparaît pour signaler ces champs manquants.
- Il analyse le contexte (balise HTML, attribut ciblé, nom de la variable).
- Il propose de **créer automatiquement** le champ avec ce qu'il estime être le type le plus approprié.
- Il fournit une explication ("Pourquoi cette suggestion ?") que vous pouvez consulter en dépliant les détails de la suggestion.

Si vous acceptez la suggestion, le champ est créé instantanément dans la structure de données avec la configuration proposée.

![Assistant qui montre des suggestion de champs](../../03-espace-architecte/images/suggestion-assistant-alert.png)

### Organisation et Localisation

L'assistant est conçu pour vous aider à vous repérer rapidement dans votre page :

1.  **Ordre naturel** : Les suggestions et les erreurs sont affichées **dans l'ordre d'apparition dans la page**. Si vous avez une erreur en haut de page et une autre en bas, elles apparaîtront dans cet ordre dans l'assistant.
2.  **Localisation au clic** : Cliquez sur une notification pour **scroller automatiquement** vers l'élément concerné dans la page et le mettre en surbrillance (flash jaune).
    *   *Note :* Certaines notifications (comme celles concernant la balise `<title>` ou des éléments purement techniques) ne sont pas cliquables car elles ne correspondent à aucun élément visible dans la page.
3.  **Éléments invisibles** : Si un élément a été supprimé du rendu final (par exemple à cause d'une condition `ty-if` fausse ou d'une liste vide), la notification reste accessible et pointera vers l'élément parent le plus proche.

### Et si la suggestion ne me convient pas ?

C'est un processus automatique, et il peut arriver que Tilty se trompe ou que vous ayez des besoins spécifiques. Vous gardez la main :

1.  **Modifier le champ avant création :**
    Cliquez sur le bouton **Modifier**. Cela ouvrira l'éditeur de structure pré-rempli avec la suggestion. Vous pourrez alors changer manuellement le type de champ, ses labels, ou ses options avant de le valider.

![Éditeur de structure avec suggestion](../../03-espace-architecte/images/suggestion-edit-dialog.png)

2.  **Corriger votre code HTML :**
    Si la suggestion est incohérente (par exemple une Liste au lieu d'un Texte), vérifiez s'il n'y a pas d'ambiguïté dans votre code.

```html
<!-- ERREUR : ty-list suggère une Liste -->
<h2 ty-list="titre">Mon Titre</h2>

<!-- CORRECTION : ty-html suggère du Texte -->
<h2 ty-html="titre">Mon Titre</h2>
```

3.  **Ignorer la suggestion :**
    Si vous ne souhaitez pas créer ce champ, n'appuyez tout simplement pas sur "Ajouter".

## Détermination des typologies

Le moteur d'analyse utilise une série d'indices pour *deviner* le type de champ. Ce ne sont pas des règles absolues, mais des heuristiques qui fonctionnent dans la plupart des cas courants et font gagner une temps de développement considérable.

> [!NOTE]
> **Pas d'IA ici ! (ni autre part dans le moteur de Tilty)** Bien que ce comportement puisse paraître "intelligent", il ne fait appel à aucune Intelligence Artificielle. Il s'agit d'un moteur de règles logiques exécuté localement.

### 1. Images avec Redimensionnement (`.resize()`)
Si votre variable est utilisée avec la fonction magique `.resize(w, h)`, elle sera considérée comme une **Image**.
*   *Exemple :* `monImage.resize(800, 600)` → Type **Fichier (Image)**.

### 2. Liste d'objets ou de valeurs (`ty-list`)
La présence de l'attribut `ty-list` indique généralement une **Liste**.
*   *Exemple :* `<div ty-list="mesProjets">` → Type **Liste**.

### 3. Items de Liste (`ty-list-item`)
Le comportement dépend du contenu :
*   **Contenu Riche :** S'il y a d'autres attributs `ty-*` à l'intérieur, c'est probablement un **Objet** complexe.
*   **Contenu Simple :** Si la balise porte elle-même un attribut `ty-*` (ex: `ty-src`), on s'en inspire pour déduire le type (Fichier, Lien, etc.).
*   **Par défaut :** Sans autre indice, cela crée un **Objet** générique, sauf si le nom de la variable évoque clairement du texte.

### 4. Conventions de Nommage
Certains noms de variables orientent fortement la décision vers du **Texte** pour éviter les confusions.
*   **Texte Simple :** `title`, `titre`, `subtitle`, `nom`, `name`, `label`, `btn`, `slug`, `copyright`...
    *   → Type **Texte (Input)**.
*   **Texte Multiligne :** `description`, `legende`, `intro`, `summary`, `resume`...
    *   → Type **Texte (Multiligne)**, souvent localisé par défaut.

### 5. Objets (`object`)
L'utilisation de la notation par point (parent de propriétés) suggère un **Objet**.
*   *Exemple :* `client.adresse` → `client` est un type **Objet**.
*   *Note :* `ty-scope` pointe aussi souvent vers un objet.

### 6. Fichiers et Médias (`file`)
On devine un fichier selon la balise ou des mots-clés évocateurs.
*   **Balises HTML :** `<img src="...">`, `<video src="...">`, `<audio src="...">`.
*   **Mots-clés :** `image`, `photo`, `logo`, `icon`, `video`, `audio`, `doc`, `pdf`...

### 7. Liens (`link`)
Détecté principalement si on cible `href` sur un lien (`<a>`) ou via des mots-clés comme `link`, `lien`, `url`...

### 8. Numérique (`numeric`)
*   **Calculs :** Utilisation d'opérateurs de comparaison dans un `ty-if`.
*   **Mots-clés :** `nombre`, `number`.

### 9. Booléen (`bool`)
Souvent détecté dans les conditions `ty-if` avec des mots-clés comme `bool`, `check`, `active`, `actif`.

# Suggestions automatiques de types de champs

Cette fonctionnalité, destinée aux **architectes**, permet à Tilty de *tenter* de déduire le type de champ à créer dans l'app en analysant votre code HTML et vos attributs `ty-*`.

> [!TIP]
> C'est la méthode recommandée pour construire votre structure de données : elle est **beaucoup plus rapide** (environ 10x) que de créer chaque champ manuellement dans l'interface d'administration.

## Fonctionnement général

Lorsque vous intégrez de nouveaux champs dans vos templates HTML sans les avoir créés au préalable, Tilty détecte ces champs manquants.

Dans l'interface d'édition, un **Assistant** (une boîte d'alerte) apparaît pour signaler ces champs manquants.
- Il analyse le contexte (balise HTML, attribut ciblé, nom de la variable).
- Il propose de **créer automatiquement** le champ avec ce qu'il estime être le type le plus approprié.
- Il fournit une explication ("Pourquoi cette suggestion ?") que vous pouvez consulter en dépliant les détails de la suggestion.

Si vous acceptez la suggestion, le champ est créé instantanément dans la structure de données avec la configuration proposée.

![Assistant qui montre des suggestion de champs](../../03-espace-architecte/images/suggestion-assistant-alert.png)

### Organisation et Localisation

L'assistant est conçu pour vous aider à vous repérer rapidement dans votre page :

1.  **Ordre naturel** : Les suggestions et les erreurs sont affichées **dans l'ordre d'apparition dans la page**. Si vous avez une erreur en haut de page et une autre en bas, elles apparaîtront dans cet ordre dans l'assistant.
2.  **Localisation au clic** : Cliquez sur une notification pour **scroller automatiquement** vers l'élément concerné dans la page et le mettre en surbrillance (flash jaune).
    *   *Note :* Certaines notifications (comme celles concernant la balise `<title>` ou des éléments purement techniques) ne sont pas cliquables car elles ne correspondent à aucun élément visible dans la page.
3.  **Éléments invisibles** : Si un élément a été supprimé du rendu final (par exemple à cause d'une condition `ty-if` fausse ou d'une liste vide), la notification reste accessible et pointera vers l'élément parent le plus proche.

### Et si la suggestion ne me convient pas ?

C'est un processus automatique, et il peut arriver que Tilty se trompe ou que vous ayez des besoins spécifiques. Vous gardez la main :

1.  **Modifier le champ avant création :**
    Cliquez sur le bouton **Modifier**. Cela ouvrira l'éditeur de structure pré-rempli avec la suggestion. Vous pourrez alors changer manuellement le type de champ, ses labels, ou ses options avant de le valider.

![Éditeur de structure avec suggestion](../../03-espace-architecte/images/suggestion-edit-dialog.png)

2.  **Corriger votre code HTML :**
    Si la suggestion est incohérente (par exemple une Liste au lieu d'un Texte), vérifiez s'il n'y a pas d'ambiguïté dans votre code.

```html
<!-- ERREUR : ty-list suggère une Liste -->
<h2 ty-list="titre">Mon Titre</h2>

<!-- CORRECTION : ty-html suggère du Texte -->
<h2 ty-html="titre">Mon Titre</h2>
```

3.  **Ignorer la suggestion :**
    Si vous ne souhaitez pas créer ce champ, n'appuyez tout simplement pas sur "Ajouter".

## Détermination des typologies

Le moteur d'analyse utilise une série d'indices pour *deviner* le type de champ. Ce ne sont pas des règles absolues, mais des heuristiques qui fonctionnent dans la plupart des cas courants et font gagner une temps de développement considérable.

> [!NOTE]
> **Pas d'IA ici ! (ni autre part dans le moteur de Tilty)** Bien que ce comportement puisse paraître "intelligent", il ne fait appel à aucune Intelligence Artificielle. Il s'agit d'un moteur de règles logiques exécuté localement.

### 1. Images avec Redimensionnement (`.resize()`)
Si votre variable est utilisée avec la fonction magique `.resize(w, h)`, elle sera considérée comme une **Image**.
*   *Exemple :* `monImage.resize(800, 600)` → Type **Fichier (Image)**.

### 2. Liste d'objets ou de valeurs (`ty-list`)
La présence de l'attribut `ty-list` indique généralement une **Liste**.
*   *Exemple :* `<div ty-list="mesProjets">` → Type **Liste**.

### 3. Items de Liste (`ty-list-item`)
Le comportement dépend du contenu :
*   **Contenu Riche :** S'il y a d'autres attributs `ty-*` à l'intérieur, c'est probablement un **Objet** complexe.
*   **Contenu Simple :** Si la balise porte elle-même un attribut `ty-*` (ex: `ty-src`), on s'en inspire pour déduire le type (Fichier, Lien, etc.).
*   **Par défaut :** Sans autre indice, cela crée un **Objet** générique, sauf si le nom de la variable évoque clairement du texte.

### 4. Conventions de Nommage
Certains noms de variables orientent fortement la décision vers du **Texte** pour éviter les confusions.
*   **Texte Simple :** `title`, `titre`, `subtitle`, `nom`, `name`, `label`, `btn`, `slug`, `copyright`...
    *   → Type **Texte (Input)**.
*   **Texte Multiligne :** `description`, `legende`, `intro`, `summary`, `resume`...
    *   → Type **Texte (Multiligne)**, souvent localisé par défaut.

### 5. Objets (`object`)
L'utilisation de la notation par point (parent de propriétés) suggère un **Objet**.
*   *Exemple :* `client.adresse` → `client` est un type **Objet**.
*   *Note :* `ty-scope` pointe aussi souvent vers un objet.

### 6. Fichiers et Médias (`file`)
On devine un fichier selon la balise ou des mots-clés évocateurs.
*   **Balises HTML :** `<img src="...">`, `<video src="...">`, `<audio src="...">`.
*   **Mots-clés :** `image`, `photo`, `logo`, `icon`, `video`, `audio`, `doc`, `pdf`...

### 7. Liens (`link`)
Détecté principalement si on cible `href` sur un lien (`<a>`) ou via des mots-clés comme `link`, `lien`, `url`...

### 8. Numérique (`numeric`)
*   **Calculs :** Utilisation d'opérateurs de comparaison dans un `ty-if`.
*   **Mots-clés :** `nombre`, `number`.

### 9. Booléen (`bool`)
Souvent détecté dans les conditions `ty-if` avec des mots-clés comme `bool`, `check`, `active`, `actif`.

### 10. Pages (`page`)
Si le nom contient "page" sans autre indice contradictoire (comme un attribut src).

### 11. Texte par défaut (`text`)
Si aucune règle ne matche, on se rabat sur du **Texte**.
*   **Texte Multiligne :** Si le contenu par défaut contient des balises ou si le contexte (balise `div`, `article`...) suggère du contenu long.
*   **Input Simple :** Dans les autres cas.

> [!NOTE]
> **Pas de Texte Riche automatique** : Volontairement, Tilty ne suggère **jamais** automatiquement le type "Texte Riche" (Éditeur HTML WYSIWYG). Il privilégie toujours le "Texte Multiligne" qui est plus léger et suffit dans 95% des cas (le HTML est préservé).
>
> Si vous avez spécifiquement besoin de l'éditeur riche, vous pouvez **transformer manuellement** n'importe quel champ suggéré (Texte ou Multiligne) en "Texte Riche" via l'option **Modifier** de l'assistant.


---


 < !--SOURCE_FILE: 03-espace-architecte/05d-workflow-architecte -->


# Le Workflow de l'Architecte

Tilty a été conçu pour respecter votre méthode de travail de webdesigner.
L'approche est résolument **"UI/UX First"** : vous designez, vous codez, et ensuite seulement, vous dynamisez. Tout a été pensé pour que votre design HTML/CSS/JS ne soit pas influencé par le CMS. Au contraine c'est au CMS de s'adapter à votre design.

Voici comment transformer une maquette statique en site dynamique administrable, étape par étape.

## 1. Design & Intégration (UI/UX First)
Tout commence dans votre environnement habituel.
Que vous utilisiez **VS Code, WebStorm, Webflow** ou tout autre builder, vous créez votre site comme vous l'avez toujours fait.
- Faites votre HTML/CSS/JS from scratch, ou bien utilisez un template HTML existant ou encore plus simple, utilisez un template Tilty ready, auquel cas une grosse partie du travail sera déjà faite.
- Ne vous souciez pas de la base de données.
- Ne vous souciez pas du CMS.
- **Concentrez-vous uniquement sur l'expérience utilisateur et le design.**

À cette étape, votre site est statique, beau, mais vide de sens : il est rempli de contenu par défaut.

## 2. La Synchronisation (Le Pont)
Oubliez **FTP, Git** ou les lignes de commande complexes pour cette étape.
Tilty possède son propre moteur de synchronisation ultra-rapide.

1. Ouvrez la fenêtre **"Code source"** dans Tilty.
2. Pointez vers votre dossier de projet local (ou votre fichier ZIP exporté).
3. **C'est fini.**

Tilty détecte vos fichiers, les envoie au serveur et les analyse en temps réel. Vous continuez à travailler avec vos outils, Tilty écoute les changements.

> Même sans attribut Tilty, vous disposez déjà de **modèles de pages**.
> Vous pouvez donc créer plusieurs pages basées sur ces templates. Elles seront identiques pour l'instant (faute de champs dynamiques), mais la structure est posée.

## 3. La Tiltyfication (Les attributs magiques)
C'est le moment de rendre votre code intelligent.
Directement dans vos fichiers HTML, vous allez ajouter des attributs spéciaux : les `ty-attributes`.

```html
<!-- Avant -->
<h1>Bienvenue sur mon site</h1>

<!-- Après -->
<h1 ty-html="heroTitle">Bienvenue sur mon site</h1>
```

C'est tout.
En ajoutant `ty-html="heroTitle"`, vous dites à Tilty : *"Ce texte n'est pas juste du texte, c'est une donnée dynamique qui s'appelle 'heroTitle'"*.
Vous définissez le schéma de données directement dans le code. C'est vous qui avez le contrôle.

## 4. L'Analyse et les Suggestions (Le Moteur)
Une fois vos fichiers synchronisés, le moteur d'analyse de Tilty entre en scène.
Il parcourt vos templates HTML, repère tous les attributs `ty-*` que vous avez disséminés et en déduit le schéma de données. Tout ça se fait instantanément.

- Il voit `<h1 ty-html="titre">` ? Il vous propose de créer un champ **Texte** nommé "titre".
- Il voit `<img ty-src="photo">` ? Il vous propose de créer un champ **Fichier (Image)** nommé "photo".
- Il voit `<ul ty-list="items">` ? Il vous propose de créer une **Liste** nommée "items".

C'est vous qui créez les champs, mais Tilty vous les **suggère** automatiquement (nom et type) pour aller 10 fois plus vite.
Plus besoin de tout configurer à la main dans un back-office fastidieux.

## 5. Le Fine Tuning (La Touche Pro)
Les suggestions de Tilty sont puissantes, mais vous restez le chef.
Parfois, la configuration par défaut ne suffit pas. C'est là que la **"structure hybride"** de Tilty prend tout son sens :
- **Une partie de la définition est dans vos fichiers HTML** (l'existence du champ, son emplacement).
- **L'autre partie est dans la base de données Tilty** (le type précis, les contraintes, les options).

Rendez-vous dans la fenêtre **"Architecture"**. Vous pourrez y paramétrer une multitude d'options. par exemple :
- Imposer qu'un champ **Nombre** compris entre 1 et 10.
- Transformer un champ texte simple en éditeur **Rich Text (WYSIWYG)**.
- Rendre un champ traduisible ou non.

Ce ne sont que des exemples, les possibilités sont vastes.

## 6. Le Résultat : Édition WYSIWYG
La boucle est bouclée.
En mode **Architecte**, vous visualisez déjà le résultat final complet.
L'interface de gestion de contenu est intégrée directement sur votre design.
Vos clients ou vous-même pouvez maintenant éditer le site directement dans le rendu final, avec des formulaires parfaitement adaptés et reliés à la structure HTML de votre page.

C'est ça, la philosophie Tilty : **Votre design *est* l'interface d'administration.**


---


 < !--SOURCE_FILE: 03-espace-architecte/06-champs-miroirs -->


# Les Champs Miroirs

Les champs miroirs permettent de **synchroniser automatiquement** les métas d'une page (nom, vignette, SEO...) avec des champs de contenu situés dans la structure de données (`data`).

## Concept

Imaginez que vous créez un site de produits. Chaque fiche produit possède un titre principal affiché en gros dans le contenu. Vous souhaitez que ce même titre soit automatiquement utilisé comme :
- Nom de la page dans l'arborescence
- Titre SEO (`<title>`)
- Slug de l'URL

Sans les miroirs, vos éditeurs devraient saisir trois fois la même information. Avec les miroirs, **une seule saisie suffit**.

## Configuration

Les miroirs se configurent au niveau du **template HTML**, dans les métadonnées du template.

Pour configurer les champs miroirs, ouvrez votre template dans le panneau Architecte et naviguez dans l'arborescence **Paramètres / Champs miroirs**.

### Champs miroirs disponibles

Tilty propose 5 champs miroirs configurables :

| Champ miroir | Type | Description |
|--------------|------|-------------|
| `name` | Texte non localisé | Nom de la page dans l'arborescence |
| `thumbnail` | Image non localisée | Vignette de la page |
| `seo.slug` | Texte localisé | Segment d'URL (ex: `mon-produit`) |
| `seo.title` | Texte localisé | Balise `<title>` |
| `seo.description` | Texte localisé | Meta description |

### Exemple de configuration

Dans l'interface du Mode Architecte, lors de l'édition d'un template, vous pouvez configurer les miroirs :

```plaintext
Miroirs :
  name → hero.heading
  seo.title → hero.heading
  seo.description → hero.catchphrase
  thumbnail → hero.image
```

Cela signifie :
- Le champ `hero.heading` de la structure sera automatiquement copié vers le nom de la page ET le titre SEO
- Le champ `hero.catchphrase` sera copié vers la meta description
- Le champ `hero.image` sera utilisé comme vignette

## Fonctionnement

### Sens de la synchronisation

Les miroirs fonctionnent de manière **unidirectionnelle** :

```
Champ de contenu (opendata) ➡️ Méta (meta)
```

Lorsqu'un éditeur modifie un champ de contenu configuré comme miroir, la valeur est **automatiquement copiée** vers le méta correspondant.

### Champs en lecture seule

Les métas configurés comme miroirs deviennent **automatiquement en lecture seule** dans l'interface.

Un message indique à l'éditeur vers quel champ se tourner pour modifier la valeur :

```plaintext
→ Synchronisé avec le champ Titre principal (hero.heading)
```

### Création de page et miroir name

Lorsque vous créez une nouvelle page, Tilty vous demande de saisir un **nom de page**. Si le miroir `name` est configuré, cette valeur est **automatiquement pré-remplie** dans le champ de contenu cible.

Par exemple, avec la configuration suivante :
```plaintext
Miroirs :
  name → product.title
```

Lors de la création d'une page nommée "iPhone 15", le champ `product.title` sera automatiquement initialisé avec la valeur "iPhone 15". L'éditeur peut ensuite affiner cette valeur si nécessaire.

Cette fonctionnalité permet de **démarrer rapidement** l'édition d'une page avec un contenu déjà cohérent.

### Règles de localisation

Les miroirs respectent la localisation des champs :

#### Champs non localisés (name, thumbnail)
Lorsqu'un champ **non localisé** (comme `name`) est synchronisé avec un champ **localisé**, la valeur est copiée vers **toutes les langues** :

```plaintext
hero.heading.fr = "Mon Produit"
hero.heading.en = "My Product"
                    ⬇️
name = "Mon Produit" (langue par défaut)
```

#### Champs localisés (seo.*)
Lorsqu'un champ **localisé** (comme `seo.title`) est synchronisé, chaque langue est gérée indépendamment :

```plaintext
hero.heading.fr = "Mon Produit"
hero.heading.en = "My Product"
                    ⬇️
seo.title.fr = "Mon Produit"
seo.title.en = "My Product"
```

## Cas d'usage

### Site e-commerce

Pour un catalogue de produits, configurez :
```plaintext
name → productName
seo.title → productName  
seo.description → productCatchphrase
thumbnail → productMainImage
```

Les éditeurs saisissent simplement les informations du produit, et toutes les métadonnées sont automatiquement remplies.

### Blog

Pour des articles de blog :
```plaintext
name → article.title
seo.title → article.title
seo.description → article.excerpt
thumbnail → article.coverImage
```


## Multiples miroirs sur un même champ

Un **même champ de contenu** peut alimenter **plusieurs métas** :

```plaintext
hero.heading → name
hero.heading → seo.title
hero.heading → seo.slug
```

Dans ce cas, modifier `hero.heading` mettra à jour simultanément les 3 métas.

## Bonnes pratiques

### Choix des champs miroirs

Privilégiez des champs :
- **Évidents** : Un titre de produit pour le nom de page est logique
- **Universels** : Évitez les champs trop spécifiques ou rarement remplis
- **Stables** : Préférez des champs qui ne changent pas souvent

### Nommage des champs

Utilisez des noms de champs explicites dans votre structure :

```plaintext
Évitez :  data.field1 → name
Préférez :  product.title → name
```

### Documentation interne

Documentez vos choix de miroirs pour vos collègues intégrateurs. Ajoutez des descriptions claires aux champs :

```plaintext
hero.heading
  Description : "Titre principal affiché en hero. Aussi utilisé pour le nom de page et le titre SEO."
```

## Limitations

### Application des modifications de configuration

Si vous modifiez la configuration d'un miroir sur un template (par exemple, vous changez `name → hero.heading` en `name → product.title`), cette modification **ne sera pas appliquée rétroactivement** sur les pages existantes.

La nouvelle configuration ne prendra effet que lors de la **prochaine modification** de chaque page. Ainsi, pour qu'une page bénéficie de la nouvelle configuration de miroir, un éditeur doit l'ouvrir et modifier un champ de contenu.

> [!NOTE]
> **Évolution future**
> Une fonctionnalité de mise à jour en masse des miroirs sur les pages existantes est prévue dans une version ultérieure de Tilty. Pour l'instant, vous devrez modifier les pages une par une (ou développer un script de migration côté serveur).

### Pas de synchronisation inverse

Les miroirs ne fonctionnent **que dans un sens** (data → meta). Si vous modifiez directement un méta (ce qui est de toute façon bloqué en lecture seule), cela ne mettra pas à jour le champ de contenu.

### Types de champs compatibles

Les miroirs fonctionnent uniquement avec des champs **texte** et **image/fichier**. Les autres types (objets, listes, booléens...) ne sont pas supportés.

### Un miroir = un champ

Chaque méta ne peut pointer que vers **un seul champ de contenu**.

> [!NOTE]
> **Limitation actuelle / Évolution future**
> Pour l'instant, il n'est pas possible de concaténer plusieurs champs :
> ```plaintext
> seo.title → hero.heading + product.subtitle  ❌
> ```
> Cette fonctionnalité pourrait être ajoutée dans une version future de Tilty.
>
> En attendant, si vous avez besoin de concaténer plusieurs champs, créez un champ calculé côté serveur ou utilisez directement les `ty-*` attributes.

## Résumé technique (pour les développeurs)

Les miroirs sont stockés dans la propriété `mirrors` du template HTML :

```typescript
mirrors: {
  "name": "product.title",
  "seo.slug": "product.slug",
  "seo.title": "product.title",
  "seo.description": "product.catchphrase",
  "thumbnail": "product.mainImage"
}
```

La synchronisation se fait automatiquement via :
- Le getter `atomicMetaClass` dans `HtmlpageRec` 
- La méthode `performMirrors()` appelée lors de la modification des données
- Le binding bidirectionnel d'`AtomicDataClass` via `loadDataFromObject()`

La propriété `readonly` est automatiquement activée sur les champs meta configurés comme miroirs.

---

> [!TIP]
> **Astuce de Workflow**
> Configurez vos miroirs **avant** de créer vos premières pages. Ainsi, dès la création, toutes les métadonnées seront automatiquement pré-remplies par le système.






---


 < !--SOURCE_FILE: 03-espace-architecte/11-tiltyignore -->


# Système `.tiltyignore`

## Vue d'ensemble

Le système `.tiltyignore` permet d'exclure certains fichiers et dossiers de la synchronisation entre votre répertoire local et le serveur Tilty. Il fonctionne exactement comme un `.gitignore`.

Cette fonctionnalité est particulièrement utile pour :
- Ignorer les fichiers de configuration du projet
- Exclure les dossiers de build (`dist/`, `node_modules/`)
- Ne pas synchroniser les fichiers temporaires
- Optimiser les performances de synchronisation

## Création du fichier

Créez un fichier nommé `.tiltyignore` à la racine de votre répertoire de templates HTML.

```
mon-projet/
├── .tiltyignore          ← Fichier de configuration
├── index.html
├── assets/
│   └── images/
└── ...
```

### ⚠️ Note importante : Projets avec builder (Vite, Webpack, etc.)

Si vous utilisez un outil de build comme **Vite**, **Webpack** ou **Parcel**, le fichier `.tiltyignore` **DOIT** être placé dans le dossier `public/` (ou équivalent selon votre builder) pour qu'il soit copié automatiquement dans le dossier de sortie (`dist/`, `build/`, etc.).

**Exemple avec Vite :**

```
mon-projet/
├── src/
│   └── components/
├── public/
│   ├── .tiltyignore      ← PLACEZ-LE ICI
│   └── assets/
├── dist/                 ← Après build
│   ├── .tiltyignore      ← Il sera automatiquement copié ici
│   └── assets/
└── vite.config.js
```

**Pourquoi ?** Tilty synchronise le dossier `dist/` (après build), pas le dossier source. Si le `.tiltyignore` n'est pas dans `public/`, il ne sera pas présent dans `dist/` et Tilty ne pourra pas le lire.

## Syntaxe des patterns

La syntaxe est identique à celle de `.gitignore` :

```gitignore
# Ceci est un commentaire

# Ignorer un fichier spécifique
config.js

# Ignorer tous les fichiers d'un type
*.log
*.tmp

# Ignorer un dossier
build/
dist/
node_modules/

# Ignorer tous les fichiers dans un dossier
assets/draft/*

# Patterns avancés : ignorer tous les .js sauf un
*.js
!index.js

# Ignorer les fichiers commençant par "draft"
draft*

# Ignorer les fichiers dans tous les sous-dossiers
**/temp/
```

### Différence entre les patterns

- `to-ignore/*` → ignore **le contenu** du dossier (mais le dossier apparaît)
- `to-ignore/` → ignore **le dossier entier** (dossier + contenu)
- `**/to-ignore/` → ignore tous les dossiers nommés "to-ignore" partout dans l'arborescence

## Patterns recommandés

Voici un exemple de fichier `.tiltyignore` type pour un projet web :

```gitignore
# Fichiers de configuration
*.config.js
*.config.ts

# Dossiers de build
dist/
build/
.cache/

# Fichiers temporaires
*.tmp
*.temp
*.log
*.bak
*~

# Fichiers de test et démo
test-*
demo-*

# IDE
.vscode/
.idea/
*.swp
*.swo

# Documentation de développement
README.md
CONTRIBUTING.md
```

## Comportement dans l'interface

### Fichiers ignorés

- Les fichiers/dossiers ignorés apparaissent **grisés** dans l'arborescence
- Ils affichent la mention **(ignoré)** à côté de leur nom
- Ils ne sont **jamais synchronisés** avec le serveur

### Optimisation des performances

**Important** : Les dossiers ignorés ne sont **pas parcourus**. Cela signifie que si vous ignorez un dossier contenant des milliers de fichiers (comme `node_modules/`), Tilty ne perdra pas de temps à les lister.

Exemple : si vous ignorez `dist/` avec 5000 fichiers, seul le dossier `dist/` apparaîtra (grisé) dans l'arborescence, sans parcourir ses 5000 enfants. Gain de performance considérable !

### Chargement des règles

- Les règles sont chargées **automatiquement** au démarrage de la synchronisation
- Les règles sont **rechargées** à chaque rafraîchissement de l'arborescence locale

## Sécurité

Le système `.tiltyignore` **complète** (ne remplace pas) les règles de sécurité intégrées de Tilty qui bloquent toujours :

- Les fichiers `.php`, `.exe`, `.sh`, etc. (exécutables)
- Les dossiers `.git/`, `node_modules/`
- Les fichiers système comme `.htaccess`

Même si vous ne créez pas de `.tiltyignore`, ces fichiers dangereux ne seront jamais synchronisés.

## Exemple d'utilisation

### Avant `.tiltyignore`

Tous les fichiers sont synchronisés :
```
✓ index.html
✓ style.css
✓ config.js         ← On ne veut pas le synchroniser
✓ build/            ← Dossier de build inutile
  ✓ bundle.js
  ✓ bundle.css
✓ assets/
  ✓ logo.png
```

### Après création de `.tiltyignore`

Contenu du `.tiltyignore` :
```gitignore
config.js
build/
```

Résultat dans l'interface :
```
✓ index.html
✓ style.css
○ config.js         (ignoré) ← Grisé, non synchronisé
○ build/            (ignoré) ← Grisé, non synchronisé (contenu non parcouru)
✓ assets/
  ✓ logo.png
```

## Limitations

- **Mode ZIP non supporté** : Le `.tiltyignore` ne fonctionne qu'avec un répertoire local (pas avec un fichier ZIP)
- **Rechargement manuel** : Après modification du `.tiltyignore`, il faut rafraîchir l'arborescence (bouton "Forcer nouveau" ou resélectionner le répertoire)
- **Fichiers déjà synchronisés** : Les règles d'ignore n'affectent pas les fichiers déjà présents sur le serveur. Pour nettoyer le serveur, utilisez "Forcer nouveau"

## Cas d'usage typiques

### Projet avec build Vite/Webpack

```gitignore
# Build artifacts
dist/
build/
.cache/

# Dependencies
node_modules/

# Config
vite.config.js
webpack.config.js
```

### Projet avec fichiers de travail

```gitignore
# Fichiers de travail
*.draft.html
work-in-progress/

# Assets sources (PSD, AI, etc.)
*.psd
*.ai
sources/
```

### Projet multilingue avec traductions

```gitignore
# Ne synchroniser que la version finale
translations/draft/
*.po
*.pot
```





---


 < !--SOURCE_FILE: 03-espace-architecte/02-tilty-attributes/README -->


# Tilty attributes

- [Généralités](see 01-ty-attr-generalites)  
  Présentation des objectifs des attributs ty-*, du vocabulaire et des cas d'usage.

- [Liste des attributs (ty-html, ty-src...)](see 02-ty-attr-list)  
  Référence complète des attributs disponibles (ty-text, ty-class, ty-placeholder...).

- [Accéder aux données (syntaxe et expressions)](see 03-ty-attr-syntaxe)  
  Guide sur la syntaxe des expressions, accès aux variables (`title`, `user.name`) et bonnes pratiques.

- [Expressions avancées](see 03b-ty-attr-expressions)
  Concaténation, opérateurs logiques et comparaisons.

- [Mots-clés spéciaux](see 03c-mots-cles-speciaux)
  Utilisation de `value`, `root`, `var()`, `db()`, `locale()` et `index()`.

- [Modèles de données (Page, Lien, Fichier)](see 04-ty-attr-modeles)  
  Détail des propriétés pour les objets complexes : Pages (SEO), Liens et Fichiers/Médias.

- [Boucles (ty-list)](see 06-ty-attr-boucles)  
  Afficher des listes d'éléments dynamiquement.

- [Conditions (ty-if)](see 05-ty-attr-conditions)  
  Contrôler l'affichage des éléments en fonction de conditions.

- [Exemples Rapides (Avant/Après)](see 99-exemples-rapides)  
  Cheat Sheet : Modèles d'utilisation pour chaque attribut avec rendu final.

- [Optimiser les images](see 08-ty-attr-images)  
  Gestion des formats, redimensionnement et performance des images.

- [Fonctionnalités avancées](see 07-ty-attr-avance)  
  Techniques avancées : hooks, transformations et exemples complexes.

- [Fine-tuning WYSIWYG](see 09-fine-tuning-wysiwyg)  
  Maitriser l'éditeur visuel : ignorer des éléments, positionner les boutons et personnaliser l'expérience d'édition.


---


 < !--SOURCE_FILE: 03-espace-architecte/02-tilty-attributes/01-ty-attr-generalites -->


# Une approche respectueuse du HTML

Tilty Attributes, ou *TyAttr*, est un système d’attributs HTML conçu pour injecter des données dynamiques dans vos pages web sans jamais compromettre leur validité ou leur structure. Il permet de transformer une page HTML statique en une page dynamique et éditable, sans avoir à écrire une seule ligne de code JavaScript ou PHP.

Son objectif est simple : **permettre aux designers, intégrateurs ou agences de rendre une page HTML éditable, vivante et connectée à une base de données, sans quitter leur environnement habituel.**

Fidèle à son nom, TyAttr s’appuie **exclusivement sur des attributs HTML**, sans introduire de balises spécifiques ni de syntaxe propriétaire. À l’inverse des frameworks comme Angular, Vue, React, ou des moteurs de templates PHP (comme ceux de WordPress), il ne nécessite aucun moteur de rendu complexe : il s'intègre directement dans le HTML existant.

On y retrouve certaines logiques proches de frameworks comme Vue.js ou React, mais avec une philosophie radicalement différente : **TyAttr génère du HTML à partir de HTML**. Autrement dit, il ne vous éloigne jamais du langage de base du web.

Cette approche permet une **compatibilité totale avec les éditeurs visuels** comme Webflow. Vous pouvez non seulement concevoir vos interfaces graphiques dans Webflow, mais également **saisir directement les attributs TyAttr** dans l’interface — via les champs "Custom Attributes" ou les éléments HTML personnalisés — afin de connecter vos designs à une base de données Tilty.

Pourquoi complexifier quand on peut faire simple ?  
 **TyAttr est un pont entre le HTML statique et le CMS dynamique, tout en restant fidèle aux standards du web.**

> [!TIP]
> Tilty peut analyser vos attributs `ty-*` pour **créer automatiquement les champs** dans l'administration. Découvrez comment fonctionnent les **[Suggestions Automatiques](see ../05c-suggestions-champs)**.

## Pourquoi TyAttr utilise-t-il uniquement des attributs HTML ?

L’utilisation exclusive des attributs HTML dans TyAttr n’est pas un hasard : c’est un choix technique et philosophique fort, basé sur plusieurs avantages concrets.

#### Compatibilité totale avec le HTML natif

En se limitant aux attributs, TyAttr garantit que le code HTML reste valide et lisible, même en dehors du cadre de Tilty. Cela signifie que votre page peut toujours être affichée dans n’importe quel navigateur, sans erreur ni comportement inattendu.

#### 2. Intégration fluide avec les éditeurs visuels

Les éditeurs comme Webflow ou Pinegrow acceptent facilement l’ajout d’attributs personnalisés. Il est donc possible de préparer des pages dynamiques sans écrire de JavaScript ni toucher au backend, directement dans ces outils.

#### 3. Aucune pollution du DOM

Contrairement aux frameworks qui injectent des balises supplémentaires ou du code inline, TyAttr ne modifie pas la structure de la page. Le DOM reste propre, simple, facile à maintenir — idéal pour des projets où la lisibilité et la performance comptent.

#### 4. Courbe d’apprentissage quasi nulle

Pas besoin d’apprendre une nouvelle syntaxe ou un langage de template. Si vous connaissez le HTML, vous savez déjà utiliser TyAttr. Un attribut comme `ty-html="titre"` parle de lui-même.

#### 5. Séparation claire entre données et design

Les attributs permettent de lier proprement la donnée au design sans entremêler logique et mise en forme. Cela simplifie la maintenance, favorise la collaboration entre profils créa et dev, et réduit les bugs liés à l’interprétation.

# Utilisation des données tilty dans votre code html

L'exemple suivant va afficher dans la balise H1 la valeur de titre

```html
<h1 ty-html="titre">...</h1>
```

L'exemple suivant va afficher dans la balise H1 la valeur de `titre` du record `page@99`

```html
<h1 ty-html="db(page@99).titre">...</h1>
```




---


 < !--SOURCE_FILE: 03-espace-architecte/02-tilty-attributes/99-exemples-rapides -->


# ⚡ Exemples Rapides (Cheat Sheet)

Voici ce que Tilty produit une fois vos attributs interprétés.

## Gestion du contenu des balises

### ty-html
Injecte du HTML brut.

**Template**
```html
<div class="content" ty-html="contenuAccueil"></div>
```
*Données : `contenuAccueil` = `<p>Bienvenue sur <strong>Tilty</strong></p>`*

**Rendu Final**
```html
<div class="content">
    <p>Bienvenue sur <strong>Tilty</strong></p>
</div>
```

### ty-text
Injecte du texte brut (échappe le HTML).

**Template**
```html
<h1 ty-text="titre">Mon Titre</h1>
```
*Données : `titre` = "Bonjour & Bienvenue"*

**Rendu Final**
```html
<h1>Bonjour &amp; Bienvenue</h1>
```

---

## Gestion des attributs courants

### ty-title
Gère l'attribut title (infobulle au survol).

**Template**
```html
<button ty-title="aide">?</button>
```
*Données : `aide` = "Cliquez pour voir l'aide"*

**Rendu Final**
```html
<button title="Cliquez pour voir l'aide">?</button>
```

### ty-src
Gère la source des images/iframes/scripts. S'utilise souvent avec `ty-alt`.

**Template**
```html
<img src="placeholder.jpg" ty-src="imageProduit">
```
*Données : `imageProduit` = "photo.jpg"*

**Rendu Final**
```html
<img src="photo.jpg">
```

### ty-alt
Gère le texte alternatif des images.

**Template**
```html
<img src="photo.jpg" ty-alt="description">
```
*Données : `description` = "Vue de la montagne"*

**Rendu Final**
```html
<img src="photo.jpg" alt="Vue de la montagne">
```

### ty-target
Gère la cible d'un lien (ex: nouvel onglet).

**Template**
```html
<a href="#" ty-target="ouvreNouveau ? '_blank' : '_self'">Lien</a>
```
*Données : `ouvreNouveau` = true*

**Rendu Final**
```html
<a href="#" target="_blank">Lien</a>
```

### ty-href
Gère l'URL de destination. Si le champ est de type "Lien" (CMS), l'attribut `target` peut être géré automatiquement.

**Template (Cas simple)**
```html
<a href="#" ty-href="urlSite">Visiter</a>
```
*Données : `urlSite` = "https://example.com"*

**Rendu Final**
```html
<a href="https://example.com">Visiter</a>
```

**Template (Cas Objet Lien)**
```html
<!-- target est géré automatiquement par l'objet lien -->
<a href="#" ty-href="monLienCMS">Visiter</a>
```
*Données : `monLienCMS` = { href: "https://google.com", target: "_blank" }*

**Rendu Final**
```html
<a href="https://google.com" target="_blank">Visiter</a>
```

### ty-width
Gère la largeur explicite.

**Template**
```html
<img src="logo.png" ty-width="largeurLogo">
```
*Données : `largeurLogo` = 200*

**Rendu Final**
```html
<img src="logo.png" width="200">
```

### ty-height
Gère la hauteur explicite.

**Template**
```html
<div ty-height="hauteurBloc"></div>
```
*Données : `hauteurBloc` = 500*

**Rendu Final**
```html
<div height="500"></div>
```

### ty-placeholder
Texte fantôme pour les champs de formulaire.

**Template**
```html
<input type="text" ty-placeholder="labelNom">
```
*Données : `labelNom` = "Votre nom ici"*

**Rendu Final**
```html
<input type="text" placeholder="Votre nom ici">
```

### ty-value
Valeur par défaut pour les champs de formulaire.

**Template**
```html
<input type="text" ty-value="nomUtilisateur">
```
*Données : `nomUtilisateur` = "Jean"*

**Rendu Final**
```html
<input type="text" value="Jean">
```

### ty-content
Gère l'attribut content (souvent pour les meta tags).

**Template**
```html
<meta name="author" ty-content="nomAuteur">
```
*Données : `nomAuteur` = "Victor Hugo"*

**Rendu Final**
```html
<meta name="author" content="Victor Hugo">
```

### ty-id
Assigne un ID unique dynamique.

**Template**
```html
<section ty-id="sectionId">...</section>
```
*Données : `sectionId` = "contact"*

**Rendu Final**
```html
<section id="contact">...</section>
```

---

## Attributs booléens

### ty-checked
Gère l'état coché/décoché (checkbox, radio). Supprime l'attribut si faux.

**Template**
```html
<input type="checkbox" ty-checked="accepteCGV">
```
*Données : `accepteCGV` = true*

**Rendu Final**
```html
<input type="checkbox" checked>
```

---

## Attributs custom

### ty-attr
Gère n'importe quel attribut HTML non prévu par Tilty (data-*, aria-*, role...).

**Template**
```html
<div ty-attr="{ 'data-id': id, 'aria-hidden': estCache }"></div>
```
*Données : `id` = 42, `estCache` = true*

**Rendu Final**
```html
<div data-id="42" aria-hidden="true"></div>
```

---

## Gestion attributs spéciaux

### ty-tag
Change dynamiquement le type de balise HTML.

**Template**
```html
<h2 ty-tag="niveauTitre" ty-text="titre">Titre</h2>
```
*Données : `niveauTitre` = "h3", `titre` = "Sous-section"*

**Rendu Final**
```html
<h3>Sous-section</h3>
```

### ty-class
**Remplace** intégralement l'attribut `class`.

**Template**
```html
<div class="base" ty-class="'btn btn-' + theme">...</div>
```
*Données : `theme` = "danger"*

**Rendu Final**
```html
<div class="btn btn-danger">...</div>
```

### ty-add-class
**Ajoute** des classes à celles existantes.

**Template**
```html
<div class="item" ty-add-class="actif ? 'selected' : ''">...</div>
```
*Données : `actif` = true*

**Rendu Final**
```html
<div class="item selected">...</div>
```

### ty-style
**Remplace** intégralement l'attribut `style`.

**Template**
```html
<div style="color:red" ty-style="'color: ' + couleur">...</div>
```
*Données : `couleur` = "blue"*

**Rendu Final**
```html
<div style="color: blue">...</div>
```

### ty-add-style
**Ajoute** des styles (concaténation) à l'attribut `style` existant.

**Template**
```html
<div style="font-size: 12px;" ty-add-style="'color: ' + couleur">...</div>
```
*Données : `couleur` = "green"*

**Rendu Final**
```html
<div style="font-size: 12px; color: green">...</div>
```

---

## Attributs de boucle

### ty-list & ty-list-item
Génère une liste à partir d'un tableau d'objets.

**Template**
```html
<ul ty-list="utilisateurs">
    <li ty-list-item="utilisateur">
        <span ty-text="nom">Nom par défaut</span>
    </li>
</ul>
```
*Données : `utilisateurs` = [{nom: "Alice"}, {nom: "Bob"}]*

**Rendu Final**
```html
<ul>
    <li><span>Alice</span></li>
    <li><span>Bob</span></li>
</ul>
```

### ty-list (Polymorphe)
Une même liste peut contenir des éléments de types différents (ex: une liste de blocs "Image" ou "Texte"). Tilty choisira le bon template.

**Template**
```html
<div ty-list="blocs">
    <!-- Template A : Texte -->
    <p ty-list-item="texte" ty-text="contenu">...</p>
    
    <!-- Template B : Image -->
    <img ty-list-item="image" ty-src="url">
</div>
```
*Données : `blocs` = [{type: "texte", contenu: "Hello"}, {type: "image", url: "photo.jpg"}]*

**Rendu Final**
```html
<div>
    <p>Hello</p>
    <img src="photo.jpg">
</div>
```

---

## Attributs d'objet

### ty-scope
Définit un contexte de données pour les éléments enfants (évite les répétitions).

**Template**
```html
<div ty-scope="user">
    <span ty-text="nom"></span>
</div>
```
*Données : `user` = { `nom`: "Alice" }*

**Rendu Final**
```html
<div>
    <span>Alice</span>
</div>
```

---

## Conditionner l'insertion d'une balise

### ty-if
Affiche ou supprime conditionnellement l'élément.

**Template**
```html
<span ty-if="isAdmin">Admin</span>
<span ty-if="!isAdmin">Visiteur</span>
```
*Données : `isAdmin` = false*

**Rendu Final**
```html
<span>Visiteur</span>
```

### ty-ignore
Supprime l'élément du rendu final (utile pour les commentaires ou le code temporaire).

**Template**
```html
<p>Visible</p>
<p ty-ignore>Caché au rendu</p>
```

**Rendu Final**
```html
<p>Visible</p>
```

### ty-list-item="ignore"
Utilisé dans une `ty-list` pour définir des éléments de maquette qui ne doivent pas être répétés ni affichés.

**Template**
```html
<ul ty-list="taches">
    <!-- Élément de maquette ignoré au rendu -->
    <li ty-list-item="ignore" class="header">EXEMPLE</li>
    
    <!-- Modèle utilisé pour la boucle -->
    <li ty-list-item="tache">
       <span ty-text="titre">Tâche</span>
    </li>
</ul>
```
*Données : `taches` = [{titre: "Code"}]*

**Rendu Final**
```html
<ul>
    <li><span>Code</span></li>
</ul>
```


---


 < !--SOURCE_FILE: 03-espace-architecte/02-tilty-attributes/02-ty-attr-list -->


# Liste des attributs Tilty

| Liste des attributs Tilty                                                                                    |                                                                                                                                                     |
|:-------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------|
| [`Gestion du contenu des balises`](99-exemples-rapides.md#gestion-du-contenu-des-balises)                    |                                                                                                                                                     |
| [`ty-html`](99-exemples-rapides.md#ty-html)                                                                  | insère la valeur dans le html de la balise                                                                                                          |
| [`ty-text`](99-exemples-rapides.md#ty-text)                                                                  | insère la valeur dans le corps html de la balise sous forme de texte                                                                                |
| **Gestion des attributs courants**                                                                           |                                                                                                                                                     |
| [`ty-title`](99-exemples-rapides.md#ty-title)                                                                | insère la valeur dans l'attribut title                                                                                                              |
| [`ty-src`](99-exemples-rapides.md#ty-src)                                                                    | insère la valeur dans l'attribut src                                                                                                                |
| [`ty-alt`](99-exemples-rapides.md#ty-alt)                                                                    | insère la valeur dans l'attribut alt                                                                                                                |
| [`ty-target`](99-exemples-rapides.md#ty-target)                                                              | insère la valeur dans l'attribut target                                                                                                             |
| [`ty-href`](99-exemples-rapides.md#ty-href)                                                                  | insère la valeur dans l'attribut href (peut avoir une incidence sur l'attribut target)                                                              |
| [`ty-width`](99-exemples-rapides.md#ty-width)                                                                | insère la valeur dans l'attribut width                                                                                                              |
| [`ty-height`](99-exemples-rapides.md#ty-height)                                                              | insère la valeur dans l'attribut height                                                                                                             |
| [`ty-placeholder`](99-exemples-rapides.md#ty-placeholder)                                                    | insère la valeur dans l'attribut `placeholder`                                                                                                      |
| [`ty-value`](99-exemples-rapides.md#ty-value)                                                                | insère la valeur dans l'attribut `value`                                                                                                            |
| [`ty-content`](99-exemples-rapides.md#ty-content)                                                            | insère la valeur dans l'attribut content                                                                                                            |
| [`ty-id`](99-exemples-rapides.md#ty-id)                                                                      | insère la valeur dans l'attribut id.  **N'insère rien si l'id est vide.**                                                                           |
| **Attributs booléens (n'est pas intégré si la valeur est null ou false)**                                    |                                                                                                                                                     |
| [`ty-checked`](99-exemples-rapides.md#ty-checked)                                                            | insère la valeur dans l'attribut checked ou supprime l'attribut si la valeur est null ou false                                                      |
| **Attributs custom**                                                                                         |                                                                                                                                                     |
| [`ty-attr`](99-exemples-rapides.md#ty-attr)                                                                  | Pour gérer les attributs qui ne sont pas listés plus haut                                                                                           |
| **Gestion attributs spéciaux**                                                                               |                                                                                                                                                     |
| [`ty-tag`](99-exemples-rapides.md#ty-tag)                                                                    | remplace la balise HTML par celle spécifiée (ex: "h1", "div", "span")                                                                               |
| [`ty-class`](99-exemples-rapides.md#ty-class)                                                                | remplace l'attribut class par la valeur                                                                                                             |
| [`ty-add-class`](99-exemples-rapides.md#ty-add-class)                                                        | ajoute la valeur à l'attribut class existant                                                                                                        |
| [`ty-style`](99-exemples-rapides.md#ty-style)                                                                | remplace l'attribut style par la valeur                                                                                                             |
| [`ty-add-style`](99-exemples-rapides.md#ty-add-style)                                                        | ajoute la valeur à l'attribut style existant                                                                                                        |
| **Attributs de boucle**                                                                                      |                                                                                                                                                     |
| [`ty-list`](99-exemples-rapides.md#ty-list--ty-list-item)                                                    | Permet de boucler sur des listes                                                                                                                    |
| [`ty-list-item`](99-exemples-rapides.md#ty-list--ty-list-item)                                               | Au sein d'une boucle `ty-list` permet de sélectionner les items html à utiliser.                                                                    |
| **Attributs d'objet**                                                                                        |                                                                                                                                                     |
| [`ty-scope`](99-exemples-rapides.md#ty-scope)                                                                | Permet de définir la racine d'un objet. Les enfants de cet élément DOM seront scopé et il ne sera pas nécessaire de répéter la variable de l'objet. |
| **Conditionner l'insertion d'une balise**                                                                    |                                                                                                                                                     |
| [`ty-if`](99-exemples-rapides.md#ty-if)                                                                      | Permet d'afficher une balise en fonction de la valeur d'un champ                                                                                    |
| [`ty-ignore`](99-exemples-rapides.md#ty-ignore)                                                              | ignore et supprime la balise                                                                                                                        |
| [`ty-list-item="ignore"`](99-exemples-rapides.md#ty-list-itemignore)                                         | ignore et supprime la balise                                                                                                                        |
| **Attributs WYSIWYG (Édition)**                                                                              |                                                                                                                                                     |
| [`ty-wy-refresh`](09-fine-tuning-wysiwyg.md#forcer-le-rechargement-ty-wy-refresh)                            | Force le rechargement complet de la page lors de la modification. Valeur = "page"                                                                   |
| [`ty-wy-ignore`](09-fine-tuning-wysiwyg.md#ignorer-le-wysiwyg-ty-wy-ignore)                                  | Empêche l'édition de l'élément. Valeurs = "children", "self" ou vide.                                                                               |
| [`ty-wy-list-item-ignore`](09-fine-tuning-wysiwyg.md#desactiver-des-actions-de-liste-ty-wy-list-item-ignore) | Désactive des actions. Valeurs = "sort", "add", "duplicate", "delete" ou vide.                                                                      |
| [`ty-wy-align`](09-fine-tuning-wysiwyg.md#positionnement-des-boutons-ty-wy-align)                            | Positionne les boutons d'édition. Ex: "top right"                                                                                                   |
| [`ty-wy-direction`](09-fine-tuning-wysiwyg.md#orientation-de-la-liste-ty-wy-direction)                       | Définit l'orientation de la liste (x ou y) pour les flèches de déplacement.                                                                         |


---


 < !--SOURCE_FILE: 03-espace-architecte/02-tilty-attributes/03-ty-attr-syntaxe -->


# Accéder aux données

Tilty Attributes vous permet d'injecter vos données dynamiques directement dans vos templates HTML.
Ce guide vous explique comment cibler précisément les informations dont vous avez besoin.

## La base : Notation par point

Les données Tilty sont structurées comme des objets (arborescence). Pour descendre dans la hiérarchie, on utilise simplement le point `.`.

```html
<!-- Affiche le nom de l'utilisateur -->
<h1 ty-text="user.name"></h1>

<!-- Affiche la ville de l'adresse de l'utilisateur -->
<p ty-text="user.address.city"></p>

<!-- Affiche le titre en anglais explicitement (si champ multilingue) -->
<span ty-text="title.en"></span>
```

## Le Contexte : `ty-scope`

L'attribut `ty-scope` est **fondamental**. Il permet de définir un "contexte" pour un élément HTML et tous ses enfants. Cela vous évite de répéter le chemin complet à chaque fois.

**Sans scope (répétitif) :**
```html
<div>
    <h2 ty-text="user.name"></h2>
    <p  ty-text="user.email"></p>
</div>
```

**Avec scope (plus propre) :**
```html
<div ty-scope="user">
    <!-- Ici, tout part de "user" -->
    <h2 ty-text="name"></h2>
    <p  ty-text="email"></p>
</div>
```
> [!TIP]
> Si le chemin défini dans `ty-scope` est introuvable ou vide, **tout le bloc HTML est supprimé du rendu**. C'est un moyen très efficace de cacher des sections entières s'il n'y a pas de données.

Vous pouvez imbriquer les scopes autant que nécessaire :
```html
<div ty-scope="user">
    <h2 ty-text="name"></h2>
    
    <div ty-scope="address">
        <!-- Ici on est dans user.address -->
        <p ty-text="city"></p>
    </div>
</div>
```

## Accéder à d'autres sources de données

Par défaut, Tilty cherche dans les données de la page courante. Mais vous pouvez aller chercher ailleurs (variables globales, base de données...).

👉 **[Voir la documentation sur les Mots-clés et Fonctions Spéciales (var, db...)](see 03c-mots-cles-speciaux)**

## Expressions Avancées (Concaténation)

Vous pouvez construire des chaînes de caractères complexes en combinant du texte statique et des variables dynamiques à l'aide de l'opérateur `+`.

C'est très utile pour construire des phrases, des URL ou des valeurs d'attributs complexes.

### Texte et Variables

Le texte statique doit être entouré de guillemets simples (`'`).

```html
<!-- 1. Une variable simple -->
<!-- Affiche : "Jean" -->
<span ty-text="user.firstname"></span>

<!-- 2. Concaténation de deux variables -->
<!-- Affiche : "JeanDupont" (sans espace) -->
<span ty-text="user.firstname + user.lastname"></span>

<!-- 3. Pour ajouter un espace, il faut l'inclure dans la chaîne -->
<!-- Affiche : "Jean Dupont" -->
<span ty-text="user.firstname + ' ' + user.lastname"></span>

<!-- 4. Mix texte et variables -->
<!-- Affiche : "Bonjour Jean Dupont !" -->
<h1 ty-text="'Bonjour ' + user.firstname + ' ' + user.lastname + ' !'"></h1>

<!-- Exemple avec métadonnées de page -->
<!-- Affiche : "Article #42: Mon Titre" -->
<h2 ty-text="'Article #' + meta.id + ': ' + meta.name"></h2>
```

## Gestion des attributs HTML avec `ty-attr`

Si aucun attribut `ty-something` n'existe pour votre besoin (ex: `data-id`, `aria-label`...), utilisez `ty-attr`.

**Syntaxe :** `ty-attr="attribut:valeur"`

```html
<!-- Génère <div data-id="123"> -->
<div ty-attr="data-id:user.id">...</div>
```

Pour définir plusieurs attributs, séparez-les par des points-virgules `;` :
```html
<div ty-attr="data-id:user.id;aria-label:user.name">...</div>
```

## Gestion des CSS

### Remplacer les classes (`ty-class`)
Remplace **toutes** les classes existantes.
```html
<!-- La classe "initial" sera perdue -->
<div class="initial" ty-class="user.theme"></div>
```

### Ajouter des classes (`ty-add-class`)
Ajoute des classes sans toucher aux existantes. C'est le choix le plus courant.
```html
<!-- La classe "btn" est conservée, et 'btn-primary' est ajoutée -->
<button class="btn" ty-add-class="theme.buttonStyle">Click</button>
```

### Appliquer des styles (`ty-style`)
L'attribut `ty-style` permet de construire dynamiquement l'attribut `style` d'un élément en utilisant les expressions avancées.

> [!NOTE]
> `ty-style` remplace intégralement l'attribut `style` qui pourrait déjà exister sur l'élément.

```html
<!-- Générera style="width:50%" -->
<div class="progress-bar" ty-style="'width:' + progress + '%'"></div>

<!-- Vous maîtrisez les espaces : -->
<!-- Générera style="width: 50 %" -->
<div class="progress-bar" ty-style="'width: ' + progress + ' %'"></div>
```

## Propriétés Spécifiques

Parfois, un objet (comme un Lien ou une Image) contient plus que sa simple valeur. Vous pouvez accéder à ses propriétés spécifiques avec la notation par point `.`.

```html
<!-- Utilisation des propriétés d'un fichier vidéo -->
<video controls>
    <source ty-src="maVideo.href" ty-type="maVideo.mime">
</video>
```

> Consultez la [fiche Modèles de Données](see 04-ty-attr-modeles) pour voir toutes les propriétés disponibles pour les Images, Fichiers, Liens et Pages.


---


 < !--SOURCE_FILE: 03-espace-architecte/02-tilty-attributes/03b-ty-attr-expressions -->


# Les Expressions Tilty

Les expressions Tilty vous permettent de manipuler vos données directement dans le template HTML. Elles sont particulièrement utiles pour concaténer des chaînes, effectuer des calculs simples ou formater des données.

## Syntaxe de base

Une expression est une combinaison de :
- **Variables** : Chemins vers vos données (ex: `user.name`)
- **Littéraux** : Chaînes de caractères (entre `'`), nombres, booléens
- **Opérateurs** : Pour combiner ou modifier les valeurs

## Concaténation de chaînes

L'opérateur `+` permet de joindre des chaînes de caractères et des variables.

> [!IMPORTANT]
> Les chaînes de caractères statiques doivent toujours être entourées de guillemets simples `'`.

```html
<!-- Exemple simple -->
<h1 ty-text="'Bonjour ' + user.firstname"></h1>

<!-- Exemple multiple -->
<p ty-text="user.firstname + ' ' + user.lastname + ' (' + user.role + ')'"></p>

<!-- Construction d'URL -->
<a ty-href="'/profil/' + user.id">Voir le profil</a>

<!-- Construction de styles -->
<div ty-style="'width:' + progress + '%'"></div>
```

## Opérateurs Logiques

Vous pouvez utiliser des opérateurs logiques, principalement utiles dans `ty-if` ou pour des affichages conditionnels.

| Opérateur | Description    | Exemple                         |
|:---------:|----------------|---------------------------------|
|    `!`    | NON (Négation) | `!user.isActive`                |
|   `&&`    | ET             | `user.isActive && user.hasPaid` |
|     `     |                | `                               | OU | `user.isAdmin || user.isModerator` |

```html
<!-- Affiche le bloc seulement si l'utilisateur est actif ET a payé -->
<div ty-if="user.isActive && user.hasPaid">
    Contenu premium
</div>

<!-- Affiche si l'utilisateur n'est PAS connecté -->
<div ty-if="!user.isLogged">
    Veuillez vous connecter
</div>
```

## Comparaisons

Les opérateurs de comparaison permettent de vérifier des égalités ou des inégalités.

| Opérateur | Description | Exemple |
|:---:|---|---|
| `==` | Égal à | `user.role == 'admin'` |
| `!=` | Différent de | `status != 'draft'` |
| `>` | Supérieur à | `cart.total > 100` |
| `>=` | Supérieur ou égal | `age >= 18` |
| `<` | Inférieur à | `stock < 5` |
| `<=` | Inférieur ou égal | `count <= 10` |

```html
<!-- Affiche un badge si le stock est faible -->
<span ty-if="product.stock < 5">Derniers articles !</span>

<!-- Classe conditionnelle (via expression ternaire simulée ou logique) -->
<!-- Note: Pour des classes conditionnelles complexes, préférez ty-if sur deux éléments distincts ou ty-class -->
```

## Parenthèses

Vous pouvez utiliser des parenthèses `()` pour grouper des expressions et contrôler l'ordre d'évaluation.

```html
<div ty-if="(user.isAdmin || user.isModerator) && user.isActive">
    Accès administration
</div>
```

## Fonctions et Mots-clés spéciaux

Pour accéder à des données globales (`var()`, `db()`), au contexte (`value`, `root`) ou à des utilitaires (`index()`, `locale()`), consultez la documentation dédiée :

👉 **[Voir les Mots-clés et Fonctions Spéciales](see 03c-mots-cles-speciaux)**

## Bonnes pratiques

1. **Restez simple** : Si votre expression devient trop complexe, c'est peut-être le signe qu'il faut préparer cette donnée côté serveur ou structurer vos données différemment.
2. **Attention aux types** : L'opérateur `+` agit différemment selon qu'il s'agit de nombres (addition) ou de chaînes (concaténation).
3. **Guillemets** : Utilisez toujours des guillemets simples `'` pour vos chaînes dans les expressions, car l'attribut HTML utilise souvent des guillemets doubles `"`.

```html
<!-- ✅ Correct -->
<div ty-text="'Prix: ' + price"></div>

<!-- ❌ Incorrect (conflit de guillemets) -->
<div ty-text="Prix: " + price"></div>
```


---


 < !--SOURCE_FILE: 03-espace-architecte/02-tilty-attributes/03c-mots-cles-speciaux -->


# Mots-clés et Fonctions Spéciales

Tilty met à disposition plusieurs mots-clés et fonctions spéciales utilisables dans vos expressions `ty-*`. Ces outils permettent d'accéder à des contextes particuliers ou des données globales.

## Mots-clés de contexte

### `value`
Représente l'objet courant dans le contexte d'une boucle ou d'un scope.
C'est particulièrement utile quand vous itérez sur une liste de valeurs simples (textes, nombres) et non d'objets.

```html
<ul ty-list="tags">
    <!-- Ici, 'value' représente le texte du tag courant -->
    <li ty-list-item="tag" ty-text="value"></li>
</ul>
```

### `root`
Permet de remonter à la racine des données de la page, quel que soit votre niveau de profondeur actuel (dans des boucles ou des scopes imbriqués).

```html
<div ty-scope="product">
    <h1 ty-text="title">Titre du produit</h1>
    
    <!-- Accès au titre de la page (racine) depuis l'intérieur du scope produit -->
    <span ty-text="'Catégorie : ' + root.pageTitle"></span>
</div>
```

## Fonctions globales

### `var()`
Donne accès aux variables globales du projet (configuration, constantes, etc.).

```html
<footer>
    &copy; <span ty-text="var().companyName"></span>
</footer>
```

### `db(uid)`
Permet d'accéder directement à n'importe quel enregistrement de la base de données via son identifiant unique (UID).
Très utile pour créer des liens vers des pages spécifiques ou récupérer des contenus partagés.

**Syntaxe** : `db(type@id)`

```html
<!-- Lien vers la page contact -->
<a ty-href="db(htmlpage@contact).meta.href">Nous contacter</a>

<!-- Afficher le titre d'un article spécifique -->
<h3 ty-text="db(article@123).title"></h3>
```

### `locale()`
Retourne le code de la langue courante (ex: `fr`, `en`).
Utile pour des conditions d'affichage basées sur la langue.

```html
<span ty-if="locale() == 'en'">English version</span>
```

### `index()` (Nouveau)
Retourne l'index numérique de l'élément courant dans une boucle `ty-list`.
L'index commence à 0.

```html
<div ty-list="items">
    <div ty-list-item="item">
        <!-- Affiche : Item #0, Item #1, etc. -->
        <span ty-text="'Item #' + index()"></span>
        
        <!-- Création d'IDs uniques -->
        <div ty-id="'collapse-' + index()">...</div>
    </div>
</div>
```


---


 < !--SOURCE_FILE: 03-espace-architecte/02-tilty-attributes/04-ty-attr-modeles -->


# Modèles de Données

Retrouvez ici le détail des propriétés disponibles pour les différents types d'objets Tilty.

## HtmlPage (Page)

Les métadonnées d'une page sont accessibles via `db(htmlpage@id).meta` ou dans l'objet page courant.

| Meta                  | Type                                        | Explication                                                       |
|:----------------------|:--------------------------------------------|:------------------------------------------------------------------|
| **`uid`**             | `String`                                    | identifiant unique **`htmlpage@id`**                              |
| **`type`**            | `'htmlpage'`                                | type de la page (toujours 'htmlpage')                             |
| **`id`**              | `Number`                                    | identifiant numérique                                             |
| **`name`**            | `String`                                    | Le nom de la page (interne)                                       |
| **`href`**            | `String (localized)`                        | L'URL vers la page (localisée)                                    |
| **`datecreated`**     | `String` (YYYY-MM-DD hh:mm:ss)              | Date de création de la page                                       |
| **`datemodified`**    | `String` (YYYY-MM-DD hh:mm:ss)              | Date de la dernière modification                                  |
| **`template`**        | `String`                                    | Nom du template.html associé                                      |
| **`data`**            | `Object`                                    | Les données de la page (dépend du template)                       |

### Exemple d'utilisation (Page)
```html
<article>
    <h1>Page #<span ty-text="meta.id"></span> : <span ty-text="meta.name"></span></h1>
    <p>Créée le <time ty-text="meta.datecreated"></time></p>
    <a ty-href="meta.href">Lien permanent</a>
</article>
```

### SEO (HtmlPage)

Accessibles via `page.seo` ou `meta.seo`.

| Propriété             | Type                                        | Explication                                                       |
|:----------------------|:--------------------------------------------|:------------------------------------------------------------------|
| **`priority`**        | `Number`                                    | Priorité sitemap (0.0 à 1.0)                                      |
| **`changefreq`**      | `String`                                    | Fréquence sitemap (yearly, monthly, etc.)                         |
| **`noindex`**         | `Bool`                                      | Si true, la page est marquée "no-index" pour les robots           |
| **`href`**            | `String (localized)`                        | URL canonique                                                     |
| **`title`**           | `String (localized)`                        | Titre de la page (balise title)                                   |
| **`description`**     | `String (localized)`                        | Description (meta description)                                    |

### Exemple d'utilisation (SEO)
```html
<!-- Utiliser le titre SEO pour le titre principal -->
<h1 ty-text="meta.seo.title"></h1>

<!-- Utiliser la description SEO comme intro -->
<p class="intro" ty-text="meta.seo.description"></p>
```


## Liens (Link)

Certains types de données comme les liens possèdent des propriétés spécifiques accessibles via `variable.propriété`.

| Propriété      | Type                                | Explication                                                                                                            |
|:---------------|:------------------------------------|:-----------------------------------------------------------------------------------------------------------------------|
| **`value`**    | `String`                            | La valeur brute (URL, email, tel, etc.)                                                                                |
| **`linkType`** | `'url','email','tel','page','file'` | Le type de lien                                                                                                        |
| **`target`**   | `'_blank'` ou `null`                | La cible (`_blank` pour nouvel onglet)                                                                                 |

### Formatage automatique selon linkType

Si vous utilisez la variable directement (`ty-href="monLien"`), Tilty l'adapte :

| Type de lien | Exemple                               | Résultat généré                           |
|:-------------|:--------------------------------------|:------------------------------------------|
| `url`        | https://wikipedia.org                 | `https://wikipedia.org`                   |
| `email`      | contact@email.com                     | `mailto:contact@email.com`                |
| `tel`        | 0606060606                            | `tel:0606060606`                          |
| `file`       | .../x2b12.zip                         | URL brute du fichier                      |
| `page`       | .../mapage.p15                        | URL absolue de la page                    |

### Exemple d'utilisation (Lien)
```html
<!-- Afficher la valeur brute d'un lien (ex: le no de téléphone) -->
<span ty-text="monLien.value"></span>

<!-- Vérifier le type de lien -->
<div ty-if="monLien.linkType == 'tel'">C'est un téléphone !</div>
```

## Fichiers (File)

Propriétés d'un champ fichier/média.

| Propriété       | Type             | Explication                                                                                                                         |
|:----------------|:-----------------|:------------------------------------------------------------------------------------------------------------------------------------|
| **`href`**      | `String`         | L'URL directe vers le fichier (https://...)                                                                                         |
| **`size`**      | `Number`         | Poids en octets                                                                                                                     |
| **`mime`**      | `String`         | Type MIME (ex: 'image/jpeg')                                                                                                        |
| **`type`**      | `String`         | Identique à mime                                                                                                                    |
| **`mediaType`** | `String`         | 'document', 'image', 'video', ou 'audio'                                                                                            |
| **`name`**      | `String`         | Nom du fichier original                                                                                                             |
| **`width`**     | `Number`         | Largeur (si image/vidéo)                                                                                                            |
| **`height`**    | `Number`         | Hauteur (si image/vidéo)                                                                                                            |
| **`duration`**  | `Number (float)` | Durée en secondes (si audio/vidéo)                                                                                                  |
| **`id3`**       | `Object`         | Métadonnées ID3 (Titre, Artiste, Album...) pour l'audio                                                                             |

### Exemple d'utilisation (Fichier)
```html
<!-- Lecteur Audio -->
<audio controls>
  <source ty-src="monSon.href" ty-type="monSon.mime">
</audio>
<p>Durée : <span ty-text="monSon.duration"></span> secondes</p>

<!-- Lien de téléchargement avec le poids -->
<a ty-href="monFichier.href" download>
  Télécharger (<span ty-text="monFichier.size"></span> octets)
</a>
```


---


 < !--SOURCE_FILE: 03-espace-architecte/02-tilty-attributes/05-ty-attr-conditions -->


# Les conditions `ty-if`

L'exemple ci-dessous illustre une problématique courante.

```html
<!-- Problème : cette balise s'affichera toujours, même si le champ monImage est vide -->
<img ty-src="monImage.resize(50,50)" alt="image 1">

<!-- Solution : cette balise ne s'affichera que si le champ monImage est renseigné -->
<img ty-if="monImage" ty-src="monImage.resize(50,50)" alt="image 1">
```

On peut pousser un peu plus loin l'exemple avec une card qui ne s'affiche que si `user.lastName` est renseigné

```html
<div class="card" ty-if="user.lastName">
    <img src="monImage.resize(50,50)" alt="portait">
    <h1 ty-text="user.firstname">Jonh</h1>
    <h2 ty-text="user.lastname">Smith</h2>
</div>
```

On peut aussi conditionner l'affichage à un booléen `user.active` 

```html
<div class="card" ty-if="user.active">
    <img src="monImage.resize(50,50)" alt="portait">
    <h1 ty-text="user.firstname">Jonh</h1>
    <h2 ty-text="user.lastname">Smith</h2>
</div>
```

### L'inverse de `ty-if` (spoiler: ce n'est pas ty-else)

```html
<div class="card" ty-if="user.active">
    <img src="monImage.resize(50,50)" alt="portait">
    <h1 ty-text="user.firstname">Jonh</h1>
    <h2 ty-text="user.lastname">Smith</h2>
</div>

<div class="card" ty-if="!user.active">
    <span class="alert">Cet utilisateur n'a pas activé son compte !</span>
    <img src="img/placeholders/user.jpg" alt="portait">
    <h1>Utilisateur</h1>
    <h2>Inactif</h2>
</div>
```

### Utiliser les Comparaisons

En plus de vérifier si une donnée existe, `ty-if` permet d'écrire des expressions de comparaison.

#### Comparer une valeur

**Problème**   
Vous souhaitez afficher un élément uniquement si une variable a une valeur précise (ex: le type de média est 'video').

**Solution**   
Vous pouvez utiliser l'opérateur `==` pour tester l'égalité.

```html
<!-- S'affiche uniquement si le type est 'video' -->
<div class="video-player" ty-if="media.type == 'video'">
   <video src="..."></video>
</div>
```

Vous pouvez aussi utiliser `!=` pour l'inverse :

```html
<!-- S'affiche pour tout sauf les vidéos -->
<div class="thumbnail" ty-if="media.type != 'video'">
  <img ty-src="media.image" alt="cover">
</div>
```

#### Comparer des nombres

**Problème**   
Vous voulez conditionner l'affichage selon une quantité ou un score.

**Solution**   
Les opérateurs classiques `>`, `<`, `>=`, `<=` sont supportés.

```html
<!-- S'affiche si le produit est en stock faible -->
<span class="warning" ty-if="product.stock < 5">
   Attention, bientôt épuisé !
</span>

<!-- S'affiche si l'utilisateur est majeur -->
<div class="content" ty-if="user.age >= 18">
   Contenu restreint
</div>
```

#### Comparer avec le contexte (ex: Langue)

**Problème**   
Vous voulez afficher un bloc uniquement sur la version française du site.

**Solution**   
Vous pouvez utiliser la fonction locale() directement dans la condition.

```html
<!-- Ne s'affiche que sur la version FR du site -->
<div class="cocorico" ty-if="locale() == 'fr'">
   Fabrication Française 🇫🇷
</div>
```

#### Combiner avec l'inverse (!)

**Problème**   
Vous voulez inverser le résultat d'une comparaison.

**Solution**  
Comme pour les booléens, vous pouvez préfixer toute l'expression par `!` pour en inverser le résultat.

```html
<!-- S'affiche si le prix n'est PAS supérieur à 100 -->
<div class="promo" ty-if="!product.price > 100">
   Petit prix !
</div>
```

#### Résumé des opérateurs supportés		

| Opérateur | Description       | Exemple          |
|:----------|:------------------|:-----------------|
| **`==`**  | Égal à            | `type == 'news'` |
| **`!=`**  | Différent de      | `type != 'ad'`   |
| **`>`**   | Supérieur strict  | `count > 10`     |
| **`<`**   | Inférieur strict	 | `count < 0`      |
| **`>=`**  | Supérieur ou égal | `age >= 18`      |
| **`<=`**  | Inférieur ou égal | `rank <= 3`      |


---


 < !--SOURCE_FILE: 03-espace-architecte/02-tilty-attributes/06-ty-attr-boucles -->


# Les boucles `ty-list`

L'attribut `ty-list` est l'outil indispensable pour itérer sur des collections de données.
Il couvre trois besoins essentiels :

1.  **Listes Éditoriales** : Afficher une collection d'éléments gérés manuellement par l'éditeur (ex: Galerie photos, Menu de navigation, Slider manuel).
2.  **Listes Dynamiques (Query)** : Afficher le résultat d'une requête en base de données (ex: Les 3 derniers articles de blog, Les produits de la catégorie "Été").
3.  **Polymorphisme** : Gérer des listes hétérogènes où chaque élément peut avoir un design différent (ex: Un flux d'actualité mélangeant Articles, Vidéos et Publicités).

## Le concept de Polymorphisme

Dans Tilty, les champs de type "liste" sont polymorphes : cela signifie qu’une seule liste peut contenir différents types de contenus. Par exemple, un pied de page peut contenir à la fois des liens, des séparateurs ou encore du texte statique.

## Syntaxe et fonctionnement

Une boucle **`ty-list`** s’applique directement sur un conteneur HTML, typiquement une balise `<ul>`, `<div>`, etc.

À l’intérieur de ce conteneur, chaque type d’élément doit avoir un attribut `ty-list-item="nomDuType"`. Cela permet de définir quel bloc HTML utiliser selon le type d'item.

### Un exemple, deux possibilités de syntaxe

Voici ci-dessous deux exemples de syntaxe de la même liste qui comporte deux types d'item:

-  un objet qui contient lui même deux champs texte   
- et un fichier (une image)

#### Version complète

```html
<ul ty-list="$element in liste">
    <li ty-list-item="titleAndTextObject">
        <h2 ty-html="$element.titre">...</p>
        <p ty-html="$element.texte">...</p>
    </li>
    <li ty-list-item="image">
        <img ty-src="$element"/>
    </li>
</ul>
```

#### Version simplifiée

Pour plus de lisibilité, vous pouvez utiliser la forme simplifiée `ty-list="liste"`, sans variable (`$quelqueChose`). Dans ce cas, chaque `ty-list-item` a pour contexte l'élément lui-même, et non plus une variable intermédiaire.

```html
<ul ty-list="liste">
    <li ty-list-item="titleAndTextObject">
        <h2 ty-html="titre">...</p>
        <p ty-html="texte">...</p>
    </li>
    <li ty-list-item="image">
        <img ty-src="value"/>
    </li>
</ul>
```

Le mot-clé `value` sert ici à faire référence à la donnée brute de l’item (utile pour les fichiers, pages, titres, paragraphes, etc.).

### Pourquoi cette complexité ?

Parce que Tilty ne fait pas de supposition sur les types présents dans vos listes. Vous êtes libre d’y mélanger du texte, des liens, des fichiers, etc.

Cette souplesse implique une rigueur dans le balisage, mais vous donne un contrôle total sur la structure HTML générée.

## Boucles dynamiques (Queries)

Pour afficher des listes issues de requêtes complexes (ex: "Les 3 derniers articles"), consultez la documentation dédiée (Brouillon) :

👉 **[Voir Tilty Queries (Draft)](see ../../99-draft/draft-ty-list-query)**

## Contexte de boucle (Index, Racine)

Vous pouvez accéder à des informations contextuelles supplémentaires à l'intérieur de vos boucles, comme le numéro de l'itération courante (`index()`) ou les données de la racine de la page (`root`).

```html
<div ty-list="items">
    <div ty-list-item="item">
        <!-- Affiche le numéro de l'élément (0, 1, 2...) -->
        <span ty-text="index()"></span>
    </div>
</div>
```

## Silencer un type intentionnellement non affiché : `ty-void`

Il arrive qu'une liste contienne des types de données pour lesquels vous n'avez délibérément pas prévu de rendu HTML. Par exemple, une liste `sections` peut contenir des items de type `paragraphe` que vous choisissez d'ignorer dans ce template précis.

Dans ce cas, Tilty affiche un avertissement informatif pour signaler l'absence de template. Pour le supprimer, posez `ty-void` directement sur le nœud `ty-list` avec la liste des types à ignorer, séparés par des virgules :

```html
<div ty-list="sections" ty-void="paragraphe,subtitle">
    <h1 ty-list-item="titre" ty-html="value">Titre</h1>
</div>
```

Cela indique au moteur de Tilty que l'absence de template pour `paragraphe` et `subtitle` est intentionnelle, et non un oubli.

👉 **[Voir la documentation complète sur les Mots-clés et Fonctions](see 03c-mots-cles-speciaux)**


---


 < !--SOURCE_FILE: 03-espace-architecte/02-tilty-attributes/07-ty-attr-avance -->


# Transmettre des variables à javascript via Tilty-json.

Parfois, il est nécessaire de pouvoir récupérer au sein de javascript des variables qui proviennent de la base de données Tilty.

| `TODO` | ty-json |
|:-------|:--------|

```html
<script ty-json>
{
homeHref:"db(htmlpage@1).meta.href"
}
</script>
```

# L'assistant Tilty Attributes

Cet outil uniquement destiné aux architectes permet d'intégrer et débugger les tilty attributes.

# Créer des champs manquants

Vous permet de **créer rapidement** les champs déclarés dans votre HTML mais **qui ne sont pas déclarés** dans Tilty.  
L'outil offre deux options pour chaque champ:

- vous pouvez créer le champ directement avec les options choisies par Tilty  
- vous pouvez modifier le champ avant de le créer.

## Comment fonctionne l'outil de création de champs ?

Pour opérer sa magie, l'outil tente de déterminer à partir de votre code HTML le type de champ le plus approprié, texte, fichier, liste, etc…  
Analysons quelques exemples:

##### Exemple Fichier / Image

```html
<img ty-src="monImage.resize(50,50)"/>
```

Dans ce cas, le champ sera de type **fichier / image** sans trop d'hésitation car on est sur un attribut ty-src d'une balise img et le champ contient la fonction [resize](#la-fonction-resize\(...\)-sur-les-images).  
Enfin, par défaut les champs fichier ne sont pas traduits.

##### Exemple Fichier / Vidéo

```html
<video ty-src="maVideo"/>
```

Dans ce cas, le champ sera de type **fichier / vidéo** sans trop d'hésitation non plus car on est sur un attribut ty-src d'une balise video.  
Enfin, par défaut les champs fichier ne sont pas traduits.

##### Exemple Texte enrichi

```html
<h1 ty-html="monTitre">    Hello <i>world</i> </h1>
```

Ici, le champ sera de type **texte / enrichi** et sera **traduit**.  
La balise étant H1 et le contenu de la balise dans le template comportant du code HTML on en déduit facilement qu'il s'agit d'un texte avec options de formatage.  
Enfin, par défaut les champs texte sont traduits.

##### Exemple Texte simple

```html
<h1 ty-html="monTitre">    Hello world </h1>
```

Par contre ici, le champ sera de type **texte / simple** et sera toujours **traduit**.  
La balise étant H1 et le contenu de la balise dans le template ne comportant pas de code HTML on en déduit facilement qu'il s'agit d'un texte sans options de formatage.  
Enfin, et comme précédemment, par défaut les champs texte sont traduits.

## Bonnes pratiques

Ainsi, vous l'aurez compris, plus votre template HTML sera précis, plus l'outil de création de champ sera en mesure de déterminer automatiquement quel type de champ il faut générer.

# Notes à garder en tête lors de l'intégration des ty-attributes.

## Champs texte enrichi

Chaque CMS a ses propres limites quand on parle de texte enrichi. Tilty n'échappe pas à la règle. 

### Balises inline uniquement dans les éléments inline

Lorsque vous configurez un champ comme texte enrichi, l'utilisateur peut saisir du contenu formaté qui génère du HTML (gras, italique, liens, etc.). Cependant, si ce champ est affiché dans une balise inline (comme `<span>`, `<a>`, `<strong>`) via `ty-html`, Tilty doit respecter les règles HTML : pas de balises bloc (`<h1>`, `<p>`, `<div>`) dans les éléments inline. Les balises de bloc sont automatiquement supprimées et remplacées par des `<br>` pour préserver les sauts de ligne.

##### ❌ Ce que vous écrivez dans l'éditeur :

```html
<span ty-html="description">  <!-- description contient: "<h1>Titre</h1><p>Paragraphe</p>" --> </span>
```

##### ✅ Ce que Tilty génère (HTML valide) :

```html
<span>Titre<br>Paragraphe</span>
```

### Pas de liens imbriqués

Si vous affichez un champ texte enrichi dans une balise `<a>` via `ty-html`, et que l'utilisateur a saisi des liens dans l'éditeur enrichi, Tilty doit respecter les standards HTML qui interdisent les balises `<a>` imbriquées. Les liens contenus dans le texte enrichi sont automatiquement supprimés, seul le texte cliquable est conservé.

##### Ce que l'utilisateur saisit dans l'éditeur enrichi :

```html
<a ty-html="description">  <!-- L'utilisateur a saisi: "Visitez <a href='https://example.com'>notre site</a>" --> </a>
```

#####  Ce que Tilty génère (HTML valide) :

```html
<a>Visitez notre site</a>
```

# 

# Tips & Tricks

# Comprendre les contextes d’exécution de votre code HTML dans Tilty

Lorsque vous travaillez avec Tilty, votre code HTML, CSS ou JavaScript peut être exécuté dans différents environnements. Il est essentiel de comprendre dans quel contexte votre code sera interprété pour garantir un comportement adapté.

### Les différents contextes

#### 1. Template HTML

Votre code est encore brut : il n’a pas encore été traité par Tilty. Aucun lien n’existe à ce stade avec le CMS.

#### 2. Éditeur de contenu (CMS)

Le code HTML est enrichi dynamiquement avec les données du CMS. Les éditeurs peuvent interagir avec le contenu en temps réel.

#### 3. Version “Next”

Identique au mode CMS, mais sans les outils d’édition. Elle permet de prévisualiser le rendu final de manière isolée.

#### 4. Version publiée (Published)

Il s’agit de la version publique de votre page, celle visible par tous après publication.

---

### Adapter le comportement selon le contexte

Dans certains cas, vous souhaiterez que votre code réagisse différemment selon le contexte d’exécution. Par exemple, il peut être pertinent de désactiver certaines animations en mode CMS pour améliorer les performances ou l’ergonomie.

Pour ce faire, Tilty met à votre disposition :

* une variable JavaScript : `window.tyHtmlContext`  
* un attribut HTML sur la balise `<body>` : `ty-html-context`

Voici les valeurs associées selon le contexte :

| Contexte  | JavaScript                           | Attribut HTML                        |
|-----------|--------------------------------------|--------------------------------------|
| Template  | *non défini*                         | *non défini*                         |
| CMS       | `window.tyHtmlContext = "cms"`       | `<body ty-html-context="cms">`       |
| Next      | `window.tyHtmlContext = "next"`      | `<body ty-html-context="next">`      |
| Published | `window.tyHtmlContext = "published"` | `<body ty-html-context="published">` |

**Remarque** : Dans le contexte “Template”, aucune variable JavaScript ni attribut HTML n’est présent, car le code n’est pas encore interprété par Tilty.

---

### Sélecteurs CSS d’attribut : exemples pratiques

Pour adapter vos styles en fonction du contexte, vous pouvez utiliser des **sélecteurs CSS d’attribut** comme illustré ci-dessous :

```css
/* Styles spécifiques au mode CMS */
body[ty-html-context="cms"] {
  /* Par exemple : désactiver les animations */
  animation: none !important;
}

/* Styles spécifiques au mode Next (prévisualisation sans édition) */
body[ty-html-context="next"] {
  /* Par exemple : forcer un fond blanc */
  background-color: white;
}

/* Styles spécifiques à la version publiée */
body[ty-html-context="published"] {
  /* Par exemple : activer les effets visuels finaux */
  transition: all 0.3s ease;
}
```

💡 Ce type de sélecteur est particulièrement utile pour adapter finement votre design et vos interactions selon l’environnement d’exécution de votre code HTML.

# Sous le capot

## Comment fonctionne Tilty attributes ?

Tilty attribute fonctionne exclusivement au sein de tilty.app.  
Tilty attributes utilise les templates conjointement avec la base de données afin de modifier le html et ainsi générer des pages statiques.

Ordre d'exécution de tilty attributes sur une page HTML donnée.

* Supprime les ty-ignore et ty-name="ignore"  
* isole le contexte du html  
  * Traite les ty-for un après l'autre  
  * Génère les blocs issus des ty-name  
    * isole le contexte des ty-name générés  
    * Traite les ty-for un après l'autre  
      * etc récursivement…

| Attributs techniques |                            |                                                       |
|:---------------------|:---------------------------|:------------------------------------------------------|
| `ty-iid-xxxx`        | `ty-iid =  intégration id` | correspond à une injection d'une donnée dans un nœud. 
xxxx correspond à l'id d'un champ ce qui permet de retrouver les intégrations d'un champ dans la page html. 
 L'utilisation d'attributs et non de valeurs d'attributs permet de cibler plusieurs champs sur le même noeud html.  |
|  |  |  |
|  |  |  |




---


 < !--SOURCE_FILE: 03-espace-architecte/02-tilty-attributes/08-ty-attr-images -->


# Les images

Tilty permet de lier une image à un élément HTML en utilisant des attributs standards comme `src` pour n'en citer qu'un. 
Pour garantir des performances optimales et une expérience utilisateur fluide, il est essentiel d'optimiser ces images.

Par exemple si vous faites un `html ty-src="monImage"` mais que l'image saisie par un éditeur pèse 10 Mo, cela va ralentir le chargement de la page et impacter négativement l'expérience utilisateur.

Pour éviter cela c'est très simple au lieu de faire:

```html
<!-- pas bueno -->
<img ty-src="monImage" alt="Image non optimisée">
```
Faites plutôt:
```html
<!-- bueno -->
<img ty-src="monImage.resize(800,800)" alt="Image qui mesure au maximum 800x800 pixels au format webp">
```

### La fonction `resize(...)` sur les images

Sur les champs de type `file` et lorsque celui-ci est une image, la fonction `image.resize(...)` permet de générer automatiquement une version redimensionnée d’une image, avec les dimensions, le mode, la compression et le format de votre choix.

Exemple d'utilisation

```html
<img ty-src="image.resize(800, 600, contain, ff0000, 80, webp)" src="placeholder.jpg">
```

#### Signification des paramètres

1. **Largeur (`800`)**  
    La largeur maximale souhaitée de l’image, en pixels.

2. **Hauteur (`600`)**  
    La hauteur maximale souhaitée de l’image, en pixels.

3. **Mode de redimensionnement (`contain`)**  
    Indique comment l’image doit s’adapter à ces dimensions (voir la liste des modes ci-dessous).

4. **Couleur de fond (`ff0000`)**  
    Couleur utilisée si l’image ne remplit pas tout l’espace ou que l'image d'origine comporte de la transparence. 

5. **Qualité (80)**  
    Une valeur entre 1 (qualité faible) et 100 (qualité maximale). Influence le poids du fichier.  
   N'a de sens que sur les formats `jpg` et `webp` 

6. **Format (webp)**  
    Format de sortie de l’image : `jpg`, `png`, `webp` ou `gif`.

---

#### Modes disponibles

* **resize** : Redimensionne exactement à la taille demandée, même si cela déforme l’image.

* **resizedown** : Comme resize, mais sans jamais agrandir l’image d’origine.

* **scale** : Redimensionne en conservant les proportions de l’image.

* **scaledown** : Comme scale, mais sans agrandissement.

* **cover** : L’image remplit entièrement la zone, quitte à être rognée.

* **coverdown** : Comme cover, mais ne dépasse jamais la taille originale.

* **pad** : Centre l’image et ajoute un fond si elle ne remplit pas tout l’espace.

* **contain** : Comme pad, mais peut aussi agrandir l’image si besoin.

---

#### Couleurs acceptées

* `transparent` : pour ne pas avoir de fond

* Un code hexadécimal comme `#ffffff` (blanc),

* Un code hexadécimal comme  `#00000088` (noir semi-transparent)

* `FF0000` fonctionne aussi

---

#### Formats d’image supportés

* **jpg** : format classique, sans transparence

* **png** : qualité élevée, supporte la transparence

* **webp** : format moderne, léger, idéal pour le web

* **gif** : pour des images animées simples

#### Exemples

Une image WebP redimensionnée à `800×800px` maximum, avec fond transparent, qualité 80 :

```html
<img ty-src="image.resize(800,800)" src="placeholder.jpg">
```

Une image WebP redimensionnée à `800×800px`, rognée pour couvrir entièrement la zone, fond transparent, qualité 50 :

```html
<img ty-src="image.resize(800,800,'cover','transparent',50,'webp')" src="placeholder.jpg">
```

Une image PNG redimensionnée à `300×200px`, avec ajout de marges pour respecter le ratio (pad), fond rouge semi-transparent `#ff000088`, qualité 40 :

```html
<img ty-src="image.resize(300,200,'pad','#ff000088',40,'png')" src="placeholder.jpg">
```

### Url des images

Les images sont stockées sur le serveur sans perte de qualité, cependant ce même serveur peut distribuer des images optimisées à la demande.

`//           src       w       h        mode     background  quality  ext`  
`$reg="/^im\/(.*)\/im-([0-9]+)x([0-9]+)-([a-z]+)-([A-Za-z0-9]+)-([0-9]+)\.([a-z]+)/";`

`im/[path]/im-[width]x[height]-[mode]-[background]-[quality].[extension]`

| Paramètre          | Exemple              | Description                                                                                              |
|:-------------------|:---------------------|:---------------------------------------------------------------------------------------------------------|
| `[path]`           | `fs/up/bidule.png`   | `url relative de l’image source`                                                                         |
| `[width]x[height]` |                      | `Largeur et hauteur max de l’image de sortie souhaitée. Il est à noter qu'aucune image ne sera agrandie` |
| `[mode]`           | `cover contain`      | `mode de redimensionnement`                                                                              |
| `[background]`     | `transparent FF0033` | `Couleur de fond`                                                                                        |
| `[quality]`        | `50`                 | `qualité de 0 à 100 applicable sur jpg et webp`                                                          |
| `[extension]`      | `jpg png webp`       |                                                                                                          |


---


 < !--SOURCE_FILE: 03-espace-architecte/02-tilty-attributes/09-fine-tuning-wysiwyg -->


# Tilty-wysiwyg (ty-wy)

Parce que personne n'a envie d'apprendre le JSON pour mettre à jour son site web.

Conjointement à Tilty Attributes, le mécanisme WYSIWYG s'invite à la fête pour transformer votre HTML statique en véritable interface d'édition. 
Automatiquement, comme par magie (ou presque), des éléments d'interface viennent se greffer sur vos balises `ty-*` pour permettre à vos utilisateurs de tout casser... pardon, de tout éditer avec grâce.

# Le WYSIWYG dans Tilty

![wysiwyg-ui-example.png](../../03-espace-architecte/images/wysiwyg-ui-example.png)

## Pourquoi utiliser un système WYSIWYG ?

Tilty offre un contrôle chirurgical des données, ce qui est génial pour votre base de données mais peut transformer l'édition en une séance de torture administrative. Avec une approche WYSIWYG *by design*, l’interface HTML — que tout le monde comprend (ou croit comprendre) — devient le point d'entrée. 

Vous modifiez le contenu là où il s'affiche. C'est intuitif, c'est rapide, et ça évite les allers-retours frustrants entre un formulaire obscur et "F5" sur la page.

# Mise en oeuvre du WYSIWYG

Par défaut, si vous utilisez des Tilty Attributes, le wysiwyg est activé. Tilty suppose que vous voulez éditer ce que vous affichez. Audacieux, non ?
Mais parfois, Tilty est un peu trop enthousiaste. Voici comment le calmer.

## Référence des attributs ty-wy

| Attribut | Élément cible | Valeurs possibles | Description |
|:---|:---|:---|:---|
| [`ty-wy-ignore`](#ignorer-le-wysiwyg-ty-wy-ignore) |Tout élément | `(vide)`, `children`, `self` | **"Touche pas à ça"**. <br>`(vide)`: Tilty boude et ignore tout (élément et enfants).<br>`children`: Tilty ignore les enfants de cet élément.<br>`self`: Tilty ignore cet élément (le plus subtil). |
| [`ty-wy-list-item-ignore`](#desactiver-des-actions-de-liste-ty-wy-list-item-ignore) | `ty-list`, `ty-list-item` | `(vide)`, `sort`, `add`, `duplicate`, `delete` | **"Pas touche aux boutons"**.<br>Désactive sélectivement les actions d'une liste ou d'un item.<br>`(vide)`: Désactive tout.<br>`sort`: Cache le drag et les flèches.<br>`add`: Cache le bouton d'ajout.<br>`duplicate`: Cache le bouton dupliquer.<br>`delete`: Cache le bouton supprimer. |
| [`ty-wy-align`](#positionnement-des-boutons-ty-wy-align) | `ty-list`, `ty-list-item` | `top`, `middle`, `bottom`<br>`left`, `center`, `right`| **"Bouge de là"**.<br>Définit où ces maudits boutons d'action doivent s'afficher pour ne pas gâcher votre design.<br>Défaut : `top right` (là où ça gêne souvent). |
| [`ty-wy-direction`](#orientation-de-la-liste-ty-wy-direction) | `ty-list` | `x`, `y` | **"Vers l'infini et..."**.<br>`y` (défaut) : Liste verticale (Monter/Descendre).<br>`x` : Liste horizontale (Gauche/Droite), parce que le scroll horizontal existe aussi. |
| [`ty-wy-refresh`](#forcer-le-rechargement-ty-wy-refresh) | Tout élément | `page` | **"F5 forcé"**.<br>Force le rechargement complet de la page lors de la modification de cet élément (ou de ses enfants), au lieu du rafraîchissement partiel habituel. |

## Personnalisation des contrôles de liste

Quand vous créez des listes (`ty-list`), Tilty parsème joyeusement des boutons (ajouter, monter, descendre...) un peu partout. C'est pratique, sauf quand ça cache votre superbe mise en page.

Heureusement, vous pouvez reprendre le contrôle.

### Positionnement des boutons (`ty-wy-align`)

L'attribut `ty-wy-align` se place :
- Sur l'élément **`ty-list-item`** pour un positionnement individuel.
- Sur l'élément **`ty-list`** pour définir un positionnement par défaut pour tous les items de la liste.

Il accepte une combinaison de positions verticales et horizontales.

**Valeurs possibles :**
- Vertical : `top` (défaut), `middle`, `bottom`
- Horizontal : `left`, `center`, `right` (défaut)

**Exemples :**

```html
<!-- Boutons centrés au milieu de l'élément, parce que vous aimez le chaos -->
<div ty-list-item ty-wy-align="middle center">...</div>

<!-- Boutons en bas à gauche, discret, presque invisible -->
<div ty-list-item ty-wy-align="bottom left">...</div>
```

### Orientation de la liste (`ty-wy-direction`)

L'attribut `ty-wy-direction` se place sur l'élément conteneur **`ty-list`**. Il indique l'orientation visuelle de votre liste, ce qui permet à Tilty de comprendre que "Monter" dans une liste horizontale signifie "Aller à gauche" (et inversement).

**Valeurs possibles :**
- `y` (défaut) : Liste verticale. Les flèches pointent vers le haut (Monter) et le bas (Descendre). Classique.
- `x` : Liste horizontale. Les flèches sont pivotées pour pointer vers la gauche (Précédent) et la droite (Suivant). Révolutionnaire.

**Exemple :**

```html
<div ty-list class="flex-row" ty-wy-direction="x">
    <!-- J'hérite de la direction horizontale wouw -->
    <div ty-list-item ty-wy-align="top center">Item 1</div>
    <div ty-list-item ty-wy-align="top center">Item 2</div>
</div>
```

### Désactiver des actions de liste (`ty-wy-list-item-ignore`)

Par défaut, un item de liste affiche toute la panoplie d'outils : déplacer, ajouter, dupliquer, supprimer. Parfois, vous voulez restreindre ces actions pour préserver l'intégrité de votre mise en page.

L'attribut `ty-wy-list-item-ignore` peut être placé sur :
- Un **`ty-list`** : l'interdiction s'applique à tous les items de la liste.
- Un **`ty-list-item`** : l'interdiction ne concerne que cet item spécifique.

**Valeurs possibles :**
- `(vide)` : Toutes les options sont désactivées.
- `sort` : Les flèches de déplacement et la poignée de drag n'apparaissent pas.
- `add` : Le bouton d'ajout (+) n'apparaît pas.
- `duplicate` : Le bouton de duplication n'apparaît pas.
- `delete` : Le bouton de suppression n'apparaît pas.

**Concaténation :**
Vous pouvez cumuler les interdictions en séparant les valeurs par un espace.

**Exemples :**

```html
<!-- Une liste où on ne peut ni ajouter, ni supprimer d'éléments -->
<div ty-list ty-wy-list-item-ignore="add delete">
    <div ty-list-item>Item 1</div>
    <div ty-list-item>Item 2</div>
</div>

<!-- Un item spécifique qu'on ne peut pas déplacer -->
<div ty-list-item ty-wy-list-item-ignore="sort">Item fixe</div>
```

### Ignorer le WYSIWYG (`ty-wy-ignore`)

Parfois, vous voulez juste que Tilty vous laisse tranquille sur certains blocs. L'attribut `ty-wy-ignore` est là pour ça.

Il s'utilise selon une gradation de "laissez-moi tranquille" :

**1. Tout ignorer (Bourrin)**
L'attribut vide (ou n'importe quelle valeur inconnue) dit à Tilty : "Cet élément n'existe pas pour toi, ni lui, ni ce qu'il contient".
C'est radical.

```html
<!-- "user-card" est totalement ignoré. Tilty ne voit rien, comme si ce bloc était statique. Impossible de l'éditer, le déplacer ou modifier ses enfants -->
<div class="user-card" ty-wy-ignore ty-scope="user">
   <h2 ty-text="firstname">John</h2>
   <h2 ty-text="lastname">Doe</h2>
</div>
```

**2. Ignorer les enfants (Protecteur)**
Vous appliquez ce réglage sur un élément parent (ex: une carte utilisateur) que vous voulez rendre éditable globalement (ex: pour changer une couleur de fond via un champ), tout en interdisant l'édition directe de son contenu texte.

```html
<!-- On peut cliquer sur la "user-card" pour l'éditer, mas ses enfants (John, Doe) ignorent le clic -->
<div class="user-card" ty-wy-ignore="children" ty-scope="user">
   <h2 ty-text="firstname">John</h2>
   <h2 ty-text="lastname">Doe</h2>
</div>
```

**3. Ignorer soi-même (Subtil)**
À l'inverse, ici le conteneur devient "transparent" pour le WYSIWYG. Il est impossible de sélectionner le bloc "user-card" lui-même, en revanche ses enfants sont accessibles et éditables individuellement.

```html
<!-- La "user-card" est intouchable (le clic passe au travers), par contre on peut cliquer et éditer John et Doe -->
<div class="user-card" ty-wy-ignore="self" ty-scope="user">
   <h2 ty-text="firstname">John</h2>
   <h2 ty-text="lastname">Doe</h2>
</div>
```

### Forcer le rechargement (`ty-wy-refresh`)

Tilty utilise un système de rafraîchissement partiel intelligent pour ne mettre à jour que ce qui change. C'est rapide, mais parfois ça casse vos scripts JS complexes (sliders, cartes interactives...).

Si vous avez un bloc capricieux qui nécessite un rechargement complet de la page pour s'afficher correctement après une modification, utilisez `ty-wy-refresh="page"`.

```html
<!-- Si je modifie ce bloc ou ses enfants, Tilty rechargera toute la page (iframe) -->
<div class="mon-slider-capricieux" ty-wy-refresh="page">
    ...
</div>
```

> Pour en savoir plus sur le fonctionnement du rafraîchissement partiel et comment adapter vos scripts JS, consultez le chapitre dédié : [10 - Le Rafraîchissement Partiel](see 10-rafraichissement-partiel).


---


 < !--SOURCE_FILE: 03-espace-architecte/02-tilty-attributes/10-rafraichissement-partiel -->


# Le Rafraîchissement Partiel

> **Note importante** : Ce chapitre concerne uniquement le comportement de votre site lorsqu'il est affiché dans l'interface d'administration de Tilty (**Mode Édition**). Sur le site final publié, vos visiteurs ne sont pas concernés par cette mécanique.

Pour vous offrir une expérience d'édition fluide (et éviter de vous faire cligner des yeux toutes les 3 secondes), Tilty utilise une technique de **rafraîchissement partiel**.

Concrètement : au lieu de recharger toute la page à chaque fois que vous corrigez une faute de frappe ou déplacez un bloc, Tilty remplace chirurgicalement uniquement le bout de HTML qui a changé. C'est magique, mais ça a un impact sur vos scripts JS.

## Le problème avec le JavaScript

Si vous êtes du genre à initialiser vos sliders, carrousels et autres feux d'artifice au chargement de la page (`DOMContentLoaded` ou `$(document).ready`), sachez que **ces scripts ne s'exécuteront pas tout seuls sur les nouveaux éléments injectés**.

### Exemple tragique

Imaginez un slider initialisé comme ceci :

```javascript
// Ce code ne s'exécute qu'une seule fois, quand la page se réveille
document.addEventListener("DOMContentLoaded", () => {
    $('.mon-super-slider').slick();
});
```

Si l'utilisateur ajoute un nouveau bloc contenant `.mon-super-slider`, ce bloc arrive tout frais dans la page, mais votre plugin `slick()` ne le voit pas passer. Résultat : votre slider ressemble à une liste à puces toute triste.

## La solution : l'événement `ty-wy:refresh`

Pour permettre aux scripts de détecter ces changements, Tilty émet un événement `ty-wy:refresh` sur l'objet `document` après chaque injection de contenu HTML.

Cet événement contient une propriété `detail.target` qui référence l'élément racine (le conteneur) qui vient d'être mis à jour.

### Comment l'utiliser

Il suffit d'écouter cet événement pour relancer vos scripts sur les petits nouveaux.

#### Version Vanilla JS (Puriste)

```javascript
// Une fonction pour les gouverner tous
function initMesBidules(rootElement) {
    // On cherche UNIQUEMENT à l'intérieur de l'élément fourni
    // (rootElement peut être toute la page ou juste un petit bout)
    const sliders = rootElement.querySelectorAll('.mon-super-slider');
    sliders.forEach(slider => {
        // Hop, on initialise
        console.log("Et un slider de plus !", slider);
        // new SuperSlider(slider)...
    });
}

// 1. Au démarrage
document.addEventListener("DOMContentLoaded", () => {
    initMesBidules(document);
});

// 2. Quand Tilty fait des retouches
document.addEventListener("ty-wy:refresh", (e) => {
    const leNouveauBoutDeCode = e.detail.target;
    initMesBidules(leNouveauBoutDeCode);
});
```

#### Version jQuery (Classique)

```javascript
function initPlugins($context) {
    // On cherche dans le contexte donné
    $context.find('.mon-super-slider').slick({
        dots: true,
        infinite: true,
        autoplay: true, // C'est plus festif
    });
}

$(document).ready(function() {
    // Init globale au chargement
    initPlugins($(document));

    // Init quand Tilty met à jour un morceau
    document.addEventListener("ty-wy:refresh", (e) => {
        initPlugins($(e.detail.target));
    });
});
```

## Bonnes pratiques

1.  **Ne soyez pas bourrin** : Utilisez toujours le `rootElement` (ou `$context`) passé en paramètre. Si vous faites `$('.mon-slider')` sans contexte, vous allez ré-initialiser tous les sliders de la page à chaque fois. Et un slider dans un slider, c'est moche.
2.  **Vérifiez vos arrières** : Assurez-vous que vos fonctions peuvent être appelées plusieurs fois sans tout casser. Vérifiez si une classe (ex: `.slick-initialized`) existe déjà.

## Désactiver le rafraîchissement partiel

Parfois, c'est trop compliqué. Vous avez un framework JS capricieux, une usine à gaz qui gère tout le DOM, et le rafraîchissement partiel met le bazar. Pas de panique, vous pouvez le désactiver.

### 1. Au niveau du DOM (Local)

Ajoutez l'attribut `ty-wy-refresh="page"` sur un élément HTML.
Toute action dans cette zone déclenchera un rechargement complet de la page (à l'ancienne).

```html
<!-- Touche pas à ça p'tit gars -->
<div class="widget-tres-complique" ty-wy-refresh="page">
    <ul ty-list="mes_items">...</ul>
</div>
```

**Pour désactiver sur toute la page :**
```html
<body ty-wy-refresh="page">
    ...
</body>
```

### 2. Au niveau du Projet (Global)

> **TODO** : Cette option arrive bientôt (promis).

Dans les paramètres du projet, vous pourrez cocher une case pour désactiver ça partout.

### 3. Au niveau de l'Utilisateur (Préférences)

> **TODO** : Cette option arrive bientôt aussi.

Dans vos préférences personnelles, vous pourrez choisir de revenir au rechargement complet si vous êtes nostalgique.


---


 < !--SOURCE_FILE: 04-technique/12-agents-ia -->


# Intégration avec les Agents IA

> [!NOTE]
> **Vision Prospective**
> Ce document décrit la vision à long terme de la **collaboration entre Tilty et les Agents IA**. Bien qu'il soit rédigé au présent pour des raisons de fluidité, certaines fonctionnalités ou comportements décrits ici reflètent ce que l'écosystème Tilty **deviendra** dans les mois à venir, et non nécessairement son état actuel.

Autant le dire d'emblée et une fois pour toutes : **non, Tilty n'est pas et ne sera jamais une IA**. Fidèle à sa philosophie frugale, il n'embarque aucun réseau de neurones, ne rêve pas de moutons électriques et ne tentera pas de dominer le monde.

Tilty reste un système **léger, simple et autonome**. Son génie réside ailleurs : il fournit une structure sémantique tellement claire que les Agents IA (ChatGPT, Claude, etc.) peuvent la comprendre et la manipuler avec une efficacité redoutable. **Tilty n'est pas l'intelligence, il est un terrain de jeu idéal pour l'intelligence.**

Enfin, clarifions une chose : Tilty ne se réclame pas de ces *"outils magiques"* où il suffit de prompter *"Fabrique-moi un site"* pour obtenir un résultat qui fonctionne "comme par magie" (tant que vous ne touchez à rien 😅). Tilty s'adresse à un **public de professionnels** qui exigent un contrôle total sur leur code source. Nous sommes ici à l'exact opposé du *Vibe Coding* : avec Tilty, l'humain reste le pilote, l'IA n'est que le copilote qui gère les tâches répétitives.

C'est pourquoi Tilty est **foncièrement agnostique**. Nous ne voulons pas vous enfermer dans un écosystème d'IA propriétaire. Que vous utilisiez ChatGPT, Claude, Mistral ou un modèle local open-source tournant sur votre machine, Tilty reste simplement du HTML bien structuré couplé à un CMS très typé. **Vous êtes libre de choisir votre intelligence.**

## Domaines d'intervention

On distingue deux grands cas d'usage où l'IA peut assister le créateur Tilty :

1.  **La Création ("Tiltyfication")** : Transformer du HTML statique en modèles Tilty.
2.  **L'Édition (Contenu et Sémantique)** : Générer, traduire ou optimiser le contenu.

Pour réaliser ces tâches, l'IA s'appuie sur un ensemble d'outils et de contextes (Documentation, Assistants de code, API) qui servent de **pont** entre votre intention et le système Tilty.

---

## 1. Création : La "Tiltyfication"

Le domaine où les agents IA excellent avec Tilty est la **Tiltyfication** : l'action de transformer une page HTML statique en un modèle dynamique géré par Tilty.

### Pourquoi ça marche ?
Contrairement à d'autres CMS qui nécessitent d'apprendre des syntaxes complexes ou des structures de fichiers propriétaires, Tilty utilise de simples attributs HTML (`ty-*`). 

Un agent IA peut analyser une maquette HTML existante et y ajouter les attributs nécessaires pour :
1. **Identifier les zones éditables** (`ty-html`).
2. **Détecter les listes répétitives** (`ty-list`).
3. **Mapper les sources d'images** (`ty-src`).
4. **etc...**

### Exemple de transformation automatique

Imaginez que vous donniez ce code HTML à une IA :

```html
<article>
  <h1>Pourquoi les chats dominent le monde</h1>
  <div class="content">
    <p>Une étude sérieuse sur leur <strong>complot</strong> mondial.</p>
  </div>
</article>
```

L'IA est capable de comprendre le rôle de ces éléments et de les "Tiltyfier" automatiquement :

```html
<article>
  <h1 ty-text="title">Pourquoi les chats dominent le monde</h1>
  <div class="content" ty-html="articleBody">
    <p>Une étude sérieuse sur leur <strong>complot</strong> mondial.</p>
  </div>
</article>
```

Dans cet exemple, l'agent a pris plusieurs décisions logiques :
- **Choix du type de champ** : 
    - Pour le `h1`, elle choisit **`ty-text`** car c'est un titre (texte brut).
    - Pour la `div.content`, elle choisit **`ty-html`** car elle détecte des balises HTML (`<p>`, `<strong>`) à l'intérieur, indiquant un besoin d'éditeur riche (WYSIWYG).
- **Nommage sémantique** : Elle nomme les variables `title` et `articleBody` en se basant sur la structure HTML.
- **Traduction** : Elle identifie que ces contenus sont du texte naturel destiné aux visiteurs, donc des variables localisables.

> **Référence** : [01-ty-text-et-ty-html.md](see ../03-espace-architecte/02-tilty-attributes/01-ty-text-et-ty-html)

### Pourquoi un simple algorithme ne suffirait pas ?
On pourrait penser qu'un simple script ou une Regex pourrait faire ce travail. C'est faux.
Un algorithme classique ne voit que des balises : il ne comprend pas le **sens**. Il ne sait pas distinguer une phrase sarcastique sur des chats (qui nécessite peut-être un traitement spécial) d'un titre juridique.

C'est ici que la magie opère : **la rigueur de Tilty canalise l'imagination de l'IA**.
- **L'IA** apporte la compréhension sémantique : "Ceci ressemble à une liste de fonctionnalités", "Cette image est purement décorative".
- **Tilty** offre le cadre strict (`ty-list`, `ty-src`) pour transformer cette intuition en code robuste et fonctionnel.
Ce duo de choc permet de lier la souplesse de l'intelligence artificielle à la fiabilité d'une structure d'ingénierie.

### Autres exemples de déductions

Voici comment une IA peut interpréter d'autres éléments HTML courants :

#### 1. Une image
**Avant (Statique)**
```html
<img src="/img/chat-piano.jpg" width="800" height="600" alt="Chat jouant du Rachmaninov">
```
**Après (Tiltyfié)**
```html
<img ty-src="catPhoto.resize(800,600,'cover')" ty-alt="catPhotoAlt" src="/img/chat-piano.jpg" width="800" height="600" alt="Chat jouant du Rachmaninov">
```
> **Déduction IA** : 
> - **Variables** : Elle crée `catPhoto` et `catPhotoAlt`.
> - **Optimisation** : Elle détecte des dimensions fixées (`800x600`). Elle applique `.resize(800,600,'cover')` pour garantir que l'image générée remplisse exactement cette zone (mode `cover`) sans déformation, quelle que soit la taille de l'image originale uploadée.
>
> **Référence** : [08-ty-attr-images.md](see ../03-espace-architecte/02-tilty-attributes/08-ty-attr-images)

#### 2. Une liste répétitive
**Avant (Statique)**
```html
<ul class="features">
  <li>Café illimité</li>
  <li>Siestes obligatoires</li>
  <li>Licornes fournies</li>
</ul>
```
**Après (Tiltyfié)**
```html
<ul class="features" ty-list="featuresList">
  <li ty-list-item="feature" ty-text="description">Café illimité</li>
  <li ty-list-item="ignore">Siestes obligatoires</li>
  <li ty-list-item="ignore">Licornes fournies</li>
</ul>
```
> **Déduction IA** : 
> 1. **Repérage de modèle** : L'IA identifie que les éléments `<li>` partagent la même structure. Elle définit le premier comme modèle (`ty-list-item="feature"`).
> 2. **Traduction** : Elle détecte que le contenu "Café illimité" est du texte utilisateur et configure la variable `description` comme **traduite**.
> 3. **Nettoyage intelligent** : Elle comprend que les items suivants ("Siestes obligatoires", "Licornes fournies") ne sont que des exemples visuels. Plutôt que de les supprimer, elle leur applique `ty-list-item="ignore"` pour préserver l'aspect de la maquette originale sans polluer les données Tilty.
>
> **Référence** : [02-ty-list.md](see ../03-espace-architecte/02-tilty-attributes/02-ty-list)

#### 3. Une vidéo avec sous-titres
**Avant (Statique)**
```html
<video controls>
  <source src="demo.mp4" type="video/mp4">
  <track src="subs_fr.vtt" kind="subtitles" srclang="fr" label="Français">
</video>
```
**Après (Tiltyfié)**
```html
<video controls>
  <source ty-src="demoClip" src="demo.mp4" type="video/mp4">
  <track ty-src="subsFr" src="subs_fr.vtt" kind="subtitles" srclang="fr" label="Français">
  <track ty-src="subsEn" src="subs_en.vtt" kind="subtitles" srclang="en" label="English">
  <track ty-src="subsEs" src="subs_es.vtt" kind="subtitles" srclang="es" label="Español">
</video>
```
> **Déduction IA** : L'IA comprend que la présence de sous-titres implique la possibilité, voire la volonté de traduire ces contenus. Elle prend l'initiative de générer des pistes pour chaque langue du projet, créant des variables `ty-src` dédiées pour permettre une gestion indépendante des fichiers `.vtt`.

**Nuance :** Si l'IA détecte une structure répétable potentielle (même s'il n'y a qu'un seul élément au départ), elle peut choisir de créer une **liste** pour plus de flexibilité.

*Exemple avec une seule piste au départ :*
```html
<video controls src="demo.mp4">
  <track src="subs_fr.vtt" srclang="fr" label="Français">
</video>
```

*Résultat "Liste" anticipé par l'IA :*
```html
<video controls ty-src="videoClip" ty-list="subtitlesList">
   <track ty-list-item="subtitleTrack" ty-src="file" ty-attr="srclang:lang;label:label">
</video>
```
> **Déduction IA** : Plutôt que de créer une variable unique par langue, l'IA anticipe que vous voudrez peut-être ajouter N langues. Elle place `ty-list` sur le conteneur parent (`<video>`) et définit un modèle d'item (`ty-list-item`) sur la balise `<track>`, rendant l'ajout de nouvelles langues infini et administrable. `ty-attr` permet de mapper les attributs spécifiques (`srclang`, `label`).
>
> **Références** : [03-ty-attr-syntaxe.md](see ../03-espace-architecte/02-tilty-attributes/03-ty-attr-syntaxe) (pour `ty-attr`) et [02-ty-list.md](see ../03-espace-architecte/02-tilty-attributes/02-ty-list)

#### 4. Une liste polymorphe (Page Builders)
C'est le cas le plus impressionnant. Imaginez une "landing page" composée de sections très différentes.

**Avant (Statique)**
```html
<main>
  <!-- Un bloc Hero -->
  <section class="hero">
     <h1>L'application qui fait le café</h1>
  </section>
  
  <!-- Un bloc Features -->
  <section class="features">
     <h2>Pourquoi on est géniaux</h2>
  </section>

  <!-- Un bloc Média + Texte -->
  <section class="media-text">
     <img src="otter.jpg" alt="Une loutre mignonne">
     <p>Regardez cette loutre, elle est incroyable.</p>
  </section>

  <!-- Un bloc Call to Action -->
  <section class="cta">
     <a href="/buy">Prendre mon argent</a>
  </section>
</main>
```

**Après (Tiltyfié)**
```html
<main ty-list="sections">
  <!-- Template pour le Hero -->
  <section class="hero" ty-list-item="heroBlock">
     <h1 ty-text="title">L'application qui fait le café</h1>
  </section>
  
  <!-- Template pour les Features -->
  <section class="features" ty-list-item="featuresBlock">
     <h2 ty-text="title">Pourquoi on est géniaux</h2>
  </section>

  <!-- Template Média + Texte -->
  <section class="media-text" ty-list-item="mediaTextBlock">
     <img ty-src="image.resize(600,400,'cover')" ty-alt="imageAlt" src="otter.jpg" alt="Une loutre mignonne">
     <p ty-html="content">Regardez cette loutre, elle est incroyable.</p>
  </section>

  <!-- Template pour le CTA -->
  <section class="cta" ty-list-item="ctaBlock">
     <a ty-href="link" ty-text="label">Prendre mon argent</a>
  </section>
</main>
```
> **Déduction IA** : L'IA identifie une structure de type "Page Builder" où des sections hétérogènes se succèdent. Elle choisit de tout regrouper dans une seule liste `sections`, mais définit **plusieurs templates** (`ty-list-item="heroBlock"`, `featuresBlock`, `mediaTextBlock`, `ctaBlock`). Cela permet à l'utilisateur final d'ajouter et de réordonner ces blocs à volonté, tout en mélangeant les types de contenu.
>
> **Référence** : [06-ty-attr-boucles.md](see ../03-espace-architecte/02-tilty-attributes/06-ty-attr-boucles)


### Assistant Tilty Attr GPT (Work in progress)
Un assistant GPT spécialisé est en cours de développement pour faciliter cette tâche :
[Tilty Attr Assistant](https://chatgpt.com/g/g-67e0e94380d08191ad8c18edaa2ba981-tilty-attr)

Cet agent connaît la grammaire des attributs `ty-*` et peut vous aider à préparer vos fichiers HTML ou à résoudre des problèmes de syntaxe complexes.

![Aperçu de l'assistant Tilty Attr](../images/tilty-ai-assistant.png)


## 2. Édition : Contenu et Sémantique

### Pourquoi les IA aiment Tilty ?
La force de Tilty réside dans l'utilisation des attributs `ty-*`. Ces attributs ne sont pas seulement des instructions techniques ; ils agissent comme des **métadonnées sémantiques précises** (un peu comme des micro-données `itemprop`) qui aident une IA à comprendre la structure et l'intention de votre contenu.

Au-delà de ces attributs, les données Tilty sont organisées dans une **architecture structurée** (un arbre de données). Chaque champ est **typé** et **décrit**, offrant à l'IA une carte précise du contenu disponible, bien plus riche qu'une simple liste de variables "à plat".


### Aide à la rédaction
Un agent IA peut être utilisé pour remplir automatiquement les variables Tilty à partir de vos modèles de données.

### Traduction automatisée
Grâce à la gestion native du multilingue, un agent peut traiter vos fichiers de données pour proposer des traductions contextuelles et précises.

---

## Les Outils (Le Pont Technique)

Tout comme les agents GPT, les outils de développement ne sont pas une finalité mais des moyens d'accéder plus efficacement à Tilty. Ils agissent comme un **pont** entre l'utilisateur et la structure du projet.

### 1. Le Contexte (Documentation)
Pour être efficace, une IA a besoin de contexte. Tilty lui en fournit via sa documentation et ses nombreux exemples.

> **Astuce** : Dès que vous commencez à saisir des `ty-attributes` à la main dans vos templates, les outils d'autocomplétion (VS Code, WebStorm), nourris par ce contexte, sauront naturellement vous suggérer d'autres attributs.

La documentation est rédigée au format **Markdown (.md)** et disponible publiquement sur GitHub sur [https://github.com/Tilty-io/docs](https://github.com/Tilty-io/docs). Elle est conçue pour être aussi **lisible par une machine que par un humain**, permettant aux LLM de respecter votre syntaxe précise.

> [!IMPORTANT]
> **Nouveau : Le AI Toolkit** 🚀
> Pour faciliter encore plus la vie des développeurs, Tilty inclut désormais un **AI Toolkit** prêt à l'emploi.
> Situé dans le dossier `client/public/doc/ai-toolkit/` (ou directement à la racine de la documentation si vous l'avez téléchargée), il contient :
> *   `agent-instructions-to-understand-tilty.md` : Un fichier "Master" optimisé contenant toute la documentation, les règles strictes et les définitions TypeScript. **C'est le fichier à donner à votre IA.**
> *   `examples.md` : Un dataset d'entraînement "Few-Shot" avec des exemples "Before/After".
> *   `ty-attributes.d.ts` : Les définitions de type officielles pour l'autocomplétion.
>
> 👉 **Conseil Pro** : Si vous utilisez Cursor ou Windsurf, ajoutez simplement le fichier `agent-instructions-to-understand-tilty.md` à votre contexte global pour transformer votre IDE en expert Tilty instantané.

### 2. Les Assistants de Code (Copilot, Cursor, Antigravity...)
Les outils de développement modernes (dont l'excellent **Antigravity** propulsé par **Gemini**, qu'on aime beaucoup par ici 😉) offrent une compréhension contextuelle profonde. Ils permettent déjà :
- **L'autocomplétion intelligente** des attributs `ty-*`.
- **La détection d'erreurs** en temps réel.
- **La "Tiltyfication" à la volée** directement dans l'IDE.

### 3. Le Futur Standard : Le protocole MCP
Pour aller plus loin, Tilty adopte le **Model Context Protocol (MCP)**.
Chaque projet Tilty agit comme un "Serveur MCP" qui expose ses données et actions à n'importe quelle IA compatible (Claude, IDEs, etc.), sans bricolage spécifique.

- **Resources (Lecture)** : L'IA lit l'arborescence (`tilty://pages`), la documentation (`tilty://doc`) ou le schéma (`tilty://schema`).
- **Tools (Action)** : L'IA exécute des tâches techniques (création de pages, traduction, relecture, validation syntaxique).
- **Prompts (Guidage)** : Tilty fournit ses propres instructions système ("Respecte les conventions...").

Cela s'aligne avec notre philosophie agnostique : nous exposons un standard ouvert, vous connectez l'intelligence de votre choix.

### 4. L'API (Experimental)
Tilty dispose également d'une API REST (ouverte courant 2027) pour permettre aux agents de lire la structure, proposer des modifications ou s'interfacer avec le workflow de publication.

*Cette API est actuellement en cours de définition et évoluera avec les futures versions. Restez connectés !*


---


 < !--SOURCE_FILE: 04-technique/ai-toolkit/README -->


# 🤖 Tilty AI Toolkit

This directory contains resources specifically designed to assist AI Agents (Cursor, Windsurf, GitHub Copilot, ChatGPT, Claude, etc.) in understanding and working with Tilty CMS.
**(See on [GitHub](https://github.com/Tilty-io/docs/tree/main/ai-toolkit))**

## 📄 The Main File: `agent-instructions-to-understand-tilty.md`

This is the **Reference Document** for any AI interaction.
It acts as a "Single Source of Truth" containing:
1.  **Strict Syntax Rules** (No hallucinations allowed).
2.  **TypeScript Definitions** for `ty-*` attributes.
3.  **Few-Shot Training** (Examples of Good/Bad code).
4.  **Technical Documentation** (Architecture, Multilingual, etc.).

### 🚀 How to use it?

#### 1. In AI Editors (Cursor, Windsurf, Copilot)
When you start a coding session involving Tilty templates:
1.  Open `agent-instructions-to-understand-tilty.md` in a tab (or pin it to context).
2.  The AI will automatically "read" the definitions and examples.
3.  Ask your question (e.g. *"Create a polymorphic list for a hero section"*).

#### 2. With ChatBots (ChatGPT, Claude, Gemini)
1.  **Upload** the `agent-instructions-to-understand-tilty.md` file to the chat.
2.  Use the following prompt:
    > "You are an expert Tilty Developer. I have uploaded the `agent-instructions-to-understand-tilty.md` file which contains the strict syntax and rules you must follow. Read it carefully before answering. Start by confirming the Tilty version."

#### 3. Creating Custom GPTs
If you are building a custom GPT or Assistant:
1.  Upload `agent-instructions-to-understand-tilty.md` to its **Knowledge Base**.
2.  In the System Instructions, add:
    > "Always refer to `agent-instructions-to-understand-tilty.md` for syntax validation. Never invent conventions not listed in that file."

---

## 🛠️ Maintenance

**⚠️ Note:** This toolkit is automatically generated during the Tilty release process.
The source files (`examples.md`, `ty-attributes.d.ts`) and the generation script reside in the private Tilty Core repository.

**Do not edit `agent-instructions-to-understand-tilty.md` manually**, as your changes will be overwritten by the next release.


---


 < !--SOURCE_FILE: 99-draft/draft-ty-json -->


# Spécifications ty-json
Pour les items qui doivent produire une valeur primitive directement (String, Number, Boolean), on utilise un objet à clé unique. Les deux arguments — nom du schéma et expression — sont séparés par une virgule, et la valeur JSON est l'exemple illustratif :
    { "ty-list-item(txt) ty-text(value)": "Texte par défaut" }
> L'absence de `:clé-de-sortie` est intentionnelle. Elle signifie que l'item produit une valeur primitive directement — pas un objet avec une propriété nommée. `"ty-list-item(txt) ty-text(value)"` produit `"Légende simple"`, pas `{ "value": "Légende simple" }`.

| `ty-text(value)` | Type de sortie et champ Tilty à évaluer dans le scope implicite de l'item — `value` est le nom du champ qui porte la valeur primitive |
> L'absence de `:clé-de-sortie` est intentionnelle. Elle signifie que l'item produit une valeur primitive directement — pas un objet avec une propriété nommée. `"ty-list-item(txt) ty-text(value)"` produit `"Légende simple"`, pas `{ "value": "Légende simple" }`.

| `ty-text(value)` | Type de sortie et champ Tilty à évaluer dans le scope implicite de l'item — `value` est le nom du champ qui porte la valeur primitive |

> **Fonctionnalite Experimentale**
> Cette section décrit une fonctionnalité en cours de développement.
> La syntaxe et les comportements décrits ci-dessous sont spécifiés pour les futures versions de Tilty et ne sont pas encore disponibles dans le noyau stable.

---

## Introduction

`ty-json` résout un problème simple mais récurrent : comment transmettre des données dynamiques Tilty à un script JavaScript, à une API tierce, ou à tout système qui consomme du JSON — sans écrire de code serveur ?

La réponse est identique à celle des `ty-attributes` : on écrit un template. Tilty le résout au rendu.

```html
<script ty-json>
{
  "ty-text(user.name):username": "Anonyme",
  "ty-text(page.meta.href):currentUrl": "/"
}
</script>
```

Tilty analyse ce bloc, évalue les expressions, et injecte le JSON résolu. Le JavaScript qui suit peut consommer l'objet normalement.

> [!NOTE]
> La balise `<script ty-json>` reste du HTML valide. Tilty ne casse jamais la structure. Il transforme.

---

## La philosophie : typage explicite et fallback

`ty-json` applique les mêmes trois principes fondateurs que les `ty-attributes` — simplement dans un nouveau territoire.

**Agnosticisme** : le moteur ne suppose rien de votre structure de données. Vous déclarez ce que vous attendez, il s'exécute.

**Typage explicite** : le type est déclaré directement dans la clé composite — `ty-text` pour du texte brut, `ty-html` pour du contenu riche, `ty-number` pour un nombre, `ty-bool` pour un booléen. La valeur associée dans le template n'est jamais la valeur finale. C'est un exemple illustratif de la forme attendue : `"Anonyme"` pour un champ texte, `0` pour un nombre, `false` pour un booléen. Le moteur ne s'en sert jamais à l'exécution.

**Fallback** : si un champ n'a aucune donnée en base et aucune valeur par défaut configurée dans l'interface Tilty, il retourne `null`. La valeur-exemple du template n'intervient pas à l'exécution. L'ordre de priorité est donc :

1. La valeur réelle (base de données)
2. La valeur par défaut du champ (configurée dans l'interface Tilty)
3. `null`

Le rendu ne plante jamais sur une donnée manquante.

---

## La Clé Composite

C'est l'innovation centrale de `ty-json`. Dans les `ty-attributes`, l'instruction est portée par l'attribut HTML (`ty-text`, `ty-src`, etc.). En JSON, les attributs n'existent pas. L'instruction est donc encodée directement dans la **clé**.

### Syntaxe générale

```
"ty-type(expression):clé-de-sortie": valeur-exemple
```

| Partie | Rôle |
|:---|:---|
| `ty-type` | Le type déclaré : `ty-text`, `ty-html`, `ty-number` ou `ty-bool` |
| `(expression)` | L'expression Tilty à évaluer (même syntaxe que les `ty-attributes`) |
| `:clé-de-sortie` | Le nom de la clé qui apparaîtra dans le JSON résolu |
| `valeur-exemple` | Exemple illustratif de la forme attendue. N'intervient jamais à l'exécution : si aucune donnée n'est disponible, le champ retourne `null`. |

### Les types disponibles

| Forme | Type produit | Sérialisation |
|:---|:---|:---|
| `"ty-text(expr):key": "exemple"` | String | Texte brut — HTML strippé, `\n` pour les sauts de ligne |
| `"ty-html(expr):key": "exemple"` | String | Markup HTML préservé — `<br>` pour les sauts de ligne |
| `"ty-number(expr):key": 0` | Number | Valeur numérique |
| `"ty-bool(expr):key": false` | Boolean | `true` ou `false` |
| `"ty-json(expr):key": {}` | Object | Objet Tilty sérialisé tel quel en JSON |
| `"ty-json(expr):key": []` | Array | Tableau Tilty sérialisé tel quel en JSON |
| `"ty(expr):key": exemple` | Passthrough | Valeur brute, aucune transformation appliquée |

> [!NOTE]
> `ty-text` et `ty-html` produisent tous deux une String, mais leur sérialisation diffère. Un champ WYSIWYG contenant du contenu multiligne donnera `"Ligne 1\nLigne 2"` avec `ty-text`, et `"Ligne 1<br>Ligne 2"` (ou `"<p>Ligne 1</p><p>Ligne 2</p>"`) avec `ty-html`. Le choix dépend de ce que le consommateur du JSON attend.

> [!NOTE]
> `ty-json` est le seul type qui produit un Object ou un Array natif. Il sérialise la structure Tilty telle quelle, sans reshape. Pour reconstruire un objet selon un schéma précis, utiliser `ty-scope` à la place.

### Exemple

Template :

```json
{
  "ty-text(user.name):username": "Anonyme",
  "ty-number(product.price):price": 0,
  "ty-bool(page.published):isLive": false,
  "ty-html(article.body):content": "",
  "ty-text(article.seo.title):metaTitle": "Titre par défaut"
}
```

Résultat (données résolues depuis la base) :

```json
{
  "username": "Jean-Pierre",
  "price": 49.99,
  "isLive": true,
  "content": "<p>Premier paragraphe</p><p>Second paragraphe</p>",
  "metaTitle": "Comment faire du pain au levain"
}
```

> [!NOTE]
> Les valeurs `"Anonyme"`, `0`, `false`, `""` et `"Titre par défaut"` présentes dans le template ne sont jamais injectées dans le résultat. Elles illustrent uniquement la forme attendue. Si aucune donnée n'est disponible en base et qu'aucune valeur par défaut n'est configurée dans l'interface Tilty, le champ retourne `null`.

> [!TIP]
> Chaque clé composite est résolue indépendamment. L'absence d'une donnée n'affecte jamais les autres.

### `ty-json` : sérialiser un objet ou un tableau

`ty-json` est le type à utiliser quand la valeur attendue est un objet ou un tableau complet — adresse, liste de tags, configuration, coordonnées GPS. Il sérialise la structure Tilty telle quelle, sans transformation.

La valeur-exemple indique la forme attendue : `{}` pour un objet, `[]` pour un tableau.

```json
{
  "ty-json(user.address):address": {},
  "ty-json(product.tags):tags": [],
  "ty-json(page.seo):seo": {}
}
```

Résultat :

```json
{
  "address": { "city": "Paris", "zip": "75001", "country": "France" },
  "tags": ["tech", "design", "accessibilité"],
  "seo": { "title": "Accueil", "description": "Bienvenue.", "canonical": "/" }
}
```

> [!NOTE]
> `ty-json` ne reshape pas l'objet. Si vous avez besoin de renommer des clés ou de ne sélectionner que certains champs, utilisez `ty-scope` avec des clés composites typées.

### Expressions avancées

L'expression à l'intérieur de `ty-type(...)` est identique à celle utilisée dans `ty-text`, `ty-src` ou tout autre attribut Tilty. Toutes les formes d'expressions sont supportées.

#### Concaténation

```json
{
  "ty-text(user.firstName+' '+user.lastName):username": "Martin Dupont",
  "ty-text('Tel : '+contact.phone):phoneLabel": "Tel : 00 00 00 00 00"
}
```

Résultat :

```json
{
  "username": "Jean-Pierre Marchand",
  "phoneLabel": "Tel : 06 12 34 56 78"
}
```

#### Ternaire

```json
{
  "ty-text(stock > 0 ? 'available' : 'sold-out'):status": "available"
}
```

#### Fonction `.resize()`

```json
{
  "ty-text(hero.resize(1200,630)):ogImage": ""
}
```

> [!NOTE]
> La liste complète des expressions supportées est identique à celle des `ty-attributes`. Se référer à la documentation des expressions Tilty pour l'exhaustivité.

---

## Listes : `ty-list`

Pour itérer sur une collection, la clé composite utilise la variante `ty-list` :

```
"ty-list(collection):clé-de-sortie": [ ...schémas... ]
```

Chaque item de la collection devient le **scope implicite** des expressions à l'intérieur du schéma. Il n'est pas nécessaire de nommer une variable intermédiaire.

### Exemple : liste homogène

```json
{
  "ty-list(menuItems):nav": [
    {
      "ty-list-item": "link",
      "ty-text(label):label": "",
      "ty-text(url):href": ""
    }
  ]
}
```

Résultat :

```json
{
  "nav": [
    { "label": "Accueil", "href": "/" },
    { "label": "Contact", "href": "/contact" },
    { "label": "Blog", "href": "/blog" }
  ]
}
```

La clé `"ty-list-item"` est retirée du résultat. Elle sert uniquement à nommer le schéma.

---

## Polymorphisme : listes hétérogènes

Comme en HTML, une liste peut contenir différents types d'items. Chaque type a son propre schéma. Le moteur détermine le schéma à appliquer pour chaque item et ne conserve que le résultat correspondant.

### Schéma objet

Pour les items qui doivent produire une valeur primitive directement (String, Number, Boolean), on combine `ty-list-item(nom)` et un type explicite — exactement comme `ty-if` combiné à un type :

```json
{ "ty-list-item(nomDuSchema) ty-text(value)": "valeur par défaut" }
```

### Schéma primitif

Pour les items qui doivent produire une valeur primitive directement (String, Number, Boolean), on utilise un objet à clé unique. Les deux arguments — nom du schéma et expression — sont séparés par une virgule, et la valeur JSON est l'exemple illustratif :
| `ty-text(value)` | Type de sortie et champ Tilty à évaluer dans le scope implicite de l'item — `value` est le nom du champ qui porte la valeur primitive |
```json
{ "ty-list-item(nomDuSchema,expression)": "valeur par défaut" }
> [!NOTE]
> L'absence de `:clé-de-sortie` est intentionnelle. Elle signifie que l'item produit une valeur primitive directement — pas un objet avec une propriété nommée. `"ty-list-item(txt) ty-text(value)"` produit `"Légende simple"`, pas `{ "value": "Légende simple" }`.

```

| Partie | Rôle |
|:---|:---|
| `ty-list-item(nomDuSchema)` | Identifiant du schéma, utilisé par le moteur pour sélectionner le bon template |
| `ty-text(expression)` | Type de sortie et expression Tilty à évaluer dans le scope implicite de l'item |
| `"valeur par défaut"` | Exemple illustratif de la forme attendue. N'intervient jamais à l'exécution : si aucune donnée n'est disponible, le champ retourne `null`. |

Tous les types sont disponibles : `ty-text`, `ty-html`, `ty-number`, `ty-bool`, `ty-json`.

### Exemple complet : flux mixte

Template :

    { "ty-list-item(txt) ty-text(value)": "Texte par défaut" }
{
  "ty-list(items):gallery": [
    {
      "ty-list-item": "img",
      "ty-text(src.resize(200)):url": "",
      "ty-text(alt):caption": "Image sans légende"
    },
    { "ty-list-item(txt) ty-text(label)": "Texte par défaut" }
  ]
}
```

Si `items` contient un objet image suivi d'une chaîne de texte :

```json
{
  "gallery": [
    { "url": "cdn.com/img_200.jpg", "caption": "Un labrador qui se prend pour un lion" },
    "Légende simple"
  ]
}
```

---

## Valeurs mixtes : statique et dynamique

Un même objet `ty-json` peut mélanger des clés composites (dynamiques) et des clés ordinaires (statiques). Les clés ordinaires sont copiées telles quelles dans le résultat.

```json
{
  "version": "1.0",
  "ty-text(page.meta.href):pageUrl": "/",
  "source": "tilty",
  "ty-text(user.name):author": "Anonyme"
}
```

Résultat :

```json
{
  "version": "1.0",
  "pageUrl": "/mon-article",
  "source": "tilty",
  "author": "Jean-Pierre"
}
```

---

## Clé conditionnelle : `ty-if`

### Forme simple

Pour inclure une clé dans le résultat uniquement si une condition est vraie :

```json
{
  "ty-text(user.name):username": "Anonyme",
  "ty-if(user.isAdmin):permissions": {
    "ty-text(user.role):role": "viewer",
    "ty-text(user.scope):scope": "public"
  }
}
```

Si `user.isAdmin` est faux ou absent, la clé `permissions` est intégralement omise du résultat. Si elle est vraie :

```json
{
  "username": "Jean-Pierre",
  "permissions": {
    "role": "admin",
    "scope": "global"
  }
}
```

> [!TIP]
> `ty-if` sur une clé est analogue à l'attribut `ty-if` sur une balise HTML : la condition efface entièrement le noeud si elle n'est pas satisfaite.

### Forme combinée : `ty-if` + type explicite

Pour conditionner une clé **et** lui assigner un type en une seule instruction, les deux directives sont séparées par un espace dans la clé :

```
"ty-if(condition) ty-type(expression):clé-de-sortie": valeur-exemple
```

```json
{
  "ty-if(user) ty-text(user.name):username": "Anonyme",
  "ty-if(product.promo) ty-number(product.promoPrice):promoPrice": 0,
  "ty-if(article.hasMedia) ty-html(article.intro):intro": ""
}
```

Si la condition est fausse ou absente, la clé est intégralement omise — même comportement que `ty-if` seul. Si elle est vraie, l'expression est évaluée et typée selon la directive déclarée.

> [!NOTE]
> L'ordre est fixe : `ty-if` toujours en premier, le type toujours en second. `"ty-text(expr):key ty-if(cond)"` n'est pas supporté.

---

## Portée de données : `ty-scope`

`ty-scope` évite de répéter le chemin complet dans chaque expression d'un bloc. Il définit un objet comme contexte implicite pour toutes les clés composites qu'il contient.

```
"ty-scope(expression):clé-de-sortie": { ...clés composites... }
```

### Exemple

Sans scope, les chemins se répètent :

```json
{
  "person": {
    "ty-text(user.name):name": "",
    "ty-text(user.email):email": "",
    "ty-text(user.address.city):city": ""
  }
}
```

Avec `ty-scope`, le chemin `user` est déclaré une fois :

```json
{
  "ty-scope(user):person": {
    "ty-text(name):name": "",
    "ty-text(email):email": "",
    "ty-text(address.city):city": ""
  }
}
```

Résultat :

```json
{
  "person": {
    "name": "Jean-Pierre",
    "email": "jp@example.com",
    "city": "Paris"
  }
}
```

### Imbrication

Les scopes peuvent être imbriqués. Chaque niveau restreint davantage le contexte :

```json
{
  "ty-scope(user):person": {
    "ty-text(name):name": "",
    "ty-scope(address):location": {
      "ty-text(city):city": "",
      "ty-text(zip):postalCode": ""
    }
  }
}
```

Résultat :

```json
{
  "person": {
    "name": "Jean-Pierre",
    "location": {
      "city": "Paris",
      "postalCode": "75001"
    }
  }
}
```

### Comportement si le scope est absent

Si l'expression du scope est null ou introuvable, la clé de sortie est intégralement omise du résultat. `ty-scope` agit implicitement comme un `ty-if`.

### Distinction avec le passthrough `ty(expr):key`

Ces deux formes se ressemblent pour les objets mais font des choses différentes :

| Forme | Comportement |
|:---|:---|
| `"ty(user):person": {}` | Copie l'objet `user` tel quel sous la clé `person` (passthrough) |
| `"ty-scope(user):person": { ... }` | Définit `user` comme scope et construit `person` selon le schéma déclaré |

La première est un passthrough. La seconde est un reshape.

---

## Cas limites et comportements définis

### 1. Champ sans donnée disponible

```json
{ "ty-text(user.avatar):avatar": "" }
```

Si `user.avatar` est absent en base et qu'aucune valeur par défaut n'est configurée dans l'interface Tilty, la clé `avatar` est présente dans le résultat avec la valeur `null`. La valeur-exemple `""` n'est pas utilisée. Pour omettre la clé entièrement, utiliser `ty-if`.

---

### 2. Clés dupliquées dans le résultat

```json
{
  "ty-text(user.name):label": "Anonyme",
  "ty-text(page.title):label": "Sans titre"
}
```

Deux clés composites produisent la même clé de sortie `label`. Le JSON source reste valide (deux propriétés distinctes), mais le résultat est indéfini : selon le parseur, seule la première ou la dernière valeur sera conservée. Ce cas doit être évité. L'interface Architecte signale ce conflit avec un avertissement.

---

### 3. Coercition de type

Lorsque la base de données retourne une valeur d'un type différent de celui déclaré dans la clé, le moteur tente un cast :

| Type déclaré | Expression retourne | Résultat |
|:---|:---|:---|
| `ty-number` | `"42"` (String) | `42` (Number, parsé) |
| `ty-text` | `99` (Number) | `"99"` (String, converti) |
| `ty-bool` | `"true"` (String) | `true` (Boolean, parsé) |
| `ty-number` | `[]` (Array) | `null` (cast impossible) |
| `ty-text` | `{}` (Object) | `null` (cast impossible) |

Si la coercition est impossible, le champ retourne `null`.

---

### 4. Expression vide

```json
{ "ty-text():cle": "" }
```

L'expression vide est invalide. Le champ retourne `null`.

---

### 5. Liste vide ou absente

```json
{ "ty-list(emptyCollection):items": [ ... ] }
```

Si `emptyCollection` est vide ou absente, la clé `items` est présente dans le résultat avec un tableau vide.

```json
{ "items": [] }
```

La clé n'est jamais omise. Utiliser `ty-if` pour la supprimer conditionnellement.

---

### 6. Schéma de liste sans correspondance

Dans une liste polymorphe, si aucun schéma ne correspond à un item de données, cet item est ignoré silencieusement. Le tableau de résultat peut donc être plus court que la collection source.

---

### 7. Champ absent avec valeur-exemple objet

```json
{
  "ty(user.address):addr": { "city": "Paris", "zip": "75001" }
}
```

Si `user.address` est absent en base et qu'aucune valeur par défaut n'est configurée, le champ retourne `null`. La valeur-exemple objet n'est pas injectée — elle sert uniquement à indiquer que le type attendu est un objet.

---

### 8. Fonctions Tilty dans les schémas de liste

Les fonctions comme `.resize()` sont disponibles dans les expressions de clés composites, exactement comme dans un `ty-src` HTML :

```json
{
  "ty-list-item": "image",
  "ty-text(src.resize(80, 80)):thumb": "",
  "ty-text(src.resize(400)):medium": "",
  "ty-text(src.href):original": ""
}
```

---

### 9. Objet `ty-json` racine produisant une valeur primitive

La racine d'un bloc `ty-json` doit toujours être un objet `{}` ou un tableau `[]`. Une expression racine primitive n'est pas supportée dans cette version de la spécification.

---

### 10. Portée (scope) dans les objets imbriqués

Pour éviter de répéter un chemin dans un bloc de clés composites, utiliser `ty-scope`. Voir la section dédiée ci-dessus.

Sans `ty-scope`, les expressions doivent utiliser le chemin complet depuis la racine du contexte courant :

```json
{
  "ty-text(user.name):name": "",
  "ty-text(user.email):email": ""
}
```

Avec `ty-scope` :

```json
{
  "ty-scope(user):person": {
    "ty-text(name):name": "",
    "ty-text(email):email": ""
  }
}
```

---

### 11. Alias de boucle imbriqués

Il n'est pas défini dans cette version si un `ty-list` peut être imbriqué dans un schéma `ty-list-item`. Ce cas (listes de listes) est réservé aux versions ultérieures.

---

## Présentation dans l'interface Architecte

Les clés composites comme `"ty-text(user.name):username"` sont illisibles pour un utilisateur qui ne code pas. L'interface Architecte doit les masquer entièrement derrière une représentation tabulaire et visuelle.

### Principe : dissocier la clé de sortie de la source

L'Architecte ne montre jamais le JSON brut. Il présente un éditeur tabulaire structuré :

| Clé JSON | Source Tilty | Type |
|:---|:---|:---|
| `username` | `user.name` | Texte |
| `price` | `product.price` | Nombre |
| `isLive` | `page.published` | Booléen |
| `content` | `article.body` | HTML |
| `gallery` | `items` | Liste |

Chaque ligne correspond à une clé composite. L'utilisateur ne saisit jamais `ty-text(...)` de sa propre main.

### Actions attendues

- **Ajouter un champ** : un bouton "Ajouter un champ" ouvre un formulaire guidé : clé de sortie, sélecteur de source Tilty (auto-complétion), type (Texte, HTML, Nombre, Booléen, Liste, Objet).
- **Badge de type** : un badge coloré indique le type déclaré (Texte, HTML, Nombre, Booléen, Liste, Objet).
- **Aperçu en direct** : un panneau résout le JSON avec les données de la page en cours et affiche le résultat brut. Utile pour déboguer.
- **Listes polymorphes** : chaque schéma est présenté comme une carte dépliable avec ses propres champs internes.
- **Alerte de doublon** : si deux champs produisent la même clé de sortie, un avertissement est affiché immédiatement et la sauvegarde est bloquée.
- **Clé conditionnelle** : une case à cocher "Afficher uniquement si..." permet de configurer un `ty-if` sans l'écrire.
- **Mode Expert** : un onglet "JSON brut" expose la syntaxe composite pour les utilisateurs qui la maîtrisent. Les modifications dans ce mode sont répercutées dans le tableau.

### Ce que l'interface ne montre pas

- Le JSON brut avec les clés composites (mode Expert uniquement).
- Les détails internes de l'évaluation des expressions.
- Les erreurs du moteur de rendu (elles sont remplacées par le fallback silencieusement).

---

## Récapitulatif de la grammaire

| Syntaxe | Rôle                                                                                 |
|:---|:-------------------------------------------------------------------------------------|
| `"ty-text(expr):key": "exemple"` | Injecte `expr` dans `key` comme String — texte brut, `\n` pour les sauts de ligne    |
| `"ty-html(expr):key": "exemple"` | Injecte `expr` dans `key` comme String — markup HTML préservé, `<br>` pour les sauts |
| `"ty-number(expr):key": 0` | Injecte `expr` dans `key` comme Number                                               |
| `"ty-bool(expr):key": false` | Injecte `expr` dans `key` comme Boolean                                              |
| `{ "ty-list-item(schema) ty-text(value)": "exemple" }` | Déclare un schéma primitif String dans une liste polymorphe — produit une valeur brute, pas un objet |
| `"ty-json(expr):key": []` | Injecte `expr` dans `key` comme Array JSON natif — sérialisé tel quel                |
| `"ty(expr):key": exemple` | Passthrough — retourne la valeur brute sans transformation ni coercition             |
| `"ty-if(condition):key": value` | Inclut la clé uniquement si `condition` est vraie                                    |
| `"ty-if(cond) ty-text(expr):key": "exemple"` | Clé conditionnelle avec type et expression explicites                                |
| `"ty-scope(expr):key": { ... }` | Définit `expr` comme scope implicite, construit `key` selon le schéma                |
| `"ty-list(col):key": [...]` | Itère sur `col`, chaque item devient le scope implicite des schémas                  |
| `"ty-list-item": "schema"` | Déclare un schéma objet nommé dans une liste afin de pouvoir gérer le polymorphisme  |
| `{ "ty-list-item(schema,expr)": exemple }` | Déclare un schéma primitif dans une liste polymorphe, type inféré depuis `exemple`   |
| `"key": "valeur statique"` | Valeur statique, aucune évaluation Tilty                                             |


---


 < !--SOURCE_FILE: 99-draft/draft-ty-list-query -->


> Tilty v0.17.0

> # DRAFT FEATURE


---

# Les Requêtes (Tilty Queries)

> **⚠️ Fonctionnalité Expérimentale**
> Cette section décrit une fonctionnalité en cours de développement. 
> La syntaxe et les comportements décrits ci-dessous sont spécifiés pour les futures versions de Tilty et ne sont pas encore 
> disponibles dans le noyau stable.

Les **Tilty Queries** permettent de briser le fonctionnement par "silo". Elles vous donnent la possibilité de générer des **listes dynamiques** de pages provenant de n'importe quelle partie du site, directement depuis vos attributs HTML.

## 1. Construire une Requête

L'attribut `ty-list` attend une liste sur laquelle itérer.

* **Mode Local :** Vous pointez vers une liste existante dans les données de la page (ex: `ty-list="block.items"`).
* **Mode Query :** Vous appelez le constructeur `pages()` pour générer une liste à la volée.

### La Source : `pages()`

La fonction `pages()` sélectionne un ensemble de **Pages** en se basant sur leur **Type** (le modèle de page).

**Syntaxe :** `pages('nom-du-type-de-page')`

* **`pages('article')`** : Cible toutes les pages de type `article`.
* **`pages('product')`** : Cible toutes les pages de type `product`.
* **`pages('news', 'event')`** : Cible un mélange de pages (articles et événements) pour créer des flux mixtes.
---

## 2. Filtrer, Trier et Limiter

Vous pouvez chaîner des méthodes pour affiner la liste de pages retournée.

### A. Filtrer : `.where()`

La méthode `.where()` accepte une **expression JavaScript standard**.
Si l'expression est évaluée à `true` pour une page donnée, celle-ci est incluse dans la liste.

> **Note importante :** À l'intérieur des parenthèses, vous accédez directement aux champs de la page ciblée (ex: `price`, `date`, `category`) sans préfixe.

**Exemples :**

```html
.where(category == 'tech')
.where(price < 50)
.where(stock > 0 && price < 50)

```

### B. Trier : `.sort()`

Trie la liste selon un champ.

**Syntaxe :** `.sort('champ', 'direction')`

* Direction : `'asc'` (croissant, défaut) ou `'desc'` (décroissant).

**Le Tri Multiple :**
Pour trier sur plusieurs critères, chaînez les méthodes. La priorité va de gauche à droite.

```html
.sort('brand', 'asc').sort('price', 'asc')

```

### C. Limiter : `.limit()` et `.offset()`

Indispensable pour contrôler la taille de la liste affichée.

* **.limit(n)** : Ne retourne que les *n* premières pages.
* **.offset(n)** : Ignore les *n* premières pages (utile pour créer une pagination).

---

## 3. Rendu Polymorphe (Conditional Templating)

Une fois la liste de pages récupérée, Tilty doit décider comment les afficher. 
L'attribut `ty-list-item` agit comme un **sélecteur conditionnel**.

### Règle d'Or : "Le Premier qui Matche Gagne"

Tilty parcourt vos balises `<li>` de haut en bas. Pour chaque page de la liste :

1. Il évalue la condition du premier `ty-list-item`.
2. Si c'est **VRAI** : Il affiche ce bloc et passe à la page suivante (les blocs suivants sont ignorés pour cette page).
3. Si c'est **FAUX** : Il passe au `ty-list-item` suivant.

### Exemples de Syntaxe HTML

#### Cas Simple : Rendu selon le Type

```html
<ul ty-list="pages('news', 'article')">
    <li ty-list-item="type == 'news'">
        News : <span ty-text="title"></span>
    </li>
    <li ty-list-item="type == 'article'">
        Article : <span ty-text="title"></span>
    </li>
</ul>
```

#### Cas Avancé : Conditions sur les données

```html
<ul class="product-grid" ty-list="pages('product').sort('price', 'asc')">

    <li ty-list-item="stock == 0" class="card is-disabled">
        🚫 <span ty-text="title"></span> (Épuisé)
    </li>

    <li ty-list-item="price < 20" class="card is-promo">
        🔥 <span ty-text="title"></span>
        <strong ty-text="price + '€'"></strong>
    </li>

    <li ty-list-item="true" class="card is-standard">
        <span ty-text="title"></span>
        <span ty-text="price + '€'"></span>
    </li>

</ul>

```

### Scope des Variables

**Rien de nouveau ici.** Cela fonctionne exactement comme pour les listes classiques (`ty-list`).
À l'intérieur d'un bloc `ty-list-item`, le contexte est automatiquement la **page en cours**. Vous accédez aux propriétés directement.

* Pour le texte : `ty-text="title"`
* Pour le lien vers la page : `ty-href="value"`

---

## 4. Requêtes Contextuelles (`$page`)

La variable système **`$page`** représente la page actuellement visitée par l'internaute. 
Ce n'est pas propre aux listes, ça fait partie des variables globales disponibles dans tout template html Tilty.
Elle peut aider à filtrer une liste par rapport au contexte actuel.

**Exemple : "Voir aussi dans la même catégorie"**

```html
<h3>
    Voir aussi dans la catégorie 
    <em ty-text="$page.category"></em>
</h3>
<!-- les pages de type 'article' -->
<!-- dont le champ category est égal au champ category de la page en cours -->
<!-- et dont l'id est différent de la page en cours (ne pas mettre dans la liste la page actuelle) -->
<!-- 3 résultats maximum dans la liste -->
<div ty-list="pages('article').where(category == $page.category && meta.id != $page.meta.id).limit(3)">
    <div ty-list-item="true" class="related-post">
        <a ty-href="value" ty-text="title">Lire l'article</a>
    </div>

</div>

```

---

## 5. Aide-Mémoire API (Cheat Sheet)

| Fonction | Description | Exemple |
| --- | --- | --- |
| **`pages('type')`** | Source : Cible les pages d'un type donné. | `pages('blog')` |
| **`.where(expr)`** | Filtre : Expression JS booléenne. | `.where(age >= 18)` |
| **`.sort('k', 'd')`** | Tri : Ordonne la liste. Chaînable. | `.sort('date', 'desc')` |
| **`.limit(n)`** | Limite : Garde les N premiers résultats. | `.limit(5)` |
| **`.offset(n)`** | Décalage : Saute les premiers résultats. | `.offset(10)` |

---

> **⚠️ Fonctionnalité Expérimentale**
> Cette section décrit une fonctionnalité en cours de développement. 
> La syntaxe et les comportements décrits ci-dessous sont spécifiés pour les futures versions de Tilty et ne sont pas encore 
> disponibles dans le noyau stable.


---


> **Version** : 0.26.2

# EXAMPLES & COUNTER-EXAMPLES (FEW-SHOT TRAINING)

This section provides explicit examples of **correct** versus **incorrect** usage of Tilty attributes ("Tiltyfication").
Study these carefully to understand the expected behavior.

## 1. Hallucinations (Strict Syntax)

### 📄 INPUT (Original HTML)
```html
<img src="img.jpg">
<a href="#">Link</a>
<div class="content">Content</div>
```

### ❌ BAD (Hallucinated Attributes)
The agent invents attributes that "sound right" but do not exist in the spec.
```html
<!-- INCORRECT -->
<img ty-image="hero" src="img.jpg">
<a ty-link="url" href="#">Link</a>
<div ty-show="isVisible" class="content">Content</div>
```

### ✅ GOOD (Strict Spec Compliance)
The agent uses ONLY the whitelisted `ty-*` attributes or falls back to `ty-attr`.
```html
<!-- CORRECT -->
<img ty-src="hero" src="img.jpg">
<a ty-href="url" href="#">Link</a>
<div ty-if="isVisible" class="content">Content</div>
```

---

## 2. Standard Attributes Binding

### 📄 INPUT (Original HTML)
```html
<button aria-label="Label">Click me</button>
<div data-id="123">Project</div>
```

### ❌ BAD (Direct Injection)
The agent tries to invent `ty-aria-label` or `ty-data-id`.
```html
<!-- INCORRECT -->
<button ty-aria-label="btnLabel" aria-label="Label">Click me</button>
<div ty-data-id="projectId" data-id="123">Project</div>
```

### ✅ GOOD (Using `ty-attr`)
The agent uses the generic `ty-attr` for non-standard attributes.
```html
<!-- CORRECT -->
<button ty-attr="aria-label:btnLabel" aria-label="Label">Click me</button> <!-- attribute:variable -->
<div ty-attr="data-id:projectId" data-id="123">Project</div>
```

---

## 3. HTML Preservation

### 📄 INPUT (Original HTML)
The user provides a static mockup with multiple items.
```html
<ul class="menu">
  <li>Home</li>
  <li>About</li>
  <li>Contact</li>
</ul>
```

### ❌ BAD (Deleting Content)
The agent deletes the examples from the mockup to "clean up" the code.
```html
<!-- INCORRECT: The structure is lost -->
<ul ty-list="menu">
  <li ty-list-item="item" ty-text="label">Home</li>
</ul>
```

### ✅ GOOD (Using `ty-ignore`)
The agent keeps the original mockup elements but marks them as ignored.
```html
<!-- CORRECT: The DOM structure is preserved for the designer -->
<ul ty-list="menu">
  <li ty-list-item="item" ty-text="label">Home</li>
  <li ty-list-item="ignore">About</li>
  <li ty-list-item="ignore">Contact</li>
</ul>
```

---

## 4. Semantic Naming

### 📄 INPUT (Original HTML)
```html
<div class="article">
  <h1>Title</h1>
  <img src="..." alt="...">
</div>
```

### ❌ BAD (Generic Names)
The agent uses generic names that do not reflect the content.
```html
<!-- INCORRECT -->
<div class="article">
  <h1 ty-text="text1">Title</h1>
  <img ty-src="img1" ty-alt="text2" src="..." alt="...">
</div>
```

### ✅ GOOD (Semantic Names)
The agent infers meaning from the HTML.
```html
<!-- CORRECT -->
<div class="article">
  <h1 ty-text="articleTitle">Title</h1>
  <img ty-src="heroImage.resize(800,600)" ty-alt="heroAlt" src="..." alt="...">
</div>
```

---

## 5. Polymorphism (Page Builders)

### 📄 INPUT (Original HTML)
Multiple sections with different designs.
```html
<div class="page-builder">
  <section class="hero"><h1>Hero</h1></section>
  <section class="text"><p>Some text</p></section>
  <section class="hero"><h1>Another Hero</h1></section>
</div>
```

### ❌ BAD (Flat Structure)
The agent treats them as fixed static content.
```html
<!-- INCORRECT: Not flexible -->
<div class="page-builder">
  <section class="hero" ty-scope="hero1"><h1 ty-text="title">Hero</h1></section>
  <section class="text" ty-scope="text1"><p ty-text="content">Some text</p></section>
  <section class="hero" ty-scope="hero2"><h1 ty-text="title">Another Hero</h1></section>
</div>
```

### ✅ GOOD (Polymorphic List)
The agent identifies a list of potentially reorderable components.
```html
<!-- CORRECT: User can add/order/mix blocks -->
<div class="page-builder" ty-list="sections">
  <section class="hero" ty-list-item="heroBlock"><h1 ty-text="title">Hero</h1></section>
  <section class="text" ty-list-item="textBlock"><p ty-html="value">Some text</p></section>
  <!-- The third section is ignored because it's a duplicate visualization of heroBlock -->
  <section class="hero" ty-list-item="ignore"><h1>Another Hero</h1></section>
</div>
```

---

## 6. Scopes (Structured Data)

### 📄 INPUT (Original HTML)
Nested data structure (e.g. an Author card).
```html
<div class="author-card">
  <img src="avatar.jpg">
  <h3>John Doe</h3>
</div>
```

### ❌ BAD (Flat Naming)
The agent flattens variable names, cluttering the root scope.
```html
<!-- INCORRECT -->
<div class="author-card">
  <img ty-src="authorAvatar" src="avatar.jpg">
  <h3 ty-text="authorName">John Doe</h3>
</div>
```

### ✅ GOOD (Using `ty-scope`)
The agent groups data logically using `ty-scope`.
```html
<!-- CORRECT -->
<div class="author-card" ty-scope="author">
  <img ty-src="avatar" src="avatar.jpg">
  <h3 ty-text="name">John Doe</h3>
</div>
```

---

## 7. Conditional Logic (`ty-if`)

### 📄 INPUT (Original HTML)
An element that should only appear under certain conditions (e.g. a "Sale" badge).
```html
<span class="badge">SALE!</span>
```

### ❌ BAD (Hallucinations / Framework leaking)
The agent uses Vue/React syntax or invents attributes.
```html
<!-- INCORRECT -->
<span class="badge" ty-show="isOnSale">SALE!</span>
<span class="badge" v-if="isOnSale">SALE!</span>
```

### ✅ GOOD (Using `ty-if`)
The agent uses the correct `ty-if` attribute.
```html
<!-- CORRECT -->
<span class="badge" ty-if="isOnSale">SALE!</span>
```

---

## 8. List with Duplicates (Simple List)

### 📄 INPUT (Original HTML)
A simple list of redundant items.
```html
<ul>
  <li>hello</li>
  <li>world</li>
</ul>
```

### ❌ BAD (Redundant Definitions)
The agent defines the template twice on identical items.
```html
<!-- INCORRECT: Defines 'text' template twice -->
<ul ty-list="items">
  <li ty-list-item="text" ty-text="value">hello</li>
  <li ty-list-item="text" ty-text="value">world</li>
</ul>
```

### ✅ GOOD (Unique Definition)
The agent defines the schema ONCE and ignores the rest.
```html
<!-- CORRECT: First item is the template, others are ignored placeholders -->
<ul ty-list="items">
  <li ty-list-item="text" ty-text="value">hello</li>
  <li ty-list-item="ignore">world</li>
</ul>
```

---

## 9. Variable Naming Rules (Keys must be identifiers)

### 📄 INPUT (Original HTML)
```html
<h1>Welcome to our website</h1>
<a href="https://google.com">Google</a>
```

### ❌ BAD (Using Content/Value as Key)
The agent mistakenly uses the text content or the literal URL as the variable name.
**Variable names must be camelCase identifiers, NOT sentences or URLs.**
```html
<!-- INCORRECT -->
<h1 ty-text="Welcome to our website">Welcome to our website</h1>
<a ty-href="https://google.com">Google</a>
```

### ✅ GOOD (Semantic CamelCase Keys)
The agent chooses a short, descriptive identifier for the data key.
```html
<!-- CORRECT -->
<h1 ty-text="heroTitle">Welcome to our website</h1>
<a ty-href="externalLink" ty-text="linkLabel">Google</a>
```

---

## 10. Attribute Concatenation & Priority

Combining multiple `ty-*` attributes on a single element is possible.

### 📄 INPUT (Original HTML)
```html
<div class="card" title="Static Title">Content</div>
```

### ❌ BAD (Overwriting Classes)
The agent uses `ty-class` which **replaces** the original class, losing the static styling.
```html
<!-- INCORRECT: 'card' class is lost! -->
<div class="card" ty-class="dynamicState">Content</div>
```
**Result:** `class="dynamicState"`

### ✅ GOOD (Appending Classes)
The agent uses `ty-add-class` to **append** to the existing class.
```html
<!-- CORRECT: Preserves 'card' and adds 'dynamicState' -->
<div class="card" ty-add-class="dynamicState">Content</div>
```
**Result:** `class="card dynamicState"`

### ❌ BAD (Unnecessary `ty-attr`)
The agent uses the generic `ty-attr` for standard attributes like `title`, `src`, or `href`.
```html
<!-- INCORRECT: Too verbose and complex -->
<div ty-attr="title:cardTitle">Content</div>
```

### ✅ GOOD (Using Dedicated Attributes)
The agent uses specific attributes which are cleaner.
```html
<!-- CORRECT -->
<div ty-title="cardTitle">Content</div>
```

### ❌ BAD (Content `text` vs `html`)
The agent uses `ty-text` and `ty-html` on the same element. `ty-text` takes priority and `ty-html` will be ignored.
```html
<!-- INCORRECT: ty-html is redundant and will be ignored -->
<div ty-text="textContent" ty-html="htmlContent">Content</div>
```
**Result:** The content of `textContent` will be displayed, and an error will be logged.

---

## 11. String Concatenation

Tilty supports string and variable concatenation directly within `ty-*` expressions using the `+` operator.

### 📄 INPUT (Original HTML)
```html
<div style="width: 50%">Progress</div>
<a href="mailto:contact@example.com">Contact</a>
```

### ❌ BAD (JS/PHP Style Interpolation)
The agent tries to use unsupported interpolation syntax like `${var}` or `{$var}`.
```html
<!-- INCORRECT: Unsupported syntax -->
<div ty-attr="style:'width: ${percent}%'">Progress</div>
<a ty-href="'mailto:' . email">Contact</a> <!-- Dot is not the concatenation operator -->
```

### ✅ GOOD (Using `+` Operator)
The agent uses the `+` operator to concatenate literal strings (in quotes) and variables.
```html
<!-- CORRECT -->
<div ty-attr="style:'width:' + percent + '%'">Progress</div>
<a ty-href="'mailto:' + email">Contact</a>
```

### 📄 COMPLEX CASE (Dynamic Classes)
```html
<div class="item active">Item 1</div>
```

### ✅ GOOD (Concatenation for Classes)
```html
<!-- CORRECT: Concatenates base class with conditional/dynamic class -->
<div class="item" ty-add-class="(isActive ? 'active' : '')">Item 1</div>
<!-- OR via ty-attr for full control -->
<div ty-attr="class:'item ' + (isActive ? 'active' : '')">Item 1</div>
```

---

## 12. Block Type Consistency (Simple vs Structured)

A `ty-list-item` cannot be both a simple block and a structured block.

### 📄 INPUT (Original HTML)
```html
<ul ty-list="items">
  <li class="red" ty-list-item="subtitle">Subtitle 1</li>
</ul>
```

### ❌ BAD (Incoherent Attributes)
The agent uses `ty-html="value"` (simple block syntax) while also trying to bind other properties like `ty-class` (structured block behavior).
```html
<!-- INCORRECT: 'value' is reserved for simple blocks. If you have other ty-* attributes, it's an object. -->
<li ty-list-item="subtitle" ty-html="value" ty-class="cssClass">Subtitle 1</li>
```

### ✅ GOOD (Structured Block)
If the block has multiple properties, use explicit semantic names for all of them.
```html
<!-- CORRECT: 'subtitle' is now an object with 'text' and 'cssClass' properties -->
<li ty-list-item="subtitle" ty-html="text" ty-class="cssClass">Subtitle 1</li>
```

### ✅ GOOD (Simple Block)
If it's just a text, use only `value` (and no other `ty-*` attributes on the same tag).
```html
<!-- CORRECT: 'subtitle' is a simple text block -->
<li class="red" ty-list-item="subtitle" ty-html="value">Subtitle 1</li>
```

---

## 13. Combining `ty-list-item` and `ty-scope` (FORBIDDEN)

**CRITICAL RULE:** You must **NEVER** use `ty-list-item` and `ty-scope` on the same HTML element. They serve different purposes and are mutually exclusive.

- `ty-list-item` defines a **template** for items in a list
- `ty-scope` creates a **data context** for nested variables

### 📄 INPUT (Original HTML)
```html
<div class="articles" ty-list="articles">
  <article class="card">
    <h2>Article Title</h2>
    <img src="thumb.jpg" alt="Thumbnail">
    <p class="author">By John Doe</p>
  </article>
</div>
```

### ❌ BAD (Combining on Same Element)
The agent incorrectly puts both attributes on the same tag, creating ambiguity.
```html
<!-- INCORRECT: NEVER use ty-list-item AND ty-scope on the same element! -->
<div class="articles" ty-list="articles">
  <article class="card" ty-list-item="article" ty-scope="article">
    <h2 ty-text="title">Article Title</h2>
    <img ty-src="thumbnail" src="thumb.jpg" alt="Thumbnail">
    <p class="author" ty-text="'By ' + authorName">By John Doe</p>
  </article>
</div>
```
**Why it's wrong:** The system cannot determine if `article` is the list item template name or a scope variable name.

### ✅ GOOD (Option 1: Flat Structure)
If variables are simple, use them directly without scope.
```html
<!-- CORRECT: Direct binding without scope -->
<div class="articles" ty-list="articles">
  <article class="card" ty-list-item="article">
    <h2 ty-text="title">Article Title</h2>
    <img ty-src="thumbnail" src="thumb.jpg" alt="Thumbnail">
    <p class="author" ty-text="'By ' + authorName">By John Doe</p>
  </article>
</div>
```

### ✅ GOOD (Option 2: Nested Scope)
If you need a scope for complex nested data, put it on a **child element**, not on the `ty-list-item` itself.
```html
<!-- CORRECT: ty-scope is on a child element -->
<div class="articles" ty-list="articles">
  <article class="card" ty-list-item="article">
    <div ty-scope="content">
      <h2 ty-text="title">Article Title</h2>
      <img ty-src="thumbnail" src="thumb.jpg" alt="Thumbnail">
    </div>
    <div ty-scope="author">
      <p class="author" ty-text="'By ' + name">By John Doe</p>
    </div>
  </article>
</div>
```

