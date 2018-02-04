# core/icon

Ce module affiche une icône dans un lien.

## Configuration

Le répertoire du widget doit avoir un fichier ***config.json*** contenant un
objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"target"` (optionnel - valeur par défaut : `"_blank"`) : le contexte où sera
  ouvert le lien (cf. l'attribut
  `[target](https://developer.mozilla.org/fr/docs/Web/HTML/Element/a#attr-target)`
  de l'élément HTML `<a>`) ;
- `"cron"` (optionnel - valeur par défaut : `"0 0 1 1 0"`) : la notation cron
  indiquant la fréquence de mise à jour.

Le module doit être carré.

## Scraper

Un seul scraper peut-être associé à ce module. Il doit définir une méthode
`extract()` qui retourne un tableau avec un objet JSON ayant les propriétés :

- `"icon"` : l'URL de l'image ;
- `"link"` : le lien vers une page Internet ;
- `"title"` : l'info-bulle affichée au survol ;
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
        "module": "core/icon",
        "coord": { "x": 1, "y": 1, "w": 3, "h": 3 },
        "files": { "config.json": {} },
        "scrapers": [
            {
                "scraper": "core/repeater",
                "config": [{
                    "icon": "widget/community/me/icon/facebook/icon.svg",
                    "link": "https://www.facebook.com/",
                    "title": "Facebook",
                    "color": "#2196f3"
                }]
            }
        ]
    }
}
```
