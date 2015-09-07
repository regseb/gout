# /regseb/dailymotion

Ce module affiche la liste des dernières vidéos postées sur
**[dailymotion](http://www.dailymotion.com/fr)** par un utilisateur (ou une
liste d'utilisateurs).

## Configuration

**28** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre de vidéos qu'il faut afficher dans le cadre. Si vous souhaitez avoir
les *N* dernières vidéos : il faut fixer la hauteur à *N + 1*.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;
- `"user"` : l'identifiant d'un utilisateur ou un tableau d'identifiants
  d'utilisateurs ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour.

## Exemple

### /config.json

Cet exemple affiche les dernières vidéos des utilisateurs *Bloqués*,
*Les Guignols de l'Info* (avec une mise à jour à 21h).

```JSON
{
    "color": "#1ba1e2",
    "user": ["bloques", "lesguignols"],
    "cron": "0 21 * * *"
}
```
