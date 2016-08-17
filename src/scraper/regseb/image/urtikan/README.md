# /regseb/image/urtikan

Ce scraper recupère la liste des derniers dessins publiés sur le site
**[Urtikan](http://www.urtikan.net/)**.

## Configuration

Il n'y a pas de configuration.

## Exemple

```JSON
{
    "std/image/urtikan": {
        "widget": "std/image",
        "coord": { "x": 1, "y": 1, "w": 14, "h": 13 },
        "config": {
            "size": 3,
            "cron": "0 */3 * * *"
        },
        "scrapers": [
            { "scraper": "regseb/image/urtikan" }
        ]
    }
}
```
