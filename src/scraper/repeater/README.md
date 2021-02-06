# Scraper *repeater*

Ce scraper retourne simplement les données de la configuration.

Il peut être utilisé avec tous les modules.

## Configuration

La configuration contient un objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") dont les
dont les clés correspondent aux méthodes simulées et les valeurs aux données
retournées.

## Exemple

Cet configuration affiche des marques-pages avec deux liens allant vers
*[Facebook](https://www.facebook.com/)* et
*[Twitter](https://www.twitter.com/)*.

```JSON
{
    "module": {
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@1/src/module/list/list.js",
        "config": {
            "color": "#f0a30a"
        }
    },
    "scrapers": [{
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@1/src/scraper/repeater/repeater.js",
        "config": {
            "extract": [{
                "title": "Facebook",
                "link": "https://www.facebook.com/"
            }, {
                "title": "Twitter",
                "link": "https://www.twitter.com/"
            }]
        }
    }]
}
```
