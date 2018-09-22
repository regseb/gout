# core/text

Ce module affiche un cadre avec du texte et dont la couleur de fond est
personnalisable.

## Configuration

Le répertoire du widget doit avoir un fichier ***config.json*** contenant un
objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"align"` (optionnel - valeur par défaut : `"left"`) : l'alignement du texte,
  les valeurs possibles sont `"left"`, `"center"`, `"right"` et `"justify"` ;
- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond du
  cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour des
  évènements.

Une image ayant pour nom ***icon.svg*** doit aussi est présente dans le
répertoire du widget.

## Scraper

Un seul scraper peut être associé à ce module. Il doit définir une méthode
`extract()` retournant une chaine de caractères (qui peut contenir du HTML).

## Exemple

Cet exemple affiche un cadre noir avec le texte *Carpe diem*.

```JSON
{
    "module": "core/text",
    "files": {
        "config.json": {
            "cron": "@yearly"
        }
    },
    "scrapers": [
        {
            "scraper": "core/repeater",
            "config": "Carpe diem"
        }
    ]
}
```
