# core/iframe

Ce module affiche un `iframe`.

## Configuration

Le répertoire du widget doit avoir un fichier ***config.json*** contenant un
objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"url"` : le lien de la page Internet qui sera affiché dans l'`iframe` ;
- `"cron"` (optionnel - valeur par défaut : `"@yearly"`) : la notation cron
  indiquant la fréquence de mise à jour.

## Scraper

Ce module n'utilise pas de scraper.

## Exemple

Cet exemple affiche
[Wikipédia](https://fr.wikipedia.org/wiki/Wikipédia:Accueil_principal) dans un
`iframe`.

```JSON
{
    "module": "core/iframe",
    "files": {
        "config.json": {
            "url": "https://fr.wikipedia.org/wiki/Wikipédia:Accueil_principal"
        }
    }
}
```
