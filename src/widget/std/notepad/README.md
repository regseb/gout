# /std/notepad

Ce widget affiche un bloc-notes.

## Configuration

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"title"` (optionnel) : le texte affiché quand le bloc-notes est vide ;
- `"desc"` (optionnel) : l'info-bulle du cadre ;
- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;

Une image ayant pour nom ***icon.svg*** doit aussi est présente dans le
répertoire de la passerelle.

Aucune dimension particulière est conseillée.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple affiche un bloc-notes pour une liste de courses.

```JSON
{
    "std/notepad": {
        "widget": "std/notepad",
        "coord": { "x": 1, "y": 1, "w": 10, "h": 8 },
        "files": {
            "config.json": {
                "title": "...",
                "desc": "Liste de courses",
                "color": "#607d8b"
            }
        }
    }
}
```
