# /regseb/single/articleauhasard

Ce scraper donne un lien vers un article au hasard de
**[Wikipédia](//fr.wikipedia.org/)**.

## Configuration

La configuration peut contenir le
[code de la langue](//meta.wikimedia.org/wiki/List_of_Wikipedias/fr) des pages.
Par défaut, c'est la langue française qui est utilisée.

## Exemple

Cet exemple affiche un lien vers un article en français.

```JSON
{
    "std/single/articleauhasard": {
        "widget": "std/single",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 2 },
        "config": {
            "color": "#607d8b",
            "cron": "*/5 * * * *"
        },
        "scrapers": [
            { "scraper": "regseb/single/articleauhasard" }
        ]
    }
}
```
