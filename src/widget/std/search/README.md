# /std/search

Ce widget affiche une zone de saisie pour faire une recherche.

## Configuration

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"title"` : le nom du moteur de recherche ;
- `"url"` : l'adresse du moteur de recherche ;
- `"color"` : la couleur du cadre ;
- `"icon"` : le nom du fichier de l'image.

Les images de chaque moteur de recherche doivent être dans le répertoire de la
passerelle.

Aucune dimension particulière est conseillée.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple fourni trois moteurs : *Google*, *Yahoo* et *Bing*.

```JSON
{
    "std/search": {
        "widget": "std/search",
        "coord": { "x": 1, "y": 1, "w": 17, "h": 2 },
        "files": {
            "config.json": [
                {
                    "title": "Google",
                    "url": "https://www.google.fr/search?q={searchTerms}",
                    "color": "#2196f3",
                    "icon": "google.svg"
                }, {
                    "title": "Yahoo",
                    "url": "https://fr.search.yahoo.com/search?p={searchTerms}",
                    "color": "#673ab7",
                    "icon": "yahoo.svg"
                }, {
                    "title": "Bing",
                    "url": "https://www.bing.com/search?q={searchTerms}",
                    "color": "#ffc107",
                    "icon": "bing.svg"
                }
            ]
        }
    }
}
```
