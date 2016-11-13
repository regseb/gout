# /std/search

Ce widget affiche une zone de saisie pour faire une recherche.

## Configuration

La configuration contient une liste d'objet
[JSON](http://www.json.org "JavaScript Object Notation") avec les propriétés
suivantes :

- `"title"` : le nom du moteur de recherche ;
- `"url"` : l'adresse du moteur de recherche ;
- `"color"` : la couleur du cadre ;
- `"icon"` : le nom du fichier de l'image.

Aucune dimension particulière est conseillée.

Les images de chaque moteur de recherche doivent être dans le répertoire de la
passerelle.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple fourni trois moteurs : *Google*, *Yahoo* et *Bing*.

```JSON
{
    "std/search": {
        "widget": "std/search",
        "coord": { "x": 1, "y": 1, "w": 17, "h": 2 },
        "config": [
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
        ],
        "scrapers": []
    }
}
```
