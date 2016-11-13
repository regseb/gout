# /std/empty

Ce widget affiche un cadre vide dont la couleur de fond est personnalisable.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org "JavaScript Object Notation") avec la propriété
suivante :

- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis).

Aucune dimension particulière est conseillée.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple affiche un cadre rouge.

```JSON
{
    "std/empty": {
        "widget": "std/empty",
        "coord": { "x": 1, "y": 1, "w": 10, "h": 10 },
        "config": {
            "color": "#f44336"
        },
        "scrapers": []
    }
}
```
