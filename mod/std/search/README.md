# /std/search
Ce module affiche une zone de saisie pour faire une recherche.

## Configuration
Aucune dimension particulière est conseillée.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet *[JSON](http://www.json.org "JavaScript Object Notation")*
avec la propriété suivante :
- `"engines"` : la liste d'objets représentant les moteurs de recherche :
  - `"title"` : le nom du moteur de recherche ;
  - `"url"` : l'adresse du moteur de recherche ;
  - `"terms"` : "q",
  - `"color"` : la couleur du cadre ;
  - `"icon"` : le nom du fichier de l'image.
Les images de chaque moteur de recherche.

## Exemple
### /config.json
Cet exemple fourni deux moteurs : l'un pour *DuckDuckGo* et l'autre pour
*Wikipedia*.
```JSON
{
    "engines": [
        {
            "title": "DuckDuckGo",
            "url": "https://duckduckgo.com/",
            "terms": "q",
            "color": "#e51400",
            "icon": "duckduckgo.svg"
        },
        {
            "title": "Wikipedia",
            "url": "http://fr.wikipedia.org/w/index.php",
            "terms": "search",
            "color": "#000",
            "icon": "wikipedia.svg"
        }
    ]
}
```
### /duckduckgo.svg
### /wikipedia.svg
