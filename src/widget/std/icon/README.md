# /std/icon

Ce widget affiche une icône dans un lien.

## Configuration

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"link"` (optionnel) : le lien vers une page Internet ;
- `"desc"` (optionnel - valeur par défaut `""`) : l'info-bulle affichée au
  survol du bouton ;
- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond du
  bouton (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis).

Le widget doit être carré.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple affiche un bouton qui redirige vers *Facebook*.

```JSON
{
    "std/icon/facebook": {
        "widget": "std/icon",
        "coord": { "x": 1, "y": 1, "w": 3, "h": 3 },
        "files": { "config": {} },
        "scrapers": [
            {
                "scraper": "std/repeater",
                "config": {
                    "icon": "gate/me/std/icon/facebook/icon.svg",
                    "link": "https://www.facebook.com/",
                    "desc": "Facebook",
                    "color": "#2196f3"
                }
            }
        ]
    }
}
```
