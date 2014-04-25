# /fr/regseb/worldcommunitygrid
Ce module affiche des données statistiques d'un utilisateur de
**[World Community Grid](https://www.worldcommunitygrid.org/‎)**.

## Configuration
Les dimensions conseillées sont **26x3**.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet *[JSON](http://www.json.org "JavaScript Object Notation")*
avec les propriétés suivantes :
- `"color"` : la couleur de fond du cadre au format hexadécimal (par exemple
  `"#1ba1e2"`pour du bleu) ;
- `"user"` : l'identifiant d'un utilisateur.

## Exemple
### /config.json
Cet exemple affiche les données de l'utilisateur *regseb*.
```JSON
{
    "color": "#1ba1e2",
    "user": "regseb"
}
```
