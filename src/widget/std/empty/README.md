# /std/empty

Ce widget affiche un cadre vide dont la couleur de fond est personnalisable.

## Configuration

Aucune dimension particulière est conseillée.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec la propriété suivante :

- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;

## Exemple

### /config.json

Cet exemple affiche un cadre noir.

```JSON
{
    "color": "black"
}
```
