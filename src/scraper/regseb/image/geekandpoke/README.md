# /regseb/image/geekandpoke

Ce scraper recupère la liste des derniers dessins publiés sur le site
**[GeekAndPoke](http://geek-and-poke.com/)**.

## Configuration

Il n'y a pas de configuration.

## Exemple

```JSON
{
    "std/image/geekandpoke": {
        "widget": "std/image",
        "coord": { "x": 1, "y": 1, "w": 7, "h": 9 },
        "config": {
            "size": 2,
            "cron": "0 0 * * *"
        },
        "scrapers": [
            { "scraper": "regseb/image/geekandpoke" }
        ]
    }
}
```
