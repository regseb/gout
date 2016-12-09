# /regseb/tv

Ce widget donne le **programme télévisé** du soir.

## Configuration

Le répertoire de la passerelle doit avoir un fichier ***config.json***
contenant un objet
[JSON](http://www.json.org/json-fr.html "JavaScript Object Notation") avec la
propriété suivante :

- `"color"` (optionnel - valeur par défaut : `"#e9e9e9"`) : la couleur de fond
  du cadre (au format hexadécimale, régulier RGB ou avec des mots-clefs
  prédéfinis).

**25** est une taille raisonnable pour la largeur du cadre. La hauteur dépend
du nombre de chaines qu'il faut afficher dans le cadre. Si vous souhaitez avoir
*N* chaines de télévision : il faut fixer la hauteur à *N + 1*.

## Scraper

TODO.

## Exemple

Cet exemple donne le programme télévisé de toutes les chaines de la TNT sauf
Canal+, BFM TV, iTELE et Franceinfo.

```JSON
{
    "regseb/tv": {
        "widget": "regseb/tv",
        "coord": { "x": 59, "y": 1, "w": 20, "h": 23 },
        "files": { "config.json": {} },
        "scrapers": [
            {
                "scraper": "regseb/tv/tele2semaines",
                "config": {
                    "tnt": [
                        "tf1", "france-2", "france-3", "france-5", "m6", "arte",
                        "c8", "w9", "tmc", "nt1", "nrj-12",
                        "la-chaine-parlementaire-public-senat", "france-4",
                        "cstar", "gulli", "france-o", "hd1", "l-equipe", "6ter",
                        "numero-23", "rmc-decouverte", "cherie-25"
                    ]
                }
            }
        ]
    }
}
```
