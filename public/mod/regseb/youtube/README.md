# /regseb/youtube
Ce module affiche la liste des dernières vidéos postées sur
**[Youtube](http://www.youtube.com/)** par un utilisateur (ou une liste
d'utilisateurs).

## Configuration
Les dimensions conseillées sont **26x3**.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :
- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;
- `"user"` : l'identifiant d'un utilisateur ou un tableau d'identifiants
  d'utilisateurs ;
- `"key"` : votre
  [clé pour les APIs de Google](https://console.developers.google.com/) ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour.

## Exemple
### /config.json
Cet exemple affiche les cinq dernières vidéos des utilisateurs *cndetmanu*,
*joueurdugrenier* et *RealMyop* (avec une mise à jour à minuit).
```JSON
{
    "color": "#1ba1e2",
    "user": ["cndetmanu", "joueurdugrenier", "RealMyop"],
    "key": "1aQw2zSx3eDc4rFv... (une clé de ce style)",
    "cron": "0 0 * * *"
}
```
### /icon.svg
TODO Insérer une image.
