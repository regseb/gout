# /example/hello
Ce module d'exemple affiche le texte « Hello *someone*! », où *someone* est
configurable.

## Configuration
Les dimensions conseillées sont **25x3**.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :
- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond du
  cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"who"` : le texte qui remplacera *someone*.

## Exemple
### /config.json
Cette configuration affiche le texte « Hello world! » sur fond rouge.
```JSON
{
    "color": "#e51c23",
    "who": "world"
}
```
