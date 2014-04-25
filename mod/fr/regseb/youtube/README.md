# /fr/regseb/youtube
Ce module affiche la liste des dernières vidéos postées sur
**[Youtube](http://www.youtube.com/)** par un utilisateur (ou une liste
d'utilisateur).

## Configuration
Les dimensions conseillées sont **26x3**.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet *[JSON](http://www.json.org "JavaScript Object Notation")*
avec les propriétés suivantes :
- `"color"` : la couleur de fond du cadre au format hexadécimal (par exemple
  `"#1ba1e2"`pour du bleu) ;
- `"user"` : l'identifiant d'un utilisateur ou un tableau d'identifiants du
  utilisateurs ;
- `"key"` : votre
  [clé pour les *API*s de Google](https://console.developers.google.com/) ;
- `"size"` : le nombre de vidéos affichées ;
- `"cron"` : la notation *cron* indiquant la fréquence de mise à jour.

## Exemple
### /config.json
Cet exemple affiche les cinq dernières vidéos des utilisateurs *cndetmanu*,
*joueurdugrenier* et *RealMyop* (avec une mise à jour à minuit).
```JSON
{
    "color": "#1ba1e2",
    "user": [ "cndetmanu", "joueurdugrenier", "RealMyop" ],
    "key": "1aQw2zSx3eDc4rFv... (une clé de ce style)",
    "size": 5,
    "cron": "0 0 * * *"
}
```
