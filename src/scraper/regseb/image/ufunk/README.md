# /regseb/image/ufunk

Ce scraper recupère la liste des dernières images publiées sur le site
**[UFunk](http://www.ufunk.net/)**.

## Configuration

Il n'y a pas de configuration.

## Exemple

```JSON
{
    "std/image/ufunk": {
        "widget": "std/image",
        "coord": { "x": 1, "y": 1, "w": 14, "h": 16 },
        "config": {
            "size": 5,
            "cron": "0 */3 * * *"
        },
        "scrapers": [
            { "scraper": "regseb/image/ufunk" }
        ]
    }
}
```
