# /std/ajaxloader
Ce module indique si une requête AJAX est en cours, grâce à une image animée.

## Configuration
Les dimensions conseillées sont **2x2**.

Le répertoire de la passerelle peut avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec la propriété suivante :
- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond du
  cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;

## Exemple
### /config.json
Par défaut (sans fichier *config.json*), le module affiche un cadre noir.
