# /std/ajaxloader

Ce widget indique si une requête
[AJAX](//developer.mozilla.org/fr/docs/AJAX "Asynchronous JAvascript and Xml")
est en cours, grâce à une image animée.

## Configuration

La configuration contient la couleur de fond du cadre (au format hexadécimale,
régulier RGB ou avec des mots-clefs prédéfinis). Par défaut, le cadre est noir.

Les dimensions conseillées sont **2x2**.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple affiche l'image animée dans un cadre noir.

```JSON
{
    "std/ajaxloader": {
        "widget": "std/ajaxloader",
        "coord": { "x": 1, "y": 1, "w": 2, "h": 2 },
    }
}
```
