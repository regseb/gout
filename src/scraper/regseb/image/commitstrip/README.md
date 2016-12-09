# /regseb/image/commitstrip

Ce scraper recupère la liste des derniers dessins publiés sur le site
**[CommitStrip](//www.commitstrip.com/fr/)**.

## Configuration

Il n'y a pas de configuration.

## Exemple

Cet exemple affiche les deux dernières dessins, en les actualisant à 20h00.

```JSON
{
    "std/image/commitstrip": {
        "widget": "std/image",
        "coord": { "x": 1, "y": 1, "w": 18, "h": 9 },
        "files": {
            "config.json": {
                "size": 2,
                "cron": "0 20 * * *"
            }
        },
        "scrapers": [
            { "scraper": "regseb/image/commitstrip" }
        ]
    }
}
```
