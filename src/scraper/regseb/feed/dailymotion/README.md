# /regseb/feed/dailymotion

Ce *scraper* recupère la liste des dernières vidéos postées sur
**[dailymotion](http://www.dailymotion.com/fr)** par un utilisateur.

## Configuration

La configuration contient un identifiant de compte.

## Exemple

Cet exemple affiche les dernières vidéos des
**[Guignols de l'Info](http://www.dailymotion.com/lesguignols)**.

```JSON
{
    "std/feed/lesguignols": {
        "widget": "std/feed",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 4 },
        "config": {
            "color": "#9e9e9e",
            "cron": "0 21 * * *"
        },
        "scrapers": [
            { "scraper": "regseb/feed/dailymotion",
              "config": "lesguignols" }
        ]
    }
}
```
