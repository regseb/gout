# /regseb/image/commitstrip

Ce scraper recupère la liste des derniers dessins publiés sur le site
**[CommitStrip](//www.commitstrip.com/fr/)**.

## Configuration

Il n'y a pas de configuration.

## Exemple

```JSON
{
    "std/image/commitstrip": {
        "widget": "std/image",
        "coord": { "x": 1, "y": 1, "w": 18, "h": 9 },
        "config": {
            "size": 2,
            "cron": "0 20 * * *"
        },
        "scrapers": [
            { "scraper": "regseb/image/commitstrip" }
        ]
    }
}
```
