# /regseb/feed/youtube

Ce scraper récupère la liste des dernières vidéos postées sur
**[Youtube](//www.youtube.com)** par un utilisateur.

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
activez la *YouTube Data API v3*.

## Exemple

Cet exemple affiche les dernières vidéos de
*[Data Gueule](//www.youtube.com/user/datagueule)*.

```JSON
{
    "std/feed/datagueule": {
        "widget": "std/feed",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 6 },
        "files": {
            "config.json": {
                "color": "#3f51b5",
                "cron": "0 * * * *"
            }
        },
        "scrapers": [
            {
                "scraper": "regseb/feed/youtube",
                "config": {
                    "user": "datagueule",
                    "key": "AIzaSyBdVl-cTICSwY... (une clé de ce style)"
                }
            }
        ]
    }
}
```
