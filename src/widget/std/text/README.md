# /std/text

Ce widget affiche un cadre avec du texte et dont la couleur de fond est
personnalisable.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org "JavaScript Object Notation") avec les propriétés
suivantes :

- `"text"` (optionnel - valeur par défaut : `""`) : le texte affiché dans le
  cadre ;
- `"align"` (optionnel - valeur par défaut : `"left"`) : l'alignement du texte,
  les possibles sont `"left"`, `"center"`, `"right"` et `"justify"` ;
- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond du
  cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;

Aucune dimension particulière est conseillée.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple affiche un cadre noir avec le texte *Carpe diem*.

```JSON
{
    "std/text/carpe": {
        "widget": "std/text",
        "coord": { "x": 1, "y": 1, "w": 10, "h": 2 },
        "config": {
            "text": "Carpe diem"
        }
    }
}
```
