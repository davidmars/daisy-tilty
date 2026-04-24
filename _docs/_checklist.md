# Checklist projet

Cette checklist centralise les points de vigilance et de mise en service du projet.


> Cette checklist a vocation à être enrichie progressivement avec d'autres sujets au fil de l'avancement.

## RGPD

- [ ] Créer le site dans Matomo et récupérer son identifiant de suivi.
- [ ] Mettre à jour `setSiteId` et vérifier `setTrackerUrl` dans `src/layout/analytics-rgpd.html`.
- [ ] Relire les catégories, textes et traductions dans `public/js/cookieconsent-config.js`.
- [ ] Vérifier que le bloc Matomo reste bien conditionné par `data-category="analytics"`.
- [ ] Tester les deux cas : acceptation et refus des cookies analytiques.
