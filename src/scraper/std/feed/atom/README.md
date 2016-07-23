# /std/feed/atom

Ce *scraper* récupère la liste des dernières actualités d'un flux **Atom**.

## Configuration

La configuration de ce *scraper* contient une seule URL vers un flux **Atom**.

## Exemple

Cet exemple affiche les dernières actualités du site
[LinuxFr.org](http://linuxfr.org/).

```JSON
{
    "std/feed/linuxfr": {
        "widget": "std/feed",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 6 },
        "config": {
            "color": "#ff9800",
            "cron": "*/10 * * * *"
        },
        "scrapers": [
            { "scraper": "std/feed/atom",
              "config": "http://linuxfr.org/news.atom" },
        ]
    }
}
```
