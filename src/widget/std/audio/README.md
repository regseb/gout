# /std/audio

Ce widget permet d'écouter un flux audio.

## Configuration

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec les
propriétés suivantes :

- `"url"` : l'URL vers le flux audio ;
- `"link"` : le lien vers une page Internet ;
- `"desc"` (optionnel - valeur par défaut `""`) : l'info-bulle affichée au
  survol ;
- `"color"` (optionnel - valeur par défaut : `"black"`) : la couleur de fond du
  bouton (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis).

Une image ayant pour nom ***icon.svg*** doit aussi est présente dans le
répertoire de la passerelle.

Aucune dimension particulière est conseillée.

## Scraper

Ce widget n'utilise pas de scraper.

## Exemple

Cet exemple affiche cadre pour écouter la radio [Fip](http://www.fipradio.fr/).

```JSON
{
    "std/audio/fip": {
        "widget": "std/audio",
        "coord": { "x": 1, "y": 1, "w": 5, "h": 5 },
        "files": {
            "config.json": {
                "url": "http://direct.fipradio.fr/live/fip-midfi.mp3",
                "link": "http://www.fipradio.fr/",
                "color": "#e91e63"
            }
        }
    }
}
```
