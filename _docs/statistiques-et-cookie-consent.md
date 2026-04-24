# Statistiques et gestion du consentement

Cette documentation décrit deux sujets liés :

- le suivi de fréquentation avec **Matomo** ;
- la gestion du consentement des cookies avec **CookieConsent**.

## Fichiers impliqués

- `src/layout/raw-layout.html` : inclut le fragment `analytics-rgpd.html` dans le layout global.
- `src/layout/analytics-rgpd.html` : charge la configuration du bandeau cookies et contient le script Matomo conditionné au consentement.
- `public/js/cookieconsent-config.js` : configure CookieConsent (catégories, textes, langues, comportement de la modale).
- `src/layout/footer.html` : expose les boutons permettant de rouvrir la modale de consentement.

## Statistiques de fréquentation avec Matomo

Le projet utilise **Matomo** pour mesurer la fréquentation du site.

Dans l'état actuel, le code de suivi pointe vers :

- l'instance `//matomo1.tilty.io/` ;
- l'identifiant de site `5` défini dans `src/layout/analytics-rgpd.html`.

Avant une mise en production, il faut :

1. créer un site dédié dans l'interface d'administration Matomo ;
2. récupérer son identifiant de suivi ;
3. remplacer la valeur utilisée dans `src/layout/analytics-rgpd.html` ;
4. vérifier que l'URL du tracker Matomo correspond bien à l'instance attendue.

## Gestion du consentement

Le consentement est géré avec la bibliothèque **CookieConsent** d'**Orest Bida**.

> [!NOTE]
> CookieConsent n'est pas installé comme dépendance npm du projet ; il est chargé via CDN.

La configuration applicative se trouve dans `public/js/cookieconsent-config.js`. Ce fichier permet notamment de définir :

- les catégories de cookies (`necessary`, `analytics`) ;
- les textes affichés dans la bannière et la fenêtre de préférences ;
- les traductions disponibles ;
- le comportement de la modale.

Documentation utile :

- https://cookieconsent.orestbida.com/
- https://playground.cookieconsent.orestbida.com/

## Activation conditionnelle du tracking

Le chargement de Matomo dépend de l'acceptation de la catégorie `analytics`.

Dans `src/layout/analytics-rgpd.html`, le script Matomo est déclaré avec l'attribut `data-category="analytics"` dans un bloc `script` de type `text/plain`.

Conséquence :

- tant que l'utilisateur n'a pas accepté les cookies analytiques, le script Matomo reste bloqué ;
- dès que le consentement est donné, CookieConsent autorise l'exécution du script et le tracking peut démarrer ;
- si l'utilisateur refuse cette catégorie, aucun suivi Matomo n'est déclenché.

## Rouvrir la modale de consentement

Le projet expose déjà deux actions dans `src/layout/footer.html` :

```html
<button class="link link-hover" type="button" data-cc="show-consentModal">Gestion des cookies</button>
<button class="link link-hover" type="button" data-cc="show-preferencesModal">Configurer mes cookies</button>
```

Ces attributs `data-cc` sont interprétés directement par CookieConsent pour ouvrir la bannière ou la fenêtre de préférences.

Documentation complémentaire :

- https://cookieconsent.orestbida.com/advanced/custom-attribute.html

## Checklist de mise en service

- [ ] Créer un identifiant de suivi Matomo pour le projet.
- [ ] Mettre à jour l'identifiant de site dans `src/layout/analytics-rgpd.html`.
- [ ] Vérifier l'URL du tracker Matomo.
- [ ] Relire les textes et traductions de `public/js/cookieconsent-config.js`.
- [ ] Tester le comportement avec acceptation et refus des cookies analytiques.
