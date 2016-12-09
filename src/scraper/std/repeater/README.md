# /std/repeater

Ce scraper retourne les données de la configuration.

## Configuration

La configuration contient n'importe quelle valeur et elle sera retournée par la
méthode `extract()`.

## Exemple

Cet configuration affiche des marques-pages avec trois liens allant vers
*[Facebook](//www.facebook.com/)*, *[Twitter](//www.twitter.com/)* et
*[Google+](//plus.google.com/)*.

```JSON
{
    "std/list/social": {
        "widget": "std/list",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 4 },
        "files": {
            "config.json": {
                "color": "#f0a30a",
                "cron": "0 0 1 1 0"
            }
        },
        "scrapers": [
            {
                "scraper": "std/repeater",
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
