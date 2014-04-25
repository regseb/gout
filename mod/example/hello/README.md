# /example/hello
Ce module d'exemple affiche le texte « Hello *someone* », où *someone* est
configurable.

## Configuration
Les dimensions conseillées sont **25x3**.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet *[JSON](http://www.json.org "JavaScript Object Notation")*
avec les propriétés suivantes :
- `"color"` : la couleur de fond du cadre au format hexadécimal (par exemple
  `"#647687"`pour du gris) ;
- `"who"` : le texte qui remplacera *someone*.

## Exemple
### /config.json
Cet configuration affiche le texte « Hello world ».
```JSON
{
    "color": "#647687",
    "who": "world"
}
```
