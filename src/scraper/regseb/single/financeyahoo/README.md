# /regseb/single/financeyahoo

Ce scraper récupère le cours d'une action cotée en bourse (grâce à l'API de
**Yahoo Finance**).

## Configuration

La configuration contient un objet
[JSON](http://www.json.org "JavaScript Object Notation") avec les propriétés
suivantes :

- `"share"` : le symbole de la société ;
- `"lang"` (optionnel - valeur par défaut : `"fr"`) : le
  [code du site](https://everything.yahoo.com/world/) (`"fr"`, `"fr-be"`,
  `"qc"`, ...).

## Exemple

### /config.json

Cet exemple affiche le cours de l'action de la société *Pernod Ricard*, et fais
pointer le lien vers la page française du site *Yahoo*.

```JSON
{
    "std/single/ricard": {
        "widget": "std/single",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 2 },
        "config": {
            "color": "#3f51b5",
            "cron": "*/5 9-18 * * 1-5"
        },
        "scrapers": [
            { "scraper": "regseb/single/financeyahoo",
              "config": { "share": "ri.pa" }
            }
        ]
    }
}
```
