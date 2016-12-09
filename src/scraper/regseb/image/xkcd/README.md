# /regseb/image/xkcd

Ce scraper recupère la liste des derniers dessins publiés sur le site
**[xkcd](//xkcd.com/)**.

## Configuration

Il n'y a pas de configuration.

## Exemple

Cet exemple affiche les deux dernières planches.

```JSON
{
    "std/image/xkcd": {
        "widget": "std/image",
        "coord": { "x": 1, "y": 1, "w": 7, "h": 9 },
        "files": {
            "config.json": {
                "size": 2,
                "cron": "0 7 * * *"
            }
        },
        "scrapers": [
            { "scraper": "regseb/image/xkcd" }
        ]
    }
}
```
