# core/feed/atom

Ce scraper récupère la liste des dernières actualités d'un flux **Atom**.

Il peut être utilisé avec le widget `core/feed`.

## Configuration

La configuration contient une seule URL vers un flux **Atom**.

## Exemple

Cet exemple affiche les dernières actualités du site
[LinuxFr.org](//linuxfr.org/).

```JSON
{
    "feed/linuxfr": {
        "widget": "core/feed",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 6 },
        "files": {
            "config.json": {
                "color": "#ff9800",
                "cron": "*/10 * * * *"
            }
        },
        "scrapers": [
            {
                "scraper": "core/feed/atom",
                "config": "http://linuxfr.org/news.atom"
            }
        ]
    }
}
```
