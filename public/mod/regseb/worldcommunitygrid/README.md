# /regseb/worldcommunitygrid

Ce module affiche des données statistiques d'un utilisateur de
**[World Community Grid](https://www.worldcommunitygrid.org/‎)**.

## Configuration

Les dimensions conseillées sont **20x2**.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"color"` (optionnel - valeur par défaut : `"#795548"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"user"` : l'identifiant d'un utilisateur ;
- `"cron`" (optionnel - valeur par défaut : `"0 1 * * *"`) : la notation cron
  indiquant la fréquence de mise à jour.

## Exemple

### /config.json

Cet exemple affiche les données de l'utilisateur *regseb*.

```JSON
{
    "user": "regseb"
}
```
