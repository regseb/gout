# /regseb/image/ufunk

Ce scraper recupère la liste des dernières images publiées sur le site
**[UFunk](http://www.ufunk.net/)**.

## Configuration

Il n'y a pas de configuration.

## Exemple

Cet exemple affiche les cinq dernières images, en les actualisant toutes les
trois heures.

```JSON
{
    "std/image/ufunk": {
        "widget": "std/image",
        "coord": { "x": 1, "y": 1, "w": 14, "h": 16 },
        "files": {
            "config.json": {
                "size": 5,
                "cron": "0 */3 * * *"
            }
        },
        "scrapers": [
            { "scraper": "regseb/image/ufunk" }
        ]
    }
}
```
