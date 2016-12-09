# /std/iframe

Ce widget affiche un `iframe`.

## Configuration

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec la
propriété suivante :

- `"link"` : le lien qui sera affiché dans l'`iframe`.

Aucune dimension particulière est conseillée.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple affiche
[Wikipédia](//fr.wikipedia.org/wiki/Wikipédia:Accueil_principal) dans un
`iframe`.

```JSON
{
    "std/iframe/wikipedia": {
        "widget": "std/iframe",
        "coord": { "x": 1, "y": 1, "w": 40, "h": 50 },
        "files": {
            "config.json": {
                "https://fr.wikipedia.org/wiki/Wikipédia:Accueil_principal"
            }
        }
    }
}
```
