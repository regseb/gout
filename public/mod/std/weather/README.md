# /std/weather

Ce module affiche la météo d'une ville. Les prévisions sont récupérées du
service [OpenWeatherMap](http://openweathermap.org/). Pour se connecter à
l'API, il vous faut une clé qui s'obtient en s'inscrivant sur le site
Internet du service : <http://openweathermap.org/register>

## Configuration

Les dimensions conseillées sont **14x13**.

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet [JSON](http://www.json.org "JavaScript Object Notation")
avec les propriétés suivantes :

- `"color"` (optionnel - valeur par défaut : `"#03a9f4"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis) ;
- `"appid"` : le clé de l'API pour le service d'OpenWeatherMap ;
- `"city"` : le nom de ville, suivit éventuellement du code du pays (séparé par
  une virgule) ;
- `"cron"` (optionnel - valeur par défaut : `"0 * * * *"`) : la notation cron
  indiquant la fréquence de mise à jour.

## Exemple

### /config.json

Cet exemple affiche la météo d'Aix-en-Provence sur fond bleu.

```JSON
{
    "appid": "1a23edc4f5b67... (une clé de ce style)",
    "city": "Aix-en-Provence,fr"
}
```
