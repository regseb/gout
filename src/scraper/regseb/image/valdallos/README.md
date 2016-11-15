# /regseb/image/valdallos

Ce scraper recupère les webcams du
**[Val d'Allos](http://www.valdallos.com/webcams.html)**.

## Configuration

La configuration contient un tableau listant les webcams qui seront affichées.
Les valeurs possibles sont pour :

- Allos : `"village"` et `"parc-loisirs"` ;
- Seignus : `"seignus-bas"` et `"seignus-haut"` ;
- Foux d'Allos : `"front-de-neige"` et `"observatoire"`.

Il faut passer le nombre d'élément dans le tableau à la propriété `"size"` du
widget `std/image`.

## Exemple

Cet exemple affiche les deux webcams du Seignus et celle du village d'Allos, en
les actualisant une fois par jour à midi.

```JSON
{
    "std/image/valdallos": {
        "widget": "std/image",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 4 },
        "config": {
            "size": 3,
            "cron": "0 12 * * *"
        },
        "scrapers": [
            {
                "scraper": "regseb/image/valdallos",
                "config": ["seignus-bas", "observatoire", "village"]
            }
        ]
    }
}
```
