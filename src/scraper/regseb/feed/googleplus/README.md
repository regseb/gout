# /regseb/feed/googleplus

Ce scraper récupère la liste des dernières actualités d'un compte
**[Google+](//plus.google.com/)**.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"user"` : un identifiant de compte ;
- `"key"` : une clé pour les API Google.

### `"key"`

Pour obtenir une clé, allez dans la
***[Console des API Google](//console.developers.google.com/)***. Créez un
projet, puis *Créez des identifiants* pour obtenir une *Clé API*. Ensuite,
activez la *Google+ API*.

## Exemple

Cet exemple affiche les dernières actualités du compte du
[Musée du Louvre](//plus.google.com/+MuseeLouvre/posts).

```JSON
{
    "std/feed/lelouvre": {
        "widget": "std/feed",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 3 },
        "files": {
            "config.json": {
                "color": "#673ab7",
                "cron": "0 * * * *"
            }
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
