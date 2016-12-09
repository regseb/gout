# /regseb/feed/googlefeed

Ce scraper récupère la liste des dernières actualités d'un flux **RSS** ou
**Atom** (en utilisant l'[API Google Feed](//developers.google.com/feed/)).

## Configuration

La configuration contient une URL vers un flux **RSS** ou **Atom**.

## Exemple

Cet exemple affiche les dernières actualités du site
[Developpez.com](http://www.developpez.com/).

```JSON
{
    "std/feed/developpez": {
        "widget": "std/feed",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 6 },
        "files": {
            "config.json": {
                "color": "#607d8b",
                "cron": "*/10 * * * *"
            }
        },
        "scrapers": [
            {
                "scraper": "regseb/feed/googlefeed",
                "config": "http://www.developpez.com/index/rss"
            }
        ]
    }
}
```
