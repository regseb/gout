# core/icon/ping

Ce scraper vérifie si un serveur est toujours accessible.

Il peut être utilisé avec le widget `core/icon`.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"url"` : l'URL du serveur qui sera testé ;
- `"icon"` : TODO ;
- `"title"` : TODO ;
- `"link"` : TODO ;
- `"colors"` : TODO.

## Exemple

Cet configuration indique l'état du serveur `localhost`.

```JSON
{
    "ping/localhost": {
        "widget": "core/icon",
        "coord": { "x": 1, "y": 1, "w": 4, "h": 4 },
        "files": {
            "config.json": {
                "cron": "0 1 * * *"
            }
        },
        "scrapers": [
            {
                "scraper": "core/icon/ping",
                "config": {
                    "url": "http://localhost",
                    "icon": "gate/community/me/ping/localhost/icon.svg",
                    "desc": "localhost"
                }
            }
        ]
    }
}
```
