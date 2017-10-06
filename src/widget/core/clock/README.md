# core/clock

Ce widget affiche une horloge.

## Configuration

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond du
  cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"cron"` (optionnel - valeur par défaut : `"0 0 * * *"`) : la notation cron
  indiquant le recalcul de l'heure.

Une image ayant pour nom ***icon.svg*** peut aussi est présente dans le
répertoire de la passerelle. Elle sera utilisé comme image de l'horloge. Le
document [SVG](https://www.w3.org/Graphics/SVG/) doit avoir trois éléments avec
les identifiants `hour`, `minute` et `second`. Tous les sous-éléments tourneront
avec comme axe le centre de l'image.

Le widget doit être carré.

## Scraper

Un seul scraper peut-être associé à ce widget. Il doit définir une méthode
`extract()` qui retourne le nombre de millisecondes depuis le 1er janvier 1970
à 00:00:00.

## Exemple

Cet exemple affiche l'horloge (sur un fond marron) avec l'heure courante.

```JSON
{
    "clock": {
        "widget": "core/clock",
        "coord": { "x": 1, "y": 1, "w": 5, "h": 5 },
        "files": {
            "config.json": {
                "color": "#795548"
            }
        },
        "scrapers": [
            {
                "scraper": "core/clock/date"
            }
        ]
    }
}
```
