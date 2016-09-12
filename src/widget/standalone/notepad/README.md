# /standalone/notepad

Ce widget affiche un bloc-notes.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org "JavaScript Object Notation") avec les propriétés
suivantes :

- `"title"` (optionnel) : le texte affiché quand le bloc-notes est vide ;
- `"desc"` (optionnel) : l'info-bulle du cadre ;
- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;

Aucune dimension particulière est conseillée.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple affiche un bloc-notes pour une liste de courses.

```JSON
{
    "standalone/notepad": {
        "widget": "standalone/notepad",
        "coord": { "x": 1, "y": 1, "w": 10, "h": 8 },
        "config": {
            "title": "...",
            "desc": "Liste de courses",
            "color": "#607d8b"
        }
    }
}
```
