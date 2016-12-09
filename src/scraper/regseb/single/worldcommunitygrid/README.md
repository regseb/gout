# /regseb/single/worldcommunitygrid

Ce scraper récupère des données statistiques d'un utilisateur de
**[World Community Grid](//www.worldcommunitygrid.org/)**.

## Configuration

La configuration contient l'identifiant d'un utilisateur.

## Exemple

Cet exemple affiche les données de l'utilisateur *regseb*.

```JSON
{
    "std/single/worldcommunitygrid": {
        "widget": "std/single",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 2 },
        "files": {
            "config": {
                "color": "#795548",
                "cron": "0 0 * * *"
            }
        },
        "scrapers": [
            {
                "scraper": "regseb/single/worldcommunitygrid",
                "config": "regseb"
            }
        ]
    }
}
```
