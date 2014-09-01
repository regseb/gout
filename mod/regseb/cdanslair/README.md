# /regseb/cdanslair
Ce module indique le sujet de l'émission
**[C dans l'air](http://www.france5.fr/emissions/c-dans-l-air)**. Ce programme
est diffusé sur *France 5* du lundi au vendredi à 17h45.

## Configuration
Les dimensions conseillées sont **20x2**.

Le répertoire de la passerelle peut avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec la propriété suivante :
- `"color"` (optionnel - valeur par défaut : `"#9e9e9e"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"cron`" (optionnel - valeur par défaut : `"0 1,14-18 * * *"`) : la notation
  cron indiquant la fréquence de rafraichissement du sujet de l'émission.

## Exemple
### /config.json
Par défaut (sans fichier *config.json*), le sujet de l'émission est affiché sur
fond gris. Le sujet est mis à jour toutes les heures durant l'après-midi (car
c'est à ce moment de le thème de l'émission est signalé).
