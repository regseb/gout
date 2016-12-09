# /regseb/feed/twitter

Ce scraper récupère la liste des derniers tweets d'un compte
**[Twitter](//twitter.com/)**.

## Configuration

La configuration contient un identifiant de compte.

## Exemple

Cet exemple affiche les derniers tweets du compte de
**[jQuery](//twitter.com/jquery)**.

```JSON
{
    "std/feed/jquery": {
        "widget": "std/feed",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 6 },
        "files": {
            "config.json": {
                "color": "#3f51b5",
                "cron": "0 * * * *"
            }
        },
        "scrapers": [
            {
                "scraper": "regseb/feed/twitter",
                "config": "jquery"
            }
        ]
    }
}
```
