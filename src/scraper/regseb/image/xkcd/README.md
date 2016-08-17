# /regseb/image/xkcd

Ce scraper recupère la liste des derniers dessins publiés sur le site
**[xkcd](http://xkcd.com/)**.

## Configuration

Il n'y a pas de configuration.

## Exemple

```JSON
{
    "std/image/xkcd": {
        "widget": "std/image",
        "coord": { "x": 1, "y": 1, "w": 7, "h": 9 },
        "config": {
            "size": 5,
            "cron": "0 7 * * *"
        },
        "scrapers": [
            { "scraper": "regseb/image/xkcd" }
        ]
    }
}
```
