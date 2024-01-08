# Scraper _tools/repeater_

> Mots-clés : gout, gout-scraper, gout-scraper-tools-repeater.

Ce scraper permet de simuler un scraper spécifique retournant des données
statiques pour un module.

Il peut être utilisé avec tous les modules.

## Options

Les options sont dans un objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") dont les
clés correspondent aux méthodes simulées et les valeurs aux données retournées.

## Exemple

Ce widget affiche une liste avec deux liens allant vers
[Facebook](https://www.facebook.com/) et
[Twitter](https://www.twitter.com/).

```JSON
{
    "module": {
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/module/list/list.js",
        "options": {
            "color": "#f0a30a"
        }
    },
    "scrapers": [{
        "url": "https://cdn.jsdelivr.net/gh/regseb/gout@0/src/scraper/tools/repeater/repeater.js",
        "options": {
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
