# /std/button

Ce widget affiche un bouton qui ouvre une nouvelle page.

## Configuration

La configuration contient un objet
[JSON](http://www.json.org "JavaScript Object Notation") avec les propriétés
suivantes :

- `"link"`: le lien vers une page Internet ;
- `"title"` (optionnel - valeur par défaut `""`) : l'info-bulle affichée au
  survol du bouton ;
- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond du
  bouton (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis).

Le widget doit être carré.

Le répertoire de la passerelle doit avoir un fichier ***icon.svg*** qui sera
l'image affichée dans le button.

## Exemple

Cet exemple affiche un bouton qui redirige vers *Facebook*.

```JSON
{
    "std/button/facebook": {
        "widget": "std/button",
        "coord": { "x": 1, "y": 1, "w": 3, "h": 3 },
        "config": {
            "link": "https://www.facebook.com/",
            "title": "Facebook",
            "color": "#2196f3"
        }
    }
}
```
