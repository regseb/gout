# core/iframe

Ce module affiche un `iframe`.

## Configuration

Le répertoire du widget doit avoir un fichier ***config.json*** contenant un
objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"url"` : le lien de la page Internet qui sera affiché dans l'`iframe` ;
- `"cron"` (optionnel - valeur par défaut : `"0 0 1 1 0"`) : la notation cron
  indiquant la fréquence de mise à jour.

Aucune dimension particulière est conseillée.

## Scraper

Ce module n'utilise pas de scraper.

## Exemple

Cet exemple affiche
[Wikipédia](https://fr.wikipedia.org/wiki/Wikipédia:Accueil_principal) dans un
`iframe`.

```JSON
{
    "iframe/wikipedia": {
        "module": "core/iframe",
        "coord": { "x": 1, "y": 1, "w": 40, "h": 50 },
        "files": {
            "config.json": {
                "url": "https://fr.wikipedia.org/wiki/Wikipédia:Accueil_principal"
            }
        }
    }
}
```
