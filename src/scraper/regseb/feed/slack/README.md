# /regseb/feed/slack

Ce scraper recupère les derniers messages d'un *channel* de
**[Slack]("//slack.com/")**.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"group"` : le nom groupe (= le préfixe de *slack.com* dans l'URL) ;
- `"token"` : votre token de test à générer grâce à cette page
  <//api.slack.com/docs/oauth-test-tokens> ;
- `"channel"` : le nom du *channel* à surveiller.

## Exemple

Cet exemple affiche les quatre derniers messages du *channel* *general* du
groupe *my-project*.

```JSON
{
    "regseb/feed/slack": {
        "widget": "std/feed",
        "coord": { "x": 1, "y": 1, "w": 28, "h": 5 },
        "files": {
            "config": {
                "color": "#673ab7",
                "cron": "* * * * *"
            }
        },
        "scrapers": [
            {
                "scraper": "regseb/feed/slack",
                "config": {
                    "group": "my-project",
                    "token": "xoxp-123456789-12... (une clé de ce style)",
                    "channel": "general"
                }
            }
        ]
    }
}
```
