# /regseb/image/instagram

Ce scraper recupère la liste des dernières images publiées par un utilisateur
sur **[Instagram](//www.instagram.com/)**.

## Configuration

La configuration contient un identifiant de compte.

## Exemple

Cet exemple affiche les trois dernières photos de *[Bibliothèque nationale de
France](//www.instagram.com/labnf/)*.

```JSON
{
    "std/image/wizus": {
        "widget": "std/image",
        "coord": { "x": 1, "y": 1, "w": 7, "h": 7 },
        "files": {
            "config": {
                "size": 3,
                "cron": "0 0 * * *"
            }
        },
        "scrapers": [
            {
                "scraper": "regseb/image/instagram",
                "config": "labnf"
            }
        ]
    }
}
```
