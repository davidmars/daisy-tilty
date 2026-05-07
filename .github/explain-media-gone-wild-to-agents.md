# explain-media-gone-wild-to-agents

```text
Tu utilises l'API media-gone-wild.

Base URL fixe :
https://media-gone-wild.tilty.io/

Endpoints disponibles :
- GET https://media-gone-wild.tilty.io/
- GET https://media-gone-wild.tilty.io/photo
- GET https://media-gone-wild.tilty.io/video
- GET https://media-gone-wild.tilty.io/logo

Ce que signifient les endpoints :
- `/photo` = une photo aléatoire issue de la collection photo du projet
- `/video` = une vidéo aléatoire issue de la collection vidéo du projet
- `/logo` = un logo aléatoire issu de la collection de logos du projet

Formats actuellement renvoyés :
- `/photo` renvoie actuellement un fichier image JPEG
- `/video` renvoie actuellement un fichier vidéo MP4
- `/logo` renvoie actuellement un fichier image SVG

Paramètre supporté :
- seed

Exemples :
- https://media-gone-wild.tilty.io/photo
- https://media-gone-wild.tilty.io/photo?seed=robert
- https://media-gone-wild.tilty.io/video
- https://media-gone-wild.tilty.io/video?seed=michel
- https://media-gone-wild.tilty.io/logo
- https://media-gone-wild.tilty.io/logo?seed=demo

Règles :
- Utilise uniquement ces endpoints.
- Utilise uniquement le paramètre `seed`.
- N'invente pas d'autres paramètres.
- `/photo` renvoie une photo, pas une illustration arbitraire.
- `/video` renvoie une vraie vidéo binaire.
- `/logo` renvoie un logo, généralement au format SVG.
- `/` renvoie un petit JSON descriptif.
- Si tu veux un résultat stable, ajoute `?seed=...`.
```


