# core/feed/atom

Ce scraper récupère la liste des dernières actualités d'un flux **Atom**.

Il peut être utilisé avec le module `core/feed`.

## Configuration

La configuration contient un objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"url"` : l'URL d'un flux **Atom** ;
- `"icon"` (optionnel - par défaut aucune icône est affichée) : l'URL d'une
  icône qui préfixera le titre.

## Exemple

Cet exemple affiche les dernières actualités du site
[LinuxFr.org](https://linuxfr.org/).

```JSON
{
    "feed/linuxfr": {
        "module": "core/feed",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 6 },
        "files": {
            "config.json": {
                "color": "#ff9800",
                "cron": "*/10 * * * *"
            }
        },
        "scrapers": [
            {
                "scraper": "core/feed/atom",
                "config": {
                    "url": "https://linuxfr.org/news.atom"
                }
            }
        ]
    }
}
```
