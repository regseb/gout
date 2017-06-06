# core/search/opensearch

Ce scraper extrait les données au fomat
**[OpenSearch](http://www.opensearch.org/Home)** d'un moteur de recherche.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"title"` : le nom du moteur de recherche ;
- `"urls"` : un objet JSON avec deux propriétés :
  - `"results"` : l'adresse du moteur de recherche ;
  - `"suggestions"` (optionnel) : l'adresse de la page retournant des
    suggestions ;
- `"color"` : la couleur du cadre ;
- `"icon"` : l'URL de l'icône du moteur de recherche ;
- `"desc"` (optionnel) : la description du moteur de recherche.

Les deux URLs doivent avoir la balise `{searchTerms}` qui sera remplacée par les
termes recherchés.

## Exemple

Cet exemple fourni trois moteurs de recherche : *Google*, *Bing* et *Yahoo*.

```JSON
{
    "search": {
        "widget": "core/search",
        "coord": { "x": 1, "y": 1, "w": 17, "h": 2 },
        "scrapers": [
            {
                "scraper": "core/search/opensearch",
                "config": {
                    "title": "Google",
                    "urls": {
                        "results": "https://www.google.fr/search?q={searchTerms}",
                        "suggestions": "https://www.google.com/complete/search?client=firefox&q={searchTerms}"
                    },
                    "color": "#2196f3",
                    "icon": "gate/me/search/google.svg"
                }
            }, {
                "scraper": "core/search/opensearch",
                "config": {
                    "title": "Bing",
                    "urls": {
                        "results": "https://www.bing.com/search?q={searchTerms}",
                        "suggestions": "https://www.bing.com/osjson.aspx?query={searchTerms}"
                    },
                    "color": "#ffc107",
                    "icon": "gate/me/search/bing.svg"
                }
            }, {
                "scraper": "core/search/opensearch",
                "config": {
                    "title": "Yahoo",
                    "urls": {
                        "results": "https://fr.search.yahoo.com/search?p={searchTerms}",
                        "suggestions": "https://fr.search.yahoo.com/sugg/os?command={searchTerms}&output=fxjson"
                    },
                    "color": "#673ab7",
                    "icon": "gate/me/search/yahoo.svg"
                }
            }
        ]
    }
}
```
