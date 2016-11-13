# /regseb/feed/googleplus

Ce scraper récupère la liste des dernières actualités d'un compte
**[Google+](//plus.google.com/)**.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org "JavaScript Object Notation") avec les propriétés
suivantes :

- `"user"` : un identifiant de compte ;
- `"key"` : une clé pour les API Google.

Pour obtenir une clé, allez dans la
***[Google Developers Console](//console.developers.google.com/)***. Créez un
projet, puis *Ajoutez des identifiants* pour obtenir une *Clé de l'API*.
Ensuite, activez la *Google+ API*.

## Exemple

Cet exemple affiche les dernières actualités du compte du
[Musée du Louvre](//plus.google.com/+MuseeLouvre/posts).

```JSON
{
    "std/feed/lelouvre": {
        "widget": "std/feed",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 3 },
        "config": {
            "color": "#673ab7",
            "cron": "0 * * * *"
        },
        "scrapers": [
            {
                "scraper": "regseb/feed/googlefeed",
                "config": {
                    "user": "MuseeLouvre",
                    "key": "AIzaSyBdVl-cTICSwY... (une clé de ce style)"
                }
            }
        ]
    }
}
```
