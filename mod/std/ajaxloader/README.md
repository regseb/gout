# /std/ajaxloader
Ce module vous indique si une requête *AJAX* est en cours.

## Configuration
Les dimensions conseillées sont **3x3**.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet *[JSON](http://www.json.org "JavaScript Object Notation")*
avec la propriété suivante :
- `"color"` : la couleur de fond du cadre au format hexadécimal (par exemple
  `"#000000"`pour du noir).

## Exemple
### /config.json
Cet configuration affiche un cadre noir.
```JSON
{
    "color": "#000000"
}
```
