# /regseb/image/urtikan

Ce scraper recupère la liste des derniers dessins publiés sur le site
**[Urtikan](http://www.urtikan.net/)**.

## Configuration

Il n'y a pas de configuration.

## Exemple

Cet exemple affiche les trois dernières caricatures.

```JSON
{
    "std/image/urtikan": {
        "widget": "std/image",
        "coord": { "x": 1, "y": 1, "w": 14, "h": 13 },
        "files": {
            "config.json": {
                "size": 3,
                "cron": "0 */4 * * *"
            }
        },
        "scrapers": [
            { "scraper": "regseb/image/urtikan" }
        ]
    }
}
```
