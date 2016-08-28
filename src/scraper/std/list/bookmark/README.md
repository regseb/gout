# /std/list/bookmark

Ce scraper retourne une liste liste de liens.

## Configuration

La configuration contient un tableau qui ressence les marques-pages. Un
marque-page est composé des trois propriétés suivantes :

- `"link"` : l'adresse du site ;
- `"title"` (recommandé) : le texte affiché (si cette propriété n'est pas
  renseignée, le `link` est utilisé) ;
- `"desc"` (optionnel) : l'info-bulle affichée.

## Exemple

Cet configuration affiche un cadre jaune avec trois liens allant vers
*[Facebook](//www.facebook.com/)*, *[Twitter](https://www.twitter.com/)* et
*[Google+](https://plus.google.com/)*.

```JSON
{
    "std/list/social": {
        "widget": "std/list",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 4 },
        "config": {
            "color": "#f0a30a",
            "cron": "0 0 1 1 0"
        },
        "scrapers": [
            { "scraper": "std/list/bookmark",
              "config": [{ "link": "https://www.facebook.com/",
                           "title": "Facebook" },
                         { "link": "https://www.twitter.com/",
                           "title": "Twitter" },
                         { "link": "https://plus.google.com/",
                           "title": "Google+" }] }
        ]
    }
}
```
