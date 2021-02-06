# Scraper *list/rss*

Ce scraper récupère la liste des dernières actualités d'un flux **RSS**.

Il peut être utilisé avec le module `feed`.

## Configuration

La configuration contient un objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"url"` : l'URL d'un flux **RSS** ;
- `"icon"` (optionnel - par défaut aucune icône est affichée) : l'URL d'une
  icône qui préfixera le titre.

## Exemple

Cet exemple affiche les dernières actualités du site
[Le Monde.fr](https://www.lemonde.fr/).

```JSON
{
    "module": "core/feed",
    "files": {
        "config.json": {
            "color": "#9e9e9e",
            "cron": "*/10 * * * *"
        }
    },
    "scrapers": [
        {
            "scraper": "core/feed/rss",
            "config": {
                "url": "https://www.lemonde.fr/rss/une.xml"
            }
        }
    ]
}
```
