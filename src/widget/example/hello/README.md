# example/hello

Ce widget d'exemple affiche le texte « Hello *someone*! », où *someone* est
configurable.

## Configuration

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond du
  cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"who"` : le texte qui remplacera *someone*.

Une image ayant pour nom ***icon.svg*** doit aussi est présente dans le
répertoire de la passerelle.

Les dimensions conseillées sont **20x2**.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple affiche le texte « Hello world! » sur fond rouge.

```JSON
{
    "example/hello/world": {
        "widget": "example/hello",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 2 },
        "files": {
            "config.json": {
                "color": "#f44336",
                "who": "world"
            }
        }
    }
}
```
