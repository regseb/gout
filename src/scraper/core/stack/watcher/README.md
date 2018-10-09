# core/stack/watcher

Ce scraper surveille une zone d'une page Web et vous avertit lors d'un
changement.

Il peut être utilisé avec le module `core/stack`.

## Configuration

La configuration contient un objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"url"` : l'URL d'une page Web ;
- ̀ "selector"` : un selecteur CSS pour récupérer une zone de la page ;
- `"title"` (optionnel - par défaut l'`url` est utilisée) : le texte affiché
  dans le widget ;
- `"icon"` (optionnel - par défaut aucune icône est affichée) : l'URL d'une
  icône qui préfixera le titre.

## Exemple

Cet exemple surveille le prix de
[Half-Life](https://store.steampowered.com/app/70/HalfLife/) sur Steam.

```JSON
{
    "module": "core/stack",
    "files": {
        "config.json": {
            "color": "#3f51b5",
            "cron": "@daily"
        }
    },
    "scrapers": [
        {
            "scraper": "core/stack/watcher",
            "config": {
                "url": "https://store.steampowered.com/app/70/HalfLife/",
                "selector": ".game_purchase_price",
                "title": "Half-Life"
            }
        }
    ]
}
```
