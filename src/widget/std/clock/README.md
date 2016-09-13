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
l'image de l'horloge. Le document [SVG](//www.w3.org/Graphics/SVG/) doit avoir
trois éléments avec les identifiants `hour`, `minute` et `second`. Tous les
sous-éléments tourneront avec comme axe le centre de l'image.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple affiche l'horloge dans un cadre marron.

```JSON
{
    "std/clock": {
        "widget": "std/clock",
        "coord": { "x": 1, "y": 1, "w": 5, "h": 5 },
        "config": {
            "color": "#795548"
        }
    }
}
```
