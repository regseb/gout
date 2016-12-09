# /regseb/single/cdanslair

Ce scraper récupère le sujet de l'émission
**[C dans l'air](http://www.france5.fr/emissions/c-dans-l-air)**. Ce programme
est diffusé sur *France 5* du lundi au samedi à 17h45.

## Configuration

Il n'y a pas de configuration.

## Exemple

Cet exemple affiche le sujet de l'émission.

```JSON
{
    "std/single/cdanslair": {
        "widget": "std/single",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 2 },
        "files": {
            "config.json": {
                "color": "#9e9e9e",
                "cron": "0 1,14-18 * * *"
            }
        },
        "scrapers": [
            { "scraper": "regseb/single/cdanslair" }
        ]
    }
}
```
