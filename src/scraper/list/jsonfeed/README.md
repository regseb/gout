# core/feed/jsonfeed

Ce scraper récupère la liste des dernières actualités d'un flux
[**JSON Feed**](https://jsonfeed.org/).

Il peut être utilisé avec le module `core/feed`.

## Configuration

La configuration contient un objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"url"` : l'URL d'un flux **JSON Feed** ;
- `"icon"` (optionnel - par défaut aucune icône est affichée) : l'URL d'une
  icône qui préfixera le titre.

## Exemple

Cet exemple affiche les dernières actualités du site
[Refind](https://refind.com/).

```JSON
{
    "module": "core/feed",
    "files": {
        "config.json": {
            "color": "#2196f3",
            "cron": "*/10 * * * *"
        }
    },
    "scrapers": [
        {
            "scraper": "core/feed/jsonfeed",
            "config": {
                "url": "https://refind.com/feed/popular.json"
            }
        }
    ]
}
```
