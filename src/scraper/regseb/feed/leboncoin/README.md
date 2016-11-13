# /regseb/feed/leboncoin

Ce scraper récupère la liste des dernières annonces postées sur
**[leboncoin](//www.leboncoin.fr/)** selon des critères.

## Configuration

La configuration contient l'URL d'une recherche.

## Exemple

Cet exemple affiche les dernières annonces de vente de
*[Clio](//www.leboncoin.fr/voitures/offres/centre/?th=1&q=clio)*.

```JSON
{
    "std/feed/leboncoin": {
        "widget": "std/feed",
        "coord": { "x": 1, "y": 1, "w": 20, "h": 5 },
        "config": {
            "color": "#ff5722",
            "cron": "0 * * * *"
        },
        "scrapers": [
            {
                "scraper": "regseb/feed/leboncoin",
                "config": "https://www.leboncoin.fr/voitures/offres/centre/?th=1&q=clio"
            }
        ]
    }
}
```
