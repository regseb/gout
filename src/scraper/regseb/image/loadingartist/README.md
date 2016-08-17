# /regseb/image/loadingartist

Ce scraper recupère la liste des derniers dessins publiés sur le site
**[Loading Artist](http://www.loadingartist.com/)**.

## Configuration

Il n'y a pas de configuration.

## Exemple

```JSON
{
    "std/image/loadingartist": {
        "widget": "std/image",
        "coord": { "x": 1, "y": 1, "w": 7, "h": 7 },
        "config": {
            "size": 2,
            "cron": "0 19 * * thu"
        },
        "scrapers": [
            { "scraper": "regseb/image/loadingartist" }
        ]
    }
}
```
