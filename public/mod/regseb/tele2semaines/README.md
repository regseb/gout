# /regseb/tele2semaines

Ce module donne le **[programme télévisé](http://www.programme.tv/)** du soir.

## Configuration

**25** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre de chaines qu'il faut afficher dans le cadre. Si vous souhaitez avoir
*N* chaines de télévision : il faut fixer la hauteur à *N + 1*.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"color"` (optionnel - valeur par défaut : `"#9e9e9e"`) : la couleur de fond du
  cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"channels"` (optionnel) : contenant un objet JSON :
  - `"exclude"` : une liste de numéro de chaines qui ne doivent pas être
    affichées ;
  - `"include"` : une liste de numéro de chaines qui faut afficher.

Par défaut, toutes les chaines de la TNT sont affichées. Sauf si `"include"`
est spécifiée : dans ce cas seules les chaines présentes dans la liste seront
affichées.

## Exemple

### /config.json

Cet exemple donne le programme télévisé de toutes les chaines de la TNT sauf
Canal+, BFM TV et i>Télé.

```JSON
{
    "channels": { "exclude": [4, 15, 16] }
}
```
