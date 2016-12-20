# core/clock

Ce widget affiche une horloge qui donne l'heure.

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

Le widget doit être carré.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple affiche l'horloge dans un cadre marron.

```JSON
{
    "clock": {
        "widget": "core/clock",
        "coord": { "x": 1, "y": 1, "w": 5, "h": 5 },
        "files": {
            "config.json": {
                "color": "#795548"
            }
        }
    }
}
```
