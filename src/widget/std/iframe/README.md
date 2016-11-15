# /std/iframe

Ce widget affiche un `iframe`.

## Configuration

La configuration contient un lien qui sera affiché dans l'`iframe`.

Aucune dimension particulière est conseillée.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple affiche
[Wikipedia](//fr.wikipedia.org/wiki/Wikipédia:Accueil_principal) dans un
`iframe`.

```JSON
{
    "std/iframe/wikipedia": {
        "widget": "std/iframe",
        "coord": { "x": 1, "y": 1, "w": 40, "h": 50 },
        "config": "https://fr.wikipedia.org/wiki/Wikipédia:Accueil_principal",
        "scrapers": []
    }
}
```
