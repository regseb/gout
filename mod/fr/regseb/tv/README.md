# /fr/regseb/tv
Ce module donne le **[programme télévisé](http://www.programme-television.org/)** du soir.

## Configuration
Les dimensions conseillées sont **30x31**.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet *[JSON](http://www.json.org "JavaScript Object Notation")*
avec les propriétés suivantes :
- `"color"` : la couleur de fond du cadre au format hexadécimal (par exemple
  `"#647687"`pour du gris) ;
- `"channels"` (optionnelle) : contenant un objet *JSON* :
  - `"exclude"` : une liste de numéro de chaines qui ne doivent pas être
    affichées ;
  - `"include"` : une liste de numéro de chaines qui faut afficher.
Par défaut, toutes les chaines de la *TNT* sont affichées. Sauf si `"include"`
est spécifiée : dans ce cas seules les chaines présentes dans la liste seront
affichées.

## Exemple
### /config.json
Cet exemple donne le programme télévisé de toutes les chaines de la *TNT* sauf
*Canal+*.
```JSON
{
    "color": "#647687",
    "channels": { "exclude": [ 4 ] }
}
```
