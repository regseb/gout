# core/search

Ce module affiche une zone de saisie pour faire une recherche.

## Configuration

Aucun fichier est nécessaire. La configuration se fait avec les scrapers.

La hauteur conseillé est **2**.

## Scraper

Les scrapers associés à ce module doivent définir trois méthodes :

- `info()` qui retourne les informations du moteur de recherche dans un objet
  JSON grâce aux propriétés :
  - `"title"` : le nom du moteur de recherche ;
  - `"color"` : la couleur du cadre ;
  - `"icon"` : l'URL de l'icône du moteur de recherche ;
  - `"desc"` (optionnel) : la description du moteur de recherche.
- `suggest()` qui prend en paramètre les mots cherchés et qui retourne une liste
  de propositions.
- `result()` qui prend en paramètre les mots cherchés et qui renvoi l'URL de la
  page des résultats.

## Exemple

Cet exemple fourni le moteur de recherche : *DuckDuckGo*.

```JSON
{
    "search": {
        "module": "core/search",
        "coord": { "x": 1, "y": 1, "w": 17, "h": 2 },
        "scrapers": [
            {
                "scraper": "core/search/opensearch",
                "config": {
                    "title": "DuckDuckGo",
                    "urls": {
                        "results": "https://duckduckgo.com/?q={searchTerms}",
                        "suggestions": "https://ac.duckduckgo.com/ac/?q={searchTerms}&type=list"
                    },
                    "color": "#f44336",
                    "icon": "widget/me/search/duckduckgo.svg"
                }
            }
        ]
    }
}
```
