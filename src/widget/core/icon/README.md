# core/icon

Ce widget affiche une icône dans un lien.

## Configuration

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec la
propriété suivante :

- `"cron"` (optionnel - valeur par défaut : `"0 0 1 1 0"`) : la notation cron
  indiquant la fréquence de mise à jour.

Le widget doit être carré.

## Scraper

Un seul scraper peut-être associé à ce widget. Il doit définir une méthode
`extract()` qui retourne un objet JSON ayant les propriétés :

- `"icon"` : l'URL de l'image ;
- `"link"` : le lien vers une page Internet ;
- `"desc"` : l'info-bulle affichée au survol ;
- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis).

L'image doit être carrée et le dessin doit occupé toute la zone de l'image. Si
le dessin n'est pas carré, il faut le centrer verticalement et horizontalement.
Seule la couleur blanche doit être utilisée.

## Exemple

Cet exemple affiche un bouton qui redirige vers *Facebook*.

```JSON
{
    "icon/facebook": {
        "widget": "core/icon",
        "coord": { "x": 1, "y": 1, "w": 3, "h": 3 },
        "files": { "config.json": {} },
        "scrapers": [
            {
                "scraper": "core/repeater",
                "config": {
                    "icon": "gate/community/me/icon/facebook/icon.svg",
                    "link": "https://www.facebook.com/",
                    "desc": "Facebook",
                    "color": "#2196f3"
                }
            }
        ]
    }
}
```
