# /std/text
Ce module affiche un cadre avec du texte et dont la couleur de fond est
personnalisable.

## Configuration
Aucune dimension particulière est conseillée.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :
- `"text"` (optionnel - valeur par défaut : `""`) : le texte affiché dans le
  cadre ;
- `"align"` (optionnel - valeur par défaut : `"left"`) : l'alignement du texte,
  les possibles sont `"left"`, `"center"`, `"right"` et `"justify"` ;
- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond du
  cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;

## Exemple
### /config.json
Cet exemple affiche un cadre noir avec le texte *Carpe diem*.
```JSON
{
    "text": "Carpe diem"
}
```
