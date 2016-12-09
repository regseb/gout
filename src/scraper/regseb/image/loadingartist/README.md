# /regseb/image/loadingartist

Ce scraper recupère la liste des derniers dessins publiés sur le site
**[Loading Artist](//www.loadingartist.com/)**.

## Configuration

Il n'y a pas de configuration.

## Exemple

Cet exemple affiche le dernier dessin publié le jeudi.

```JSON
{
    "std/image/loadingartist": {
        "widget": "std/image",
        "coord": { "x": 1, "y": 1, "w": 7, "h": 7 },
        "files": {
            "config.json": {
                "size": 1,
                "cron": "0 19 * * thu"
            }
        },
        "scrapers": [
            { "scraper": "regseb/image/loadingartist" }
        ]
    }
}
```
