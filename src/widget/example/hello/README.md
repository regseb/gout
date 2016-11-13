# /example/hello

Ce widget d'exemple affiche le texte « Hello *someone*! », où *someone* est
configurable.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org "JavaScript Object Notation") avec les propriétés
suivantes :

- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond du
  cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"who"` : le texte qui remplacera *someone*.

Les dimensions conseillées sont **20x2**.

Une image ayant pour nom ***icon.svg*** doit aussi est présent dans le
répertoire de la passerelle.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple affiche le texte « Hello world! » sur fond rouge.

```JSON
{
    "example/hello/world": {
        "widget": "example/hello",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 2 },
        "config": {
            "color": "#f44336",
            "who": "world"
        },
        "scrapers": []
    }
}
```
