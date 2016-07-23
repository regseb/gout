# /regseb/jenkins

Ce widget affiche les *jobs* et les *modules* **jenkins** qui sont en erreur.

## Configuration

**14** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre de *job*s qui peuvent être affichés dans le cadre. Si vous souhaitez
pouvoir afficher *N* *jobs*/*modules* : il faut fixer la hauteur à *N + 1*.

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

Cet exemple affiche les *modules* *Maven Core* et *Maven Artifact* du *job*
*maven-3.x*, ainsi que le *job* *Tomcat-7.x* de la fondation
**[Apache](//builds.apache.org/)**.

```JSON
{
    "url": "https://builds.apache.org",
    "jobs": {
        "maven-3.x": ["org.apache.maven:maven-core",
                      "org.apache.maven:maven-artifact"],
        "Tomcat-7.x": null
    }
}
```
