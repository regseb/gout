# core/notepad

Ce module affiche un bloc-notes.

## Configuration

Le répertoire du widget doit avoir un fichier ***config.json*** contenant un
objet
[JSON](https://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"title"` (optionnel) : le texte affiché quand le bloc-notes est vide ;
- `"desc"` (optionnel) : la description affichée dans l'info-bulle ;
- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond du
  cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis).

Une image ayant pour nom ***icon.svg*** peut aussi est présente dans le
répertoire du widget. Par défaut, le symbole d'un bloc-notes sera utilisé.
L'image doit être carrée et le dessin doit occupé toute la zone de l'image. Si
le dessin n'est pas carré, il faut le centrer verticalement et l'aligner à
droite. Seule la couleur noire doit être utilisée et elle doit avoir une opacité
de `0.2`.

Aucune dimension particulière est conseillée.

## Scraper

Ce module n'utilise pas de scraper.

## Exemple

Cet exemple affiche un bloc-notes pour une liste de courses.

```JSON
{
    "notepad": {
        "module": "core/notepad",
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
