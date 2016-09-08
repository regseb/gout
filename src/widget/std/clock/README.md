# /std/clock

Ce widget affiche une horloge qui donne l'heure.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org "JavaScript Object Notation") avec la propriété
suivante :

- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond du
  cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis).

Le widget doit être carré.

Le répertoire de la passerelle doit avoir un fichier ***icon.svg*** qui contient
l'image de l'horloge. Le document SVG doit avoir trois éléments avec les
identifiants `hour`, `minute` et `second`. Tous les sous-éléments tourneront
avec comme axe le centre de l'image.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple affiche l'horloge dans un cadre marron.

```JSON
{
    "std/button/facebook": {
        "widget": "std/button",
        "coord": { "x": 1, "y": 1, "w": 3, "h": 3 },
        "config": {
            "link": "https://www.facebook.com/",
            "title": "Facebook",
            "color": "#2196f3"
        }
    }
}
```
