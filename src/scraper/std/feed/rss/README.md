# /std/feed/rss

Ce *scraper* récupère la liste des dernières actualités d'un flux **RSS**.

## Configuration

La configuration de ce *scraper* contient une seule URL vers un flux **RSS**.

## Exemple

Cet exemple affiche les dernières actualités du site
[Le Monde.fr](http://www.lemonde.fr/).

```JSON
{
    "std/feed/lemonde": {
        "widget": "std/feed",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 6 },
        "config": {
            "color": "#9e9e9e",
            "cron": "*/10 * * * *"
        },
        "scrapers": [
            { "scraper": "std/feed/rss",
              "config": "http://www.lemonde.fr/rss/une.xml" }
        ]
    }
}
```
