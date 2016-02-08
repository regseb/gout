# /regseb/jenkins

Ce module affiche les *jobs* **jenkins** qui sont en erreur.

## Configuration

**14** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre de *job*s qui peuvent être affichés dans le cadre. Si vous souhaitez
pouvoir afficher *N* *jobs* : il faut fixer la hauteur à *N + 1*.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"url"`: l'URL du serveur Jenkins ;
- `"jobs"`: les filtres des *jobs* à afficher ;
- `"color"` (optionnel - valeur par défaut : `"#9e9e9e"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"cron"` (optionnel - valeur par défaut : `"0 */4 * * *"`) : la notation cron
  indiquant la fréquence de mise à jour des *jobs*.

## Exemple

### /config.json

Cet exemple affiche les *jobs* des projets *ActiveMQE* de la fondation
**[Apache](//builds.apache.org/)**.

```JSON
{
    "url": "https://builds.apache.org",
    "jobs": ["ActiveMQE*"]
}
```
