# core/repeater

Ce scraper retourne les données de la configuration.

Il peut être utilisé avec tous les widgets demandant une méthode `extract()`
dans le scraper.

## Configuration

La configuration contient n'importe quelle valeur et elle sera retournée par la
méthode `extract()`.

## Exemple

Cet configuration affiche des marques-pages avec trois liens allant vers
*[Facebook](https://www.facebook.com/)*, *[Twitter](https://www.twitter.com/)*
et *[Google+](https://plus.google.com/)*.

```JSON
{
    "list/social": {
        "widget": "core/list",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 4 },
        "files": {
            "config.json": {
                "color": "#f0a30a",
                "cron": "0 0 1 1 0"
            }
        },
        "scrapers": [
            {
                "scraper": "core/repeater",
                "config": [
                    {
                        "link": "https://www.facebook.com/",
                        "title": "Facebook"
                    }, {
                        "link": "https://www.twitter.com/",
                        "title": "Twitter"
                    }, {
                        "link": "https://plus.google.com/",
                        "title": "Google+"
                    }
                ]
            }
        ]
    }
}
```
