# /std/ajaxloader

Ce widget indique si une requête AJAX est en cours, grâce à une image animée.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org "JavaScript Object Notation") avec la propriété
suivante :

- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond du
  cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;

Les dimensions conseillées sont **2x2**.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple affiche un cadre noir.

```JSON
{
    "std/ajaxloader": {
        "widget": "std/ajaxloader",
        "coord": { "x": 1, "y": 1, "w": 2, "h": 2 },
        "config": {}
    }
}
```
