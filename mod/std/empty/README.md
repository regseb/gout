# /std/empty
Ce module affiche un cadre vide dont la couleur de fond est personnalisable.

## Configuration
Aucune dimension particulière est conseillée.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet *[JSON](http://www.json.org "JavaScript Object Notation")*
avec la propriété suivante :
- `"color"` : la couleur de fond du cadre au format hexadécimal (par exemple
  `"#000000"`pour du noir).

## Exemple
### /config.json
Cet exemple affiche un cadre noir.
```JSON
{
    "color": "#000000"
}
```
