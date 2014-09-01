# /std/bookmark
Ce module affiche une liste de liens.

## Configuration
Si le module contient *N* liens, la hauteur doit-être fixée à *N + 1*. La
largeur dépend de la longueur des textes affichés.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec la propriété `"color"` qui correspond à la couleur de fond du cadre (au
format hexadécimale, régulier RGB ou avec des mots-clefs prédéfinis). L'objet
JSON doit aussi avoir la propriété `"sites"` qui ressence les marques-pages. Un
marque-page est composé des trois propriétés suivantes :
- `"link"` : l'adresse du site ;
- `"title"` (recommandé) : le texte affiché (si cette propriété n'est pas
  renseignée, le `link` est utilisée) ;
- `"help"` (optionnel) : l'info-bulle affichée.
Une image ayant pour nom ***icon.svg*** doit aussi est présent dans le
répertoire.

## Exemple
### /config.json
Cet configuration affiche un cadre jaune avec trois liens allant vers Facebook,
Twitter et Google+.
```JSON
{
    "color": "#f0a30a",
    "sites": [
        {
            "link": "https://www.facebook.com/",
            "title": "Facebook"
        },
        {
            "link": "https://www.twitter.com/",
            "title": "Twitter"
        },
        {
            "link": "https://plus.google.com/",
            "title": "Google+"
        }
    ]
}
```
### /icon.svg
TODO Insérer une image.
