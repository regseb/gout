# core/feed/rss

Ce scraper récupère la liste des dernières actualités d'un flux **RSS**.

Il peut être utilisé avec le widget `core/feed`.

## Configuration

La configuration contient une seule URL vers un flux **RSS**.

## Exemple

Cet exemple affiche les dernières actualités du site
[Le Monde.fr](//www.lemonde.fr/).

```JSON
{
    "feed/lemonde": {
        "widget": "core/feed",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 6 },
        "files": {
            "config.json": {
                "color": "#9e9e9e",
                "cron": "*/10 * * * *"
            }
        },
        "scrapers": [
            {
                "scraper": "core/feed/rss",
                "config": "https://www.lemonde.fr/rss/une.xml"
            }
        ]
    }
}
```
