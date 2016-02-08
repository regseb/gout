# /regseb/dailymotion

Ce module affiche la liste des dernières vidéos postées sur
**[dailymotion](http://www.dailymotion.com/fr)** par des utilisateurs.

## Configuration

**28** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre de vidéos qu'il faut afficher dans le cadre. Si vous souhaitez avoir
les *N* dernières vidéos : il faut fixer la hauteur à *N + 1*.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"users"` : la liste des identifiants de comptes ;
- `"color"` : la couleur de fond du cadre (au format hexadécimale, régulier RGB
  ou avec des mots-clefs prédéfinis) ;
- `"cron"` : la notation cron indiquant la fréquence de mise à jour.

## Exemple

### /config.json

Cet exemple affiche les dernières vidéos des utilisateurs
**[Bloqués](http://www.dailymotion.com/bloques)** et
**[Les Guignols de l'Info](http://www.dailymotion.com/lesguignols)** (avec une
mise à jour à 21h).

```JSON
{
    "users": ["bloques", "lesguignols"],
    "color": "#9e9e9e",
    "cron":  "0 21 * * *"
}
```
